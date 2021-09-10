using System;

namespace eStore.Shared.Dtos
{
    public class StoreIdList { public int StoreId; public string StoreCode; public string StoreName; }

    public class BookingBasicDto
    {
        public int TalioringBookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public bool IsDelivered { get; set; }
        public string BookingSlipNo { get; set; }
    }
}