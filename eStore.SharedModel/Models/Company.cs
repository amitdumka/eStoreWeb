using System.Collections.Generic;

namespace eStore.Shared.Models.Stores
{
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