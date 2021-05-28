using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Purchases
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    ///
    public class ProductPurchase : BaseST
    {
        public int ProductPurchaseId { get; set; }

        public string InWardNo { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime InWardDate { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime PurchaseDate { get; set; }
        public string InvoiceNo { get; set; }
        public double TotalQty { get; set; }
        [Display(Name = "Basic Amt")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalBasicAmount { get; set; }
        [Display(Name = "Shipping Cost")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal ShippingCost { get; set; }
        [Display(Name = "Tax")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalTax { get; set; }
        [Display(Name = "Total Amount")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalAmount { get; set; }
        public string Remarks { get; set; }
        [Display(Name = "Supplier")]
        public int SupplierID { get; set; }
        public virtual Supplier Supplier { get; set; }
        [Display(Name = "Paid")]
        public bool IsPaid { get; set; }
        public ICollection<PurchaseItem> PurchaseItems { get; set; }


    }
    public class Supplier
    {
        public int SupplierID { get; set; }
        [Display(Name = "Supplier")]
        public string SuppilerName { get; set; }
        public string Warehouse { get; set; }
        public ICollection<ProductPurchase> ProductPurchases { get; set; }
    }
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    //Store Based Class
    public class Stock : BaseSNT
    {
        public int StockId { set; get; }

        [Display(Name = "Product")]
        public int ProductItemId { set; get; }
        public virtual ProductItem ProductItem { get; set; }

        public double Quantity { set; get; }

        [Display(Name = "Sale Qty")]
        public double SaleQty { get; set; }

        [Display(Name = "Purchase Qty")]
        public double PurchaseQty { get; set; }

        public Unit Units { get; set; }
    }
}
