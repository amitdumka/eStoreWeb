using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Accounts
{
    public class Receipt : BasicVoucher
    {
        public int ReceiptId { get; set; }

        [Display (Name = "Receipt From ")]
        public new string PartyName { get; set; }

        [Display (Name = "Receipt Slip No ")]
        public string RecieptSlipNo { get; set; }
    }
}