using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts
{
    public class Party
    {
        public int PartyId { get; set; }
        public string PartyName { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "On Date")]
        public DateTime OpenningDate { get; set; }

        [Display (Name = "Opening Balance")]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal OpenningBalance { get; set; }

        public string Address { get; set; }
        public string PANNo { get; set; }
        public string GSTNo { get; set; }

        [Display (Name = "Ledger Group")]
        // public LedgerCategory LedgerType { get; set; }
        public int LedgerTypeId { get; set; }

        public virtual LedgerType LedgerType { get; set; }
        public LedgerMaster LedgerMaster { get; set; }
        public virtual ICollection<LedgerEntry> Ledgers { get; set; }
    }
}