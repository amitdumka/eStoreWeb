using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using eStore.Shared.Models.Payroll;

namespace eStore.Shared.Models.Stores
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class Salesman : BaseST
    {
        public int SalesmanId { get; set; }
        [Display(Name = "Salesman")]
        public string SalesmanName { get; set; }

        //public virtual ICollection<DailySale> DailySales { get; set; }
        //public virtual ICollection<RegularSaleItem> SaleItems { get; set; }

        public int? EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
