using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Purchases
{
    public class Supplier
    {
        public int SupplierID { get; set; }

        [Display (Name = "Supplier")]
        public string SuppilerName { get; set; }

        public string Warehouse { get; set; }
        public string LocationCode { get; set; }
        public ICollection<ProductPurchase> ProductPurchases { get; set; }
    }
}