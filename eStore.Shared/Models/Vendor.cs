using System;

namespace eStore.Shared.Models.Stores
{
    /// <summary>
    /// Vendor
    /// </summary>
    public class Vendor : BaseGT
    {
        public int VendorId { get; set; }

        public string VendorName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string VendorContactNo { get; set; }
        public string ContactPersonName { get; set; }
        public string CPPhoneNo { get; set; }
        public DateTime OnDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsValid { get; set; }
        public VendorType VendorType { get; set; }
        public string PANNo { get; set; }
        public string GSTIN { get; set; }
        public string BankAccountNo { get; set; }
        public string IFSCCode { get; set; }
        public string BankNameWithCity { get; set; }
    }
}