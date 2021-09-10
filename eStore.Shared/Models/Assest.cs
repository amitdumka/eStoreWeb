using System;

namespace eStore.Shared.Models.Stores
{
    public class Assest
    {
        public int AssestId { get; set; }
        public DateTime AccquiredDate { get; set; }
        public string AssestName { get; set; }
        public string AssestCode { get; set; }
        public string Location { get; set; }
        public decimal AssestCost { get; set; }
        public string InvoiceDetails { get; set; }
        public bool IsActive { get; set; }
        public string Remark { get; set; }
        public DateTime ExpireDate { get; set; }
        public string CurrentStaus { get; set; }
        public AssestCategory Category { get; set; }
    }
}