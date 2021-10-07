using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts
{
    public class LedgerMaster
    {
        public int LedgerMasterId { get; set; }

        [ForeignKey ("Parties")]
        public int PartyId { get; set; }

        public Party Party { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Date")]
        public DateTime CreatingDate { get; set; }

        [Display (Name = "Ledger Type")]
        public int LedgerTypeId { get; set; }

        public virtual LedgerType LedgerType { get; set; }
    }
}