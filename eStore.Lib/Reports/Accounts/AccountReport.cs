using eStore.Database;
using eStore.Reports.Pdfs;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eStore.BL.Reports.Accounts
{
    internal class EData
    {
        public int EmpId { get; set; }
        public string StaffName { get; set; }
        public List<SData> Data { get; set; }
        public decimal TotalPaid { get; set; }
        public decimal TotalRec { get; set; }
    }

    internal class SData
    {
        public int ID { get; set; }

        public DateTime Date { get; set; }
        public string SlipNo { get; set; }
        public PayMode Mode { get; set; }
        public string PaymentReson { get; set; }
        public decimal InAmount { get; set; }
        public decimal OutAmount { get; set; }
    }

    public class AccountReport
    {
        private int StoreId; private DateTime date;

        public string SalaryReport(eStoreDbContext db, int storeId, DateTime onDate, bool isPdf = true)
        {
            StoreId = storeId;
            date = onDate;
            var payData = db.SalaryPayments.Where (c => c.StoreId == storeId && c.PaymentDate.Month == onDate.Month && c.PaymentDate.Year == onDate.Year).OrderBy (c => c.EmployeeId).ToList ();
            var recData = db.StaffAdvanceReceipts.Where (c => c.StoreId == storeId && c.ReceiptDate.Month == onDate.Month && c.ReceiptDate.Year == onDate.Year).OrderBy (c => c.EmployeeId).ToList ();

            
            List<Object> oL = new List<object> ();
            if( payData.Count>0 || recData.Count > 0 )
            {
                var empIds = payData.Select (c => c.EmployeeId).OrderBy (c => c).Distinct().ToList ();

                SortedList<int, string> emp = new SortedList<int, string> ();
                var d = db.Employees.Select (c => new { c.EmployeeId, c.StaffName }).ToList ();

                List<EData> eList = new List<EData> ();
                decimal TotalPaidAmount = 0;
                decimal TotalRecAmount = 0;

                foreach ( var id in empIds )
                {
                    EData e = new EData
                    {
                        EmpId = id,
                        StaffName = d.Where (c => c.EmployeeId == id).FirstOrDefault ().StaffName  , Data= null
                    };

                    e.Data = payData.Where (c => c.EmployeeId == id).Select (c =>
                      new SData
                      {
                          Date = c.PaymentDate,
                          ID = c.SalaryPaymentId,
                          InAmount = 0,
                          Mode = c.PayMode,
                          OutAmount = c.Amount,
                          SlipNo = c.Details,
                          PaymentReson = c.SalaryMonth
                      }).ToList ();
                    var r = recData.Where (c => c.EmployeeId == id).Select (c => new SData
                    {
                        Date = c.ReceiptDate,
                        ID = c.StaffAdvanceReceiptId,
                        InAmount = c.Amount,
                        Mode = c.PayMode,
                        OutAmount = 0,
                        PaymentReson = "Payment Recived or Adjusted ",
                        SlipNo = c.Details
                    }).ToList ();

                    if ( r.Count > 0 )
                        e.Data.AddRange (r);
                    TotalPaidAmount += e.TotalPaid = payData.Where (c => c.EmployeeId == id).Sum (c => c.Amount);
                    TotalRecAmount += e.TotalRec = recData.Where (c => c.EmployeeId == id).Sum (c => c.Amount);
                    eList.Add (e);
                }

                // Generating PDF File
                PdfFont font = PdfFontFactory.CreateFont (StandardFonts.TIMES_ROMAN);
                float [] columnWidths = { 1, 1, 5, 15, 15, 5, 1, 1 };
                Cell [] HeaderCell = new Cell []{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Slip No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("In Amount").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Out Amount").SetTextAlignment(TextAlignment.CENTER)),
            };

                Paragraph p1 = new Paragraph ($"Gross Paid: Rs. {TotalPaidAmount.ToString ("0.##")}\t\t Gross Reciepts: Rs. {TotalRecAmount.ToString ("0.##")}\n\n")
                    .SetTextAlignment (TextAlignment.LEFT).SetFontColor (ColorConstants.RED).SetFont (font);
                Paragraph p2 = new Paragraph ("Payment/Receipts Details Staff wise List")
                    .SetFontSize(14)
                    .SetTextAlignment (TextAlignment.CENTER).SetBackgroundColor(ColorConstants.YELLOW).SetFontColor (ColorConstants.RED).SetFont (font);
                oL.Add (p1);
                oL.Add (p2);
                foreach ( var item in eList )
                {
                    Paragraph p = new Paragraph ($"\nID: {item.EmpId}\t\t Staff Name: {item.StaffName}\n\n").SetTextAlignment (TextAlignment.LEFT).SetFontColor (ColorConstants.BLUE).SetFont (font);
                    p.Add ($"Total Paid: Rs. {item.TotalPaid.ToString ("0.##")}\t\tTotal Reciepts: Rs. {item.TotalRec.ToString ("0.##")}\n");
                    Table table = DataToTable (item.Data, PDFHelper.GenerateTable (columnWidths, HeaderCell));
                    oL.Add (p);
                    oL.Add (table);
                }
            }
           
            return PDFHelper.CreateReportPdf ("MonthlySalary", $"Monthly Salary Report For {date.Month}/{date.Year}", oL, false);
        }

        public string SaleReport(eStoreDbContext db, int storeId, DateTime onDate, bool isPdf = true)
        {
            StoreId = storeId;
            PdfFont font = PdfFontFactory.CreateFont (StandardFonts.TIMES_ROMAN);
            date = onDate;
            var data = db.DailySales.Include (c => c.Salesman).Where (c => c.StoreId == storeId && c.SaleDate.Month == onDate.Month && c.SaleDate.Year == onDate.Year).
                 Select (c => new SaleTData
                 {
                     InvNo = c.InvNo,
                     IsDue = c.IsDue,
                     ManualBill = c.IsManualBill,
                     SaleReturn = c.IsSaleReturn,
                     Tailoring = c.IsTailoringBill,
                     Mode = c.PayMode,
                     Amount = c.Amount,
                     Date = c.SaleDate,
                     Id = c.DailySaleId,
                     Salesman = c.Salesman.SalesmanName
                 })
                .ToList ();

            var manul = data.Where (c => c.ManualBill).ToList ();
            var saleReturn = data.Where (c => c.SaleReturn).ToList ();
            var onSale = data.Where (c => !c.ManualBill && !c.SaleReturn && !c.Tailoring).ToList ();
            var tail = data.Where (c => c.Tailoring).ToList ();

            float [] columnWidths = { 1, 1, 5, 5, 15, 5, 1, 1 };
            Cell [] HeaderCell = new Cell []{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("InvNo").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Salesman").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Due").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };
            List<Object> oL = new List<Object> ();
            Table onSaleTable = DataToTable (onSale, columnWidths, HeaderCell);
            Table saleReturnTable = DataToTable (saleReturn, columnWidths, HeaderCell);
            Table manualSaleTable = DataToTable (manul, columnWidths, HeaderCell);
            Table tailoringTable = DataToTable (tail, columnWidths, HeaderCell);

            Paragraph p1 = new Paragraph ("Sale(On Book)\n").SetTextAlignment (TextAlignment.CENTER).SetFontColor (ColorConstants.BLUE).SetFont (font);
            Paragraph p2 = new Paragraph ("Sale Return List\n").SetTextAlignment (TextAlignment.CENTER).SetFontColor (ColorConstants.BLUE).SetFont (font);
            Paragraph p3 = new Paragraph ("Tailoring Sale List\n").SetTextAlignment (TextAlignment.CENTER).SetFontColor (ColorConstants.BLUE).SetFont (font);
            Paragraph p4 = new Paragraph ("Manual Sale List\n").SetTextAlignment (TextAlignment.CENTER).SetFontColor (ColorConstants.BLUE).SetFont (font);

            if ( onSale.Count > 0 )
            {
                oL.Add (p1);
                oL.Add (onSaleTable);
            }
            if ( saleReturn.Count > 0 )
            {
                oL.Add (p2);
                oL.Add (saleReturnTable);
            }
            if ( tail.Count > 0 )
            {
                oL.Add (p3);
                oL.Add (tailoringTable);
            }
            if ( manul.Count > 0 )
            {
                oL.Add (p4);
                oL.Add (manualSaleTable);
            }

            return PDFHelper.CreateReportPdf ("MonthlySale", $"Monthly Sale Report For {date.Month}/{date.Year}", oL, false);
        }

        public string PaymentRecieptReport(eStoreDbContext db, int storeId, DateTime onDate, bool isDdf = true)
        {
            StoreId = storeId;
            date = onDate;
            var expdata = db.Expenses.Where (c => c.StoreId == storeId && c.OnDate.Month == onDate.Month && c.OnDate.Year == onDate.Year)
                .Select (c => new TData
                {
                    SlipNo = null,
                    Amount = c.Amount,
                    Date = c.OnDate,
                    Id = c.ExpenseId,
                    Remarks = c.Remarks,
                    PName = c.PartyName,
                    Mode = c.PayMode,
                    Particulars = c.Particulars
                })
                .ToList ();
            var payData = db.Payments.Where (c => c.StoreId == storeId && c.OnDate.Month == onDate.Month && c.OnDate.Year == onDate.Year)
                .Select (c => new TData
                {
                    SlipNo = c.PaymentSlipNo,
                    Amount = c.Amount,
                    Date = c.OnDate,
                    Id = c.PaymentId,
                    Remarks = c.Remarks,
                    PName = c.PartyName,
                    Mode = c.PayMode,
                    Particulars = c.PaymentDetails
                }).ToList ();
            var cashPayData = db.CashPayments.Include (c => c.Mode).Where (c => c.StoreId == storeId && c.PaymentDate.Month == onDate.Month && c.PaymentDate.Year == onDate.Year)
                 .Select (c => new TData
                 {
                     SlipNo = c.SlipNo,
                     Amount = c.Amount,
                     Date = c.PaymentDate,
                     Id = c.CashPaymentId,
                     Remarks = c.Remarks,
                     PName = c.PaidTo,
                     Mode = PaymentMode.Cash,
                     Particulars = c.Mode.Transcation
                 })
                .ToList ();
            var recptData = db.Receipts.Where (c => c.StoreId == storeId && c.OnDate.Month == onDate.Month && c.OnDate.Year == onDate.Year)
                .Select (c => new TData
                {
                    SlipNo = c.RecieptSlipNo,
                    Amount = c.Amount,
                    Date = c.OnDate,
                    Id = c.ReceiptId,
                    Remarks = c.Remarks,
                    PName = c.PartyName,
                    Mode = c.PayMode,
                    Particulars = c.PaymentDetails
                })
                .ToList ();
            var cashRecptData = db.CashReceipts.Include (c => c.Mode).Where (c => c.StoreId == storeId && c.InwardDate.Month == onDate.Month && c.InwardDate.Year == onDate.Year)
                .Select (c => new TData
                {
                    SlipNo = c.SlipNo,
                    Amount = c.Amount,
                    Date = c.InwardDate,
                    Id = c.CashReceiptId,
                    Remarks = c.Remarks,
                    PName = c.ReceiptFrom,
                    Mode = PaymentMode.Cash,
                    Particulars = c.Mode.Transcation
                })
                .ToList ();

            float [] columnWidthsCol8 = { 1, 1, 5, 15, 15, 5, 15, 1 };
            Cell [] HeaderCellExpenses = new Cell []{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Party Name").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };

            float [] columnWidthsCol9 = { 1, 1, 5, 15, 15, 5, 15, 5, 1 };
            Cell [] HeaderCellPayment = new Cell []{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Party Name").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Slip No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };

            Table expTable = DataToTable (expdata, PDFHelper.GenerateTable (columnWidthsCol8, HeaderCellExpenses));
            Table payTable = DataToTable (payData, PDFHelper.GenerateTable (columnWidthsCol9, HeaderCellPayment));
            Table recptTable = DataToTable (recptData, PDFHelper.GenerateTable (columnWidthsCol9, HeaderCellPayment));
            Table cashPaymentTable = DataToTable (cashPayData, PDFHelper.GenerateTable (columnWidthsCol9, HeaderCellPayment));
            Table cashRecptTable = DataToTable (cashRecptData, PDFHelper.GenerateTable (columnWidthsCol9, HeaderCellPayment));
            List<Paragraph> pList = new List<Paragraph> ();
            List<Object> oL = new List<Object> ();
            Paragraph p1 = new Paragraph ("Expenses List");
            Paragraph p2 = new Paragraph ("Cash Payments/Expenses List");
            Paragraph p3 = new Paragraph ("Payments List");
            Paragraph p4 = new Paragraph ("Reciepts List");
            Paragraph p5 = new Paragraph ("Cash Reciepts List");

            if ( expdata.Count > 0 )
            {
                oL.Add (p1);
                oL.Add (expTable);
            }
            if ( cashPayData.Count > 0 )
            {
                oL.Add (p2);
                oL.Add (cashPaymentTable);
            }
            if ( payData.Count > 0 )
            {
                oL.Add (p3);
                oL.Add (payTable);
            }
            if ( recptData.Count > 0 )
            {
                oL.Add (p4);
                oL.Add (recptTable);
            }
            if ( cashRecptData.Count > 0 )
            {
                oL.Add (p5);
                oL.Add (cashRecptTable);
            }

            return PDFHelper.CreateReportPdf ("PaymentReciept", $"Payments, Expenses and Receipts For {date.Month}/{date.Year}", oL, true);
        }

        private Table DataToTable(List<SData> rows, Table table)
        {
            int count = 0;
            foreach ( var row in rows )
            {
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (( ++count ) + "")));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.ID.ToString ())));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Date.ToShortDateString ())));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (String.IsNullOrEmpty (row.SlipNo) ? "" : row.SlipNo)));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (String.IsNullOrEmpty (row.PaymentReson) ? "" : row.PaymentReson)));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Mode.ToString ())));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.InAmount.ToString ("0.##"))));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.OutAmount.ToString ("0.##"))));
            }
            return table;
        }

        private Table DataToTable(List<TData> rows, Table table)
        {
            int count = 0;
            decimal total = 0;
            foreach ( var row in rows )
            {
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (( ++count ) + "")));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Id.ToString ())));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Date.ToShortDateString ())));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (String.IsNullOrEmpty (row.PName) ? "" : row.PName)));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (String.IsNullOrEmpty (row.Particulars) ? "" : row.Particulars)));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Mode.ToString ())));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (String.IsNullOrEmpty (row.Remarks) ? "" : row.Remarks)));
                if ( row.SlipNo != null )
                    //.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph ( "A")));
                    table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (String.IsNullOrEmpty (row.SlipNo) ? "" : row.SlipNo)));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Amount.ToString ("0.##"))));
                total += row.Amount;
            }
            Div d = new Div ();
            PdfFont font = PdfFontFactory.CreateFont (StandardFonts.TIMES_ITALIC);
            Paragraph p = new Paragraph ($"Total :{total}").SetFont (font)
                .SetTextAlignment (TextAlignment.RIGHT).SetFontColor (ColorConstants.BLUE);
            d.Add (p);
            table.SetCaption (d);
            return table;
        }

        private Table DataToTable(List<SaleTData> rows, float [] columnWidths, Cell [] HeaderCell)
        {
            Table table = PDFHelper.GenerateTable (columnWidths, HeaderCell);
            int count = 0;
            decimal total = 0;

            foreach ( var row in rows )
            {
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (( ++count ) + "")));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Id.ToString ())));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Date.ToShortDateString ())));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (String.IsNullOrEmpty (row.InvNo) ? "" : row.InvNo)));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (String.IsNullOrEmpty (row.Salesman) ? "" : row.Salesman)));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Mode.ToString ())));
                if ( row.IsDue )
                    table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph ("Due").SetFontColor (ColorConstants.RED)));
                else
                    table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph ("Paid")));
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (row.Amount.ToString ("0.##"))));
                total += row.Amount;
            }
            Div d = new Div ();
            Paragraph p = new Paragraph ($"Total Amount: {total}");
            d.Add (p);
            table.SetCaption (d);
            return table;
        }
    }

    internal class TableRow
    {
        public List<TableCol> Rows { get; set; }

        private Table DataToTable(TableRow rows, Table table)
        {
            int count = 0;
            foreach ( var row in rows.Rows )
            {
                table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph (( ++count ) + "")));
                foreach ( var col in row.Cols )
                {
                    table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER)
                        .Add (new Paragraph (String.IsNullOrEmpty (col) ? "" : col)));
                }
            }
            return table;
        }
    }

    internal class TableCol
    {
        public List<string> Cols { get; set; }
    }

    internal class TData
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string PName { get; set; }
        public string Particulars { get; set; }
        public PaymentMode Mode { get; set; }
        public string Remarks { get; set; }
        public string SlipNo { get; set; }
        public decimal Amount { get; set; }
    }

    internal class SaleTData
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string InvNo { get; set; }
        public decimal Amount { get; set; }
        public PayMode Mode { get; set; }
        public bool ManualBill { get; set; }
        public bool SaleReturn { get; set; }
        public bool Tailoring { get; set; }
        public string Salesman { get; set; }
        public bool IsDue { get; set; }
    }
}