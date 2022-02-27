using eStore.Database;
using eStore.Shared.Models.Sales;
using eStore.Shared.ViewModels.Printers;
using System;
using System.Collections.Generic;

namespace eStore.BL.Ops.Printers
{
    public class PrinterHelper
    {
        /// <summary>
        /// Get Get Item Details
        /// </summary>
        /// <param name="db">Database Context</param>
        /// <param name="saleItem">RegularSale Item List</param>
        /// <returns></returns>
        public static List<ReceiptItemDetails> GetInvoiceDetails(eStoreDbContext db, List<RegularSaleItem> saleItem)
        {
            List<ReceiptItemDetails> itemList = new List<ReceiptItemDetails>();
            foreach (var item in saleItem)
            {
                ReceiptItemDetails rid = new ReceiptItemDetails
                {
                    BasicPrice = item.BasicAmount.ToString("0.##"),
                    Discount = item.Discount.ToString("0.##"),
                    MRP = item.MRP.ToString("0.##"),
                    QTY = item.Qty.ToString("0.##"),
                    GSTAmount = (item.TaxAmount / 2).ToString("0.##"),
                    HSN = "",
                    GSTPercentage = "",
                    SKUDescription = item.BarCode,
                    Amount = item.BillAmount.ToString("0.##")
                };

                if (item.HSNCode != null)
                    rid.HSN = item.HSNCode.ToString();
                rid.SKUDescription += "/" + db.ProductItems.Find(item.ProductItemId).ItemDesc;
                rid.GSTPercentage = (db.SaleTaxTypes.Find(item.SaleTaxTypeId).CompositeRate / 2).ToString("0.##");
                itemList.Add(rid);
            }
            return itemList;
        }

        /// <summary>
        /// Get RecieptTotals
        /// </summary>
        /// <param name="inv"></param>
        /// <returns></returns>
        public static ReceiptItemTotal GetReceiptItemTotal(RegularInvoice inv)
        {
            ReceiptItemTotal total = new ReceiptItemTotal
            {
                ItemCount = inv.TotalItems.ToString(),
                TotalItem = inv.TotalQty.ToString("0.##"),
                NetAmount = inv.TotalBillAmount.ToString("0.##"),
                CashAmount = inv.PaymentDetail.CashAmount.ToString("0.##"),
            };
            return total;
        }

        /// <summary>
        /// Get Reciept Details based on Invoice No , Date, time and CustomerName
        /// </summary>
        /// <param name="invNo"></param>
        /// <param name="onDate"></param>
        /// <param name="time"></param>
        /// <param name="custName"></param>
        /// <returns></returns>
        public static ReceiptDetails GetReceiptDetails(string invNo, DateTime onDate, string time, string custName)
        {
            return new ReceiptDetails(invNo, onDate, time, custName);
        }

        /// <summary>
        /// Return RecieptHeader based on StoreId
        /// </summary>
        /// <param name="db"></param>
        /// <param name="Storeid"></param>
        /// <returns></returns>
        public static ReceiptHeader GetReceiptHeader(eStoreDbContext db, int Storeid)
        {
            var store = db.Stores.Find(Storeid);

            ReceiptHeader header = new ReceiptHeader
            {
                StoreName = store.StoreName,
                StoreAddress = store.Address,
                StoreCity = store.City,
                StoreGST = store.GSTNO,
                StorePhoneNo = store.PhoneNo
            };
            return header;
        }
    }
}