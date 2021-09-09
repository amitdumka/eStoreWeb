using eStore.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace eStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ControlCheckWorkController: ControllerBase
    {
        private readonly eStoreDbContext db;
        public ControlCheckWorkController(eStoreDbContext con)
        {
            db = con;
        }


        [HttpGet("tailoringCheck")]
        public ActionResult<TailoringCheck> GetTailoringCheck(int storeId)
        {
            var booking = db.TalioringBookings.Where(c => c.StoreId == storeId && !c.IsDelivered)
                .Select(c=>new {c.BookingDate, c.BookingSlipNo, c.CustName, c.DeliveryDate, c.TotalAmount, c.TotalQty, c.IsDelivered})
                .ToList();
            var deliver = db.TailoringDeliveries.Include(c=>c.Booking).Where(c => c.StoreId == storeId)
                .Select(c=>new {c.Amount,c.DeliveryDate,c.InvNo,ProposeDate=c.Booking.DeliveryDate,c.Booking.TotalAmount,
                    c.Booking.IsDelivered,
                    c.TalioringBookingId , c.Booking.BookingDate, c.Booking.BookingSlipNo}).ToList();

            SortedDictionary<int, string> InvErrorList = new SortedDictionary<int, string>();
           
            foreach (var del in deliver)
            {
                if(!del.IsDelivered)
                {
                    var b = db.TalioringBookings.Find(del.TalioringBookingId);
                    b.IsDelivered = true;
                    db.TalioringBookings.Update(b);
                }

                var ds = db.DailySales.Where(c => c.InvNo.ToLower().Contains(del.InvNo.ToLower()) && c.IsTailoringBill).FirstOrDefault();
                string msg = "";
                if (ds != null)
                {
                    
                    if (ds.SaleDate.Date != del.DeliveryDate.Date)
                    {
                        msg += "Dates are not matching;";
                    }
                    if (ds.Amount != del.Amount) msg += " Delivery and sale amount not matching;";
                    if (del.Amount != del.TotalAmount) msg += "Delivery and Booking amount not matching;";
                    if (del.ProposeDate.Date != del.DeliveryDate.Date)
                    {
                        msg += "Propose date and delivery date is not matching";
                        int Days = (int)del.ProposeDate.Subtract(del.DeliveryDate).TotalDays;
                        int DaysInTotal= (int)del.BookingDate.Subtract(del.DeliveryDate).TotalDays;
                       if(Days>0) msg += $"Late delivery , Late by {Days} days;";
                        msg += $"Delivery is done in {DaysInTotal} days from Booking;";
                    }   
                }
                else
                {
                    msg += "Invoice not found in Daily Sale list;";
                }
                InvErrorList.Add(del.TalioringBookingId, msg);

            }
           int noOfDelivery= db.SaveChanges();
            //Veryify Delivery check

            TailoringCheck tc = new TailoringCheck { NoOfDelivery = noOfDelivery, InvErrorList=InvErrorList };
            return tc;

        }
        [HttpGet ("invCheck")]
        public ActionResult<DuplicateInvCheck> GetDuplicateBillCheck(int storeId)
        {
            var data = db.DailySales.Where (c => c.StoreId == storeId)
                .Select (c => new {c.DailySaleId, c.InvNo,c.Amount })
                .ToList ();

            bool isOk = false;
            var invList = data.Select (c => c.InvNo).OrderBy (c=>c).ToList ();
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


        public void AttendanceCheck(int storeId)
        {
            // Need extendsive check and marking as final also.
        }


        public void SlipNumbering(int storeId)
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
