using eStore.Shared.Models.Banking;
using eStore.Shared.Models.Stores;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.ViewModels.Banking
{
    public class BankDeposit
    {
        public int BankDepositId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Deposit Date")]
        public DateTime OnDate { get; set; }

        public int BankAccountId { get; set; }
        public virtual BankAccount Account { get; set; }

        [Display (Name = "Cheques Details")]
        public string ChequeNo { get; set; }

        [Display (Name = "Self/Named")]
        public string InNameOf { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        [Display (Name = "Payment Mode")]
        public PaymentMode PayMode { get; set; }

        [Display (Name = "Transaction Details")]
        public string Details { get; set; }

        public string Remarks { get; set; }

        [DefaultValue (true)]
        public bool IsInHouse { get; set; }

        public int StoreId { get; set; }
        public Store Store { get; set; }
    }

    public class BankWithdrawal
    {
        public int BankWithdrawalId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Withdrawal Date")]
        public DateTime OnDate { get; set; }

        public int BankAccountId { get; set; }
        public virtual BankAccount Account { get; set; }

        [Display (Name = "Cheques Details")]
        public string ChequeNo { get; set; }

        [Display (Name = "Self/Named")]
        public string InNameOf { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        [Display (Name = "Payment Mode")]
        public PaymentMode PayMode { get; set; }

        [Display (Name = "Transaction Details")]
        public string Details { get; set; }

        [Display (Name = "Signed By")]
        public string SignedBy { get; set; }

        [Display (Name = "Approved By")]
        public string ApprovedBy { get; set; }

        public string Remarks { get; set; }

        public int StoreId { get; set; }
        public Store Store { get; set; }
    }
}