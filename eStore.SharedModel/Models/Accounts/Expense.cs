using eStore.Shared.Models.Payroll;
using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Accounts
{
    public class Expense : BasicVoucher
    {
        public int ExpenseId { get; set; }
        public string Particulars { get; set; }

        [Display (Name = "Paid To")]
        public new string PartyName { get; set; }

        [Display (Name = "Paid By")]
        public int EmployeeId { get; set; }

        public virtual Employee PaidBy { get; set; }
    }
}