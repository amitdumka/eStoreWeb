using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum VendorType { EBO, MBO, Tailoring, NonSalable, OtherSaleable, Others, TempVendor }
public enum NotesType { DebitNote, CreditNote }

namespace eStore.Shared.Models.Stores
{
    /// <summary>
    /// @Version: 5.0
    /// Abolsute.
    /// </summary>
    public class ArvindPayment : BaseGT
    {
        public int ArvindPaymentId { get; set; }
        public ArvindAccount Arvind { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }
        public string InvoiceNo { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public string BankDetails { get; set; }
        public string Remarks { get; set; }
        

    }
    
    /// <summary>
    /// Vendor
    /// </summary>
    public class Vendor : BaseGT
    {
        public int VendorId { get; set; }

        public string VendorName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string VendorContactNo { get; set; }
        public string ContactPersonName { get; set; }
        public string CPPhoneNo { get; set; }
        public DateTime OnDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsValid { get; set; }
        public VendorType VendorType { get; set; }
        public string PANNo { get; set; }
        public string GSTIN { get; set; }
        public string BankAccountNo { get; set; }
        public string IFSCCode { get; set; }
        public string BankNameWithCity { get; set; }

    }

    /// <summary>
    /// Vendor's Payment Bill Wise
    /// </summary>
    public class VendorPayment : BaseGT
    {
        public int VendorPaymentId { get; set; }
        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }
        public string InvoiceNo { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime InvoiceDate { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public decimal CashDiscount { get; set; }
        public string BankDetails { get; set; }
        public string Remarks { get; set; }
        public bool IsFinalPayment { get; set; }
    }

    
    /// <summary>
    /// Debit /Credit Note for Vendor transcation types.
    /// </summary>
    public class VendorDebitCreditNote
    {
        public int VendorDebitCreditNoteId{get;set;}
        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }
        public NotesType NotesType { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public string PaymentDetails { get; set; }
        public string Reason { get; set; }
        public string Remarks { get; set; }

    }

    /// <summary>
    /// Vendor Ledger : Create Balance Sheet for Vendor. 
    /// </summary>
    public class VendorLedger 
    {
        public int VendorLedgerId { get; set; }
        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }
        public ArvindAccount Arvind { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal InvoiceAmount { get; set; }

        public int[] PaymentIds { get; set; }
        public DateTime[] PaymentDates { get; set; }
        public decimal[] PaymentAmounts { get; set; }
        public bool IsInvoiceBillPaid { get; set; }
    }
}
