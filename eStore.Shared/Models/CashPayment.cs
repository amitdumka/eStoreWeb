using eStore.Shared.Models.Common;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    // Expenses
    public class CashPayment : BaseST
    {
        public int CashPaymentId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Payment Date")]
        public DateTime PaymentDate { get; set; }

        [Display (Name = "Mode")]
        public int TranscationModeId { get; set; }

        public TranscationMode Mode { get; set; }

        [Display (Name = "Paid To"), Required]
        public string PaidTo { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        [Display (Name = "Receipt No")]
        public string SlipNo { get; set; }

        public string Remarks { get; set; }
    }
}