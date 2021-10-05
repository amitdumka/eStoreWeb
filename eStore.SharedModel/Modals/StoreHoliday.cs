using System;

namespace eStore.Shared.Models.Stores
{
    public class StoreHoliday : BaseST
    {
        public int StoreHolidayId { get; set; }
        public DateTime OnDate { get; set; }
        public HolidayReason Reason { get; set; }
        public string Remarks { get; set; }
        public string ApprovedBy { get; set; }
    }
}