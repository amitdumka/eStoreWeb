using eStore.Database;
using eStore.Reports.Pdfs;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eStore.BL.Reports.Accounts
{
    public enum ReportOutputType { PDF, Excel, Screen, Email_PDF, Email_Excel, Others }

    public enum VoucherReportType { Payment, Expenses, Receipts, CashPayment, CashReceipts }

    internal class VData
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public PaymentMode Mode { get; set; }
        public decimal Amount { get; set; }
        public string SlipNo { get; set; }
        public string PartyName { get; set; }
        public string Particulars { get; set; }
        public string Remarks { get; set; }
    }

    public class OtherReport
    {
        public string CardCashReport(eStoreDbContext db, int storeId, DateTime date)
        {
            var sale = db.DailySales.Where(c => c.StoreId == storeId && c.SaleDate.Year == date.Year && c.SaleDate.Month == date.Month)
                .Select(c => new { c.SaleDate, c.PayMode, c.InvNo, c.Amount, c.CashAmount })
                .ToList();
            var cashSale = sale.Where(c => c.PayMode == PayMode.Cash).ToList();
            var cardSale = sale.Where(c => c.PayMode == PayMode.Card).ToList();
            var nonCashSale = sale.Where(c => c.PayMode != PayMode.Cash && c.PayMode != PayMode.Card).ToList();

            float[] columnWidths = { 1, 5, 5, 1 };

            Cell[] HeaderCell = new Cell[]
            {
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Invoice No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };

            Table cashTable = PDFHelper.GenerateTable(columnWidths, HeaderCell);
            int count = 0;
            decimal cashAmount = 0;
            decimal cardAmount = 0;
            decimal nonCashAmt = 0;

            foreach (var row in cashSale)
            {
                cashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                cashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.SaleDate.ToShortDateString())));
                cashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InvNo) ? "" : row.InvNo)));
                cashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));
                cashAmount += row.Amount;
            }
            Div d1 = new Div();
            Paragraph p1 = new Paragraph($"Cash Sale List\n Total Cash Sale: {cashAmount} ");
            d1.Add(p1);
            cashTable.SetCaption(d1);

            Table cardTable = PDFHelper.GenerateTable(columnWidths, HeaderCell);
            count = 0;

            foreach (var row in cardSale)
            {
                cardTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                cardTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.SaleDate.ToShortDateString())));
                cardTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InvNo) ? "" : row.InvNo)));
                cardTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((row.Amount - row.CashAmount).ToString("0.##"))));
                cashAmount += row.CashAmount;
                cardAmount += (row.Amount - row.CashAmount);
            }
            Div d2 = new Div();
            Paragraph p2 = new Paragraph($"Card Sale List\n Total Card Sale: {cardAmount} ");
            d2.Add(p2);
            cardTable.SetCaption(d2);
            float[] columnWidths2 = { 1, 5, 5, 5, 1 };

            Cell[] HeaderCell2 = new Cell[]
            {
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Invoice No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };
            Table NonCashTable = PDFHelper.GenerateTable(columnWidths2, HeaderCell2);
            count = 0;

            foreach (var row in nonCashSale)
            {
                NonCashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                NonCashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.SaleDate.ToShortDateString())));
                NonCashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InvNo) ? "" : row.InvNo)));
                NonCashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.PayMode.ToString())));
                NonCashTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((row.Amount - row.CashAmount).ToString("0.##"))));
                cashAmount += row.CashAmount;
                nonCashAmt += (row.Amount - row.CashAmount);
            }

            Div d3 = new Div();
            Paragraph p3 = new Paragraph($"Non Cash Sale List\n Total Non Cash Sale: {nonCashAmt} ");
            d3.Add(p3);
            NonCashTable.SetCaption(d3);

            Paragraph pL = new Paragraph($"Total Cash Sale: Rs. {cashAmount}\n Card Sale: Rs. {cardAmount} \n Non Cash Sale: Rs. {nonCashAmt}");
            pL.Add($"\n Total Sale Amount: Rs. {cashAmount + cardAmount + nonCashAmt}");
            pL.SetFontColor(ColorConstants.RED).SetTextAlignment(TextAlignment.CENTER).SetItalic();
            pL.SetBorder(new SolidBorder(1));
            PdfFont font = PdfFontFactory.CreateFont(StandardFonts.COURIER_BOLDOBLIQUE);
            pL.SetFont(font).SetFontSize(14);

            List<Object> oL = new List<object>();
            oL.Add(cashTable);
            oL.Add(cardTable);
            oL.Add(NonCashTable);
            oL.Add(pL);

            return PDFHelper.CreateReportPdf("SaleReport", $"Monthly Sale Report for month of {date.Month}/ {date.Year}", oL, false);
        }

        public string GetDueReport(eStoreDbContext db, int storeId, DateTime date)
        {
            var dueList = db.DuesLists.Include(c => c.DailySale).Where(c => c.StoreId == storeId && !c.IsRecovered)
                .Select(c => new { c.Amount, c.DailySale.SaleDate, c.DailySale.InvNo, c.IsPartialRecovery, c.DuesListId })
                .ToList();

            var recovery = db.DueRecovereds.Where(c => c.StoreId == storeId && c.PaidDate.Month == date.Month && c.PaidDate.Year == date.Year)
                .Select(c => new { c.DueRecoverdId, c.AmountPaid, c.IsPartialPayment, c.PaidDate, c.DuesList.DailySale.InvNo, c.DuesList.DailySale.SaleDate, c.DuesList.Amount })
                .ToList();

            float[] columnWidths2 = { 1, 1, 5, 5, 5, 5, 5, 1 };
            float[] columnWidths = { 1, 1, 5, 5, 5, 5 };
            Cell[] HeaderCell = new Cell[]
            {
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Invoice No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Partial Recovered").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };
            Cell[] HeaderCell2 = new Cell[]
            {
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Paid Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Due Date").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Invoice No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Due Amount").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Paid Amount").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Partialy Paid").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Days").SetTextAlignment(TextAlignment.CENTER)),
            };

            Table dueTable = PDFHelper.GenerateTable(columnWidths, HeaderCell);
            Table recTable = PDFHelper.GenerateTable(columnWidths2, HeaderCell2);

            int count = 0;
            decimal dueAmount = 0;
            decimal paidAmount = 0;
            foreach (var row in dueList)
            {
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.DuesListId.ToString())));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.SaleDate.ToShortDateString())));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InvNo) ? "" : row.InvNo)));
                if (row.IsPartialRecovery)
                    dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("Yes")));
                else
                    dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(" ")));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));
                dueAmount += row.Amount;
            }
            Div d1 = new Div();
            Paragraph p1 = new Paragraph($"Due List \nTotal Due Amount: {dueAmount}");
            d1.Add(p1);
            dueTable.SetCaption(d1);
            //dueAmount = 0;

            foreach (var row in recovery)
            {
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.DueRecoverdId.ToString())));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.PaidDate.ToShortDateString())));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.SaleDate.ToShortDateString())));

                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InvNo) ? "" : row.InvNo)));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.AmountPaid.ToString("0.##"))));

                if (row.IsPartialPayment)
                    dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("Yes")));
                else
                    dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(" ")));

                var days = row.SaleDate.Subtract(row.PaidDate).TotalDays;
                dueTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(days.ToString("0.##"))));

                dueAmount += row.Amount;
                paidAmount += row.AmountPaid;
            }
            Div d2 = new Div();
            Paragraph p2 = new Paragraph($"Recovery List\nTotal Due Amount: {dueAmount}\t Total Due Recovery: {paidAmount}");
            d2.Add(p2);
            recTable.SetCaption(d2);

            List<Object> oL = new List<object>();
            oL.Add(dueTable);
            oL.Add(recTable);

            return PDFHelper.CreateReportPdf("DueReport", $"Dues Report for month of{date.Month}/{date.Year}", oL, false);
        }

        public string GetTailoringReport(eStoreDbContext db, int storeId, DateTime date)
        {
            //var tId = db.TailoringDeliveries.Select(c => c.TalioringBookingId).ToList();
            //foreach (var id in tId)
            //{
            //    var tb = db.TalioringBookings.Find(id);
            //    if (tb != null)
            //    {
            //        tb.IsDelivered = true;
            //        db.TalioringBookings.Update(tb);
            //    }

            //}
            //db.SaveChanges();

            var booking = db.TalioringBookings.Where(c => c.StoreId == storeId && c.BookingDate.Month == date.Month &&
            c.BookingDate.Year == date.Year && c.IsDelivered == false).
                Select(c => new { c.BookingDate, c.BookingSlipNo, c.CustName, c.DeliveryDate, c.TotalAmount, c.TotalQty, c.IsDelivered, c.TalioringBookingId })
                .ToList();

            var delivery = db.TailoringDeliveries.Include(c => c.Booking)
                .Where(c => c.StoreId == storeId && c.DeliveryDate.Month == date.Month && c.DeliveryDate.Year == date.Year).
                Select(c => new
                {
                    c.DeliveryDate,
                    c.Amount,
                    c.InvNo,
                    c.TalioringBookingId,
                    c.TalioringDeliveryId,
                    c.Booking.BookingDate
                ,
                    c.Booking.BookingSlipNo,
                    c.Booking.TotalAmount,
                    c.Booking.TotalQty,
                    ProposeDate = c.Booking.DeliveryDate,
                    c.Booking.CustName
                })
                .ToList();

            var BookedQty = delivery.Where(c => c.BookingDate.Year == date.Year && c.BookingDate.Month == date.Month).Sum(c => c.TotalQty);
            var BookedAmt = delivery.Where(c => c.BookingDate.Year == date.Year && c.BookingDate.Month == date.Month).Sum(c => c.TotalAmount);

            var dIdList = booking.Select(c => c.TalioringBookingId).ToList();
            var bIdList = delivery.Select(c => c.TalioringBookingId).ToList();

            float[] columnWidths = { 1, 1, 5, 5, 5, 5, 5, 5, 5, 1 };
            Cell[] HeaderCell = new Cell[]
            {
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Slip No").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Customer Name").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Total Qty").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Total Amount").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Delivery Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Inv No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Paid Amount").SetTextAlignment(TextAlignment.CENTER)),
            };

            float[] columnWidthsPendingDelivery = { 1, 1, 5, 5, 5, 1, 1, 5, 5 };
            Cell[] HeaderCellPendingDelivery = new Cell[]
            {
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Slip No").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Customer Name").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Total Qty").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Total Amount").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Delivery Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Over Due Date").SetTextAlignment(TextAlignment.CENTER)),
            };

            Table DeliveryTable = PDFHelper.GenerateTable(columnWidths, HeaderCell);
            int count = 0;
            int totalQty = 0;
            decimal totalAmt = 0;
            decimal totalBAmt = 0;
            foreach (var row in delivery)
            {
                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.TalioringBookingId.ToString() + "/" + row.TalioringDeliveryId.ToString())));
                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.BookingDate.ToShortDateString())));
                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.BookingSlipNo) ? "" : row.BookingSlipNo)));

                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.CustName) ? "" : row.CustName)));
                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.TotalQty.ToString())));
                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.TotalAmount.ToString())));

                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.DeliveryDate.ToShortDateString())));
                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InvNo) ? "" : row.InvNo)));
                DeliveryTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));

                totalAmt += row.Amount;
                totalQty += row.TotalQty;
                totalBAmt += row.TotalAmount;
            }
            Div d = new Div();
            Paragraph pDiv = new Paragraph($"Total Qty: {totalQty}\t\t Total: Amount: {totalBAmt}\t\t Total Paid Amount: {totalAmt}");
            if ((totalBAmt - totalAmt) != 0)
                pDiv.Add($"\nTotal Pending Amount: {totalBAmt - totalAmt}");
            d.Add(pDiv);
            DeliveryTable.SetCaption(d);

            Table PendingTable = PDFHelper.GenerateTable(columnWidthsPendingDelivery, HeaderCellPendingDelivery);

            count = 0;

            int qtotalQty = 0;
            decimal qtotalBAmt = 0;
            foreach (var row in booking)
            {
                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.TalioringBookingId.ToString())));
                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.BookingDate.ToShortDateString())));
                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.BookingSlipNo) ? "" : row.BookingSlipNo)));

                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.CustName) ? "" : row.CustName)));
                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.TotalQty.ToString())));
                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.TotalAmount.ToString())));

                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.DeliveryDate.ToShortDateString())));

                int days = (int)row.DeliveryDate.Subtract(DateTime.Today).TotalDays;
                PendingTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(days.ToString("0.#"))));

                qtotalQty += row.TotalQty;
                qtotalBAmt += row.TotalAmount;
            }
            Div d2 = new Div();
            Paragraph pDiv2 = new Paragraph($"Total Qty: {qtotalQty}\t\t Total: Amount: {qtotalBAmt}");
            d2.Add(pDiv2);
            PendingTable.SetCaption(d2);

            BookedQty += qtotalQty;
            BookedAmt += qtotalBAmt;
            Paragraph summary = new Paragraph();
            summary.Add($"\nTotal Booked Qty:{BookedQty}\t\t Total Booked Amount:{BookedAmt}");
            summary.Add($"\nTotal Delivered Qty:{totalQty}\t\t Total Delivered Amount:{totalAmt}");

            Paragraph pH1 = new Paragraph("Tailoring Booking Delivery Table list.\n\t\t(Includes last month booking which was delivered in current month)");
            Paragraph pH2 = new Paragraph("Tailoring Booking which are pending for delivery.");

            List<Object> oL = new List<object>();
            oL.Add(summary);
            oL.Add(pH1);
            oL.Add(DeliveryTable);
            oL.Add(pH2);
            oL.Add(PendingTable);

            return PDFHelper.CreateReportPdf("tailoringReport", $"Tailoring Report for Month of {date.Month}/{date.Year}.", oL, true);
        }

        public string GetBankingReport(eStoreDbContext db, int storeId, DateTime date)
        {
            var deposit = db.BankDeposits.Include(c => c.Account).Where(c => c.StoreId == storeId && c.OnDate.Year == date.Year && c.OnDate.Month == date.Month)
                .Select(c => new { c.Amount, c.OnDate, c.InNameOf, c.ChequeNo, c.Account.Account, c.PayMode, ID = c.BankDepositId })
                .ToList();
            var withdrawl = db.BankWithdrawals.Include(c => c.Account).Where(c => c.StoreId == storeId && c.OnDate.Year == date.Year && c.OnDate.Month == date.Month)
                .Select(c => new { c.Amount, c.OnDate, c.InNameOf, c.ChequeNo, c.Account.Account, c.PayMode, ID = c.BankWithdrawalId })
                .ToList();
            float[] columnWidths = { 1, 1, 5, 5, 5, 15, 5, 1 };
            Cell[] HeaderCell = new Cell[]
            {
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Cheque No").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Account").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Name").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),

                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };
            Paragraph pH1 = new Paragraph("Bank Deposit(s)").SetFontColor(ColorConstants.RED).SetTextAlignment(TextAlignment.CENTER);
            Paragraph pH2 = new Paragraph("Bank Withdrawals(s)").SetFontColor(ColorConstants.RED).SetTextAlignment(TextAlignment.CENTER);

            Table DepositTable = PDFHelper.GenerateTable(columnWidths, HeaderCell);
            int count = 0;
            decimal totalAmt = 0;
            foreach (var row in deposit)
            {
                DepositTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                DepositTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.ID.ToString())));
                DepositTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.OnDate.ToShortDateString())));
                DepositTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.ChequeNo) ? "" : row.ChequeNo)));

                DepositTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.Account) ? "" : row.Account)));
                DepositTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InNameOf) ? "" : row.InNameOf)));
                DepositTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.PayMode.ToString())));

                DepositTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));

                totalAmt += row.Amount;
            }
            Div d = new Div();
            Paragraph pDiv = new Paragraph($"Total Amount: {totalAmt}");
            d.Add(pDiv);
            DepositTable.SetCaption(d);

            Table WithTable = PDFHelper.GenerateTable(columnWidths, HeaderCell);
            count = 0;
            totalAmt = 0;
            foreach (var row in withdrawl)
            {
                WithTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                WithTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.ID.ToString())));
                WithTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.OnDate.ToShortDateString())));
                WithTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.ChequeNo) ? "" : row.ChequeNo)));

                WithTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.Account) ? "" : row.Account)));
                WithTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InNameOf) ? "" : row.InNameOf)));
                WithTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.PayMode.ToString())));

                WithTable.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));

                totalAmt += row.Amount;
            }

            Div d2 = new Div();
            Paragraph pDiv2 = new Paragraph($"Total Amount: {totalAmt}");
            d2.Add(pDiv2);
            WithTable.SetCaption(d2);

            List<Object> oL = new List<object>();
            oL.Add(pH1);
            oL.Add(DepositTable);
            oL.Add(pH2);
            oL.Add(WithTable);
            return PDFHelper.CreateReportPdf("BankReport", $"Bank Report for month of {date.Month}/ {date.Year}", oL, false);
        }
    }

    public class VoucherReport
    {
        // int storeId; DateTime date;

        public string GetVoucherReport(eStoreDbContext db, int storeId, VoucherReportType rType, DateTime sDate, DateTime eDate, ReportOutputType oType = 0)
        {
            List<VData> data = null;
            string ReportName = "report";
            string ReportHeading = "";
            switch (rType)
            {
                case VoucherReportType.Payment:
                    ReportName = "PaymentReport";
                    ReportHeading = $"Payment Report for period {sDate} - {eDate}.";
                    data = db.Payments.Where(c => c.StoreId == storeId && c.OnDate.Date >= sDate.Date && c.OnDate.Date <= eDate.Date).OrderBy(c => c.OnDate)
                        .Select(c => new VData
                        {
                            Id = c.PaymentId,
                            Date = c.OnDate,
                            Amount = c.Amount,
                            Mode = c.PayMode,
                            PartyName = c.PartyName,
                            Particulars = c.PaymentDetails,
                            Remarks = c.Remarks,
                            SlipNo = c.PaymentSlipNo
                        }).ToList();
                    break;

                case VoucherReportType.Expenses:
                    ReportName = "ExpensesReport";
                    ReportHeading = $"Expenses Report for period {sDate} - {eDate}.";
                    data = db.Expenses.Where(c => c.StoreId == storeId && c.OnDate.Date >= sDate.Date && c.OnDate.Date <= eDate.Date).OrderBy(c => c.OnDate)
                        .Select(c => new VData
                        {
                            Id = c.ExpenseId,
                            Date = c.OnDate,
                            Amount = c.Amount,
                            Mode = c.PayMode,
                            PartyName = c.PartyName,
                            Particulars = c.Particulars,
                            Remarks = c.Remarks,
                            SlipNo = c.PaymentDetails
                        }).ToList();
                    break;

                case VoucherReportType.Receipts:
                    ReportName = "ReceiptReport";
                    ReportHeading = $"Receipt Report for period {sDate} - {eDate}.";
                    data = db.Receipts.Where(c => c.StoreId == storeId && c.OnDate.Date >= sDate.Date && c.OnDate.Date <= eDate.Date).OrderBy(c => c.OnDate)
                        .Select(c => new VData
                        {
                            Id = c.ReceiptId,
                            Date = c.OnDate,
                            Amount = c.Amount,
                            Mode = c.PayMode,
                            PartyName = c.PartyName,
                            Particulars = c.PaymentDetails,
                            Remarks = c.Remarks,
                            SlipNo = c.ReceiptSlipNo
                        }).ToList();
                    break;

                case VoucherReportType.CashPayment:
                    ReportName = "CashPaymentReport";
                    ReportHeading = $" Cash Payment Report for period {sDate} - {eDate}.";
                    data = db.CashPayments.Include(c => c.Mode).Where(c => c.StoreId == storeId && c.PaymentDate.Date >= sDate.Date && c.PaymentDate.Date <= eDate.Date).OrderBy(c => c.PaymentDate)
                        .Select(c => new VData
                        {
                            Id = c.CashPaymentId,
                            Date = c.PaymentDate,
                            Amount = c.Amount,
                            Mode = PaymentMode.Cash,
                            PartyName = c.PaidTo,
                            Particulars = c.Mode.Transcation,
                            Remarks = c.Remarks,
                            SlipNo = c.SlipNo
                        }).ToList();
                    break;

                case VoucherReportType.CashReceipts:
                    ReportName = "CashReceiptReport";
                    ReportHeading = $"Cash Receipt Report for period {sDate} - {eDate}.";
                    data = db.CashReceipts.Include(c => c.Mode).Where(c => c.StoreId == storeId && c.InwardDate.Date >= sDate.Date && c.InwardDate.Date <= eDate.Date).OrderBy(c => c.InwardDate)
                        .Select(c => new VData
                        {
                            Id = c.CashReceiptId,
                            Date = c.InwardDate,
                            Amount = c.Amount,
                            Mode = PaymentMode.Cash,
                            PartyName = c.ReceiptFrom,
                            Particulars = c.Mode.Transcation,
                            Remarks = c.Remarks,
                            SlipNo = c.SlipNo
                        }).ToList();
                    break;

                default:
                    break;
            }
            List<Object> oL = new List<object>();
            if (data != null && data.Count > 0)
            {
                float[] columnWidths = { 1, 1, 5, 15, 15, 5, 15, 5, 1 };
                Cell[] HeaderCell = new Cell[]{
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
            }

            return PDFHelper.CreateReportPdf(ReportName, ReportHeading, oL, true);
        }

        private Table DataToTable(List<VData> rows, Table table)
        {
            int count = 0;
            decimal total = 0;
            foreach (var row in rows)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Date.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.PartyName) ? "" : row.PartyName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.Particulars) ? "" : row.Particulars)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Mode.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.Remarks) ? "" : row.Remarks)));
                if (row.SlipNo != null)

                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.SlipNo) ? "" : row.SlipNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));
                total += row.Amount;
            }
            Div d = new Div();
            PdfFont font = PdfFontFactory.CreateFont(StandardFonts.TIMES_ITALIC);
            Paragraph p = new Paragraph($"Total :{total}").SetFont(font)
                .SetTextAlignment(TextAlignment.RIGHT).SetFontColor(ColorConstants.RED);
            d.Add(p);
            table.SetCaption(d);
            return table;
        }
    }

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
            var payData = db.SalaryPayments.Where(c => c.StoreId == storeId && c.PaymentDate.Month == onDate.Month && c.PaymentDate.Year == onDate.Year).OrderBy(c => c.EmployeeId).ToList();
            var recData = db.StaffAdvanceReceipts.Where(c => c.StoreId == storeId && c.ReceiptDate.Month == onDate.Month && c.ReceiptDate.Year == onDate.Year).OrderBy(c => c.EmployeeId).ToList();

            List<Object> oL = new List<object>();
            if (payData.Count > 0 || recData.Count > 0)
            {
                var empIds = payData.Select(c => c.EmployeeId).OrderBy(c => c).Distinct().ToList();

                SortedList<int, string> emp = new SortedList<int, string>();
                var d = db.Employees.Select(c => new { c.EmployeeId, c.StaffName }).ToList();

                List<EData> eList = new List<EData>();
                decimal TotalPaidAmount = 0;
                decimal TotalRecAmount = 0;

                foreach (var id in empIds)
                {
                    EData e = new EData
                    {
                        EmpId = id,
                        StaffName = d.Where(c => c.EmployeeId == id).FirstOrDefault().StaffName,
                        Data = null
                    };

                    e.Data = payData.Where(c => c.EmployeeId == id).Select(c =>
                    new SData
                    {
                        Date = c.PaymentDate,
                        ID = c.SalaryPaymentId,
                        InAmount = 0,
                        Mode = c.PayMode,
                        OutAmount = c.Amount,
                        SlipNo = c.Details,
                        PaymentReson = c.SalaryMonth
                    }).ToList();
                    var r = recData.Where(c => c.EmployeeId == id).Select(c => new SData
                    {
                        Date = c.ReceiptDate,
                        ID = c.StaffAdvanceReceiptId,
                        InAmount = c.Amount,
                        Mode = c.PayMode,
                        OutAmount = 0,
                        PaymentReson = "Payment Recived or Adjusted ",
                        SlipNo = c.Details
                    }).ToList();

                    if (r.Count > 0)
                        e.Data.AddRange(r);
                    TotalPaidAmount += e.TotalPaid = payData.Where(c => c.EmployeeId == id).Sum(c => c.Amount);
                    TotalRecAmount += e.TotalRec = recData.Where(c => c.EmployeeId == id).Sum(c => c.Amount);
                    eList.Add(e);
                }

                // Generating PDF File
                PdfFont font = PdfFontFactory.CreateFont(StandardFonts.TIMES_ROMAN);
                float[] columnWidths = { 1, 1, 5, 15, 15, 5, 1, 1 };
                Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Slip No").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("In Amount").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Out Amount").SetTextAlignment(TextAlignment.CENTER)),
            };

                Paragraph p1 = new Paragraph($"Gross Paid: Rs. {TotalPaidAmount.ToString("0.##")}\t\t Gross Reciepts: Rs. {TotalRecAmount.ToString("0.##")}\n\n")
                    .SetTextAlignment(TextAlignment.LEFT).SetFontColor(ColorConstants.RED).SetFont(font);
                Paragraph p2 = new Paragraph("Payment/Receipts Details Staff wise List")
                    .SetFontSize(14)
                    .SetTextAlignment(TextAlignment.CENTER).SetBackgroundColor(ColorConstants.YELLOW).SetFontColor(ColorConstants.RED).SetFont(font);
                oL.Add(p1);
                oL.Add(p2);
                foreach (var item in eList)
                {
                    Paragraph p = new Paragraph($"\nID: {item.EmpId}\t\t Staff Name: {item.StaffName}\n\n").SetTextAlignment(TextAlignment.LEFT).SetFontColor(ColorConstants.BLUE).SetFont(font);
                    p.Add($"Total Paid: Rs. {item.TotalPaid.ToString("0.##")}\t\tTotal Reciepts: Rs. {item.TotalRec.ToString("0.##")}\n");
                    Table table = DataToTable(item.Data, PDFHelper.GenerateTable(columnWidths, HeaderCell));
                    oL.Add(p);
                    oL.Add(table);
                }
            }

            return PDFHelper.CreateReportPdf("MonthlySalary", $"Monthly Salary Report For {date.Month}/{date.Year}", oL, false);
        }

        public string SaleReport(eStoreDbContext db, int storeId, DateTime onDate, bool isPdf = true)
        {
            StoreId = storeId;
            PdfFont font = PdfFontFactory.CreateFont(StandardFonts.TIMES_ROMAN);
            date = onDate;
            var data = db.DailySales.Include(c => c.Salesman).Where(c => c.StoreId == storeId && c.SaleDate.Month == onDate.Month && c.SaleDate.Year == onDate.Year).
                 Select(c => new SaleTData
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
                .ToList();

            var manul = data.Where(c => c.ManualBill).ToList();
            var saleReturn = data.Where(c => c.SaleReturn).ToList();
            var onSale = data.Where(c => !c.ManualBill && !c.SaleReturn && !c.Tailoring).ToList();
            var tail = data.Where(c => c.Tailoring).ToList();

            float[] columnWidths = { 1, 1, 5, 5, 15, 5, 1, 1 };
            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("InvNo").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Salesman").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Due").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };
            List<Object> oL = new List<Object>();
            Table onSaleTable = DataToTable(onSale, columnWidths, HeaderCell);
            Table saleReturnTable = DataToTable(saleReturn, columnWidths, HeaderCell);
            Table manualSaleTable = DataToTable(manul, columnWidths, HeaderCell);
            Table tailoringTable = DataToTable(tail, columnWidths, HeaderCell);

            Paragraph p1 = new Paragraph("Sale(On Book)\n").SetTextAlignment(TextAlignment.CENTER).SetFontColor(ColorConstants.BLUE).SetFont(font);
            Paragraph p2 = new Paragraph("Sale Return List\n").SetTextAlignment(TextAlignment.CENTER).SetFontColor(ColorConstants.BLUE).SetFont(font);
            Paragraph p3 = new Paragraph("Tailoring Sale List\n").SetTextAlignment(TextAlignment.CENTER).SetFontColor(ColorConstants.BLUE).SetFont(font);
            Paragraph p4 = new Paragraph("Manual Sale List\n").SetTextAlignment(TextAlignment.CENTER).SetFontColor(ColorConstants.BLUE).SetFont(font);

            if (onSale.Count > 0)
            {
                oL.Add(p1);
                oL.Add(onSaleTable);
            }
            if (saleReturn.Count > 0)
            {
                oL.Add(p2);
                oL.Add(saleReturnTable);
            }
            if (tail.Count > 0)
            {
                oL.Add(p3);
                oL.Add(tailoringTable);
            }
            if (manul.Count > 0)
            {
                oL.Add(p4);
                oL.Add(manualSaleTable);
            }

            return PDFHelper.CreateReportPdf("MonthlySale", $"Monthly Sale Report For {date.Month}/{date.Year}", oL, false);
        }

        public string PaymentRecieptReport(eStoreDbContext db, int storeId, DateTime onDate, bool isDdf = true)
        {
            StoreId = storeId;
            date = onDate;
            var expdata = db.Expenses.Where(c => c.StoreId == storeId && c.OnDate.Month == onDate.Month && c.OnDate.Year == onDate.Year)
                .Select(c => new TData
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
                .ToList();
            var payData = db.Payments.Where(c => c.StoreId == storeId && c.OnDate.Month == onDate.Month && c.OnDate.Year == onDate.Year)
                .Select(c => new TData
                {
                    SlipNo = c.PaymentSlipNo,
                    Amount = c.Amount,
                    Date = c.OnDate,
                    Id = c.PaymentId,
                    Remarks = c.Remarks,
                    PName = c.PartyName,
                    Mode = c.PayMode,
                    Particulars = c.PaymentDetails
                }).ToList();
            var cashPayData = db.CashPayments.Include(c => c.Mode).Where(c => c.StoreId == storeId && c.PaymentDate.Month == onDate.Month && c.PaymentDate.Year == onDate.Year)
                 .Select(c => new TData
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
                .ToList();
            var recptData = db.Receipts.Where(c => c.StoreId == storeId && c.OnDate.Month == onDate.Month && c.OnDate.Year == onDate.Year)
                .Select(c => new TData
                {
                    SlipNo = c.ReceiptSlipNo,
                    Amount = c.Amount,
                    Date = c.OnDate,
                    Id = c.ReceiptId,
                    Remarks = c.Remarks,
                    PName = c.PartyName,
                    Mode = c.PayMode,
                    Particulars = c.PaymentDetails
                })
                .ToList();
            var cashRecptData = db.CashReceipts.Include(c => c.Mode).Where(c => c.StoreId == storeId && c.InwardDate.Month == onDate.Month && c.InwardDate.Year == onDate.Year)
                .Select(c => new TData
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
                .ToList();

            float[] columnWidthsCol8 = { 1, 1, 5, 15, 15, 5, 15, 1 };
            Cell[] HeaderCellExpenses = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("ID")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Date").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Party Name").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Particulars").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Mode").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Remarks").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Amount").SetTextAlignment(TextAlignment.CENTER)),
            };

            float[] columnWidthsCol9 = { 1, 1, 5, 15, 15, 5, 15, 5, 1 };
            Cell[] HeaderCellPayment = new Cell[]{
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

            Table expTable = DataToTable(expdata, PDFHelper.GenerateTable(columnWidthsCol8, HeaderCellExpenses));
            Table payTable = DataToTable(payData, PDFHelper.GenerateTable(columnWidthsCol9, HeaderCellPayment));
            Table recptTable = DataToTable(recptData, PDFHelper.GenerateTable(columnWidthsCol9, HeaderCellPayment));
            Table cashPaymentTable = DataToTable(cashPayData, PDFHelper.GenerateTable(columnWidthsCol9, HeaderCellPayment));
            Table cashRecptTable = DataToTable(cashRecptData, PDFHelper.GenerateTable(columnWidthsCol9, HeaderCellPayment));
            List<Paragraph> pList = new List<Paragraph>();
            List<Object> oL = new List<Object>();
            Paragraph p1 = new Paragraph("Expenses List");
            Paragraph p2 = new Paragraph("Cash Payments/Expenses List");
            Paragraph p3 = new Paragraph("Payments List");
            Paragraph p4 = new Paragraph("Reciepts List");
            Paragraph p5 = new Paragraph("Cash Reciepts List");

            if (expdata.Count > 0)
            {
                oL.Add(p1);
                oL.Add(expTable);
            }
            if (cashPayData.Count > 0)
            {
                oL.Add(p2);
                oL.Add(cashPaymentTable);
            }
            if (payData.Count > 0)
            {
                oL.Add(p3);
                oL.Add(payTable);
            }
            if (recptData.Count > 0)
            {
                oL.Add(p4);
                oL.Add(recptTable);
            }
            if (cashRecptData.Count > 0)
            {
                oL.Add(p5);
                oL.Add(cashRecptTable);
            }

            return PDFHelper.CreateReportPdf("PaymentReciept", $"Payments, Expenses and Receipts For {date.Month}/{date.Year}", oL, true);
        }

        private Table DataToTable(List<SData> rows, Table table)
        {
            int count = 0;
            foreach (var row in rows)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.ID.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Date.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.SlipNo) ? "" : row.SlipNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.PaymentReson) ? "" : row.PaymentReson)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Mode.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.InAmount.ToString("0.##"))));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.OutAmount.ToString("0.##"))));
            }
            return table;
        }

        private Table DataToTable(List<TData> rows, Table table)
        {
            int count = 0;
            decimal total = 0;
            foreach (var row in rows)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Date.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.PName) ? "" : row.PName)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.Particulars) ? "" : row.Particulars)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Mode.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.Remarks) ? "" : row.Remarks)));
                if (row.SlipNo != null)

                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.SlipNo) ? "" : row.SlipNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));
                total += row.Amount;
            }
            Div d = new Div();
            PdfFont font = PdfFontFactory.CreateFont(StandardFonts.TIMES_ITALIC);
            Paragraph p = new Paragraph($"Total :{total}").SetFont(font)
                .SetTextAlignment(TextAlignment.RIGHT).SetFontColor(ColorConstants.BLUE);
            d.Add(p);
            table.SetCaption(d);
            return table;
        }

        private Table DataToTable(List<SaleTData> rows, float[] columnWidths, Cell[] HeaderCell)
        {
            Table table = PDFHelper.GenerateTable(columnWidths, HeaderCell);
            int count = 0;
            decimal total = 0;

            foreach (var row in rows)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Id.ToString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Date.ToShortDateString())));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.InvNo) ? "" : row.InvNo)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(String.IsNullOrEmpty(row.Salesman) ? "" : row.Salesman)));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Mode.ToString())));
                if (row.IsDue)
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("Due").SetFontColor(ColorConstants.RED)));
                else
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph("Paid")));
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(row.Amount.ToString("0.##"))));
                total += row.Amount;
            }
            Div d = new Div();
            Paragraph p = new Paragraph($"Total Amount: {total}");
            d.Add(p);
            table.SetCaption(d);
            return table;
        }
    }

    internal class TableRow
    {
        public List<TableCol> Rows { get; set; }

        private Table DataToTable(TableRow rows, Table table)
        {
            int count = 0;
            foreach (var row in rows.Rows)
            {
                table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                foreach (var col in row.Cols)
                {
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER)
                        .Add(new Paragraph(String.IsNullOrEmpty(col) ? "" : col)));
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