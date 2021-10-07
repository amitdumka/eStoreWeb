using System;

namespace eStore.Shared.Models.Stores
{
    public class StoreDailyOperation : BaseSNT
    {
        public int StoreDailyOperationId { get; set; }
        public DateTime OnDate { get; set; }
        public string Remarks { get; set; }
        public DateTime OpenningTime { get; set; }
        public DateTime ClosingTime { get; set; }
        public int StoreOpenId { get; set; }
        public int StoreCloseId { get; set; }
    }
}