using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Accounts
{
    public class LedgerType
    {
        public int LedgerTypeId { get; set; }

        [Display (Name = "Name")]
        public string LedgerNameType { get; set; }

        public LedgerCategory Category { get; set; }
        public string Remark { get; set; }
    }
}