using eStore.Shared.Models.Sales;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [Display (Name = "CESS"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CESS { get; set; }

        public ICollection<RegularSaleItem> RegularSaleItems { get; set; }
    }
}