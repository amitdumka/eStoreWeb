using System;

namespace eStore.Shared.Models.Stores
{
    public class UsedSlip
    {
        public int UsedSlipId { get; set; }
        public string SlipNumber { get; set; }
        public string VoucherType { get; set; }
        public int RefId { get; set; }
        public DateTime RefDate { get; set; }
        public int StoreId { get; set; }
        public virtual Store Store { get; set; }
    }
}