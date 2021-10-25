using eStore.Database;
using System;

namespace eStore.BL.Importer
{
    public class UploadProcessor
    {
        public static bool ProcessUpload(eStoreDbContext db, ProcessorCommand cmd)
        {
            try
            {
                int StoreId = cmd.StoreId;
                int Year = cmd.Year;
                switch (cmd.Command)
                {
                    case "DailySale":
                        if (VoyProcesser.ProcessDailySale(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;

                    case "Brand":
                        if (VoyProcesser.ProcessBrand(db) > 0)
                            return true;
                        else
                            return false;

                    case "PItem":
                        if (VoyProcesser.ProcessPitem(db) > 0)
                            return true;
                        else
                            return false;

                    case "PurchaseInward":
                        if (VoyProcesser.ProcessInwardSummary(db, cmd.StoreId, cmd.Year) > 0)
                            return true;
                        else
                            return false;

                    case "Sale":
                        if (VoyProcesser.ProcessSaleSummary(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;
                    case "Invoice":
                        if (VoyProcesser.ProcessInvoiceSummary(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;

                    case "SaleItem":
                        if (VoyProcesser.ProcessSale(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;
                    case "InvoiceItem":
                        if (VoyProcesser.ProcessSaleInvoice(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;

                    case "Customer":
                        if (VoyProcesser.ProcessCusomterSale(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;

                    case "PurchaseItem":
                        if (VoyProcesser.ProcessPurchase(db, cmd.StoreId, cmd.Year) > 0)
                            return true;
                        else
                            return false;
                    case "StockGeneration":
                        if (VoyProcesser.GenerateStockFromPurchase(db, cmd.StoreId) > 0)
                            return true;
                        else
                            return false;
                    case "StockUpdation":
                        if (VoyProcesser.UpdateStockFromSale(db, cmd.StoreId) > 0)
                            return true;
                        else
                            return false;

                    case "Other":

                    default:
                        return false;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: " + e.Message);
                return false;
            }
        }

        public bool ProcessVoyagerUpload(eStoreDbContext db, ProcessorCommand cmd)
        {
            try
            {
                int StoreId = cmd.StoreId;
                int Year = cmd.Year;
                switch (cmd.Command)
                {
                    case "MISSINGITEM":
                        return VoyProcesser.MissingBarcode(db);

                    case "DailySale":
                        if (VoyProcesser.ProcessDailySale(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;

                    case "Brand":   //Over
                        if (VoyProcesser.ProcessBrand(db) > 0)
                            return true;
                        else
                            return false;

                    case "Product":    //Over
                        if (new VoyProcesser().ProcessProductItem(db, cmd.BrandName) > 0)
                            return true;
                        else
                            return false;

                    case "ProductItem":     //Over
                        if (VoyProcesser.ProcessItem(db) > 0)
                            return true;
                        else
                            return false;

                    case "PItem":    //Over
                        if (VoyProcesser.ProcessPitem(db) > 0)
                            return true;
                        else
                            return false;

                    case "PurchaseInward":  //Over
                        if (VoyProcesser.ProcessInwardSummary(db, cmd.StoreId, cmd.Year) > 0)
                            return true;
                        else
                            return false;

                    case "PurchaseItem":    //Over
                        if (VoyProcesser.ProcessPurchase(db, cmd.StoreId, cmd.Year) > 0)
                            return true;
                        else
                            return false;

                    case "Sale":             //Over
                        if (VoyProcesser.ProcessSaleSummary(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;

                    case "SaleItem":
                        if (VoyProcesser.ProcessSale(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;

                    case "Customer":
                        if (VoyProcesser.ProcessCusomterSale(db, StoreId, Year) > 0)
                            return true;
                        else
                            return false;

                    case "Other":

                    default:
                        return false;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: " + e.Message);
                return false;
            }
        }
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