using eStore.BL.Mails;
using eStore.Database;
using eStore.Shared.Models.Banking;
using eStore.Shared.Models.Common;
using eStore.Shared.Models.Purchases;
using eStore.Shared.Uploader;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace eStore.BL
{
    public class DataImpoter
    {
        private eStoreDbContext _db;

        public string ImportJson(eStoreDbContext db, string mode, dynamic jsonData, string email, string callbackUrl)
        {
            _db = db;
            string returndata = JsonSerializer.Serialize(jsonData);
            try
            {
                switch (mode)
                {
                    case "Sales":
                        break;

                    case "BankAccountInfo":
                        break;

                    case "BankDeposits":
                        break;

                    case "BankWithdrawal":
                        break;

                    case "AccountNumber":
                        break;

                    case "ChequeLogs":
                        break;

                    case "Bank":
                        var data = JsonSerializer.Deserialize<List<Bank>>(returndata);
                        returndata = $"DataLength:{data.Count}";
                        break;
                    case "StockList":

                        var stockList = JsonSerializer.Deserialize<List<StockListDto>>(returndata);
                        returndata = $"DataLength:{stockList.Count}";
                        break;
                    default:
                        returndata = "Option not Supported";
                        break;
                }
                string rData = "";
                int recordCount = db.SaveChanges();

                if (recordCount > 0)
                {
                    rData += $"DataLength:{recordCount}";
                }
                else if (recordCount < 0)
                    rData += "Error: Option not Supported!";
                else
                    rData += "Error: Unkown Error!";

                MyMail.SendEmail($"Voy Uploader Status For Command: {mode}\t Msg={rData}\t Record Added: {recordCount}", returndata, "amitnarayansah@gmail.com");
                return rData;

            }
            catch (Exception e)
            {
                returndata = "Error: " + e.Message;
            }

            return returndata;
        }

        private void NotifyByUrl(string callbackUrl, string message)
        {
        }

        private void NotifyByEmail(string email, string message)
        {
        }

        private SortedList<int, string> AddBanks(List<Bank> banks)
        {
            SortedList<int, string> duplicateList = new SortedList<int, string>();
            foreach (var bank in banks)
            {
                if (_db.Set<Bank>().Any(x => x.BankName == bank.BankName))
                {
                    duplicateList.Add(bank.BankId, bank.BankName);
                    banks.Remove(bank);
                }
            }
            _db.Banks.AddRange(banks);
            return duplicateList;
        }

        private void AddBrand(List<Brand> brands)
        {
        }

        private void Category(List<Category> categories)
        {
        }

        private void ProductItem(List<ProductItem> productItems)
        {
        }

        private void Supplier()
        {
        }

        private void Stock()
        {
        }

        private void PurchaseItem()
        {
        }

        private void PurchaseTaxType()
        {
        }

        private void StockList(eStoreDbContext db, List<StockListDto> dto)
        {
            foreach (var item in dto)
            {
                StockList sl = new StockList
                {
                    Barcode = item.Barcode,
                    Count = 1,
                    LastAccess = DateTime.Now,
                    Stock = 1
                };
                db.StockLists.Add(sl);
            }
            //return db.SaveChanges();

        }
    }
    public class StockListDto
    {
        public string Barcode { get; set; }
        public string ItemName { get; set; }
    }

    //public class SaveData<T>
    //{
    //    public static async System.Threading.Tasks.Task<int> SaveAsync(IEnumerable<T> dataList, eStoreDbContext db)
    //    {
    //        IEnumerable<T> dl = (IEnumerable<T>) dataList;

    //        db.AddRange ((IEnumerable<T>) dl);
    //        return await db.SaveChangesAsync ();
    //    }
    //}

    public class ImportVoyData
    {
        public static async System.Threading.Tasks.Task<string> ImportJsonAsync(eStoreDbContext db, string Command, dynamic jsonData, string email, string callbackUrl)
        {
            string returndata = JsonSerializer.Serialize(jsonData);
            int recordCount = 0;
            string rData = "";
            try
            {
                switch (Command)
                {
                    case "VoyBrandName":
                        var jd = JsonSerializer.Deserialize<IEnumerable<VoyBrandName>>(returndata);
                        await db.AddRangeAsync(jd);
                        break;

                    case "ProductMaster":

                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<ProductMaster>>(returndata));
                        break;

                    case "ProductList":

                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<ProductList>>(returndata));
                        break;

                    case "TaxRegister":

                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<TaxRegister>>(returndata));
                        break;

                    case "VoySaleInvoice":

                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<VoySaleInvoice>>(returndata));
                        break;

                    case "VoySaleInvoiceSum":

                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<VoySaleInvoiceSum>>(returndata));
                        break;

                    case "VoyPurchaseInward":

                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<VoyPurchaseInward>>(returndata));
                        break;

                    case "InwardSummary":

                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<InwardSummary>>(returndata));
                        break;

                    case "SaleWithCustomer":

                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<SaleWithCustomer>>(returndata));
                        break;

                    case "ItemCategory":
                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<Category>>(returndata));

                        break;

                    case "ItemData":
                        await db.AddRangeAsync(JsonSerializer.Deserialize<IEnumerable<ItemData>>(returndata));

                        break;

                    default:
                        recordCount = -1;
                        rData = "Option Not Found!\t";
                        break;
                }

                recordCount = await db.SaveChangesAsync();

                if (recordCount > 0)
                {
                    rData += $"DataLength:{recordCount}";
                }
                else if (recordCount < 0)
                    rData += "Error: Option not Supported!";
                else
                    rData += "Error: Unkown Error!";

                MyMail.SendEmail($"Voy Uploader Status For Command: {Command}\t Msg={rData}\t Record Added: {recordCount}", returndata, "amitnarayansah@gmail.com");
                return rData;
            }
            catch (Exception e)
            {
                MyMail.SendEmail($"Error On Voy Uploader For Comamnd : {Command}\t . {DateTime.Now.ToString()}", $"Error Occured!.Msg= {e.Message}\n Inner Exp= {e.InnerException}\n Stack Tracce= {e.StackTrace} ", "amitnarayansah@gmail.com");
                return "Error: " + e.Message;
            }
        }
    }
}