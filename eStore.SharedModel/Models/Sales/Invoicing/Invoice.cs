using System;
using System.ComponentModel.DataAnnotations;
using eStore.Shared.Models.Purchases;
using eStore.Shared.Models.Stores;

namespace eStore.SharedModel.Models.Sales.Invoicing
{
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

        public int InvoiceType { get; set; } //Create enum for this. 
    }

    public class InvoiceItem
    {
        public int InvoiceItemId{get;set;}
        public string Barcode { get; set; }
        public decimal Qty { get; set; }
        [Display(Name = "Unit")]
        public Unit Units { get; set; }
        public decimal BasicPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Amount { get { return (BasicPrice-DiscountAmount+TaxAmount); } }

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
       // public virtual EDCMachine EDCMachine { get; set; } POS Machine refrance need to be added.
        
    }
}
