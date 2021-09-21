using eStore.Database;
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

            TailoringCheck tc = new TailoringCheck { NoOfDelivery = noOfDelivery, InvErrorList = InvErrorList, RData = requestData, Data = rData };
            return tc;
        }

        [HttpGet("invCheck")]
        public ActionResult<DuplicateInvCheck> GetDuplicateBillCheck(int storeId)
        {
            var data = db.DailySales.Where(c => c.StoreId == storeId)
                .Select(c => new { c.DailySaleId, c.InvNo, c.Amount })
                .ToList();

            bool isOk = false;
            var invList = data.Select(c => c.InvNo).OrderBy(c => c).ToList();
            var unq = invList.Distinct().ToList();
            if (invList.Count != unq.Count)
            {
                foreach (var item in unq)
                    invList.Remove(item);
            }
            else
            {
                isOk = true;
                // No Duplicate record
            }

            return new DuplicateInvCheck { DupInv = invList, IsOk = isOk };
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
                        if (!string.IsNullOrEmpty(sd.RecieptSlipNo))
                        {
                            sd.RecieptSlipNo = sd.RecieptSlipNo.ToUpper().Trim();
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

            //var filter1 = data.Where(c => c.BookingSlipNo.StartsWith("ARD0")).ToList();

            //if (filter1.Count > 0)
            //{
            //    foreach (var tb in filter1)
            //    {

            //        tb.BookingSlipNo = tb.BookingSlipNo.Replace("ARD0", "ARDT0");
            //        db.TalioringBookings.Update(tb);
            //    }
            //    db.SaveChanges();

            //    data = db.TalioringBookings.Where(c => c.StoreId == StoreId && c.BookingDate.Date >= new DateTime(2020, 8, 5)).OrderBy(c => c.BookingDate).ToList();
            //}

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

            var del = db.TailoringDeliveries.Where (c => c.StoreId == StoreId).ToList ();
            foreach ( var it in del )
            {
                it.InvNo = it.InvNo.Trim ().Replace (" ", "");
                db.TailoringDeliveries.Update (it);
            }
            db.SaveChanges ();

            TDupCheck check = new TDupCheck { Data = filter2, Duplicates = slipList };
            if (slipList.Count > 0) check.IsDuplicate = true; else check.IsDuplicate = false;
            return check;



        }

        [HttpGet("invLists")]
        public SDataList GetSaleLists(int StoreId)
        {
            var tData = db.DailySales.Where(c => c.StoreId == StoreId && c.IsTailoringBill)
                .Select(c=>new SData{Date=c.SaleDate, InvNo=c.InvNo,Amount=c.Amount })
                .ToList();
            var mData = db.DailySales.Where(c => c.StoreId == StoreId && c.IsManualBill)
               .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount })
               .ToList();
            var sData = db.DailySales.Where(c => c.StoreId == StoreId && !c.IsManualBill && c.IsTailoringBill && !c.IsSaleReturn)
              .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount })
              .ToList();
            var srData = db.DailySales.Where(c => c.StoreId == StoreId && c.IsSaleReturn)
              .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount })
              .ToList();
            var dData = db.DailySales.Where(c => c.StoreId == StoreId && c.IsDue)
              .Select(c => new SData { Date = c.SaleDate, InvNo = c.InvNo, Amount = c.Amount })
              .ToList();

            SDataList list = new SDataList {Tailoring=tData, Due=dData, Manual=mData, Regular=sData, SaleReturn=srData };
            return list;
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
        public DateTime Date { get; set; }
        public string InvNo { get; set; }
        public decimal Amount { get; set; }
    }

    public class TDupCheck
    {
        public bool IsDuplicate { get; set; }
        public List<TDupData> Data { get; set; }
        public List<string> Duplicates { get; set; }
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
    public class RData { public int storeId { get; set; } public bool delivery { get; set; } }
    public class DuplicateInvCheck
    {
        public bool IsOk { get; set; }
        public List<string> DupInv { get; set; }
    }

    public class TailoringCheck
    {
        public int NoOfDelivery { get; set; }
        public SortedDictionary<int, string> InvErrorList { get; set; }
        public string RData { get; set; }
        public RData Data { get; set; }
    }
}