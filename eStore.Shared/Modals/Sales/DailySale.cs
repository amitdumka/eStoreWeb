using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Sales
{
    /// <summary>
    /// @Version: 6.0
    /// </summary>

    public class DailySale : BaseST
    {
        public int DailySaleId { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Sale Date")]
        public DateTime OnDate { get; set; }

        [Display(Name = "Invoice No")]
        public string InvoiceNumber { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }

        [Display(Name = "Payment Mode")]
        public PayMode PayMode { get; set; }

        [Display(Name = "Cash Amount")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashAmount { get; set; }

        [ForeignKey("Salesman")]
        public int SalesmanId { get; set; }

        public virtual Salesman Salesman { get; set; }

        [Display(Name = "Due")]
        public bool IsDue { get; set; }

        [Display(Name = "Manual Bill")]
        public bool IsManualBill { get; set; }

        [Display(Name = "Tailoring Bill")]
        public bool IsTailoringBill { get; set; }

        [Display(Name = "Sale Return")]
        public bool IsSaleReturn { get; set; }

        [Display(nameof = "Adjusted Bill")]
        public bool IsAdjustedBill { get; set; }

        public string Remarks { get; set; }

        [DefaultValue(false)]
        public bool IsMatchedWithSystem { get; set; }

    }

    public class AdjustedBill
    {
        public DateTime OnDate { get; set; }
        public string InvoiceNumber { get; set; }
        public List<string> TragetInvoices { get; set; }
        public decimal AdjustedAmount { get; set; }
        public decimal DifferenceAmount { get; set; }

    }



}
