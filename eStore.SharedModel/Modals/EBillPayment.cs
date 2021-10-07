using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts.Expenses
{
    public class EBillPayment : BaseST
    {
        public int EBillPaymentId { get; set; }
        public int EletricityBillId { get; set; }
        public virtual EletricityBill Bill { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display (Name = "Payment Date")]
        public DateTime PaymentDate { get; set; }

        [Display (Name = "Amount"), DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        public PaymentMode Mode { get; set; }
        public string PaymentDetails { get; set; }
        public string Remarks { get; set; }
        public bool IsPartialPayment { get; set; }
        public bool IsBillCleared { get; set; }
    }
}