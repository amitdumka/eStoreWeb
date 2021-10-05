using eStore.Shared.Models.Banking;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts
{
    public partial class BasicVoucher : BaseST
    {
        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "On Date")]
        public DateTime OnDate { get; set; }

        [Display (Name = "Party Name")]
        public string PartyName { get; set; }

        [Display (Name = "Payment Mode")]
        public PaymentMode PayMode { get; set; }

        [Display (Name = "From Account")]
        public int? BankAccountId { get; set; }

        public virtual BankAccount FromAccount { get; set; }

        [Display (Name = "Payment Details")]
        public string PaymentDetails { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Amount")]
        public decimal Amount { get; set; }

        public string Remarks { get; set; }

        [Display (Name = "Party")]
        public int? PartyId { get; set; }

        [Display (Name = "Leger")]
        public int? LedgerEnteryId { get; set; }

        [DefaultValue (false), Display (Name = "Cash")]
        public bool IsCash { get; set; }

        [DefaultValue (false), Display (Name = "ON")]
        public bool? IsOn { get; set; }

        [DefaultValue (true), Display (Name = "Dyn")]
        public bool IsDyn { get; set; }

        public virtual Party Party { get; set; }
        public virtual LedgerEntry LedgerEntry { get; set; }
    }
}