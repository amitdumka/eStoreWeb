using eStore.Database;
using eStore.Shared.Models.Tailoring;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace eStore.BL.Tailor
{
    public class TailorManager
    {
        private void UP()
        {
        }

        /// <summary>
        /// Tailoring Manager
        /// </summary>
        /// <param name="db"></param>
        /// <param name="delivery"></param>
        /// <param name="isEdit"></param>
        /// <param name="isDelete"></param>
        public void OnUpdateData(eStoreDbContext db, TalioringDelivery delivery, bool isEdit, bool isDelete = false)
        {
            TalioringBooking booking = db.TalioringBookings.Find(delivery.TalioringBookingId);
            //Updating Booking for Delivery Status.
            if (isEdit)
            {
                if (booking != null)
                {
                    var oldId = db.TailoringDeliveries.Where(c => c.TalioringDeliveryId == delivery.TalioringDeliveryId).Select(c => new { c.TalioringBookingId }).FirstOrDefault();
                    if (oldId.TalioringBookingId != delivery.TalioringBookingId)
                    {
                        TalioringBooking old = db.TalioringBookings.Find(oldId.TalioringBookingId);
                        old.IsDelivered = false;
                        booking.IsDelivered = true;
                        db.Entry(booking).State = EntityState.Modified;
                        db.Entry(old).State = EntityState.Modified;
                    }
                }
            }
            else
            {
                if (booking != null)
                {
                    if (isDelete)
                    {
                        booking.IsDelivered = false;
                    }
                    else
                    {
                        booking.IsDelivered = true;
                    }
                    db.Entry(booking).State = EntityState.Modified;
                }
            }
        }
    }
}