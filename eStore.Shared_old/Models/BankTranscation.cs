using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Banking
{
    public class BankTranscation : BaseST
    {
        public int BankTranscationId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Date")]
        public DateTime OnDate { get; set; }

        public int BankAccountId { get; set; }
        public virtual BankAccount Account { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "In Amount")]
        public decimal InAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Out Amount")]
        public decimal OutAmount { get; set; }

        [Display (Name = "Cheques Details")]
        public string ChequeNo { get; set; }

        [Display (Name = "Self/Named")]
        public string InNameOf { get; set; }

        [Display (Name = "Signed By")]
        public string SignedBy { get; set; }

        [Display (Name = "Approved By")]
        public string ApprovedBy { get; set; }

        [DefaultValue (true)]
        public bool IsInHouse { get; set; }

        public PaymentMode PaymentModes { get; set; }
        public string PaymentDetails { get; set; }

        public string Remarks { get; set; }
    }
}