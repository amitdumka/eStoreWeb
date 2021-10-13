using System;
using System.Collections.Generic;
using System.Text;

namespace eStore.Shared.Modals.Sales
{
    /// <summary>
    /// New and Impove Invoicing Sytems which can be extended as required.
    /// </summary>
    public class Invoice
    {
        [Key]
        public string InvoiceNumber { get; set; }
        public DateTime OnDate { get; set; }
        public int CustomerId { get; set; }
        // [Igone in xamarin]
        public virtual Customer Customer { get; set; }

        public decimal TotalAmount { get; set; }
        public decimal TotalTaxAmount { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal RoundOff { get; set; }

        public decimal TotalQty { get; set; }

        public InvoiceType InvoiceType { get; set; }
    }

    public class InvoiceItem
    {
        public int InvoiceItemId { get; set; }
        public string Barcode { get; set; }
        public decimal Qty { get; set; }
        [Display(Name = "Unit")]
        public Unit Units { get; set; }
        public decimal BasicPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Amount { get { return (BasicPrice - DiscountAmount + TaxAmount); } }

        //Salesman need to added.
        public int SalesmanId { get; set; }
        public virtual Salesman Salesman { get; set; }
        //Need to implement HSN Code System
        public long? HSNCode { get; set; }
        public virtual HSN HSN { get; set; }

    }

    public class InvoicePayment
    {
        public int InvoicePaymentId { get; set; }
        public PayMode PayMode { get; set; }
        public decimal CashAmount { get; set; }
        public decimal NonCashAmount { get; set; }

        public string PaymentRef { get; set; }
        public int? EDCId { get; set; }
        public virtual EDC EDC { get; set; }
        public int? CouponAndPointId { get; set; }
        public virtual CouponAndPoint CouponAndPoint { get; set; }


    }

    public class EDC : BaseSNT
    {
        public int EDCId { get; set; }
        public int TID { get; set; }
        public string EDCName { get; set; }
        public int AccountNumberId { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? EndDate { get; set; }

        public bool IsWorking { get; set; }
        public string MID { get; set; }
        public string Remark { get; set; }
    }

    public class EDCTranscation : BaseSNT
    {
        public int EDCTranscationId { get; set; }
        public int EDCId { get; set; }
        public virtual EDC CardMachine { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }

        public string CardEndingNumber { get; set; }
        public CardMode CardTypes { get; set; }
        public string InvoiceNumber { get; set; }
    }

    public class CouponAndPoint
    {
        public int CouponAndPointId { get; set; }
        public string ReferanceNumber { get; set; }
        public decimal Amount { get; set; }
        public string AuthCode { get; set; }
        public string InvoiceNumber { get; set; }
        public bool IsPointRedeemed { get; set; }
    }

}
