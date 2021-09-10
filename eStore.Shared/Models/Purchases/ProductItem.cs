using eStore.Shared.Models.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Purchases
{
    /// <summary>
    /// @Version: 5.0
    /// This is Store Based but still StoreID linking is not done. will check for it in final realase
    /// </summary>
    ///

    public class ProductItem
    {
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public int ProductItemId { set; get; }

        [Key]
        public string Barcode { get; set; }

        [Display (Name = "Brand")]
        public int BrandId { get; set; }

        public virtual Brand BrandName { get; set; }

        [Display (Name = "Style Code")]
        public string StyleCode { get; set; }

        [Display (Name = "Product Name")]
        public string ProductName { get; set; }

        [Display (Name = "Item Desc")]
        public string ItemDesc { get; set; }

        [Display (Name = "Category")]
        public ProductCategory Categorys { get; set; }

        [Display (Name = "Product Type")]
        public Category MainCategory { get; set; }

        [Display (Name = "Product Series")]
        public Category ProductCategory { get; set; }

        [Display (Name = "Sub Category")]
        public Category ProductType { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal MRP { get; set; }

        [Display (Name = "Tax Rate")]
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TaxRate { get; set; }    // TODO:Need to Review in final Edition

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Cost { get; set; }

        public string? HSNCode { get; set; }
        public Size Size { get; set; }
        public Unit Units { get; set; }

        public virtual ICollection<PurchaseItem> PurchaseItems { get; set; }
    }

    public class Category
    {
        public int CategoryId { get; set; }

        [Display (Name = "Category")]
        public string CategoryName { get; set; }

        [Display (Name = "Primary")]
        public bool IsPrimaryCategory { get; set; }

        [Display (Name = "Secondary")]
        public bool IsSecondaryCategory { get; set; }
    }

    public class Brand
    {
        public int BrandId { get; set; }

        [Display (Name = "Brand")]
        public string BrandName { get; set; }

        [Display (Name = "Brand Code")]
        public string BCode { get; set; }
    }

    public class PurchaseItem
    {
        public int PurchaseItemId { get; set; }//Pk

        [Display (Name = "Purchase ID")]
        public int ProductPurchaseId { get; set; }//FK

        public virtual ProductPurchase ProductPurchase { get; set; }     //Nav

        [Display (Name = "Product")]
        public int ProductItemId { get; set; } //FK

        public virtual ProductItem ProductItem { get; set; }
        public string Barcode { get; set; }// TODO: if not working then link with productitemid
        public double Qty { get; set; }
        public Unit Unit { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Cost { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        [Display (Name = "Tax Amount")]
        public decimal TaxAmout { get; set; }

        [Display (Name = "Input Tax")]
        public int? PurchaseTaxTypeId { get; set; } //TODO: Temp Purpose. need to calculate tax here

        public virtual PurchaseTaxType PurchaseTaxType { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CostValue { get; set; }
    }
}