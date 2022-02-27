using eStore.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text.Json;

namespace eStore.Lib.Exporters
{
    public class DatabaseExpoter
    {
        readonly eStoreDbContext db;
        readonly int StoreId;
        SortedList<string, bool> ExportedList = new SortedList<string, bool>();
        private string folder = "";
        public DatabaseExpoter(eStoreDbContext context, int storeId)
        {
            this.StoreId = storeId;
            this.db = context;
            folder = $"eStoreDbContext/{DateTime.Today.Year}/{DateTime.Today.Month}/{DateTime.Today.Day}";
            Directory.CreateDirectory(folder);
        }

        private async System.Threading.Tasks.Task<bool> ToJsonFile<T>(string tableName, List<T> obj)
        {
            var options = new JsonSerializerOptions()
            {
                MaxDepth = 0,
                IgnoreNullValues = true,
                IgnoreReadOnlyProperties = true,
                WriteIndented = true,
                ReferenceHandler = null//ReferenceHandler.Preserve
            };
            string fn = "";
            try
            {
                if (obj != null && obj.Count > 0)
                {
                    //System.Collections.Generic.List`1[eStore.Shared.Models.Stores.Store]
                    fn = obj.ToString().Replace("System.Collections.Generic.List`1[eStore.Shared", "").Replace(".Models.", "").Replace("]", "").Split(".").Last();

                    using FileStream createStream = File.Create($"{folder}/{fn}.json");
                    await JsonSerializer.SerializeAsync(createStream, obj, options);
                    await createStream.DisposeAsync();
                    ExportedList.Add(fn, true);
                    return true;
                }
                else
                {
                    ExportedList.Add(obj.ToString().Split(".").Last(), false);
                    return false;
                }
            }
            catch (Exception)
            {
                ExportedList.Add(fn, false);
                return false;
            }

        }


        public async System.Threading.Tasks.Task<string> ExportToJson()
        {

            await ToJsonFile("Stores", await db.Stores.ToListAsync());
            await ToJsonFile("Employee", await db.Employees.ToListAsync());
            await ToJsonFile("Attendance ", await db.Attendances.Where(c => c.StoreId == StoreId).ToListAsync());
            await ToJsonFile("BankAccounts ", await db.BankAccounts.ToListAsync());
            await ToJsonFile("BankDeposits ", await db.BankDeposits.ToListAsync());
            await ToJsonFile("Bankpayement ", await db.BankPayments.ToListAsync());

            //await ToJsonFile("Stores", await db.Banks.ToListAsync());
            //await ToJsonFile("Stores", await db.BankWithdrawals.ToListAsync());
            //await ToJsonFile("Stores", await db.BillPayments.ToListAsync());
            //await ToJsonFile("Stores", await db.Brands.ToListAsync());

            //await ToJsonFile("Stores", await db.CardDetails.ToListAsync());
            //await ToJsonFile("Stores", await db.CardMachine.ToListAsync());
            //await ToJsonFile("Stores", await db.CardTranscations.ToListAsync());
            //await ToJsonFile("Stores", await db.CashDetail.ToListAsync());
            //await ToJsonFile("Stores", await db.CashPayments.ToListAsync());
            //await ToJsonFile("Stores", await db.CashReceipts.ToListAsync());

            //await ToJsonFile("Stores", await db.Categories.ToListAsync());
            //await ToJsonFile("Stores", await db.Contacts.ToListAsync());
            //await ToJsonFile("Stores", await db.Customers.ToListAsync());
            //await ToJsonFile("Stores", await db.ElectricityConnections.ToListAsync());
            //await ToJsonFile("Stores", await db.EletricityBills.ToListAsync());
            //await ToJsonFile("Stores", await db.EndOfDays.ToListAsync());
            //await ToJsonFile("Stores", await db.Expenses.ToListAsync());
            //await ToJsonFile("Stores", await db.DailySalePayments.ToListAsync());
            //await ToJsonFile("Stores", await db.DailySales.ToListAsync());
            //await ToJsonFile("Stores", await db.DueRecoverds.ToListAsync());
            //await ToJsonFile("Stores", await db.DuesLists.ToListAsync());
            //await ToJsonFile("Stores", await db.InvoiceItems.ToListAsync());
            //await ToJsonFile("Stores", await db.InvoicePayments.ToListAsync());
            //await ToJsonFile("Stores", await db.Invoices.ToListAsync());
            //await ToJsonFile("Stores", await db.InwardSummaries.ToListAsync());
            //await ToJsonFile("Stores", await db.ItemDatas.ToListAsync());
            //await ToJsonFile("Stores", await db.LedgerEntries.ToListAsync());
            //await ToJsonFile("Stores", await db.LedgerMasters.ToListAsync());
            //await ToJsonFile("Stores", await db.LedgerTypes.ToListAsync());
            //await ToJsonFile("Stores", await db.LocationMasters.ToListAsync());
            //await ToJsonFile("Stores", await db.MixPayments.ToListAsync());
            //await ToJsonFile("Stores", await db.Parties.ToListAsync());
            //await ToJsonFile("Stores", await db.PaymentDetails.ToListAsync());
            //await ToJsonFile("Stores", await db.Payments.ToListAsync());
            //await ToJsonFile("Stores", await db.PaySlips.ToListAsync());
            //await ToJsonFile("Stores", await db.PersonalExpenses.ToListAsync());
            //await ToJsonFile("Stores", await db.PettyCashBooks.ToListAsync());
            //await ToJsonFile("Stores", await db.PrintedSlipBooks.ToListAsync());
            //await ToJsonFile("Stores", await db.ProductItems.ToListAsync());
            //await ToJsonFile("Stores", await db.ProductLists.ToListAsync());
            //await ToJsonFile("Stores", await db.ProductMasters.ToListAsync());
            //await ToJsonFile("Stores", await db.ProductPurchases.ToListAsync());
            //await ToJsonFile("Stores", await db.PurchaseItem.ToListAsync());
            //await ToJsonFile("Stores", await db.PurchaseTaxTypes.ToListAsync());
            //await ToJsonFile("Stores", await db.Receipts.ToListAsync());
            //await ToJsonFile("Stores", await db.RegularInvoices.ToListAsync());
            //await ToJsonFile("Stores", await db.RegularSaleItems.ToListAsync());
            //await ToJsonFile("Stores", await db.RentedLocations.ToListAsync());
            //await ToJsonFile("Stores", await db.Rents.ToListAsync());
            //await ToJsonFile("Stores", await db.Salaries.ToListAsync());
            //await ToJsonFile("Stores", await db.SalaryPayments.ToListAsync());
            //await ToJsonFile("Stores", await db.SaleCardDetails.ToListAsync());
            //await ToJsonFile("Stores", await db.SaleInvoicePayments.ToListAsync());
            //await ToJsonFile("Stores", await db.SaleInvoices.ToListAsync());
            //await ToJsonFile("Stores", await db.SaleItems.ToListAsync());
            //await ToJsonFile("Stores", await db.SalesmanInfo.ToListAsync());
            //await ToJsonFile("Stores", await db.Salesmen.ToListAsync());
            //await ToJsonFile("Stores", await db.SaleTaxTypes.ToListAsync());
            //await ToJsonFile("Stores", await db.SaleWithCustomers.ToListAsync());
            //await ToJsonFile("Stores", await db.StaffAdvanceReceipts.ToListAsync());
            //await ToJsonFile("Stores", await db.StockLists.ToListAsync());
            //await ToJsonFile("Stores", await db.Stocks.ToListAsync());
            //await ToJsonFile("Stores", await db.StoreCloses.ToListAsync());
            //await ToJsonFile("Stores", await db.StoreHolidays.ToListAsync());
            //await ToJsonFile("Stores", await db.StoreOpens.ToListAsync());
            //await ToJsonFile("Stores", await db.Suppliers.ToListAsync());
            //await ToJsonFile("Stores", await db.UsedSlips.ToListAsync());
            //await ToJsonFile("Stores", await db.TailoringDeliveries.ToListAsync());
            //await ToJsonFile("Stores", await db.TalioringBookings.ToListAsync());
            //await ToJsonFile("Stores", await db.Taxes.ToListAsync());
            //await ToJsonFile("Stores", await db.TaxRegisters.ToListAsync());
            //await ToJsonFile("Stores", await db.TranscationModes.ToListAsync());
            //await ToJsonFile("Stores", await db.VoyBrandNames.ToListAsync());
            //await ToJsonFile("Stores", await db.VoyPurchaseInwards.ToListAsync());
            //await ToJsonFile("Stores", await db.VoySaleInvoices.ToListAsync());
            //await ToJsonFile("Stores", await db.VoySaleInvoiceSums.ToListAsync());

            using FileStream createStream = File.Create(folder + "/TableList.json");
            await JsonSerializer.SerializeAsync(createStream, ExportedList);
            await createStream.DisposeAsync();
            return ZipDatabaseFile(folder, $"eStoreDbContext/{DateTime.Today.Year}/{DateTime.Today.Month}/eStoreDbContext_{DateTime.Now.Hour}{DateTime.Now.Minute}.zip");
        }


        private string ZipDatabaseFile(string folder, string fileName)
        {
            try
            {
                ZipFile.CreateFromDirectory(folder, fileName);
                return fileName;
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }

        }

    }
}

