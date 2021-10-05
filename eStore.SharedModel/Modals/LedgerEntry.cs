using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Accounts
{
    //TODO: LedgerEntry Need to update based on better concept and check the use of LedgerMaster
    public class LedgerEntry
    {
        public int LedgerEntryId { get; set; }

        [Display (Name = "Party Name")]
        public int PartyId { get; set; }

        public virtual Party Party { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Date")]
        public DateTime EntryDate { get; set; }

        [Display (Name = "On Account Off")]
        public LedgerEntryType EntryType { get; set; }

        public int ReferanceId { get; set; }

        public VoucherType VoucherType { get; set; }
        public string Particulars { get; set; }

        [Display (Name = "Amount In")]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal AmountIn { get; set; }

        [Display (Name = "Amount Out")]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal AmountOut { get; set; }

        //Ref of itself for double entry system.
        public int LedgerEntryRefId { get; set; }
    }
}