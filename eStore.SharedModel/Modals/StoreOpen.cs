using System;

namespace eStore.Shared.Models.Stores
{
    public class StoreOpen : BaseSNT
    {
        public int StoreOpenId { get; set; }
        public DateTime OpenningTime { get; set; }
        public string Remarks { get; set; }
    }
}