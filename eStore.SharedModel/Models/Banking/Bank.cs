using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Banking
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>

    public class Bank
    {
        public int BankId { get; set; }

        [Display (Name = "Bank Name")]
        public string BankName { get; set; }

        //public ICollection<AccountNumber> Accounts { get; set; }
        //public ICollection<BankAccountInfo> BankAccounts { get; set; }
        //public ICollection<Areas.Uploader.Models.BankSetting> BankSettings { get; set; }
        //public ICollection<Areas.Accountings.Models.BankAccount> BankAcc { get; set; }
    }
}