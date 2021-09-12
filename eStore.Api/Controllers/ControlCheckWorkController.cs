﻿using eStore.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace eStore.Api.Controllers
{
    [Route ("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ControlCheckWorkController : ControllerBase
    {
        private readonly eStoreDbContext db;

        public ControlCheckWorkController(eStoreDbContext con)
        {
            db = con;
        }
        [HttpGet ("tailoringCheck")]
        public ActionResult<TailoringCheck> GetTailoringCheck(string requestData)
        {
            Console.WriteLine (requestData);
            RData rData = JsonSerializer.Deserialize<RData> (requestData);

            if ( rData == null )
            {
                Console.WriteLine ("Rdata is null");
            }


            int storeId = rData.storeId;

            var booking = db.TalioringBookings.Where (c => c.StoreId == storeId && !c.IsDelivered)
                .Select (c => new { c.BookingDate, c.BookingSlipNo, c.CustName, c.DeliveryDate, c.TotalAmount, c.TotalQty, c.IsDelivered })
                .ToList ();
            var deliver = db.TailoringDeliveries.Include (c => c.Booking).Where (c => c.StoreId == storeId)
                .Select (c => new
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
                }).ToList ();

            SortedDictionary<int, string> InvErrorList = new SortedDictionary<int, string> ();

            int ctr = 0;
            bool isO = false;

            foreach ( var del in deliver )
            {
                isO = false;

                if ( !del.IsDelivered )
                {
                    var b = db.TalioringBookings.Find (del.TalioringBookingId);
                    b.IsDelivered = true;
                    db.TalioringBookings.Update (b);
                }

                string msg = $"#{del.InvNo}#{del.TalioringBookingId}#{del.BookingSlipNo}#{del.BookingDate}#{del.DeliveryDate}#{del.TalioringDeliveryId}#{del.ProposeDate}#{del.Amount}#{del.TotalAmount}#;";
                var ds = db.DailySales.Where (c => c.InvNo.ToLower ().Contains (del.InvNo.ToLower ()) && c.IsTailoringBill).FirstOrDefault ();

                if ( del.Amount != del.TotalAmount )
                {
                    isO = true;
                    msg += "\tDelivery and Booking amount not matching;";
                }

                if ( rData.delivery && del.ProposeDate.Date != del.DeliveryDate.Date )
                {
                    isO = true;
                    msg += "\tPropose date and delivery date is not matching;";

                    int Days = (int) del.DeliveryDate.Subtract (del.ProposeDate).TotalDays;
                    int DaysInTotal = (int) del.DeliveryDate.Subtract (del.BookingDate).TotalDays;

                    if ( Days > 0 )
                        msg += $"\tLate delivery , Late by {Days} days;";
                    else if ( Days < 0 )
                        msg += $"\tEarly delivery , Early by {Days} days;";

                    msg += $"\tDelivery is done in {DaysInTotal} days from Booking;";
                }

                if ( ds != null )
                {


                    if ( ds.SaleDate.Date != del.DeliveryDate.Date )
                    {
                        isO = true;
                        msg += "\tDates are not matching;";
                    }
                    if ( ds.Amount != del.Amount )
                    {
                        msg += "\tDelivery and sale amount not matching;";
                        isO = true;
                    }
                    if ( isO )
                        InvErrorList.Add (ctr, msg);
                }
                else
                {
                    msg += $"\tInvoice No {del.InvNo} not found in Daily Sale list;";
                    InvErrorList.Add (ctr, msg);
                }

                ctr++;
            }
            int noOfDelivery = db.SaveChanges ();
            //Veryify Delivery check

            TailoringCheck tc = new TailoringCheck { NoOfDelivery = noOfDelivery, InvErrorList = InvErrorList, RData = requestData, Data = rData };
            return tc;
        }

        [HttpGet ("invCheck")]
        public ActionResult<DuplicateInvCheck> GetDuplicateBillCheck(int storeId)
        {
            var data = db.DailySales.Where (c => c.StoreId == storeId)
                .Select (c => new { c.DailySaleId, c.InvNo, c.Amount })
                .ToList ();

            bool isOk = false;
            var invList = data.Select (c => c.InvNo).OrderBy (c => c).ToList ();
            var unq = invList.Distinct ().ToList ();
            if ( invList.Count != unq.Count )
            {
                foreach ( var item in unq )
                    invList.Remove (item);
            }
            else
            {
                isOk = true;
                // No Duplicate record
            }

            return new DuplicateInvCheck { DupInv = invList, IsOk = isOk };
        }

        [HttpGet ("attendanceCheck")]
        public void GetAttendanceCheck(int storeId)
        {
            // Need extendsive check and marking as final also.
        }

        [HttpGet ("slipNumberCheck")]
        public void GetSlipNumbering(int storeId)
        {
        }

        [HttpGet ("UpperCaseInvoice")]
        public ActionResult<int> UpdateInvoice(int storeId)
        {

            int [] years = { 2021, 2020, 2019 };
            int ctr = 0;

            foreach ( var year in years )
            {
                for ( int i = 1 ; i <= 12 ; i++ )
                {
                    var data = db.DailySales.Where (c => c.StoreId == storeId && c.SaleDate.Month == i && c.SaleDate.Year == year).ToList ();
                    foreach ( var sd in data )
                    {
                        sd.InvNo = sd.InvNo.ToUpper ().Trim ();
                        if ( !string.IsNullOrEmpty (sd.Remarks) )
                            sd.Remarks = sd.Remarks.ToUpper ().Trim ();
                        db.DailySales.Update (sd);
                    }

                    ctr += db.SaveChanges ();

                }

            }
            return ctr;


        }
        [HttpGet ("UpperCaseTailoring")]
        public ActionResult<int> UpdateTailoring(int storeId)
        {

            int [] years = { 2021, 2020, 2019 };
            int ctr = 0;

            foreach ( var year in years )
            {
                for ( int i = 1 ; i <= 12 ; i++ )
                {
                    var data = db.TalioringBookings.Where (c => c.StoreId == storeId && c.BookingDate.Month == i && c.BookingDate.Year == year).ToList ();
                    foreach ( var sd in data )
                    {
                        sd.BookingSlipNo = sd.BookingSlipNo.ToUpper ().Trim ();

                        db.TalioringBookings.Update (sd);
                    }
                    ctr += db.SaveChanges ();
                    var data2 = db.TailoringDeliveries.Where (c => c.StoreId == storeId && c.DeliveryDate.Month == i && c.DeliveryDate.Year == year).ToList ();
                    foreach ( var sd in data2 )
                    {
                        sd.InvNo = sd.InvNo.ToUpper ().Trim ();

                        db.TailoringDeliveries.Update (sd);
                    }
                    ctr += db.SaveChanges ();

                }

            }
            return ctr;


        }

        [HttpGet ("UpperCaseVoucher")]
        public ActionResult<int> UpdateVoucher(int storeId)
        {

            int [] years = { 2021, 2020, 2019 };
            int ctr = 0;

            foreach ( var year in years )
            {
                for ( int i = 1 ; i <= 12 ; i++ )
                {
                    var data = db.Payments.Where (c => c.StoreId == storeId && c.OnDate.Month == i && c.OnDate.Year == year).ToList ();
                    foreach ( var sd in data )
                    {
                        if ( !string.IsNullOrEmpty (sd.PaymentSlipNo) )
                        {
                            sd.PaymentSlipNo = sd.PaymentSlipNo.ToUpper ().Trim ();
                            db.Payments.Update (sd);
                        }
                    }
                    var data2 = db.CashPayments.Where (c => c.StoreId == storeId && c.PaymentDate.Month == i && c.PaymentDate.Year == year).ToList ();
                    foreach ( var sd in data2 )
                    {
                        if ( !string.IsNullOrEmpty (sd.SlipNo) )
                        {
                            sd.SlipNo = sd.SlipNo.ToUpper ().Trim ();
                            db.CashPayments.Update (sd);
                        }
                    }
                    var data3 = db.Receipts.Where (c => c.StoreId == storeId && c.OnDate.Month == i && c.OnDate.Year == year).ToList ();
                    foreach ( var sd in data3 )
                    {
                        if ( !string.IsNullOrEmpty (sd.RecieptSlipNo) )
                        {
                            sd.RecieptSlipNo = sd.RecieptSlipNo.ToUpper ().Trim ();
                            db.Receipts.Update (sd);
                        }
                    }
                    var data4 = db.CashReceipts.Where (c => c.StoreId == storeId && c.InwardDate.Month == i && c.InwardDate.Year == year).ToList ();
                    foreach ( var sd in data4 )
                    {
                        if ( !string.IsNullOrEmpty (sd.SlipNo) )
                        {
                            sd.SlipNo = sd.SlipNo.ToUpper ().Trim ();
                            db.CashReceipts.Update (sd);
                        }
                    }

                    ctr += db.SaveChanges ();

                }

            }
            return ctr;


        }
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