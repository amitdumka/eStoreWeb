using eStore.BL.Reports.Accounts;
using eStore.Database;
using eStore.Shared.ViewModels;
using iText.Kernel.Colors;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Path = System.IO.Path;

namespace eStore.BL.Reports.CAReports
{
    internal class ConData
    {
        public const string CName = "Aprajita Retails";
        public const string CAdd = "Bhagalpur Road, Dumka";
        public const string WWWroot = "wwwroot";
    }

    public class FinReport
    {
        private eStoreDbContext db;
        private int StoreId;
        private int StartYear, EndYear;
        private const int SM = 4;
        private const int EM = 3;

        private DateTime StartDate, EndDate;
        private string FileName = "FINReport_";
        private string Ext = ".pdf";
        private bool isPDF = true;

        public FinReport(eStoreDbContext con, int storeId, int SYear, int EYear, bool IsPdf)
        {
            db = con;
            StoreId = storeId;
            StartYear = SYear;
            EndYear = EYear;
            StartDate = new DateTime(StartYear, SM, 1).Date;
            EndDate = new DateTime(EndYear, EM, 31).Date;
            FileName += $"{StartYear}_{EndYear}_{DateTime.UtcNow.ToFileTime()}";
            isPDF = IsPdf;
        }

        public string GetFinYearReport(int rep, bool isRefreshed = true)
        {
            switch (rep)
            {
                case 1:
                    return GenerateSaleData(isRefreshed);

                case 2:
                    return GenerateCashBook(isRefreshed);

                case 3:
                    return GenerateSalaryData(isRefreshed);

                case 4:
                    return GenerateExpensesData(isRefreshed);

                case 5:
                    return GeneratePaymentData(isRefreshed);

                case 6:
                    return GenerateReceiptData(isRefreshed);

                case 7:
                    return GenerateBankData(isRefreshed);

                default:
                    return "Error Selection";
            }
        }

        private void GeneratePurchaseData(bool isRefreshed = true)
        {
        }

        private string GenerateBankData(bool isRefreshed = true)
        {
            if (!isRefreshed)
            {
                var fn = IsExist("Banks");
                if (fn != "ERROR")
                    return fn;
            }
            var depo = db.BankDeposits.Include(c => c.Account).ThenInclude(c => c.Bank).Where(c => c.StoreId == StoreId && c.OnDate.Date >= StartDate.Date && c.OnDate.Date <= EndDate.Date).ToList();
            var withdrw = db.BankWithdrawals.Include(c => c.Account).ThenInclude(c => c.Bank).Where(c => c.StoreId == StoreId && c.OnDate.Date >= StartDate.Date && c.OnDate.Date <= EndDate.Date).ToList();
            float[] columnWidths = { 1, 5, 5, 5, 5, 5, 5, 5, 5, 5 };

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                     new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Bank").SetTextAlignment(TextAlignment.CENTER)),
                     new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Account").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Cheque No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("In Name Of").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Details").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER))
            };
            Div d = new Div();
            d.Add(new Paragraph("Bank Deposit").SetFontColor(ColorConstants.MAGENTA));

            Table table = GenTable(columnWidths, HeaderCell);
            table.SetCaption(d);
            int count = 0;
            foreach (var item in depo)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Account.Bank.BankName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Account.Account)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.ChequeNo) ? "" : item.ChequeNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.InNameOf) ? "" : item.InNameOf)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Details) ? "" : item.Details)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            Div d2 = new Div();
            d2.Add(new Paragraph("Bank Withdrawal").SetFontColor(ColorConstants.MAGENTA));

            Table table2 = GenTable(columnWidths, HeaderCell);
            table2.SetCaption(d2);
            count = 0;
            foreach (var item in withdrw)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Account.Bank.BankName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Account.Account)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.ChequeNo) ? "" : item.ChequeNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.InNameOf) ? "" : item.InNameOf)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Details) ? "" : item.Details)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            List<Table> dataTable = new List<Table>();
            dataTable.Add(table);
            dataTable.Add(table2);

            return PrintPDF("Banks", dataTable);
        }

        private string GenerateCashBook(bool isRefreshed = true)
        {
            if (!isRefreshed)
            {
                var fn = IsExist("CashBook");
                if (fn != "ERROR")
                    return fn;
            }
            CashBookManager manager = new CashBookManager(StoreId);

            var data = manager.GetMontlyCashBook(db, DateTime.Today, StoreId);
            List<CashBook> CB = new List<CashBook>();

            for (int i = 4; i <= 12; i++)
            {
                CB.AddRange(manager.GetMontlyCashBook(db, new DateTime(StartYear, i, 1), StoreId));
            }
            for (int i = 1; i <= 3; i++)
            {
                CB.AddRange(manager.GetMontlyCashBook(db, new DateTime(EndYear, i, 1), StoreId));
            }
            float[] columnWidths = { 1, 5, 15, 5, 5, 5 };
            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Cash IN").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Cash Out").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Balance").SetTextAlignment(TextAlignment.CENTER)) };

            Table table = GenTable(columnWidths, HeaderCell);
            int count = 0;
            foreach (var item in CB)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.EDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Particulars)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashIn.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashOut.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashBalance.ToString("0.##"))));
            }
            List<Table> dataTable = new List<Table>();
            dataTable.Add(table);
            return PrintPDF("CashBook", dataTable);
        }

        private string GenerateSaleData(bool isRefreshed = true)
        {
            if (!isRefreshed)
            {
                var fn = IsExist("Sales");
                if (fn != "ERROR")
                    return fn;
            }
            var sale = db.DailySales.Where(c => !c.IsManualBill && !c.IsSaleReturn && !c.IsTailoringBill && c.StoreId == StoreId && c.SaleDate.Date >= StartDate.Date && c.SaleDate.Date <= EndDate.Date).ToList();
            var manualBill = db.DailySales.Where(c => c.IsManualBill && !c.IsSaleReturn && c.StoreId == StoreId && c.SaleDate.Date >= StartDate.Date && c.SaleDate.Date <= EndDate.Date).ToList();
            var tailorBill = db.DailySales.Where(c => !c.IsSaleReturn && !c.IsTailoringBill && c.StoreId == StoreId && c.SaleDate.Date >= StartDate.Date && c.SaleDate.Date <= EndDate.Date).ToList();
            var salereturn = db.DailySales.Where(c => !c.IsSaleReturn && c.StoreId == StoreId && c.SaleDate.Date >= StartDate.Date && c.SaleDate.Date <= EndDate.Date).ToList();
            float[] columnWidths = { 1, 5, 15, 5, 5, 15, 5, 5 };
            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Invoice No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Payment Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Cash Amount").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("NON Cash Amount").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Bill Amount").SetTextAlignment(TextAlignment.CENTER))
            };
            Div d = new Div();
            d.Add(new Paragraph("On Book Sale(GST Paid)").SetFontColor(ColorConstants.MAGENTA));

            Table table = GenTable(columnWidths, HeaderCell);
            table.SetCaption(d);
            int count = 0;
            foreach (var item in sale)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.SaleDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.InvNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashAmount.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((item.Amount - item.CashAmount).ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            Div d2 = new Div();
            d2.Add(new Paragraph("Manual Bill Sale").SetFontColor(ColorConstants.MAGENTA));

            Table table2 = GenTable(columnWidths, HeaderCell);
            table2.SetCaption(d2);
            count = 0;
            foreach (var item in manualBill)
            {
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.SaleDate.ToShortDateString())));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.InvNo)));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashAmount.ToString("0.##"))));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((item.Amount - item.CashAmount).ToString("0.##"))));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            Div d3 = new Div();
            d3.Add(new Paragraph("Tailoring Bill Sale").SetFontColor(ColorConstants.MAGENTA));

            Table table3 = GenTable(columnWidths, HeaderCell);
            table3.SetCaption(d3);
            count = 0;
            foreach (var item in tailorBill)
            {
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.SaleDate.ToShortDateString())));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.InvNo)));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashAmount.ToString("0.##"))));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((item.Amount - item.CashAmount).ToString("0.##"))));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            Div d4 = new Div();
            d4.Add(new Paragraph(" Sale Return").SetFontColor(ColorConstants.MAGENTA));

            Table table4 = GenTable(columnWidths, HeaderCell);
            table4.SetCaption(d4);
            count = 0;
            foreach (var item in salereturn)
            {
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.SaleDate.ToShortDateString())));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.InvNo)));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.CashAmount.ToString("0.##"))));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((item.Amount - item.CashAmount).ToString("0.##"))));
                table3.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            List<Table> dataTable = new List<Table>();
            dataTable.Add(table);
            dataTable.Add(table2);
            dataTable.Add(table3);
            dataTable.Add(table4);
            return PrintPDF("Sales", dataTable);
        }

        private string GenerateSalaryData(bool isRefreshed = true)
        {
            if (!isRefreshed)
            {
                var fn = IsExist("Salary");
                if (fn != "ERROR")
                    return fn;
            }
            var data = db.SalaryPayments.Include(c => c.Employee).Where(c => c.StoreId == StoreId && c.PaymentDate.Date >= StartDate.Date && c.PaymentDate.Date <= EndDate.Date).ToList();
            var advData = db.StaffAdvanceReceipts.Where(c => c.StoreId == StoreId && c.ReceiptDate.Date >= StartDate.Date && c.ReceiptDate.Date <= EndDate.Date).ToList();
            float[] columnWidths = { 1, 5, 15, 5, 5, 15, 2, 5 };
            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("EmployeeName").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("SalaryMonth").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Payment Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Details").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("+/-").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER))
            };
            Div d = new Div();
            d.Add(new Paragraph("Salary Payments").SetFontColor(ColorConstants.MAGENTA));

            Table table = GenTable(columnWidths, HeaderCell);
            table.SetCaption(d);
            int count = 0;
            foreach (var item in data)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PaymentDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Employee.StaffName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.SalaryMonth)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Details) ? "" : item.Details)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("+")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            Table table2 = GenTable(columnWidths, HeaderCell);
            Div d2 = new Div();
            d2.Add(new Paragraph("Advance Reciepts").SetFontColor(ColorConstants.MAGENTA));
            table2.SetCaption(d2);
            count = 0;
            foreach (var item in advData)
            {
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.ReceiptDate.ToShortDateString())));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Employee.StaffName)));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("")));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Details) ? "" : item.Details)));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("-")));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            List<Table> dataTable = new List<Table>();
            dataTable.Add(table);
            dataTable.Add(table2);
            return PrintPDF("Salary", dataTable);
        }

        private string GenerateExpensesData(bool isRefreshed = true)
        {
            if (!isRefreshed)
            {
                var fn = IsExist("Expenses");
                if (fn != "ERROR")
                    return fn;
            }
            var data = db.Expenses.Include(c => c.FromAccount).Where(c => c.StoreId == StoreId && c.OnDate.Date >= StartDate.Date && c.OnDate.Date <= EndDate.Date).ToList();
            var cashData = db.CashPayments.Include(c => c.Mode).Where(c => c.StoreId == StoreId && c.PaymentDate.Date >= StartDate.Date && c.PaymentDate.Date <= EndDate.Date).ToList();
            float[] columnWidths = { 1, 5, 15, 15, 5, 5, 15, 10, 5 };

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                     new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("PartyName").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Payment Details").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Bank").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER))
            };

            Div d = new Div();
            d.Add(new Paragraph("Expenses").SetFontColor(ColorConstants.MAGENTA));

            Table table = GenTable(columnWidths, HeaderCell);
            table.SetCaption(d);
            int count = 0;
            foreach (var item in data)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Particulars) ? "" : item.Particulars)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.PartyName) ? "" : item.PartyName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.PaymentDetails) ? "" : item.PaymentDetails)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                if (item.FromAccount != null)
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.FromAccount.Account) ? "" : item.FromAccount.Account)));
                else
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }

            HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("PartyName").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Voucher No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER))
            };
            float[] columnWidths2 = { 1, 5, 5, 5, 5, 5, 5, };
            Table table2 = GenTable(columnWidths2, HeaderCell);
            Div d2 = new Div();
            d2.Add(new Paragraph("Cash Expenses").SetFontColor(ColorConstants.MAGENTA));
            table2.SetCaption(d2);
            count = 0;
            foreach (var item in cashData)
            {
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PaymentDate.ToShortDateString())));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Mode.Transcation)));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PaidTo)));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.SlipNo) ? "" : item.SlipNo)));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table2.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            List<Table> dataTable = new List<Table>();
            dataTable.Add(table);
            dataTable.Add(table2);
            return PrintPDF("Expenses", dataTable, true);
        }

        private string GeneratePaymentData(bool isRefreshed = true)
        {
            if (!isRefreshed)
            {
                var fn = IsExist("Payments");
                if (fn != "ERROR")
                    return fn;
            }
            var data = db.Payments.Include(c => c.FromAccount).Where(c => c.StoreId == StoreId && c.OnDate.Date >= StartDate.Date && c.OnDate.Date <= EndDate.Date).ToList();
            float[] columnWidths = { 1, 5, 5, 5, 5, 5, 5, 5 };
            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("PartyName").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("SlipNo").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Bank").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER))
            };
            int count = 0;
            Table table = GenTable(columnWidths, HeaderCell);
            foreach (var item in data)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PartyName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.PaymentDetails) ? "" : item.PaymentSlipNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                if (item.FromAccount != null)
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.FromAccount.Account) ? "" : item.FromAccount.Account)));
                else
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            List<Table> dataTable = new List<Table>();
            dataTable.Add(table);

            return PrintPDF("Payments", dataTable, true);
        }

        private string GenerateReceiptData(bool isRefreshed = true)
        {
            if (!isRefreshed)
            {
                var fn = IsExist("Reciepts");
                if (fn != "ERROR")
                    return fn;
            }
            var data = db.Receipts.Include(c => c.FromAccount).Where(c => c.StoreId == StoreId && c.OnDate.Date >= StartDate.Date && c.OnDate.Date <= EndDate.Date).ToList();
            var cashData = db.CashReceipts.Include(c => c.Mode).Where(c => c.StoreId == StoreId && c.InwardDate.Date >= StartDate.Date && c.InwardDate.Date <= EndDate.Date).ToList();
            float[] columnWidths = { 1, 5, 15, 5, 5, 15, 10, 5 };

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("PartyName").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("SlipNo").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Bank").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER))
            };

            Div d = new Div();
            d.Add(new Paragraph("Receipts").SetFontColor(ColorConstants.MAGENTA));

            Table table = GenTable(columnWidths, HeaderCell);
            table.SetCaption(d);
            int count = 0;
            foreach (var item in data)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.OnDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PartyName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.ReceiptSlipNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.PayMode.ToString())));
                if (item.FromAccount != null && !String.IsNullOrEmpty(item.FromAccount.Account))
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.FromAccount.Account)));
                else
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }

            Table table2 = GenTable(columnWidths, HeaderCell);
            Div d2 = new Div();
            d2.Add(new Paragraph("\nCash Receipts").SetFontColor(ColorConstants.MAGENTA));
            table2.SetCaption(d2);
            count = 0;
            foreach (var item in cashData)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.InwardDate.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.ReceiptFrom)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.SlipNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Mode.Transcation)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(item.Remarks) ? "" : item.Remarks)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Amount.ToString("0.##"))));
            }
            List<Table> dataTable = new List<Table>();
            dataTable.Add(table);
            dataTable.Add(table2);
            return PrintPDF("Reciepts", dataTable, true);
        }

        private Table GenTable(float[] columnWidths, Cell[] HeaderCell)
        {
            Cell[] FooterCell = new[]
           {
                new Cell(1,4).Add(new Paragraph(ConData.CName +" / "+ConData.CAdd) .SetFontColor(DeviceGray.GRAY)),
                new Cell(1,2).Add(new Paragraph("D:"+DateTime.Now) .SetFontColor(DeviceGray.GRAY)),
            };
            Table table = new Table(UnitValue.CreatePercentArray(columnWidths)).SetBorder(new OutsetBorder(2));

            table.SetFontColor(ColorConstants.BLUE);
            table.SetFontSize(10);
            table.SetPadding(10f);
            table.SetMarginRight(5f);
            table.SetMarginTop(10f);

            foreach (Cell hfCell in HeaderCell)
            {
                table.AddHeaderCell(hfCell.SetFontColor(ColorConstants.RED).SetFontSize(12).SetItalic().SetBackgroundColor(ColorConstants.YELLOW));
            }
            foreach (Cell hfCell in FooterCell)
            {
                table.AddFooterCell(hfCell);
            }
            return table;
        }

        private string PrintPDF(string repName, List<Table> dataTable, bool IsLandscape = false)
        {
            string fileNameExp = $"FinReport_{repName}_{StartYear}_{EndYear}_{DateTime.Now.ToFileTimeUtc()}.pdf";
            string fileName = $"FinReport_{repName}_{StartYear}_{EndYear}.pdf";
            string path = Path.Combine(ConData.WWWroot, fileName);
            var PageType = PageSize.A4;
            if (IsLandscape)
                PageType = PageSize.A4.Rotate();

            using PdfWriter pdfWriter = new PdfWriter(fileName);
            using PdfDocument pdfDoc = new PdfDocument(pdfWriter);
            using Document doc = new Document(pdfDoc, PageType);
            doc.SetBorderTop(new SolidBorder(2));
            Paragraph header = new Paragraph(ConData.CName + "\n")
               .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.RED);
            header.Add(ConData.CAdd + $"\n {repName} Report\n");
            doc.Add(header);

            Paragraph info = new Paragraph($"Financial Year:\t {StartYear}-{EndYear}\n")
                .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER)
               .SetFontColor(ColorConstants.BLUE);
            doc.Add(info);

            if (dataTable != null)
                foreach (var item in dataTable)
                {
                    doc.Add(item);
                    doc.Add(new AreaBreak());
                }
            else
            {
                Paragraph nodata = new Paragraph("No Data Avilable!").SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER).SetFontColor(ColorConstants.GREEN);
                doc.Add(nodata);
            }
            doc.Close();
            pdfDoc.Close();
            pdfWriter.Close();
            return AddPageNumber(fileName, fileNameExp);
        }

        private string AddPageNumber(string sourceFileName, string fileName)
        {
            using PdfDocument pdfDoc = new PdfDocument(new PdfReader(sourceFileName), new PdfWriter(fileName));
            using Document doc = new Document(pdfDoc);

            int numberOfPages = pdfDoc.GetNumberOfPages();

            for (int i = 1; i <= numberOfPages; i++)
            {
                // Write aligned text to the specified by parameters point
                //doc.ShowTextAligned (new Paragraph ("Page " + i + " of " + numberOfPages),
                //        559, 806, i, TextAlignment.RIGHT, VerticalAlignment.TOP, 0);
                doc.ShowTextAligned(new Paragraph("Page " + i + " of " + numberOfPages).SetFontColor(ColorConstants.DARK_GRAY),
                       1, 1, i, TextAlignment.RIGHT, VerticalAlignment.BOTTOM, 0);
            }

            doc.Close();
            pdfDoc.Close();
            CleanUp(fileName);
            return fileName;
        }

        private string[] FileList()
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");

            return filePaths;
        }

        private bool CleanUp(string fileName)
        {
            string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");
            foreach (var item in filePaths)
            {
                if (item.Contains(fileName))
                { }
                else
                {
                    File.Delete(item);
                }
            }
            return true;
        }

        private string IsExist(string repName)
        {
            string fileName = $"FinReport_{repName}_{StartYear}_{EndYear}.pdf";
            if (File.Exists(fileName))
                return fileName;
            else
                return "ERROR";
        }

        /// <summary>
        /// Add Page number at top of pdf file.
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns> filename saved as</returns>
        public static string AddPageNumberToPdf(string fileName)
        {
            using PdfReader reader = new PdfReader(fileName);
            string fName = "cashBook_" + (DateTime.Now.ToFileTimeUtc() + 1001) + ".pdf";
            using PdfWriter writer = new PdfWriter(Path.Combine("wwwroot", fName));

            using PdfDocument pdfDoc2 = new PdfDocument(reader, writer);
            Document doc2 = new Document(pdfDoc2);

            int numberOfPages = pdfDoc2.GetNumberOfPages();
            for (int i = 1; i <= numberOfPages; i++)
            {
                doc2.ShowTextAligned(new Paragraph("Page " + i + " of " + numberOfPages),
                        559, 806, i, TextAlignment.RIGHT, VerticalAlignment.BOTTOM, 0);
            }
            doc2.Close();
            return fName;
        }
    }
}