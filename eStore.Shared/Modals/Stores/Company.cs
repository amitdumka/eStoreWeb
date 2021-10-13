using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Stores
{
    /// <summary>
    /// Company: Version 6.0
    /// If a store is Brand Shop/store of Any Brand 
    /// </summary>
    public class Company
    {
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactPersonEmail { get; set; }
        public string ContactPersonPhoneNo { get; set; }
        public string WebSite { get; set; }

        public virtual ICollection<Store> Stores { get; set; }
    }
}
