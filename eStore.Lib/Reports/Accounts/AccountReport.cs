using eStore.Database;
using eStore.Lib.Reports.Payroll;
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
    public class AccountReport
    {
        int StoreId; DateTime date;
        public string SaleReport(eStoreDbContext db, int storeId, DateTime onDate, bool isPdf = true)
        {
            StoreId = storeId;
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
             Table onSaleTable = DataToTable(onSale, columnWidths, HeaderCell);
             Table saleReturnTable = DataToTable(saleReturn, columnWidths, HeaderCell);
            Table manualSaleTable = DataToTable (manul, columnWidths, HeaderCell);
            Table tailoringTable = DataToTable(tail, columnWidths, HeaderCell);

            Paragraph p1 = new Paragraph("Sale(On Book)\n").SetTextAlignment (TextAlignment.CENTER).SetFontColor(ColorConstants.BLUE);
            Paragraph p2 = new Paragraph ("Sale Return List\n").SetTextAlignment (TextAlignment.CENTER).SetFontColor (ColorConstants.BLUE);
            Paragraph p3 = new Paragraph ("Tailoring Sale List\n").SetTextAlignment (TextAlignment.CENTER).SetFontColor (ColorConstants.BLUE);
            Paragraph p4 = new Paragraph ("Manual Sale List\n").SetTextAlignment (TextAlignment.CENTER).SetFontColor (ColorConstants.BLUE);

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



            return PDFHelper.CreateReportPdf ("MonthlySale", "Monthly Sale Report", oL, false);


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
                oL.Add (expTable); }
            if ( cashPayData.Count > 0 )
            { 
            oL.Add (p2);
            oL.Add (cashPaymentTable); }
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



            return PDFHelper.CreateReportPdf ("PaymentReciept", "Payments, Expenses and Receipts", oL, true);


        }
        private void CreatePaymentRecieptPdf()
        {
            string fileName = $"PaymentRecieptReportForMonth_{date.Month}_{date.Year}.pdf";


        }



        private Table DataToTable(List<TData> rows, Table table)
        {
            
            int count = 0;
            decimal total = 0;
            foreach ( var row in rows )
            {
                Console.WriteLine ($"{row.Particulars}\t{row.SlipNo}\t{row.Id}\t{row.Mode}\t{row.Amount}\t{row.Date.ToShortDateString()}");
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
            Paragraph p = new Paragraph ($"Total :{total}").SetFont(font)
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
                    table.AddCell (new Cell ().SetTextAlignment (TextAlignment.CENTER).Add (new Paragraph ("Due").SetFontColor(ColorConstants.RED)));
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
