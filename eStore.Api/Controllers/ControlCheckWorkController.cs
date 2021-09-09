using System;
using eStore.BL.Widgets;
using eStore.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eStore.BL.Reports.Payroll;
using eStore.BL.Reports.CAReports;
using System.IO;
using eStore.Lib.Reports.Payroll;
using eStore.BL.Reports.Accounts;
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
        public ActionResult<string> GetTailoringCheck(int storeId)
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
                    }

                    
                }
                InvErrorList.Add(del.TalioringBookingId, msg);

            }
           int noOfDelivery= db.SaveChanges();
           //Veryify Delivery check



        }
    }


    class TailoringCheck
    {
        public int NoOfDelivery { get; set; }

    }
}
