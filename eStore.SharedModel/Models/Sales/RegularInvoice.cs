using eStore.Shared.Models.Common;
using eStore.Shared.Models.Purchases;
using eStore.Shared.Models.Stores;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Sales
{
    #region RegularInvoiec

    public class RegularInvoice : Invoice
    {
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public int RegularInvoiceId { get; set; }

        public PaymentDetail PaymentDetail { get; set; }
        public virtual ICollection<RegularSaleItem> SaleItems { get; set; }

        [DefaultValue (false)]
        public bool IsManualBill { get; set; }
    }

    public class RegularSaleItem : BaseSaleItem
    {
        public int RegularSaleItemId { get; set; }

        //Navigation for Invoice
        public string InvoiceNo { get; set; }

        public virtual RegularInvoice Invoice { get; set; }
    }

    #endregion RegularInvoiec

    #region BaseInvoice

    public class Invoice : BaseST
    {
        [Key]
        public string InvoiceNo { get; set; }

        [Display (Name = "Customer Name")]
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true), Display (Name = "Sale Date")]
        public DateTime OnDate { get; set; }

        [Display (Name = "Total Items")]
        public int TotalItems { get; set; }

        [Display (Name = "Qty")]
        public double TotalQty { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Bill Amt")]
        public decimal TotalBillAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Discount")]
        public decimal TotalDiscountAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Round off")]
        public decimal RoundOffAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money"), Display (Name = "Taxes")]
        public decimal TotalTaxAmount { get; set; }
    }

    public class BaseSaleItem
    {
        [Display (Name = "Product")]
        public int ProductItemId { get; set; }

        [Display (Name = "Product")]
        public virtual ProductItem ProductItem { get; set; }

        public string BarCode { get; set; }

        [Display (Name = "Quantity")]
        public double Qty { get; set; }

        [Display (Name = "Unit")]
        public Unit Units { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal MRP { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        [Display (Name = "Basic Amount")]
        public decimal BasicAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Discount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        [Display (Name = "Tax Amount")]
        public decimal TaxAmount { get; set; }

        [Display (Name = "Sale Tax")]
        public int? SaleTaxTypeId { get; set; }

        public virtual SaleTaxType SaleTaxType { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        [Display (Name = "Bill Amount")]
        public decimal BillAmount { get; set; }

        public int SalesmanId { get; set; }
        public virtual Salesman Salesman { get; set; }

        public long? HSNCode { get; set; }
        public virtual HSN HSN { get; set; }
    }

    public class PaymentDetail
    {
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public int PaymentDetailId { get; set; }

        [Key]
        public string InvoiceNo { get; set; }

        [ForeignKey ("InvoiceNo")]
        public virtual RegularInvoice Invoice { get; set; }

        public SalePayMode PayMode { get; set; }

        [DefaultValue (0)]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CashAmount { get; set; }

        [DefaultValue (0)]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CardAmount { get; set; }

        [DefaultValue (0)]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal MixAmount { get; set; }

        public RegularCardDetail? CardDetail { get; set; }

        [DefaultValue (false)]
        public bool IsManualBill { get; set; }
    }

    public class RegularCardDetail : BaseCardDetail
    {
        public int RegularCardDetailId { get; set; }

        [ForeignKey ("InvoiceNo")]
        public virtual PaymentDetail PaymentDetail { get; set; }
    }

    public class BaseCardDetail
    {
        [Display (Name = "Card Type")]
        public CardMode CardType { get; set; }

        public CardType CardCode { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        public int AuthCode { get; set; }
        public int LastDigit { get; set; }

        //public int PaymentDetailId { get; set; }

        public string InvoiceNo { get; set; }
    }

    #endregion BaseInvoice

    #region SaleInvoice

    public class SaleInvoice : Invoice
    {
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public int SaleInvoiceId { get; set; }

        public InvoicePayment PaymentDetail { get; set; }
        public virtual ICollection<SaleItem> SaleItems { get; set; }

        [DefaultValue (false)]
        public bool IsNonVendor { get; set; }
    }

    public class SaleItem : BaseSaleItem
    {
        public int SaleItemId { get; set; }
        public string InvoiceNo { get; set; }

        [ForeignKey ("InvoiceNo")]
        public virtual SaleInvoice Invoice { get; set; }
    }

    public class InvoicePayment
    {
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public int InvoicePaymentId { get; set; }

        [Key]
        public string InvoiceNo { get; set; }

        [ForeignKey ("InvoiceNo")]
        public virtual SaleInvoice Invoice { get; set; }

        public SalePayMode PayMode { get; set; }

        [DefaultValue (0)]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CashAmount { get; set; }

        [DefaultValue (0)]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal NonCashAmount { get; set; }

        [DefaultValue (0)]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal OtherAmount { get; set; }

        public SaleCardDetail? CardDetail { get; set; }
    }

    public class SaleCardDetail : BaseCardDetail
    {
        public int SaleCardDetailId { get; set; }

        [ForeignKey ("InvoiceNo")]
        public virtual PaymentDetail PaymentDetail { get; set; }
    }

    public class NonCashDetail
    {
        public int NonCashDetialId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentType { get; set; }
        public string RefName { get; set; }
        public string InvoiceNo { get; set; }

        [ForeignKey ("InvoiceNo")]
        public virtual InvoicePayment PaymentDetail { get; set; }
    }

    #endregion SaleInvoice
}