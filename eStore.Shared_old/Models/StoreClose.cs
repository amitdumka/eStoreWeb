using System;

namespace eStore.Shared.Models.Stores
{
    public class StoreClose : BaseSNT
    {
        public int StoreCloseId { get; set; }
        public DateTime ClosingDate { get; set; }
        public string Remarks { get; set; }
    }
}