using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Common
{
    /// <summary>
    /// Tax: Version 6.0 
    /// Taxes charged in purchase / Invoice or any other vocher.
    /// </summary>
    public class Tax
    {
        public int TaxId { get; set; }

        [Display(Name = "Tax")]
        public string Name { get; set; }

        [Display(Name = "Tax Type")]
        public TaxType TaxType { get; set; }

        [Display(Name = "Composite Rate")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CompositeRate { get; set; }

        public bool OutPutTax { get; set; }
        
    }
}
