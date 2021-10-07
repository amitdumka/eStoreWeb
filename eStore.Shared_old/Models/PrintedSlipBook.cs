using System;

namespace eStore.Shared.Models.Stores
{
    public class PrintedSlipBook
    {
        public int PrintedSlipBookId { get; set; }
        public DateTime PrintedDate { get; set; }
        public DateTime FirstUseDate { get; set; }
        public SlipBookType SlipBookType { get; set; }
        public string SlipHeader { get; set; }
        public int StaringNumber { get; set; }
        public int EndingNumber { get; set; }
        public string BookCode { get; set; }
        public int StoreId { get; set; }

        public virtual Store Store { get; set; }
    }
}