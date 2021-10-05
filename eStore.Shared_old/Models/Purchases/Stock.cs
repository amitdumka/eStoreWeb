using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Purchases
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    //Store Based Class
    public class Stock : BaseSNT
    {
        public int StockId { set; get; }

        [Display (Name = "Product")]
        public int? ProductItemId { set; get; }

        public string Barcode { get; set; }

        [ForeignKey ("Barcode")]
        public virtual ProductItem ProductItem { get; set; }

        public double Quantity { get { return PurchaseQty - SaleQty - HoldQty; } }

        [Display (Name = "Sale Qty")]
        public double SaleQty { get; set; }

        [Display (Name = "Purchase Qty")]
        public double PurchaseQty { get; set; }

        [Display (Name = "Hold Qty")]
        public double HoldQty { get; set; }

        public Unit Units { get; set; }
    }
}