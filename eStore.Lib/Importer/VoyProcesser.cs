using eStore.Database;
using eStore.Shared.Models.Purchases;
using eStore.Shared.Models.Sales;
using eStore.Shared.Models.Stores;
using eStore.SharedModel.Models.Sales.Invoicing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace eStore.BL.Importer
{
    public class VoyProcesser
    {

        public static int GenerateStockFromPurchase(eStoreDbContext db, int StoreId)
        {
            var data = db.PurchaseItem.Select(c => new { c.Barcode, c.Qty, c.Unit })
                .GroupBy(c => new { c.Barcode, c.Qty, c.Unit })
                .Select(c => new { Barcode = c.Key.Barcode, Unit = c.Key.Unit, TotalQty = (double)c.Sum(c => c.Qty) })

                .ToList();

            foreach (var item in data)
            {
                Stock stock = new Stock
                {

                    Barcode = item.Barcode,
                    IsReadOnly = true,
                    PurchaseQty = item.TotalQty,
                    SaleQty = 0,
                    HoldQty = 0,
                    StoreId = StoreId,
                    UserId = "AutoAdmin",
                    Units = item.Unit
                };
                db.Stocks.Add(stock);

            }
            return db.SaveChanges();


        }

        public static int UpdateStockFromSale(eStoreDbContext db, int StoreId)
        {
            var data = db.SaleItems.Select(c => new { c.BarCode, c.Qty, c.Units })
                .GroupBy(c => new { c.BarCode, c.Qty, c.Units })
                .Select(c => new { Barcode = c.Key.BarCode, Unit = c.Key.Units, TotalQty = (double)c.Sum(c => c.Qty) })

                .ToList();

            foreach (var item in data)
            {
                var stock = db.Stocks.Where(c => c.Barcode == item.Barcode && c.StoreId == StoreId).FirstOrDefault();
                if (stock == null)
                {
                    stock = new Stock
                    {

                        Barcode = item.Barcode,
                        IsReadOnly = true,
                        PurchaseQty = -999,
                        SaleQty = item.TotalQty,
                        HoldQty = 0,
                        StoreId = StoreId,
                        UserId = "AutoAdmin",
                        Units = item.Unit
                    };
                    db.Stocks.Add(stock);
                }
                else
                {
                    stock.SaleQty += item.TotalQty;
                    db.Stocks.Update(stock);
                }


            }
            return db.SaveChanges();


        }

        public static int ProcessBrand(eStoreDbContext db)
        {
            var data = db.VoyBrandNames.ToList();
            foreach (var item in data)
            {
                Brand b = new Brand { BCode = item.BRANDCODE, BrandName = item.BRANDNAME };
                db.Brands.Add(b);
            }
            return db.SaveChanges();
        }

        public static int ProcessCusomterSale(eStoreDbContext db, int StoreId, int year)
        {
            // TODO: here reduce data size as much as possible
            var data = db.SaleWithCustomers.Where(c => c.Phone != null && c.Phone != "").ToList();
            int count = data.Count;
            var custs = data.Select(c => new Customer { FirstName = c.CustomerName, City = c.Address, MobileNo = c.Phone }).Distinct().ToList();
            int cCnt = custs.Count;
            int s = count - cCnt;
            Console.WriteLine(s);

            foreach (var item in custs)
            {
                if (!string.IsNullOrEmpty(item.FirstName))
                {
                    var names = item.FirstName.Split(" ");
                    if (names[0] == "Mrs" || names[0] == "Ms")
                        item.Gender = Gender.Female;
                    else
                        item.Gender = Gender.Male;
                    item.FirstName = names[1];
                    for (int i = 2; i < names.Length; i++)
                        item.LastName += names[i];
                    item.Age = 30;
                    ;
                    item.CreatedDate = DateTime.Today;

                    item.TotalAmount = data.Where(c => c.Phone == item.MobileNo).Select(c => new { billAmt = (decimal)c.BillAmt }).Sum(c => c.billAmt);
                    item.NoOfBills = data.Where(c => c.Phone == item.MobileNo).Count();
                }
                else
                {
                    custs.Remove(item);
                }
            }
            db.Customers.AddRange(custs);
            return db.SaveChanges();
        }

        public static int ProcessDailySale(eStoreDbContext db, int StoreId, int year)
        {
            var data = db.VoySaleInvoiceSums.Where(c => c.InvoiceDate.Year == year).ToList();
            var sData = db.DailySales.Where(c => c.SaleDate.Year == year && c.StoreId == StoreId && !c.IsManualBill).ToList();
            var idata = db.VoySaleInvoices.Where(c => c.InvoiceDate.EndsWith("" + year)).Select(c => new { c.InvoiceNo, c.SalesManName }).ToList();
            var sms = db.Salesmen.ToList();
            foreach (var item in data)
            {
                var eD = sData.Where(c => c.InvNo == item.InvoiceNo).FirstOrDefault();

                if (eD != null)
                {
                    if (eD.SaleDate.Date == item.InvoiceDate.Date)
                        eD.IsMatchedWithVOy = true;
                    else
                        eD.IsMatchedWithVOy = false;
                    if (eD.Amount == item.BillAmt)
                        eD.IsMatchedWithVOy = true;
                    else
                        eD.IsMatchedWithVOy = false;

                    if (eD.TaxAmount == item.TaxAmt)
                        eD.IsMatchedWithVOy = true;
                    else
                    { eD.TaxAmount = item.TaxAmt; eD.IsMatchedWithVOy = true; }

                    switch (item.PaymentMode)
                    {
                        case "CRD":
                            if (eD.PayMode == PayMode.Card)
                                eD.IsMatchedWithVOy = true;
                            else
                                eD.IsMatchedWithVOy = false;
                            break;

                        case "CAS":
                            if (eD.PayMode == PayMode.Cash)
                                eD.IsMatchedWithVOy = true;
                            else
                                eD.IsMatchedWithVOy = false;
                            break;

                        case "MIX":
                            if (eD.PayMode == PayMode.MixPayments)
                                eD.IsMatchedWithVOy = true;
                            else
                                eD.IsMatchedWithVOy = false;
                            break;

                        default:
                            if (eD.PayMode == PayMode.Others)
                                eD.IsMatchedWithVOy = true;
                            else
                                eD.IsMatchedWithVOy = false;
                            break;
                    }

                    if (eD.IsMatchedWithVOy)
                        eD.Remarks += "\t#AutoVerified";
                    else
                        eD.Remarks += "\t#Auto-BugInEntry";
                    db.DailySales.Update(eD);
                }
                else
                {
                    DailySale sale = new DailySale
                    {
                        IsMatchedWithVOy = true,
                        InvNo = item.InvoiceNo,
                        SaleDate = item.InvoiceDate,
                        Amount = item.BillAmt,
                        IsDue = false,
                        IsManualBill = false,
                        IsReadOnly = true,
                        IsSaleReturn = false,
                        IsTailoringBill = false,
                        StoreId = StoreId,
                        UserId = "AutoAdded",
                        SalesmanId = 3,
                        Remarks = "AutoAddedFromVoy",
                        EntryStatus = EntryStatus.Approved,
                        CashAmount = item.BillAmt,
                        TaxAmount = item.TaxAmt
                    };

                    switch (item.PaymentMode)
                    {
                        case "CRD":
                            sale.PayMode = PayMode.Card;
                            sale.CashAmount = 0;
                            break;

                        case "CAS":
                            sale.PayMode = PayMode.Cash;
                            break;

                        case "MIX":
                            sale.PayMode = PayMode.MixPayments;
                            break;

                        default:
                            sale.PayMode = PayMode.Others;
                            sale.Remarks += "\t#PayMode:" + item.PaymentMode;
                            break;
                    }
                    if (item.TailoringFlag == "Y")
                        sale.IsTailoringBill = true;
                    var smid = idata.Where(c => c.InvoiceNo == sale.InvNo).FirstOrDefault().SalesManName;
                    sale.SalesmanId = sms.Where(c => c.SalesmanName.Contains(smid)).Select(c => c.SalesmanId).FirstOrDefault();

                    db.DailySales.Add(sale);
                }
            }

            return db.SaveChanges();
        }

        public static int ProcessInwardSummary(eStoreDbContext db, int StoreId, int year)
        {
            var data = db.InwardSummaries.ToList();
            var sData = db.Suppliers.ToList();
            if (sData == null || sData.Count < 1)
            {
                var sup = db.InwardSummaries.Select(c => c.PartyName).Distinct();
                foreach (var item in sup)
                {
                    Supplier s = new Supplier
                    {
                        SuppilerName = item,
                        Warehouse = item
                    };
                    db.Suppliers.Add(s);
                }
               ;
                if (db.SaveChanges() > 0)
                    sData = db.Suppliers.ToList();
                else
                    return -111;
            }

            if (sData != null && data != null && sData.Count > 0 && data.Count > 0)
                foreach (var item in data)
                {
                    ProductPurchase purchase = new ProductPurchase
                    {
                        EntryStatus = EntryStatus.Added,
                        IsPaid = true,
                        IsReadOnly = true,
                        StoreId = StoreId,
                        ShippingCost = 0,
                        InvoiceNo = item.InvoiceNo,
                        InWardDate = item.InwardDate,
                        InWardNo = item.InwardNo,
                        PurchaseDate = item.InvoiceDate,
                        Remarks = "AutoAdded",
                        TotalAmount = 0,
                        TotalBasicAmount = 0,
                        TotalCost = item.TotalCost,
                        TotalMRPValue = item.TotalMRPValue,
                        TotalQty = (double)item.TotalQty,
                        TotalTax = 0,
                        UserId = "AutoAdded",
                        SupplierID = sData.Where(c => c.SuppilerName.Contains(item.PartyName)).Select(c => c.SupplierID).FirstOrDefault(),
                    };
                    db.ProductPurchases.Add(purchase);
                }
            return db.SaveChanges();
        }

        public static int ProcessPurchase(eStoreDbContext db, int StoreId, int year)
        {
            var data = db.VoyPurchaseInwards.Where(c => c.GRNDate.Year == year).OrderBy(c => c.InvoiceNo).ToList();

            if (data != null && data.Count > 0)
            {
                var pData = db.ProductPurchases.Where(c => c.StoreId == StoreId && c.InWardDate.Year == year).OrderBy(c => c.InvoiceNo).ToList();
                ProductPurchase pur = null;

                foreach (var item in data)
                {
                    if (pur == null)
                    {
                        pur = pData.Where(c => c.InvoiceNo == item.InvoiceNo).FirstOrDefault();
                        pur.PurchaseItems = new List<PurchaseItem>();
                        // create purchase item
                    }
                    else if (pur.InvoiceNo != item.InvoiceNo)
                    {
                        pur = pData.Where(c => c.InvoiceNo == item.InvoiceNo).FirstOrDefault();
                        pur.PurchaseItems = new List<PurchaseItem>();
                    }

                    PurchaseItem pItem = new PurchaseItem
                    {
                        Barcode = item.Barcode,
                        Cost = item.Cost,
                        CostValue = item.CostValue,
                        Qty = (double)item.Quantity,
                        TaxAmout = item.TaxAmt
                    };
                    pur.TotalBasicAmount += item.Cost;
                    pur.TotalTax += item.TaxAmt;
                    pur.PurchaseItems.Add(pItem);
                    //UpdateProductItem (db, item.Barcode, item.MRP, item.Cost, "", null, false);
                }
                db.ProductPurchases.UpdateRange(pData);
                return db.SaveChanges();
            }
            else
            {
                return -999;
            }
        }

        public int ProcessProductItem(eStoreDbContext db, string brandName)
        {
            try
            {
                string bName = brandName;
                Console.WriteLine("B:" + bName);

                int brandId = db.Brands.Where(c => c.BrandName == brandName).Select(c => c.BrandId).FirstOrDefault();

                var data = db.TaxRegisters.Where(c => c.BrandName == brandName && c.InvoiceType == "Sales").Select(c => new { c.BARCODE, c.StyleCode, c.ProductName, c.ItemDesc, c.TaxRate, c.TaxDesc }).Distinct().ToList();
                var cData = db.Categories.ToList();
                foreach (var purchase in data)
                {
                    var cats = purchase.ProductName.Split("/");
                    ProductItem pItem = new ProductItem
                    {
                        Barcode = purchase.BARCODE,
                        Cost = 0,
                        MRP = 0,
                        StyleCode = purchase.StyleCode,
                        ProductName = purchase.ProductName,
                        ItemDesc = purchase.ItemDesc,
                        HSNCode = "",
                        TaxRate = purchase.TaxRate,
                        BrandId = brandId,
                        MainCategory = cData.Where(c => c.CategoryName.Contains(cats[0])).FirstOrDefault(),
                        ProductCategory = cData.Where(c => c.CategoryName.Contains(cats[1])).FirstOrDefault(),
                        ProductType = cData.Where(c => c.CategoryName.Contains(cats[2])).FirstOrDefault(),
                    };

                    switch (cats[0])
                    {
                        case "Shirting":
                        case "Suiting":
                            pItem.Categorys = ProductCategory.Fabric;
                            pItem.Units = Unit.Meters;
                            break;

                        case "Apparel":
                            pItem.Categorys = ProductCategory.ReadyMade;
                            pItem.Units = Unit.Pcs;
                            break;
                        // case ProductCategory.Accessiories:
                        //    break;
                        case "Tailoring":
                            pItem.Categorys = ProductCategory.Tailoring;
                            pItem.Units = Unit.Nos;
                            break;
                        //case ProductCategory.Trims:
                        //    break;
                        case "Promo":
                            pItem.Categorys = ProductCategory.PromoItems;
                            pItem.Units = Unit.Nos;
                            break;
                        //case ProductCategory.Coupons:
                        //    break;
                        //case ProductCategory.GiftVouchers:
                        //    break;
                        //case ProductCategory.Others:
                        //    break;
                        default:
                            pItem.Categorys = ProductCategory.Others;
                            pItem.Units = Unit.Nos;
                            break;
                    }

                    db.ProductItems.Add(pItem);
                }
                return db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: " + e.Message);
                return -1;
            }
        }

        public static int ProcessItem(eStoreDbContext db)
        {
            var data = db.ItemDatas.Select(c => new { c.BARCODE, c.BrandName, c.ItemDesc, c.ProductCategory, c.ProductName, c.ProductType, c.StyleCode })
                .OrderBy(c => c.BARCODE).Distinct().ToList();

            var cData = db.Categories.ToList();
            var bData = db.Brands.ToList();
            List<ProductItem> pro = new List<ProductItem>();
            foreach (var purchase in data)
            {
                ProductItem pItem = new ProductItem
                {
                    Barcode = purchase.BARCODE,
                    Cost = 0,
                    MRP = 0,
                    StyleCode = purchase.StyleCode,
                    ProductName = purchase.ProductName,
                    ItemDesc = purchase.ItemDesc,
                    HSNCode = "",
                    TaxRate = -1,

                    MainCategory = cData.Where(c => c.CategoryName.Contains(purchase.ProductType)).FirstOrDefault(),
                    ProductCategory = cData.Where(c => c.CategoryName.Contains(purchase.ProductType)).FirstOrDefault(),
                    ProductType = cData.Where(c => c.CategoryName.Contains(purchase.ProductName)).FirstOrDefault(),
                };
                pItem.BrandId = bData.Where(c => c.BrandName.Contains(purchase.BrandName)).Select(c => c.BrandId).FirstOrDefault();
                if (pItem.BrandId < 1)
                    pItem.BrandId = 1;
                switch (purchase.ProductType)
                {
                    case "Shirting":
                    case "Suiting":
                        pItem.Categorys = ProductCategory.Fabric;
                        pItem.Units = Unit.Meters;
                        pItem.Size = Size.NS;
                        break;

                    case "Apparel":
                        pItem.Categorys = ProductCategory.ReadyMade;
                        pItem.Units = Unit.Pcs;
                        pItem.Size = GetSize(pItem.StyleCode);
                        break;
                    // case ProductCategory.Accessiories:
                    //    break;
                    case "Tailoring":
                        pItem.Categorys = ProductCategory.Tailoring;
                        pItem.Units = Unit.Nos;
                        pItem.Size = Size.FreeSize;
                        break;
                    //case ProductCategory.Trims:
                    //    break;
                    case "Promo":
                        pItem.Categorys = ProductCategory.PromoItems;
                        pItem.Units = Unit.Nos;
                        pItem.Size = Size.NOTVALID;
                        break;
                    //case ProductCategory.Coupons:
                    //    break;
                    //case ProductCategory.GiftVouchers:
                    //    break;
                    //case ProductCategory.Others:
                    //    break;
                    default:
                        pItem.Categorys = ProductCategory.Others;
                        pItem.Units = Unit.Nos;
                        pItem.Size = Size.NOTVALID;
                        break;
                }

                pro.Add(pItem);
            }
            db.ProductItems.AddRange(pro);
            return db.SaveChanges();
        }

        public static int ProcessPitem(eStoreDbContext db)
        {
            var data = db.VoyPurchaseInwards.Where(c => !c.SupplierName.Contains("Aprajita Retails"))
                .Select(c => new { c.Barcode, c.Cost, c.MRP, c.ItemDesc, c.ProductName, c.StyleCode, c.SupplierName })
                .OrderBy(c => c.Barcode).Distinct().ToList();
            var cData = db.Categories.ToList();
            var bData = db.Brands.ToList();
            var barcodeList = data.Select(c => c.Barcode).Distinct().ToList();
            Console.WriteLine("Barcodes=" + barcodeList.Count);

            var taxReg = db.TaxRegisters.Select(c => new { c.BARCODE, c.BrandName, c.TaxDesc, c.TaxRate }).OrderBy(c => c.BARCODE).Distinct().ToList();
            List<ProductItem> pro = new List<ProductItem>();

            foreach (var purchase in data)
            {
                if (barcodeList.Contains(purchase.Barcode))
                {
                    var cats = purchase.ProductName.Split("/");
                    var tr = taxReg.Where(c => c.BARCODE == purchase.Barcode).FirstOrDefault();

                    ProductItem pItem = new ProductItem
                    {
                        Barcode = purchase.Barcode,
                        Cost = purchase.Cost,
                        MRP = purchase.MRP,
                        StyleCode = purchase.StyleCode,
                        ProductName = purchase.ProductName,
                        ItemDesc = purchase.ItemDesc,
                        HSNCode = "",
                        TaxRate = -1,
                        MainCategory = cData.Where(c => c.CategoryName.Contains(cats[0])).FirstOrDefault(),
                        ProductCategory = cData.Where(c => c.CategoryName.Contains(cats[1])).FirstOrDefault(),
                        ProductType = cData.Where(c => c.CategoryName.Contains(cats[2])).FirstOrDefault(),
                    };
                    if (tr != null)
                    {
                        pItem.TaxRate = tr.TaxRate;
                        pItem.BrandId = (int?)(bData.Where(c => c.BrandName == tr.BrandName).Select(c => c.BrandId).FirstOrDefault()) ?? 1;
                    }
                    else
                        pItem.BrandId = 22;

                    switch (cats[0])
                    {
                        case "Shirting":
                        case "Suiting":
                            pItem.Categorys = ProductCategory.Fabric;
                            pItem.Units = Unit.Meters;
                            pItem.Size = Size.NS;
                            break;

                        case "Apparel":
                            pItem.Categorys = ProductCategory.ReadyMade;
                            pItem.Units = Unit.Pcs;
                            pItem.Size = GetSize(pItem.StyleCode);
                            break;
                        // case ProductCategory.Accessiories:
                        //    break;
                        case "Tailoring":
                            pItem.Categorys = ProductCategory.Tailoring;
                            pItem.Units = Unit.Nos;
                            pItem.Size = Size.FreeSize;
                            break;
                        //case ProductCategory.Trims:
                        //    break;
                        case "Promo":
                            pItem.Categorys = ProductCategory.PromoItems;
                            pItem.Units = Unit.Nos;
                            pItem.Size = Size.NOTVALID;
                            break;
                        //case ProductCategory.Coupons:
                        //    break;
                        //case ProductCategory.GiftVouchers:
                        //    break;
                        //case ProductCategory.Others:
                        //    break;
                        default:
                            pItem.Categorys = ProductCategory.Others;
                            pItem.Units = Unit.Nos;
                            pItem.Size = Size.NOTVALID;
                            break;
                    }

                    pro.Add(pItem);
                    do
                    {
                    } while (barcodeList.Remove(pItem.Barcode));
                }
                else
                {
                    Console.WriteLine("Duplicate");
                }
            }
            db.ProductItems.AddRange(pro);
            Console.WriteLine("Count of: " + pro.Count);
            return db.SaveChanges();
        }

        private void GetUnitSize(string sCode)
        {
            var result = Regex.Match(sCode, @"(.{3})\s*$");
        }

        private static Size GetSize(string sCode)
        {
            Size size;
            if (sCode.EndsWith("S"))
            { size = Size.S; }
            else if (sCode.EndsWith("M"))
            { size = Size.M; }
            else if (sCode.EndsWith("XL"))
            { size = Size.XL; }
            else if (sCode.EndsWith("XXL"))
            { size = Size.XXL; }
            else if (sCode.EndsWith("XXXL"))
            { size = Size.XXXL; }
            else if (sCode.EndsWith("L"))
            { size = Size.L; }
            else
            {
                var result = Regex.Match(sCode, @"(.{2})\s*$").Value;
                switch (result)
                {
                    case "28":
                        size = Size.T28;
                        break;

                    case "30":
                        size = Size.T30;
                        break;

                    case "32":
                        size = Size.T32;
                        break;

                    case "34":
                        size = Size.T34;
                        break;

                    case "36":
                        size = Size.T36;
                        break;

                    case "38":
                        size = Size.T38;
                        break;

                    case "40":
                        size = Size.T40;
                        break;

                    case "42":
                        size = Size.T42;
                        break;

                    case "44":
                        size = Size.T44;
                        break;

                    case "46":
                        size = Size.T46;
                        break;

                    case "48":
                        size = Size.T48;
                        break;

                    default:
                        size = Size.NOTVALID;
                        break;
                }
            }

            return size;
        }

        public static int ProcessInvoiceSummary(eStoreDbContext db, int StoreId, int year)
        {
            var data = db.VoySaleInvoiceSums.Where(c => c.InvoiceDate.Year == year).ToList();
            foreach (var item in data)
            {
                SharedModel.Models.Sales.Invoicing.InvoicePayment payment = new SharedModel.Models.Sales.Invoicing.InvoicePayment { InvoiceNumber = item.InvoiceNo };

                switch (item.PaymentMode)
                {
                    case "CAS":
                        payment.PayMode = PayMode.Cash;
                        payment.CashAmount = item.BillAmt;
                        payment.PaymentRef = "Paid in Cash";
                        break;

                    case "CRD":
                        payment.PayMode = PayMode.Card;
                        payment.NonCashAmount = item.BillAmt;
                        payment.PaymentRef = "Paid by Card";
                        break;

                    case "MIX":
                        payment.PayMode = PayMode.MixPayments;
                        payment.NonCashAmount = item.BillAmt;
                        payment.PaymentRef = "Mix Payment is done!";
                        break;
                    case "SR":
                        payment.PayMode = PayMode.Others;
                        payment.PaymentRef = "Sale Return Note";
                        payment.CashAmount = item.BillAmt;

                        break;
                    default:
                        payment.PayMode = PayMode.MixPayments;
                        payment.NonCashAmount = item.BillAmt;
                        payment.PaymentRef = "Default Payment";
                        break;
                }
                SharedModel.Models.Sales.Invoicing.Invoice invoice = new SharedModel.Models.Sales.Invoicing.Invoice
                {
                    //EntryStatus = EntryStatus.Approved,
                    InvoiceNumber = item.InvoiceNo,
                    //IsNonVendor = false,
                    // IsReadOnly = true,
                    OnDate = item.InvoiceDate,
                    // StoreId = StoreId,
                    // UserId = "AutoAdded",
                    TotalQty = (decimal)item.Quantity,
                    TotalDiscount = item.DiscountAmt,
                    Payment = payment,
                    // TotalItems = 0,
                    TotalAmount = item.BillAmt,
                    TotalTaxAmount = item.TaxAmt,
                    RoundOff = item.RoundOff,

                };

                if (item.InvoiceType == "SALES")
                {
                    invoice.InvoiceType = InvoiceType.Sales;
                }
                else
                {
                    invoice.InvoiceType = InvoiceType.SalesReturn;
                }
                if (item.PaymentMode == "CAS")
                {
                    invoice.CustomerId = 1;
                }
                else
                {
                    invoice.CustomerId = 2;
                }
                db.Invoices.Add(invoice);
            }
            return db.SaveChanges();
        }

        public static int ProcessSaleSummary(eStoreDbContext db, int StoreId, int year)
        {
            var data = db.VoySaleInvoiceSums.Where(c => c.InvoiceDate.Year == year).ToList();
            foreach (var item in data)
            {
                Shared.Models.Sales.InvoicePayment payment = new Shared.Models.Sales.InvoicePayment { InvoiceNo = item.InvoiceNo };
                switch (item.PaymentMode)
                {
                    case "CAS":
                        payment.PayMode = SalePayMode.Cash;
                        payment.CashAmount = item.BillAmt;
                        break;

                    case "CRD":
                        payment.PayMode = SalePayMode.Card;
                        payment.NonCashAmount = item.BillAmt;
                        break;

                    case "MIX":
                        payment.PayMode = SalePayMode.Mix;
                        payment.OtherAmount = item.BillAmt;
                        break;

                    default:
                        payment.PayMode = SalePayMode.Mix;
                        payment.OtherAmount = item.BillAmt;
                        break;
                }
                SaleInvoice invoice = new SaleInvoice
                {
                    EntryStatus = EntryStatus.Approved,
                    InvoiceNo = item.InvoiceNo,
                    IsNonVendor = false,
                    IsReadOnly = true,
                    OnDate = item.InvoiceDate,
                    StoreId = StoreId,
                    UserId = "AutoAdded",
                    TotalQty = (double)item.Quantity,
                    TotalDiscountAmount = item.DiscountAmt,
                    PaymentDetail = payment,
                    TotalItems = 0,
                    TotalBillAmount = item.BillAmt,
                    TotalTaxAmount = item.TaxAmt,
                    RoundOffAmount = item.RoundOff,
                };

                if (item.PaymentMode == "CAS")
                {
                    invoice.CustomerId = 1;
                }
                else
                {
                    invoice.CustomerId = 2;
                }
                db.SaleInvoices.Add(invoice);
            }
            return db.SaveChanges();
        }

        public static int ProcessSaleInvoice(eStoreDbContext db, int StoreId, int year)
        {
            var data = db.VoySaleInvoices.Where(c => c.InvoiceDate.EndsWith("" + year)).ToList();

            var salesman = db.Salesmen.Where(c => c.StoreId == StoreId).Select(c => new { c.SalesmanId, c.SalesmanName }).ToList();
            foreach (var item in data)
            {
                InvoiceItem sale = new InvoiceItem
                {
                    Barcode = item.BARCODE,
                    InvoiceNumber = item.InvoiceNo,
                    TaxAmount = item.TaxAmt,
                    //MRP = item.MRP,
                    Qty = (decimal)item.Quantity,
                    SalesmanId = salesman.Where(c => c.SalesmanName.Contains(item.SalesManName)).Select(c => c.SalesmanId).FirstOrDefault(),
                    BasicPrice = item.BasicAmt,
                    HSNCode = 0,
                    DiscountAmount = item.DiscountAmt,
                    Units = Unit.NoUnit,
                };

                if (!String.IsNullOrEmpty(item.HSNCode))
                    sale.HSNCode = long.Parse(item.HSNCode.Trim());
                db.InvoiceItems.Add(sale);
            }
            return db.SaveChanges();
        }

        public static int ProcessSale(eStoreDbContext db, int StoreId, int year)
        {
            var data = db.VoySaleInvoices.Where(c => c.InvoiceDate.EndsWith("" + year)).ToList();

            var salesman = db.Salesmen.Where(c => c.StoreId == StoreId).Select(c => new { c.SalesmanId, c.SalesmanName }).ToList();
            foreach (var item in data)
            {
                SaleItem sale = new SaleItem
                {
                    BarCode = item.BARCODE,
                    InvoiceNo = item.InvoiceNo,
                    TaxAmount = item.TaxAmt,
                    MRP = item.MRP,
                    Qty = (double)item.Quantity,
                    SalesmanId = salesman.Where(c => c.SalesmanName.Contains(item.SalesManName)).Select(c => c.SalesmanId).FirstOrDefault(),
                    BasicAmount = item.BasicAmt,
                    BillAmount = item.LineTotal,
                    HSNCode = 0,
                    Discount = item.DiscountAmt,
                    Units = Unit.NoUnit
                };

                if (!String.IsNullOrEmpty(item.HSNCode))
                    sale.HSNCode = long.Parse(item.HSNCode.Trim());
                db.SaleItems.Add(sale);
            }
            return db.SaveChanges();
        }

        private static int GetSalesPersonId(eStoreDbContext db, string salesman)
        {
            try
            {
                var id = db.Salesmen.Where(c => c.SalesmanName == salesman).FirstOrDefault().SalesmanId;
                if (id > 0)
                {
                    return id;
                }
                else
                {
                    Salesman sm = new Salesman { SalesmanName = salesman };
                    db.Salesmen.Add(sm);
                    db.SaveChanges();
                    return sm.SalesmanId;
                }
            }
            catch (Exception)
            {
                Salesman sm = new Salesman { SalesmanName = salesman };
                db.Salesmen.Add(sm);
                db.SaveChanges();
                return sm.SalesmanId;
            }
        }

        private static int AddOrUpdateStock(eStoreDbContext db, int StoreId, string barCode, double inQty, double outQty, Unit unit)
        {
            Stock stcks = db.Stocks.Where(c => c.Barcode == barCode).FirstOrDefault();
            if (stcks != null)
            {
                stcks.PurchaseQty += inQty;
                stcks.SaleQty += outQty;
                db.Stocks.Update(stcks);
            }
            else
            {
                stcks = new Stock
                {
                    PurchaseQty = inQty,
                    SaleQty = outQty,
                    Units = unit,
                    StoreId = StoreId,
                    Barcode = barCode,
                    HoldQty = 0,
                    IsReadOnly = false,
                    UserId = "AutoAdd",
                };
                db.Stocks.Add(stcks);
            }
            return db.SaveChanges();
        }

        private static int UpdateProductItem(eStoreDbContext db, string barcode, decimal Mrp, decimal cost, string hsn, Size? size, bool saveIt = false)
        {
            var pItem = db.ProductItems.Where(c => c.Barcode == barcode).FirstOrDefault();
            if (pItem != null)
            {
                pItem.MRP = Mrp;
                pItem.Cost = cost;
                pItem.HSNCode = hsn;
                if (size != null)
                    pItem.Size = (Size)size;
                db.ProductItems.Update(pItem);
            }
            if (saveIt)
                return db.SaveChanges();
            else
                return -111;
        }

        private static void UpdateSaleItem(eStoreDbContext db, string barcode, double qty, decimal price, decimal discount)
        {
        }

        public static bool MissingBarcode(eStoreDbContext db)
        {
            bool flag = false;
            var data = db.ProductItems.Select(c => c.Barcode).ToList();
            var pData = db.VoyPurchaseInwards.Select(c => c.Barcode).Distinct().ToList();
            if (pData.Count != data.Count)
            {
                var purI = db.VoyPurchaseInwards.Select(c => new { c.Barcode, c.ItemDesc, c.StyleCode }).ToList();
                foreach (var item in data)
                {
                    pData.Remove(item);
                }
                if (pData.Count > 0)
                {
                    var Cat = db.Categories.Find(1);
                    foreach (var item in pData)
                    {
                        ProductItem p = new ProductItem
                        {
                            Barcode = item,
                            BrandId = 1,
                            Categorys = ProductCategory.Others,
                            Cost = 0,
                            HSNCode = "",
                            ProductCategory = Cat,
                            ItemDesc = "",
                            MainCategory = Cat,
                            MRP = 0,
                            StyleCode = "",
                            Units = Unit.NoUnit,
                            ProductName = "NOT",
                            ProductType = Cat,
                            Size = Size.NOTVALID,
                            TaxRate = 0
                        };
                        db.ProductItems.Add(p);
                    }
                    int ctr = db.SaveChanges();
                    if (ctr > 0)
                        flag = true;
                }
                else
                    flag = true;
            }
            else
                flag = true;
            return flag;
        }
    }

    public class ProcessorCommand
    {
        public int StoreId { get; set; }
        public int Year { get; set; }
        public string Command { get; set; }
        public string BrandName { get; set; }
    }
}

//SQL Query to Delete Duplicate Row
/** WITH cte AS (
    SELECT CustomerId,
        FirstName,
        LastName,
        Age,
        City,MobileNo, NoOfBills,TotalAmount,Gender,
        ROW_NUMBER() OVER (
            PARTITION BY
                MobileNo
            ORDER BY
                FirstName,
                LastName,
                MobileNo
        ) row_num
     FROM
        [dbo].[Customers]
)
DELETE FROM cte
WHERE row_num > 1;
 */