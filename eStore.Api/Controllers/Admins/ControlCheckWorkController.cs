using eStore.Database;
using eStore.Shared.Models.Sales;
using eStore.Shared.Models.Tailoring;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace eStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ControlCheckWorkController : ControllerBase
    {
        private readonly eStoreDbContext db;

        public ControlCheckWorkController(eStoreDbContext con)
        {
            db = con;
        }

        [HttpGet("tailoringCheck")]
        public ActionResult<TailoringCheck> GetTailoringCheck(string requestData)
        {
            Console.WriteLine(requestData);
            RData rData = JsonSerializer.Deserialize<RData>(requestData);

            if (rData == null)
            {
                Console.WriteLine("Rdata is null");
            }

            int storeId = rData.storeId;

            var booking = db.TalioringBookings.Where(c => c.StoreId == storeId && !c.IsDelivered)
                .Select(c => new { c.BookingDate, c.BookingSlipNo, c.CustName, c.DeliveryDate, c.TotalAmount, c.TotalQty, c.IsDelivered })
                .OrderBy(c => c.BookingDate)
                .ToList();
            var deliver = db.TailoringDeliveries.Include(c => c.Booking).Where(c => c.StoreId == storeId)
                .Select(c => new
                {
                    c.Amount,
                    c.DeliveryDate,
                    c.InvNo,
                    ProposeDate = c.Booking.DeliveryDate,
                    c.Booking.TotalAmount,
                    c.Booking.IsDelivered,
                    c.TalioringDeliveryId,
                    c.TalioringBookingId,
                    c.Booking.BookingDate,
                    c.Booking.BookingSlipNo
                }).OrderBy(c => c.BookingDate)
                .ToList();

            SortedDictionary<int, string> InvErrorList = new SortedDictionary<int, string>();

            int ctr = 0;
            bool isO = false;

            foreach (var del in deliver)
            {
                isO = false;

                if (!del.IsDelivered)
                {
                    var b = db.TalioringBookings.Find(del.TalioringBookingId);
                    b.IsDelivered = true;
                    db.TalioringBookings.Update(b);
                }

                string msg = $"#{del.InvNo}#{del.TalioringBookingId}#{del.BookingSlipNo}#{del.BookingDate}#{del.DeliveryDate}#{del.TalioringDeliveryId}#{del.ProposeDate}#{del.Amount}#{del.TotalAmount}#;";
                var ds = db.DailySales.Where(c => c.InvNo.ToLower().Contains(del.InvNo.ToLower()) && c.IsTailoringBill).FirstOrDefault();

                if (del.Amount != del.TotalAmount)
                {
                    isO = true;
                    msg += "\tDelivery and Booking amount not matching;";
                }

                if (rData.delivery && del.ProposeDate.Date != del.DeliveryDate.Date)
                {
                    isO = true;
                    msg += "\tPropose date and delivery date is not matching;";

                    int Days = (int)del.DeliveryDate.Subtract(del.ProposeDate).TotalDays;
                    int DaysInTotal = (int)del.DeliveryDate.Subtract(del.BookingDate).TotalDays;

                    if (Days > 0)
                        msg += $"\tLate delivery , Late by {Days} days;";
                    else if (Days < 0)
                        msg += $"\tEarly delivery , Early by {Days} days;";

                    msg += $"\tDelivery is done in {DaysInTotal} days from Booking;";
                }

                if (ds != null)
                {
                    if (ds.SaleDate.Date != del.DeliveryDate.Date)
                    {
                        isO = true;
                        msg += "\tDates are not matching;";
                    }
                    if (ds.Amount != del.Amount)
                    {
                        msg += "\tDelivery and sale amount not matching;";
                        isO = true;
                    }
                    if (isO)
                        InvErrorList.Add(ctr, msg);
                }
                else
                {
                    msg += $"\tInvoice No {del.InvNo} not found in Daily Sale list;";
                    InvErrorList.Add(ctr, msg);
                }

                ctr++;
            }
            int noOfDelivery = db.SaveChanges();
            //Veryify Delivery check

            TailoringCheck tc = new TailoringCheck { NoOfDelivery = noOfDelivery, InvErrorList = InvErrorList, Data = rData };
            return tc;
        }

        [HttpGet("tailoringError")]
        public ActionResult<TailoringCheck> GetTailoringCheck2(string requestData)
        {
            RData rData = JsonSerializer.Deserialize<RData>(requestData);
            if (rData == null)
            {
                Console.WriteLine("Rdata is null");
            }
            int storeId = rData.storeId;
            var deliver = db.TailoringDeliveries.Include(c => c.Booking).Where(c => c.StoreId == storeId)
                .Select(c => new
                {
                    c.Amount,
                    c.DeliveryDate,
                    c.InvNo,
                    ProposeDate = c.Booking.DeliveryDate,
                    c.Booking.TotalAmount,
                    c.Booking.IsDelivered,
                    c.TalioringDeliveryId,
                    c.TalioringBookingId,
                    c.Booking.BookingDate,
                    c.Booking.BookingSlipNo,
                    c.Booking.CustName
                }).OrderBy(c => c.BookingDate)
                .ToList();
            int ctr = 0;
            bool isO = false;
            List<TailoringError> ErrorList = new List<TailoringError>();
            foreach (var del in deliver)
            {
                isO = false;

                if (!del.IsDelivered)
                {
                    var b = db.TalioringBookings.Find(del.TalioringBookingId);
                    b.IsDelivered = true;
                    db.TalioringBookings.Update(b);
                }
                var ds = db.DailySales.Where(c => c.InvNo.ToLower().Contains(del.InvNo.ToLower()) && c.IsTailoringBill).FirstOrDefault();
                TailoringError error = new TailoringError
                {
                    InvNo = del.InvNo,
                    BookingId = del.TalioringBookingId,
                    BookingSlip = del.BookingSlipNo,
                    BookingDate = del.BookingDate,
                    BookingAmount = del.TotalAmount,
                    DeliverAmount = del.Amount,
                    DeliveryDate = del.DeliveryDate,
                    DeliveryId = del.TalioringDeliveryId,
                    ProposeDate = del.ProposeDate,
                    CustName = del.CustName
                };
                if (del.Amount != del.TotalAmount)
                {
                    isO = true;
                    error.deliveryAmtError = true;
                }

                if (rData.delivery && del.ProposeDate.Date != del.DeliveryDate.Date)
                {
                    isO = true;
                    error.lateDelivery = true;
                    int Days = (int)del.DeliveryDate.Subtract(del.ProposeDate).TotalDays;
                    int DaysInTotal = (int)del.DeliveryDate.Subtract(del.BookingDate).TotalDays;
                    if (Days > 0)
                        error.msg = $"Late by {Days} days;";
                    else if (Days < 0)
                        error.msg = $"Early by {Days} days;";
                }

                if (ds != null)
                {
                    error.SaleAmount = ds.Amount;
                    error.SaleDate = ds.SaleDate;

                    if (ds.SaleDate.Date != del.DeliveryDate.Date)
                    {
                        isO = true;
                        // msg += "\tDates are not matching;";
                        error.saleDateError = true;
                    }
                    if (ds.Amount != del.Amount || ds.Amount != del.TotalAmount)
                    {
                        error.saleAmtError = true;
                        //msg += "\tDelivery and sale amount not matching;";
                        isO = true;
                    }
                }
                else
                {
                    isO = true;
                    error.invNotFound = true;
                }
                if (isO)
                    ErrorList.Add(error);
                ctr++;
            }
            int noOfDelivery = db.SaveChanges();

            TailoringCheck tc = new TailoringCheck { NoOfDelivery = noOfDelivery, ErrorList = ErrorList.ToList(), InvErrorList = null, Data = rData };
            Console.WriteLine("count:" + tc.ErrorList.Count);
            Console.WriteLine(tc.ErrorList[0].CustName);
            return tc;
        }

        [HttpGet("invCheck")]
        public ActionResult<DuplicateInvCheck> GetDuplicateBillCheck(int storeId)
        {
            var dupInv = db.DailySales.Where(c => c.StoreId == storeId).GroupBy(c => c.InvNo).Where(c => c.Count() > 1).Select(c => c.Key).ToList();
            List<DailySale> dupSale = new List<DailySale>();
            bool isOK = dupInv.Count <= 0 ? true : false;
            if (!isOK)
            {
                foreach (var item in dupInv)
                {
                    var d = db.DailySales.Where(c => c.InvNo == item).ToList();
                    if (d != null)
                        dupSale.AddRange(d);
                }
            }

            return new DuplicateInvCheck { DupInv = dupInv, IsOk = isOK, InvList = dupSale };
        }

        [HttpGet("attendanceCheck")]
        public void GetAttendanceCheck(int storeId)
        {
            // Need extendsive check and marking as final also.
        }

        [HttpGet("slipNumberCheck")]
        public void GetSlipNumbering(int storeId)
        {
        }

        [HttpGet("UpperCaseInvoice")]
        public ActionResult<int> UpdateInvoice(int storeId)
        {
            int[] years = { 2021, 2020, 2019 };
            int ctr = 0;

            foreach (var year in years)
            {
                for (int i = 1; i <= 12; i++)
                {
                    var data = db.DailySales.Where(c => c.StoreId == storeId && c.SaleDate.Month == i && c.SaleDate.Year == year).ToList();
                    foreach (var sd in data)
                    {
                        sd.InvNo = sd.InvNo.ToUpper().Trim();
                        if (!string.IsNullOrEmpty(sd.Remarks))
                            sd.Remarks = sd.Remarks.ToUpper().Trim();
                        db.DailySales.Update(sd);
                    }

                    ctr += db.SaveChanges();
                }
            }
            return ctr;
        }

        [HttpGet("UpperCaseTailoring")]
        public ActionResult<int> UpdateTailoring(int storeId)
        {
            int[] years = { 2021, 2020, 2019 };
            int ctr = 0;

            foreach (var year in years)
            {
                for (int i = 1; i <= 12; i++)
                {
                    var data = db.TalioringBookings.Where(c => c.StoreId == storeId && c.BookingDate.Month == i && c.BookingDate.Year == year).ToList();
                    foreach (var sd in data)
                    {
                        sd.BookingSlipNo = sd.BookingSlipNo.ToUpper().Trim();

                        db.TalioringBookings.Update(sd);
                    }
                    ctr += db.SaveChanges();
                    var data2 = db.TailoringDeliveries.Where(c => c.StoreId == storeId && c.DeliveryDate.Month == i && c.DeliveryDate.Year == year).ToList();
                    foreach (var sd in data2)
                    {
                        sd.InvNo = sd.InvNo.ToUpper().Trim();

                        db.TailoringDeliveries.Update(sd);
                    }
                    ctr += db.SaveChanges();
                }
            }
            return ctr;
        }

        [HttpGet("UpperCaseVoucher")]
        public ActionResult<int> UpdateVoucher(int storeId)
        {
            int[] years = { 2021, 2020, 2019 };
            int ctr = 0;

            foreach (var year in years)
            {
                for (int i = 1; i <= 12; i++)
                {
                    var data = db.Payments.Where(c => c.StoreId == storeId && c.OnDate.Month == i && c.OnDate.Year == year).ToList();
                    foreach (var sd in data)
                    {
                        if (!string.IsNullOrEmpty(sd.PaymentSlipNo))
                        {
                            sd.PaymentSlipNo = sd.PaymentSlipNo.ToUpper().Trim();
                            db.Payments.Update(sd);
                        }
                    }
                    var data2 = db.CashPayments.Where(c => c.StoreId == storeId && c.PaymentDate.Month == i && c.PaymentDate.Year == year).ToList();
                    foreach (var sd in data2)
                    {
                        if (!string.IsNullOrEmpty(sd.SlipNo))
                        {
                            sd.SlipNo = sd.SlipNo.ToUpper().Trim();
                            db.CashPayments.Update(sd);
                        }
                    }
                    var data3 = db.Receipts.Where(c => c.StoreId == storeId && c.OnDate.Month == i && c.OnDate.Year == year).ToList();
                    foreach (var sd in data3)
                    {
                        if (!string.IsNullOrEmpty(sd.ReceiptSlipNo))
                        {
                            sd.ReceiptSlipNo = sd.ReceiptSlipNo.ToUpper().Trim();
                            db.Receipts.Update(sd);
                        }
                    }
                    var data4 = db.CashReceipts.Where(c => c.StoreId == storeId && c.InwardDate.Month == i && c.InwardDate.Year == year).ToList();
                    foreach (var sd in data4)
                    {
                        if (!string.IsNullOrEmpty(sd.SlipNo))
                        {
                            sd.SlipNo = sd.SlipNo.ToUpper().Trim();
                            db.CashReceipts.Update(sd);
                        }
                    }

                    ctr += db.SaveChanges();
                }
            }
            return ctr;
        }

        [HttpGet("slipCheck")]
        public ActionResult<TDupCheck> GetTailoringDuplicateCheck(int StoreId)
        {
            var data = db.TalioringBookings.Where(c => c.StoreId == StoreId)
                .OrderBy(c => c.BookingDate)
                .ToList();

            var slipList = data.Select(c => c.BookingSlipNo).GroupBy(c => c).Where(c => c.Count() > 1).Select(c => c.Key).ToList();

            var filter2 = data.Select(c => new TDupData
            {
                OnDate = c.BookingDate,
                Id = c.TalioringBookingId,
                SlipNo = c.BookingSlipNo,
                Amount = c.TotalAmount,
                Qty = c.TotalQty,
                CustName = c.CustName
                ,
                SlipNos = Regex.Split(c.BookingSlipNo, @"\D+")
            }).OrderBy(c => c.OnDate).ToList();

            var dupDel = db.TailoringDeliveries.Where(c => c.StoreId == StoreId).GroupBy(c => c.TalioringBookingId).Where(c => c.Count() > 1).Select(c => c.Key).ToList();

            List<TalioringDelivery> duplicateDelivery = new List<TalioringDelivery>();
            foreach (var item in dupDel)
            {
                var d = db.TailoringDeliveries.Include(c => c.Booking).Where(c => c.TalioringBookingId == item).ToList();

                duplicateDelivery.AddRange(d);
            }
            TDupCheck check = new TDupCheck { Data = filter2, Duplicates = slipList, DuplicateDelivery = duplicateDelivery };
            if (slipList.Count > 0)
                check.IsDuplicate = true;
            else
                check.IsDuplicate = false;
            return check;
        }

        [HttpGet("invLists")]
        public SDataList GetSaleLists(int StoreId)
        {
            var tData = db.DailySales.Where(c => c.StoreId == StoreId && c.IsTailoringBill)
                .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount, ID = c.DailySaleId })
                .ToList();
            var mData = db.DailySales.Where(c => c.StoreId == StoreId && c.IsManualBill)
               .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount, ID = c.DailySaleId })
               .ToList();
            var sData = db.DailySales.Where(c => c.StoreId == StoreId && !c.IsManualBill && c.IsTailoringBill && !c.IsSaleReturn)
              .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount, ID = c.DailySaleId })
              .ToList();
            var srData = db.DailySales.Where(c => c.StoreId == StoreId && c.IsSaleReturn)
              .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount, ID = c.DailySaleId })
              .ToList();
            var dData = db.DailySales.Where(c => c.StoreId == StoreId && c.IsDue)
              .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount, ID = c.DailySaleId })
              .ToList();

            SDataList list = new SDataList { Tailoring = tData, Due = dData, Manual = mData, Regular = sData, SaleReturn = srData };
            return list;
        }

        [HttpGet("removeDuplicateBooking")]
        public ActionResult<string> GetTailoringDuplicateDelete(int StoreId)
        {
            int count = 0;
            int tI = 0;
            var slipList = db.TalioringBookings.Where(c => c.StoreId == StoreId).Select(c => c.BookingSlipNo).GroupBy(c => c).Where(c => c.Count() > 1).Select(c => c.Key).ToList();

            foreach (var item in slipList)
            {
                var tb = db.TalioringBookings.Where(c => c.StoreId == StoreId && c.BookingSlipNo == item).ToList();
                if (tb != null && tb.Count > 1)
                {
                    bool flag = false;
                    if (tb[0].CustName.ToLower().Trim() != tb[1].CustName.ToLower().Trim())
                        flag = true;
                    if (tb[0].TotalAmount != tb[1].TotalAmount)
                        flag = true;
                    if (tb[0].TotalQty != tb[1].TotalQty)
                        flag = true;
                    if (tb[0].BookingDate.Date != tb[1].BookingDate.Date)
                        flag = true;

                    if (!flag)
                    {
                        db.TalioringBookings.Remove(tb[1]);
                    }
                    else
                        tI++;
                }
            }
            count = db.SaveChanges();
            string r = $"Total Count:{slipList.Count}\t Removed:{count}\t Ignored:{tI}";
            return r;
        }

        [HttpGet("MarkDelivery")]
        public string GetMarkDelivery(int storeId)
        {
            int addCount = 0, MarkedCount = 0, Ignored = 0;
            var data = db.TalioringBookings.Where(c => c.StoreId == storeId && !c.IsDelivered).ToList();
            foreach (var item in data)
            {
                var td = db.TailoringDeliveries.Where(c => c.StoreId == storeId && c.TalioringBookingId == item.TalioringBookingId).FirstOrDefault();
                if (td != null)
                {
                    item.IsDelivered = true;
                    db.TalioringBookings.Update(item);
                    MarkedCount++;
                }
                else
                {
                    var ds = db.DailySales.Where(c => c.StoreId == storeId && c.IsTailoringBill && c.Remarks.ToLower().Contains(item.BookingSlipNo.ToLower().Trim())).FirstOrDefault();
                    if (ds != null)
                    {
                        TalioringDelivery del = new TalioringDelivery
                        {
                            TalioringBookingId = item.TalioringBookingId,
                            Amount = ds.Amount,
                            DeliveryDate = ds.SaleDate,
                            EntryStatus = 0,
                            InvNo = ds.InvNo,
                            IsReadOnly = true,
                            StoreId = storeId,
                            Remarks = $"Auto Added By System on {DateTime.Now}",
                            UserId = "AutoAdmin"
                        };
                        db.TailoringDeliveries.Add(del);
                        item.IsDelivered = true;
                        db.TalioringBookings.Update(item);
                        addCount++;
                    }
                    else
                        Ignored++;
                }
            }
            int ctr = db.SaveChanges();
            string r = $"TotalCount:{data.Count}\t MarkedCount: {MarkedCount}\t Added:{addCount}\t Ignored:{Ignored}\t Saved:{ctr}";
            return r;
        }

        [HttpGet("DelVer")]
        public int GetDelVerify(int storeId)
        {
            var data = db.TailoringDeliveries.Include(c => c.Booking).Where(c => c.StoreId == storeId && c.Booking.IsDelivered == false).ToList();

            if (data != null)
                return data.Count();
            else
                return -1;
        }

        [HttpGet("DupDelivery")]
        public ActionResult<List<int>> GetDuplicateBooking(int storeId)
        {
            var d2 = db.TailoringDeliveries.Where(c => c.StoreId == storeId).GroupBy(c => c.TalioringBookingId).Where(c => c.Count() > 1).Select(c => c.Key).ToList();
            return d2.ToList();
        }

        [HttpGet("BookingWithSale")]
        public List<string> GetBookingWithDailySale(int storeId)
        {
            var data = db.DailySales.Where(c => c.StoreId == storeId && c.IsTailoringBill)
                .Select(c => new { c.InvNo, c.SaleDate, c.Amount, Remarks = c.Remarks.Trim().ToLower() }).ToList();

            var booking = db.TalioringBookings.Where(c => c.StoreId == storeId)
                .Select(c => new { BookingSlipNo = c.BookingSlipNo.ToLower(), c.TalioringBookingId, c.TotalAmount, c.IsDelivered, })
                .ToList();

            List<string> NotFound = new List<string>();
            int found = 0;
            if (booking != null && data != null)
                foreach (var item in booking)
                {
                    var ds = data.Where(c => c.Remarks.Contains(item.BookingSlipNo.Trim())).FirstOrDefault();
                    if (ds == null)

                        NotFound.Add(item.BookingSlipNo);
                    else
                        found++;
                }

            NotFound.Add($"Store Id: {storeId}Total Booking:{booking.Count}\t Total Sale:{data.Count}\t Not Found: {NotFound.Count - 1}\t Found:{found}");
            return NotFound;
        }

        [HttpGet("dueAdd")]
        public ActionResult<string> GetDueList()
        {
            var data = db.DailySales.Where(c => c.IsDue).ToList();
            foreach (var item in data)
            {
                var ds2 = db.DuesLists.Where(c => c.DailySaleId == item.DailySaleId).FirstOrDefault();
                if (ds2 == null)

                {
                    DuesList dues = new DuesList
                    {
                        Amount = item.Amount - item.CashAmount,
                        DailySaleId = item.DailySaleId,
                        IsPartialRecovery = false,
                        IsRecovered = false,
                        StoreId = item.StoreId,
                        UserId = "AutoAdmin"
                    };
                    db.DuesLists.Add(dues);
                }
            }

            var ds = db.DuesLists.GroupBy(c => c.DailySaleId).Where(c => c.Count() > 1).Select(c => c.Key).ToList();
            int ctr = db.SaveChanges();

            string r = $"Save: {ctr}, dup: {ds.Count}";
            return r;
        }

        [HttpGet("voyMatch")]
        public List<string> GetVerifyDailySaleWithVoy()
        {
            DateTime startDate = new DateTime(2019, 12, 1);
            var voy = db.VoySaleInvoiceSums.Where(c => c.InvoiceDate.Date >= startDate)
                .Select(c => new { c.InvoiceDate, c.InvoiceNo, c.BillAmt, c.InvoiceType, c.PaymentMode })
                .ToList();

            var dailysale = db.DailySales.Where(c => c.SaleDate.Date >= startDate && !c.IsManualBill).
                Select(c => new { c.DailySaleId, c.InvNo, c.SaleDate, c.Amount, c.PayMode, c.Remarks, c.UserId, c.IsMatchedWithVOy }).ToList();

            List<string> msg = new List<string>();
            msg.Add($"Total voy:{voy.Count}\t DailySale:{dailysale.Count}");
            if (voy != null && dailysale != null && voy.Count > 0 && dailysale.Count > 0)
                foreach (var item in voy)
                {
                    var sale = dailysale.Where(c => c.InvNo == item.InvoiceNo).FirstOrDefault();
                    if (sale != null)
                    {
                        string m = $"InvNo:{item.InvoiceNo}\t";
                        bool f = false;
                        if (sale.Amount != item.BillAmt)
                        { m += "Bill Amount not Matched"; f = true; }
                        if (sale.SaleDate.Date != item.InvoiceDate.Date)
                        {
                            m += "Date not matching";
                            f = true;
                        }
                        if (f)
                            msg.Add($"SaleId:{sale.DailySaleId}\t{m}");
                    }
                    else
                        msg.Add($"Invoice No : {item.InvoiceNo} dated {item.InvoiceDate} not found\n");
                }

            return msg;
        }

        [HttpGet("VerBook")]
        public SortedDictionary<string, string> GetVerifyDailySaleWithBooling(int storeId)
        {
            var data = db.DailySales.Where(c => c.StoreId == storeId && c.IsTailoringBill).Select(c => c.InvNo.ToUpper().Trim()).ToList();
            var booking = db.TalioringBookings.Where(c => c.StoreId == storeId).Select(c => new { c.TalioringBookingId, c.BookingSlipNo, c.IsDelivered }).ToList();
            SortedDictionary<string, string> error = new SortedDictionary<string, string>();
            foreach (var item in data)
            {
                var b = booking.Where(c => c.BookingSlipNo.Contains(item)).FirstOrDefault();

                if (b != null && !b.IsDelivered)

                    error.Add(item, $"Id:{b.TalioringBookingId}\t Slip:{b.BookingSlipNo}, \t No Delivery");
                else
                    error.Add(item, $"Inv:{item},\t Booking/Deliver Missing");
            }
            return error;
        }
    }

    public class SDataList
    {
        public List<SData> Tailoring { get; set; }
        public List<SData> Manual { get; set; }
        public List<SData> Regular { get; set; }
        public List<SData> SaleReturn { get; set; }
        public List<SData> Due { get; set; }
    }

    public class SData
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public string InvNo { get; set; }
        public decimal Amount { get; set; }
    }

    public class TDupCheck
    {
        public bool IsDuplicate { get; set; }
        public List<TDupData> Data { get; set; }
        public List<string> Duplicates { get; set; }
        public List<TalioringDelivery> DuplicateDelivery { get; set; }
    }

    public class TDupData
    {
        public int Id { get; set; }
        public DateTime OnDate { get; set; }
        public string SlipNo { get; set; }
        public decimal Amount { get; set; }
        public int Qty { get; set; }
        public string CustName { get; set; }
        public string[] SlipNos { get; set; }
    }

    public class RData
    { public int storeId { get; set; } public bool delivery { get; set; } }

    public class DuplicateInvCheck
    {
        public bool IsOk { get; set; }
        public List<string> DupInv { get; set; }
        public List<DailySale> InvList { get; set; }
    }

    public class TailoringCheck
    {
        public int NoOfDelivery { get; set; }
        public SortedDictionary<int, string> InvErrorList { get; set; }
        public List<TailoringError> ErrorList { get; set; }
        public RData Data { get; set; }
    }

    public class TailoringError
    {
        public int BookingId { get; set; }
        public int DeliveryId { get; set; }
        public int SaleId { get; set; }
        public string BookingSlip { get; set; }
        public string InvNo { get; set; }
        public string msg { get; set; }
        public string CustName { get; set; }
        public decimal BookingAmount { get; set; }
        public decimal DeliverAmount { get; set; }
        public decimal SaleAmount { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime ProposeDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public DateTime SaleDate { get; set; }
        public bool lateDelivery { get; set; }
        public bool saleDateError { get; set; }
        public bool deliveryAmtError { get; set; }
        public bool saleAmtError { get; set; }
        public bool invNotFound { get; set; }
    }
}