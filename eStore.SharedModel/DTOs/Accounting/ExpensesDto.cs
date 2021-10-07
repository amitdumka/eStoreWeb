using eStore.Shared.DTOs.Payrolls;
using eStore.Shared.Models.Common;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.DTOs.Accounting
{
    public class BankAccountDto
    {
        public int BankAccountId { get; set; }

        [Display (Name = "Account Number")]
        public string Account { get; set; }

        [Display (Name = "Account Type")]
        public AccountType AccountType { get; set; }
    }

    public class PartyBasicDto
    {
        public int PartyId { get; set; }
        public string PartyName { get; set; }

        [Display (Name = "Ledger Group")]
        public int LedgerTypeId { get; set; }

        public virtual LedgerTypeDto LedgerType { get; set; }
    }

    public class LedgerTypeDto
    {
        public int LedgerTypeId { get; set; }

        [Display (Name = "Name")]
        public string LedgerNameType { get; set; }

        public LedgerCategory Category { get; set; }
    }

    public class ExpenseDto
    {
        public int ExpenseId { get; set; }
        public string Particulars { get; set; }

        [Display (Name = "Paid To")]
        public string PartyName { get; set; }

        [Display (Name = "Paid By")]
        public int EmployeeId { get; set; }

        public virtual EmployeeDto PaidBy { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "On Date")]
        public DateTime OnDate { get; set; }

        [Display (Name = "Payment Mode")]
        public PaymentMode PayMode { get; set; }

        [Display (Name = "From Account")]
        public int? BankAccountId { get; set; }

        public virtual BankAccountDto FromAccount { get; set; }

        [Display (Name = "Payment Details")]
        public string PaymentDetails { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Amount")]
        public decimal Amount { get; set; }

        public string Remarks { get; set; }

        [Display (Name = "Party")]
        public int? PartyId { get; set; }

        [DefaultValue (false), Display (Name = "Cash")]
        public bool IsCash { get; set; }

        [DefaultValue (false), Display (Name = "ON")]
        public bool? IsOn { get; set; }

        [DefaultValue (true), Display (Name = "Dyn")]
        public bool IsDyn { get; set; }

        public virtual PartyBasicDto Party { get; set; }
        public int StoreId { get; set; }
        public StoreBasicDto Store { get; set; }
    }

    public class PaymentDto : BasicVoucherDto
    {
        public int PaymentId { get; set; }

        [Display (Name = "Paid To")]
        public new string PartyName { get; set; }

        [Display (Name = "Payment Slip No")]
        public string PaymentSlipNo { get; set; }
    }

    public partial class BasicVoucherDto
    {
        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "On Date")]
        public DateTime OnDate { get; set; }

        [Display (Name = "Party Name")]
        public string PartyName { get; set; }

        [Display (Name = "Payment Mode")]
        public PaymentMode PayMode { get; set; }

        [Display (Name = "From Account")]
        public int? BankAccountId { get; set; }

        public virtual BankAccountDto FromAccount { get; set; }

        [Display (Name = "Payment Details")]
        public string PaymentDetails { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Amount")]
        public decimal Amount { get; set; }

        public string Remarks { get; set; }

        [Display (Name = "Party")]
        public int? PartyId { get; set; }

        [DefaultValue (false), Display (Name = "Cash")]
        public bool IsCash { get; set; }

        [DefaultValue (false), Display (Name = "ON")]
        public bool? IsOn { get; set; }

        [DefaultValue (true), Display (Name = "Dyn")]
        public bool IsDyn { get; set; }

        public virtual PartyBasicDto Party { get; set; }

        public int StoreId { get; set; }
        public StoreBasicDto Store { get; set; }
    }

    public class ReceiptDto : BasicVoucherDto
    {
        public int ReceiptId { get; set; }

        [Display (Name = "Receipt From ")]
        public new string PartyName { get; set; }

        [Display (Name = "Receipt Slip No ")]
        public string RecieptSlipNo { get; set; }
    }

    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class CashReceiptDto
    {
        public int CashReceiptId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Receipt Date")]
        public DateTime InwardDate { get; set; }

        [Display (Name = "Mode")]
        public int TranscationModeId { get; set; }

        public TranscationMode Mode { get; set; }

        [Display (Name = "Receipt From"), Required]
        public string ReceiptFrom { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        [Display (Name = "Receipt No")]
        public string SlipNo { get; set; }

        public string Remarks { get; set; }
        public int StoreId { get; set; }
        public virtual StoreBasicDto Store { get; set; }
    }

    /// <summary>
    /// @Version: 5.0
    /// </summary>
    // Expenses
    public class CashPaymentDto
    {
        public int CashPaymentId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Payment Date")]
        public DateTime PaymentDate { get; set; }

        [Display (Name = "Mode")]
        public int TranscationModeId { get; set; }

        public TranscationMode Mode { get; set; }

        [Display (Name = "Paid To"), Required]
        public string PaidTo { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        [Display (Name = "Receipt No")]
        public string SlipNo { get; set; }

        public string Remarks { get; set; }
        public int StoreId { get; set; }
        public virtual StoreBasicDto Store { get; set; }
    }
}