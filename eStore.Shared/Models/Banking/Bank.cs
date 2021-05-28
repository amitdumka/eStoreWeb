using eStore.Shared.ViewModels.Banking;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Banking
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>

    public class Bank
    {
        public int BankId { get; set; }

        [Display(Name = "Bank Name")]
        public string BankName { get; set; }

        //public ICollection<AccountNumber> Accounts { get; set; }
        //public ICollection<BankAccountInfo> BankAccounts { get; set; }
        //public ICollection<Areas.Uploader.Models.BankSetting> BankSettings { get; set; }
        //public ICollection<Areas.Accountings.Models.BankAccount> BankAcc { get; set; }

    }

    public class BankAccount
    {
        public int BankAccountId { get; set; }

        [Display(Name = "Bank Name")]
        public int BankId { get; set; }
        public virtual Bank Bank { get; set; }

        [Display(Name = "Account Number")]
        public string Account { get; set; }

        [Display(Name = "Branch")]
        public string BranchName { get; set; }

        [Display(Name = "Account Type")]
        public AccountType AccountType { get; set; }

       // public ICollection<BankTranscation> BankTranscations { get; set; }
       // public ICollection<BankDeposit> BankDeposits { get; set; }
       // public ICollection<BankWithdrawal> BankWithdrawals { get; set; }

    }
    public class BankTranscation: BaseST
    {
        public int BankTranscationId { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Date")]
        public DateTime OnDate { get; set; }

        public int BankAccountId { get; set; }
        public BankAccount Account { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "In Amount")]
        public decimal InAmount { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Out Amount")]
        public decimal OutAmount { get; set; }

        [Display(Name = "Cheques Details")]
        public string ChequeNo { get; set; }

        [Display(Name = "Self/Named")]
        public string InNameOf { get; set; }

        [Display(Name = "Signed By")]
        public string SignedBy { get; set; }

        [Display(Name = "Approved By")]
        public string ApprovedBy { get; set; }

        [DefaultValue(true)]
        public bool IsInHouse { get; set; }

        public PaymentMode PaymentModes { get; set; }
        public string PaymentDetails { get; set; }

        public string Remarks { get; set; }

       
    }
}
