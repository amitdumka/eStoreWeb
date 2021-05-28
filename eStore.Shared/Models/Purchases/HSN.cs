using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using eStore.Shared.Models.Sales;

namespace eStore.Shared.Models.Purchases
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class HSN
    {
        [Key]
        public long HSNCode { get; set; }
        public string Description { get; set; }
        public int Rate { get; set; }
        public DateTime EffectiveDate { get; set; }
        public decimal CESS { get; set; }

        public ICollection<RegularSaleItem> RegularSaleItems { get; set; }
    }
}
