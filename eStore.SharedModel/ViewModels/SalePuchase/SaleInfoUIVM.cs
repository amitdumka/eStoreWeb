using eStore.Database;
using System;
using System.Linq;

namespace eStore.Shared.ViewModels.SalePuchase
{
    public class SaleInfoUIVM
    {
        public decimal TodaySale { get; set; }// totalSale;
        public decimal ManualSale { get; set; }// totalManualSale;
        public decimal MonthlySale { get; set; }// totalMonthlySale;
        public decimal DuesAmount { get; set; }// duesamt;
        public decimal CashInHand { get; set; }// cashinhand;
        public decimal LastMonthSale { get; set; }// totalLastMonthlySale;

        public SaleInfoUIVM GetSaleInfo(eStoreDbContext db, int StoreId)
        {
            //TODO: FixedUI Data
            TodaySale = (decimal)(db.DailySales.Where(c => c.IsManualBill == false && c.SaleDate.Date == DateTime.Today.Date && c.StoreId == StoreId).Sum(c => (double?)c.Amount) ?? 0);
            ManualSale = (decimal)(db.DailySales.Where(c => c.IsManualBill == true && c.SaleDate.Date == DateTime.Today.Date && c.StoreId == StoreId).Sum(c => (double?)c.Amount) ?? 0);
            MonthlySale = (decimal)(db.DailySales.Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month && c.StoreId == StoreId).Sum(c => (double?)c.Amount) ?? 0);
            LastMonthSale = (decimal)(db.DailySales.Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month - 1 && c.StoreId == StoreId).Sum(c => (double?)c.Amount) ?? 0);
            DuesAmount = (decimal)(db.DuesLists.Where(c => c.IsRecovered == false && c.StoreId == StoreId).Sum(c => (double?)c.Amount) ?? 0);
            CashInHand = (decimal)0.00;
            try
            {
                var chin = db.CashInHands.Where(c => c.CIHDate.Date == DateTime.Today.Date && c.StoreId == StoreId).FirstOrDefault();
                if (chin != null)
                    CashInHand = chin.InHand;
                else
                {
                    // Utility.ProcessOpenningClosingBalance(db, DateTime.Today, false, true);
                    //TODO:   new CashWork().ProcessOpenningBalance(db, DateTime.Today, StoreCodeId, true);

                    CashInHand = (decimal)0.00;
                }
            }
            catch (Exception)
            {
                // Utility.ProcessOpenningClosingBalance(db, DateTime.Today, false, true);
                //TODO:   new CashWork().ProcessOpenningBalance(db, DateTime.Today, StoreCodeId, true);
                CashInHand = (decimal)0.00;
                //Log.Error("Cash In Hand is null");
            }
            return this;
        }
    }
}