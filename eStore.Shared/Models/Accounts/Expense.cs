using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using eStore.Shared.Models.Banking;
using eStore.Shared.Models.Common;
using eStore.Shared.Models.Payroll;

namespace eStore.Shared.Models.Accounts
{
    public partial class BasicVoucher: BaseST
    {
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "On Date")]
        public DateTime OnDate { get; set; }

        [Display(Name = "Party Name")]
        public string PartyName { get; set; }

        [Display(Name = "Payment Mode")]
        public PaymentMode PayMode { get; set; }

        [Display(Name = "From Account")]
        public int? BankAccountId { get; set; }
        public virtual BankAccount FromAccount { get; set; }

        [Display(Name = "Payment Details")]
        public string PaymentDetails { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Amount")]
        public decimal Amount { get; set; }
        public string Remarks { get; set; }
       
        [Display(Name = "Party")]
        public int? PartyId { get; set; }
        
        [Display(Name = "Leger")]
        public int? LedgerEnteryId { get; set; }
       
        [DefaultValue(false), Display(Name = "Cash")]
        public bool IsCash { get; set; }
        
        [DefaultValue(false), Display(Name = "ON")]
        public bool? IsOn { get; set; }

        [DefaultValue(true), Display(Name = "Dyn")]
        public bool IsDyn { get; set; }
        public virtual Party Party { get; set; }
        public virtual LedgerEntry LedgerEntry { get; set; }

    }

    public class Expense : BasicVoucher
    {
        public int ExpenseId { get; set; }
        public string Particulars { get; set; }
        [Display(Name = "Paid To")]
        public new string PartyName { get; set; }
        [Display(Name = "Paid By")]
        public int EmployeeId { get; set; }
        public virtual Employee PaidBy { get; set; }
    }

    public class Payment : BasicVoucher
    {
        public int PaymentId { get; set; }
        [Display(Name = "Paid To")]
        public new string PartyName { get; set; }
        [Display(Name = "Payment Slip No")]
        public string PaymentSlipNo { get; set; }
    }

    public class Receipt : BasicVoucher
    {
        public int ReceiptId { get; set; }
        [Display(Name = "Receipt From ")]
        public new string PartyName { get; set; }
        [Display(Name = "Receipt Slip No ")]
        public string RecieptSlipNo { get; set; }
    }

    public class Party
    {
        public int PartyId { get; set; }
        public string PartyName { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "On Date")]
        public DateTime OpenningDate { get; set; }
        [Display(Name = "Opening Balance")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal OpenningBalance { get; set; }
        public string Address { get; set; }
        public string PANNo { get; set; }
        public string GSTNo { get; set; }
        [Display(Name = "Ledger Group")]
        // public LedgerCategory LedgerType { get; set; }
        public int LedgerTypeId { get; set; }
        public virtual LedgerType LedgerType { get; set; }
        public LedgerMaster LedgerMaster { get; set; }
        public virtual ICollection<LedgerEntry> Ledgers { get; set; }
    }

    public class LedgerMaster
    {
        public int LedgerMasterId { get; set; }

        [ForeignKey("Parties")]
        public int PartyId { get; set; }
        public Party Party { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Date")]
        public DateTime CreatingDate { get; set; }

        [Display(Name = "Ledger Type")]
        public int LedgerTypeId { get; set; }
        public virtual LedgerType LedgerType { get; set; }


    }
    //TODO: LedgerEntry Need to update based on better concept and check the use of LedgerMaster
    public class LedgerEntry
    {
        public int LedgerEntryId { get; set; }

        [Display(Name = "Party Name")]
        public int PartyId { get; set; }
        public virtual Party Party { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Date")]
        public DateTime EntryDate { get; set; }
        
        [Display(Name = "On Account Off")]
        public LedgerEntryType EntryType { get; set; }
        public int ReferanceId { get; set; }
        
        public VoucherType VoucherType { get; set; }
        public string Particulars { get; set; }
        
        [Display(Name = "Amount In")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal AmountIn { get; set; }
        
        [Display(Name = "Amount Out")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal AmountOut { get; set; }
        
        //Ref of itself for double entry system.
        public int LedgerEntryRefId { get; set; }
    }
    public class LedgerType
    {
        public int LedgerTypeId { get; set; }
        [Display(Name = "Name")]
        public string LedgerNameType { get; set; }
        public LedgerCategory Category { get; set; }
        public string Remark { get; set; }

    }

}
