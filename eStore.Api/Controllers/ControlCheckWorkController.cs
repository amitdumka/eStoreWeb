using eStore.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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
        public ActionResult<TailoringCheck> GetTailoringCheck(int storeId)
        {
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
                if ( !del.IsDelivered )
                {
                    var b = db.TalioringBookings.Find (del.TalioringBookingId);
                    b.IsDelivered = true;
                    db.TalioringBookings.Update (b);
                }

                string msg = $"#{del.InvNo}#{del.TalioringBookingId}#{del.BookingSlipNo}#{del.BookingDate}#{del.DeliveryDate}#{del.TalioringDeliveryId}#{del.ProposeDate}#{del.Amount}#{del.TotalAmount}#;";
                var ds = db.DailySales.Where (c => c.InvNo.ToLower ().Contains (del.InvNo.ToLower ()) && c.IsTailoringBill).FirstOrDefault ();

                if ( ds != null )
                {
                    isO = false;

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
                    if ( del.Amount != del.TotalAmount )
                    {
                        isO = true;
                        msg += "\tDelivery and Booking amount not matching;";
                    }
                    if ( del.ProposeDate.Date != del.DeliveryDate.Date )
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

            TailoringCheck tc = new TailoringCheck { NoOfDelivery = noOfDelivery, InvErrorList = InvErrorList };
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
    }

    public class DuplicateInvCheck
    {
        public bool IsOk { get; set; }
        public List<string> DupInv { get; set; }
    }

    public class TailoringCheck
    {
        public int NoOfDelivery { get; set; }
        public SortedDictionary<int, string> InvErrorList { get; set; }
    }
}