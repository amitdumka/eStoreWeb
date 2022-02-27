using eStore.BL.Ops.Printers;
using eStore.Database;
using eStore.Shared.Models.Purchases;
using eStore.Shared.Models.Sales;
using eStore.Shared.Models.Stores;
using eStore.Shared.ViewModels.Printers;
using eStore.Shared.ViewModels.SalePuchase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eStore.BL.SalePurchase
{
    public class RegularSaleManager
    {
        private const string FPart = "C33";
        private const string ArvindSeries = "IN";
        private const string ManualSeries = "MI";
        private const long SeriesStart = 1000000;
        private const long SeriesStartA = 2000000;

        public string GetLastInvoiceNo(eStoreDbContext db, int StoreId, bool IsManual = false)
        {
            try
            {
                var inv = db.RegularInvoices.Where(c => c.IsManualBill && c.StoreId == StoreId).OrderBy(c => c.RegularInvoiceId).Select(c => new { c.RegularInvoiceId, c.InvoiceNo }).LastOrDefault();
                if (inv != null)
                    return inv.InvoiceNo;
                else
                    return String.Empty;
            }
            catch (Exception)
            {
                return String.Empty;
            }
        }

        //public InvoiceNo GenerateInvoiceNo2(eStoreDbContext db, int StoreId, bool IsManual = true)
        //{
        //    InvoiceNo inv = new InvoiceNo(ManualSeries);
        //    //TODO: series Start should be changed every Finnical Year;
        //    //TODO: Should have option to check data and based on that generate it
        //    string iNo = GetLastInvoiceNo(db,StoreId, false);
        //    if (iNo.Length > 0)
        //    {
        //        if (iNo != "0")
        //        {
        //            iNo = iNo.Substring(5);
        //            long i = long.Parse(iNo);
        //            inv.TP = i + 1;
        //        }
        //        else
        //        { inv.TP = SeriesStart + 1; }
        //    }
        //    else
        //    {
        //        //TODO: check future what happens and what condtion  come here
        //        inv.TP = SeriesStart + 1;

        //    }
        //    return inv;
        //}

        /// <summary>
        ///  TODO: Make it  static function
        /// </summary>
        /// <param name="db"></param>
        /// <param name="StoreId"></param>
        /// <param name="isManual"></param>
        /// <returns></returns>
        public string GenerateInvoiceNo(eStoreDbContext db, int StoreId, bool isManual = true)
        {
            string inv = GetLastInvoiceNo(db, StoreId, true);
            if (String.IsNullOrEmpty(inv))
            {
                if (isManual)
                {
                    inv = FPart + ManualSeries + SeriesStart;
                }
                else
                {
                    inv = FPart + ArvindSeries + SeriesStartA;
                }
            }
            string iNo = inv.Substring(5);
            //long i = ;
            string newInv = inv.Substring(0, 5) + (long.Parse(iNo) + 1);
            return newInv;
        }

        public InvoiceSaveReturn OnInsert(eStoreDbContext db, SaveOrderDTO sales, string userName, int StoreId = 1)
        {
            Customer cust = db.Customers.Where(c => c.MobileNo == sales.MobileNo).FirstOrDefault();
            if (cust == null)
            {
                string[] names = sales.Name.Split(" ");
                string FName = names[0];
                string LName = "";
                for (int i = 1; i < names.Length; i++)
                    LName += names[i] + " ";

                cust = new Customer
                {
                    City = sales.Address,
                    Age = 30,
                    FirstName = FName,
                    Gender = Gender.Male,
                    LastName = LName,
                    MobileNo = sales.MobileNo,
                    NoOfBills = 0,
                    TotalAmount = 0,
                    CreatedDate = DateTime.Now.Date
                };
                db.Customers.Add(cust);
            }
            string InvNo = GenerateInvoiceNo(db, StoreId, true);
            List<RegularSaleItem> itemList = new List<RegularSaleItem>();
            List<Stock> stockList = new List<Stock>();
            foreach (var item in sales.SaleItems)
            {
                RegularSaleItem sItem = new RegularSaleItem
                {
                    BarCode = item.BarCode,
                    MRP = item.Price,
                    Qty = item.Quantity,
                    Discount = 0,
                    SalesmanId = item.Salesman,
                    Units = item.Units,
                    InvoiceNo = InvNo,
                    BasicAmount = item.Amount,
                    TaxAmount = 0,
                    ProductItemId = -1,
                    BillAmount = 0,
                    SaleTaxTypeId = 1, //TODO: default tax id needed
                };
                ProductItem pItem = db.ProductItems.Where(c => c.Barcode == item.BarCode).FirstOrDefault();
                Stock stock = db.Stocks.Where(c => c.ProductItemId == pItem.ProductItemId && c.StoreId == StoreId).FirstOrDefault();

                sItem.ProductItemId = pItem.ProductItemId;
                decimal amt = (decimal)item.Quantity * item.Price;
                sItem.BasicAmount = (amt * 100) / (100 + pItem.TaxRate);
                sItem.TaxAmount = (sItem.BasicAmount * pItem.TaxRate) / 100;
                sItem.BillAmount = sItem.BasicAmount + sItem.TaxAmount;
                //SaleTax Id
                var taxid = db.SaleTaxTypes.Where(c => c.CompositeRate == pItem.TaxRate).Select(c => c.SaleTaxTypeId).FirstOrDefault();
                if (taxid <= 0)
                {
                    taxid = 1; //TODO: Handle it for creating new saletax id
                }
                sItem.SaleTaxTypeId = taxid;

                itemList.Add(sItem);

                stock.SaleQty += item.Quantity;
                //TODO:Quantity stock.Quantity -= item.Quantity;
                stockList.Add(stock);
            }
            var totalBillamt = itemList.Sum(c => c.BillAmount);
            var totaltaxamt = itemList.Sum(c => c.TaxAmount);
            var totalDiscount = itemList.Sum(c => c.Discount);
            var totalQty = itemList.Sum(c => c.Qty);
            var totalitem = itemList.Count;
            decimal roundoffamt = Math.Round(totalBillamt) - totalBillamt;
            PaymentDetail pd = new PaymentDetail
            {
                CardAmount = sales.PaymentInfo.CardAmount,
                CashAmount = sales.PaymentInfo.CashAmount,
                InvoiceNo = InvNo,
                IsManualBill = true,
                MixAmount = 0,
                PayMode = SalePayMode.Cash
            };
            if (sales.PaymentInfo.CardAmount > 0)
            {
                if (sales.PaymentInfo.CashAmount > 0)
                {
                    pd.PayMode = SalePayMode.Mix;
                }
                else
                {
                    pd.PayMode = SalePayMode.Card;
                }

                RegularCardDetail cd = new RegularCardDetail
                {
                    CardCode = CardType.Visa,//TODO: default
                    Amount = sales.PaymentInfo.CardAmount,
                    AuthCode = (int)Int64.Parse(sales.PaymentInfo.AuthCode),
                    InvoiceNo = InvNo,
                    LastDigit = (int)Int64.Parse(sales.PaymentInfo.CardNo),
                    CardType = CardMode.DebitCard//TODO: default
                };

                if (sales.PaymentInfo.CardType.Contains("Debit") || sales.PaymentInfo.CardType.Contains("debit") || sales.PaymentInfo.CardType.Contains("DEBIT"))
                { cd.CardType = CardMode.DebitCard; }
                else if (sales.PaymentInfo.CardType.Contains("Credit") || sales.PaymentInfo.CardType.Contains("credit") || sales.PaymentInfo.CardType.Contains("CREDIT"))
                { cd.CardType = CardMode.CreditCard; }

                if (sales.PaymentInfo.CardType.Contains("visa") || sales.PaymentInfo.CardType.Contains("Visa") || sales.PaymentInfo.CardType.Contains("VISA"))
                { cd.CardCode = CardType.Visa; }
                else if (sales.PaymentInfo.CardType.Contains("MasterCard") || sales.PaymentInfo.CardType.Contains("mastercard") || sales.PaymentInfo.CardType.Contains("MASTERCARD"))
                { cd.CardCode = CardType.MasterCard; }
                else if (sales.PaymentInfo.CardType.Contains("Rupay") || sales.PaymentInfo.CardType.Contains("rupay") || sales.PaymentInfo.CardType.Contains("RUPAY"))
                { cd.CardCode = CardType.Rupay; }
                else if (sales.PaymentInfo.CardType.Contains("MASTRO") || sales.PaymentInfo.CardType.Contains("mastro") || sales.PaymentInfo.CardType.Contains("Mastro"))
                { cd.CardCode = CardType.Rupay; }

                pd.CardDetail = cd;
            }
            RegularInvoice Invoice = new RegularInvoice
            {
                Customer = cust,
                InvoiceNo = InvNo,
                OnDate = sales.OnDate,
                IsManualBill = true,
                StoreId = StoreId,
                SaleItems = itemList,
                CustomerId = cust.CustomerId,
                TotalBillAmount = totalBillamt + roundoffamt,
                TotalDiscountAmount = totalDiscount,
                TotalItems = totalitem,
                TotalQty = totalQty,
                TotalTaxAmount = totaltaxamt,
                RoundOffAmount = roundoffamt,
                PaymentDetail = pd,
                UserId = userName
            };
            db.RegularInvoices.Add(Invoice);
            db.Stocks.UpdateRange(stockList);
            InvoiceSaveReturn returnData = new InvoiceSaveReturn
            {
                NoOfRecord = db.SaveChanges(),
                FileName = "NotSaved"
            };
            if (returnData.NoOfRecord > 0)
            {
                ReceiptHeader header = PrinterHelper.GetReceiptHeader(db, StoreId);
                ReceiptDetails details = PrinterHelper.GetReceiptDetails(Invoice.InvoiceNo, Invoice.OnDate, DateTime.Now.ToShortTimeString(), sales.Name);
                ReceiptItemTotal itemtotal = PrinterHelper.GetReceiptItemTotal(Invoice);
                List<ReceiptItemDetails> itemDetailList = PrinterHelper.GetInvoiceDetails(db, itemList);
                returnData.FileName = "/" + InvoicePrinter.PrintManaulInvoice(header, itemtotal, details, itemDetailList, false);
            }
            return returnData;
        }

        public InvoiceSaveReturn OnEdit(eStoreDbContext db, EditOrderDTO sales, int StoreId = 1)
        {
            Customer cust = db.Customers.Where(c => c.MobileNo == sales.MobileNo).FirstOrDefault();
            if (cust == null)
            {
                string[] names = sales.Name.Split(" ");
                string FName = names[0];
                string LName = "";
                for (int i = 1; i < names.Length; i++)
                    LName += names[i] + " ";

                cust = new Customer
                {
                    City = "",
                    Age = 30,
                    FirstName = FName,
                    Gender = Gender.Male,
                    LastName = LName,
                    MobileNo = sales.MobileNo,
                    NoOfBills = 0,
                    TotalAmount = 0,
                    CreatedDate = DateTime.Now.Date
                };
                db.Customers.Add(cust);
                db.SaveChanges();
            }
            RegularInvoice inv = db.RegularInvoices.Find(sales.InvoiceNo);
            if (inv == null)
            {
                return null;
            }
            inv.SaleItems = db.RegularSaleItems.Where(c => c.InvoiceNo == sales.InvoiceNo).ToList();
            inv.PaymentDetail = db.PaymentDetails.Include(c => c.CardAmount).Where(c => c.InvoiceNo == sales.InvoiceNo).FirstOrDefault();

            return null;//TODO: temp
        }

        public RegularSaleItem AddSaleItem(eStoreDbContext db, SaleItemList saleitem, int StoreId = 1)
        {
            ProductItem pItem = db.ProductItems.Include(c => c.Units).Where(c => c.Barcode == saleitem.BarCode).FirstOrDefault();
            if (pItem == null)
            { }

            RegularSaleItem rSale = new RegularSaleItem
            {
                BarCode = saleitem.BarCode
            };
            Stock stock = db.Stocks.Where(c => c.StoreId == StoreId && c.ProductItemId == rSale.ProductItemId).FirstOrDefault();

            stock.SaleQty += rSale.Qty;
            //TODO:Quantity  stock.Quantity -= rSale.Qty;
            db.Stocks.Update(stock);
            return rSale;
        }

        public bool RemoveSaleItem(eStoreDbContext db, RegularSaleItem saleItem, int StoreId = 1)
        {
            Stock stock = db.Stocks.Where(c => c.StoreId == StoreId && c.ProductItemId == saleItem.ProductItemId).FirstOrDefault();
            if (stock == null)
                return false;
            stock.SaleQty -= saleItem.Qty;
            //TODO:Quantity  stock.Quantity += saleItem.Qty;
            db.Stocks.Update(stock);
            db.RegularSaleItems.Remove(saleItem);
            return true;
        }

        public string RePrintManaulInvoice(eStoreDbContext db, RegularInvoice invoice, int StoreId = 1)
        {
            ReceiptHeader header = PrinterHelper.GetReceiptHeader(db, StoreId);
            ReceiptDetails details = PrinterHelper.GetReceiptDetails(invoice.InvoiceNo, invoice.OnDate, DateTime.Now.ToShortTimeString(), invoice.Customer.FullName);
            ReceiptItemTotal itemtotal = PrinterHelper.GetReceiptItemTotal(invoice);
            List<ReceiptItemDetails> itemDetailList = PrinterHelper.GetInvoiceDetails(db, invoice.SaleItems.ToList());
            return InvoicePrinter.PrintManaulInvoice(header, itemtotal, details, itemDetailList, true);
        }
    }
}