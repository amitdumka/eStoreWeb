using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Stores
{
    /// <summary>
    /// Debit /Credit Note for Vendor transcation types.
    /// </summary>
    public class VendorDebitCreditNote
    {
        public int VendorDebitCreditNoteId { get; set; }
        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }
        public NotesType NotesType { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        public string PaymentDetails { get; set; }
        public string Reason { get; set; }
        public string Remarks { get; set; }
    }
}