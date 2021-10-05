using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Banking
{
    public class BankAccount
    {
        public int BankAccountId { get; set; }

        [Display (Name = "Bank Name")]
        public int BankId { get; set; }

        public virtual Bank Bank { get; set; }

        [Display (Name = "Account Number")]
        public string Account { get; set; }

        [Display (Name = "Branch")]
        public string BranchName { get; set; }

        [Display (Name = "Account Type")]
        public AccountType AccountType { get; set; }

        // public ICollection<BankTranscation> BankTranscations { get; set; }
        // public ICollection<BankDeposit> BankDeposits { get; set; }
        // public ICollection<BankWithdrawal> BankWithdrawals { get; set; }
    }
}