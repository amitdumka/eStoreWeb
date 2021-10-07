using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Sales
{
    #region DTO

    public class SaveOrderDTO
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public List<SaleItemList> SaleItems { get; set; }

        [MinLength (10), MaxLength (15)]
        public string MobileNo { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true), Display (Name = "Sale Date")]
        public DateTime OnDate { get; set; }

        public PaymentInfo PaymentInfo { get; set; }
        public int StoreId { get; set; }
    }

    public class EditOrderDTO
    {
        public string Name { get; set; }
        public string InvoiceNo { get; set; }

        [MinLength (10), MaxLength (15)]
        public string MobileNo { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true), Display (Name = "Sale Date")]
        public DateTime OnDate { get; set; }

        public List<SaleItemList> SaleItems { get; set; }
        public PaymentInfo PaymentInfo { get; set; }
        public int StoreId { get; set; }
    }

    public class SaleItemList
    {
        public string BarCode { get; set; }
        public string ProductName { get; set; }
        public double Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Amount { get; set; }
        public int Salesman { get; set; }
        public Unit Units { get; set; }
    }

    public class PaymentInfo
    {
        public decimal CardAmount { get; set; }
        public decimal CashAmount { get; set; }
        public string CardType { get; set; }
        public string AuthCode { get; set; }
        public string CardNo { get; set; }
    }

    #endregion DTO

    public class MixPayment
    {
    }
}