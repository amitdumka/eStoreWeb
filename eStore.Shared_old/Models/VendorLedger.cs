using System;
using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Stores
{
    /// <summary>
    /// Vendor Ledger : Create Balance Sheet for Vendor.
    /// </summary>
    public class VendorLedger
    {
        public int VendorLedgerId { get; set; }
        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }
        public ArvindAccount Arvind { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal InvoiceAmount { get; set; }

        public int [] PaymentIds { get; set; }
        public DateTime [] PaymentDates { get; set; }
        public decimal [] PaymentAmounts { get; set; }
        public bool IsInvoiceBillPaid { get; set; }
    }
}