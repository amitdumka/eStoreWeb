using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Stores
{
    /// <summary>
    /// Vendor's Payment Bill Wise
    /// </summary>
    public class VendorPayment : BaseGT
    {
        public int VendorPaymentId { get; set; }
        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        public string InvoiceNo { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime InvoiceDate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        public decimal CashDiscount { get; set; }
        public string BankDetails { get; set; }
        public string Remarks { get; set; }
        public bool IsFinalPayment { get; set; }
    }
}