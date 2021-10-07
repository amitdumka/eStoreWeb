using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Accounts
{
    public class Payment : BasicVoucher
    {
        public int PaymentId { get; set; }

        [Display (Name = "Paid To")]
        public new string PartyName { get; set; }

        [Display (Name = "Payment Slip No")]
        public string PaymentSlipNo { get; set; }
    }
}