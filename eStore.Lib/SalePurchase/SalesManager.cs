using eStore.BL.Triggers;
using eStore.Database;
using eStore.Shared.Models.Sales;
using System.Linq;

namespace eStore.BL.SalePurchase
{
    public class SalesManager
    {
        private void UpDateAmount(eStoreDbContext db, DailySale dailySale, bool IsEdit)
        {
            if (IsEdit)
            {
                if (dailySale.PayMode == PayMode.Cash && dailySale.CashAmount > 0)
                {
                    CashTrigger.UpdateCashInHand(db, dailySale.SaleDate, 0 - dailySale.CashAmount);
                }
                //TODO: in future make it more robust
                if (dailySale.PayMode != PayMode.Cash && dailySale.PayMode != PayMode.Coupons && dailySale.PayMode != PayMode.Points)
                {
                    CashTrigger.UpdateCashInBank(db, dailySale.SaleDate, 0 - (dailySale.Amount - dailySale.CashAmount));
                }
            }
            else
            {
                if (dailySale.PayMode == PayMode.Cash && dailySale.CashAmount > 0)
                {
                    CashTrigger.UpdateCashInHand(db, dailySale.SaleDate, dailySale.CashAmount);
                }
                //TODO: in future make it more robust
                if (dailySale.PayMode != PayMode.Cash && dailySale.PayMode != PayMode.Coupons && dailySale.PayMode != PayMode.Points)
                {
                    CashTrigger.UpdateCashInBank(db, dailySale.SaleDate, dailySale.Amount - dailySale.CashAmount);
                }
            }
        }

        private void UpdateDueAmount(eStoreDbContext db, DailySale dailySale, bool IsEdit)
        {
            if (IsEdit)
            {
                var dId = db.DuesLists.Where(c => c.DailySaleId == dailySale.DailySaleId).FirstOrDefault();
                if (dId != null)
                {
                    if (dailySale.IsDue)
                    {
                        decimal dueAmt;
                        if (dailySale.Amount != dailySale.CashAmount)
                        {
                            dueAmt = dailySale.Amount - dailySale.CashAmount;
                        }
                        else
                            dueAmt = dailySale.Amount;

                        DuesList dl = new DuesList()
                        {
                            DuesListId = dId.DuesListId,
                            Amount = dueAmt,
                            DailySale = dailySale,
                            DailySaleId = dailySale.DailySaleId,
                            StoreId = dailySale.StoreId
                            ,
                            IsPartialRecovery = false,
                            IsRecovered = false,
                            UserId = dailySale.UserId,
                        };

                        if (dId.RecoveryDate != null)
                            dl.RecoveryDate = dId.RecoveryDate;

                        db.DuesLists.Update(dl);
                    }
                    else
                        db.DuesLists.Remove(dId);
                }
                else
                {
                    //TODO: Handle this
                }
            }
            else
            {
                decimal dueAmt;
                if (dailySale.Amount != dailySale.CashAmount)
                {
                    dueAmt = dailySale.Amount - dailySale.CashAmount;
                }
                else
                    dueAmt = dailySale.Amount;

                DuesList dl = new DuesList()
                {
                    Amount = dueAmt,
                    DailySale = dailySale,
                    DailySaleId = dailySale.DailySaleId,
                    StoreId = dailySale.StoreId
                    ,
                    IsPartialRecovery = false,
                    IsRecovered = false,
                    UserId = dailySale.UserId
                };
                db.DuesLists.Add(dl);
            }
        }

        private void UpdateSalesRetun(eStoreDbContext db, DailySale dailySale, bool IsEdit)
        {
            if (IsEdit)
            {
                if (dailySale.PayMode == PayMode.Cash && dailySale.CashAmount > 0)
                {
                    CashTrigger.UpDateCashOutHand(db, dailySale.SaleDate, 0 - dailySale.CashAmount);
                }
                //TODO: in future make it more robust
                if (dailySale.PayMode != PayMode.Cash && dailySale.PayMode != PayMode.Coupons && dailySale.PayMode != PayMode.Points)
                {
                    CashTrigger.UpDateCashOutBank(db, dailySale.SaleDate, 0 - (dailySale.Amount - dailySale.CashAmount));
                }
                //dailySale.Amount = 0 - dailySale.Amount;
            }
            else
            {
                if (dailySale.PayMode == PayMode.Cash && dailySale.CashAmount > 0)
                {
                    CashTrigger.UpDateCashOutHand(db, dailySale.SaleDate, dailySale.CashAmount);
                }
                //TODO: in future make it more robust
                if (dailySale.PayMode != PayMode.Cash && dailySale.PayMode != PayMode.Coupons && dailySale.PayMode != PayMode.Points)
                {
                    CashTrigger.UpDateCashOutBank(db, dailySale.SaleDate, dailySale.Amount - dailySale.CashAmount);
                }
                dailySale.Amount = 0 - dailySale.Amount;
            }
        }

        public void OnInsert(eStoreDbContext db, DailySale dailySale)
        {
            if (!dailySale.IsSaleReturn)
            { //Normal Bill
                if (dailySale.IsDue)
                {
                    //Due Bill
                    UpdateDueAmount(db, dailySale, false);
                }
                UpDateAmount(db, dailySale, false);
            }
            else
            {
                //Sale Return Bill
                UpdateSalesRetun(db, dailySale, false);
            }
            db.SaveChanges();
            //TODO: SaleBot.NotifySale(db, dailySale.SalesmanId, dailySale.Amount);
        }

        public void OnDelete(eStoreDbContext db, DailySale dailySale)
        {
            //TODO: Handle for Dues
            if (dailySale.IsSaleReturn)
            {
                UpdateSalesRetun(db, dailySale, true);
            }
            else
            {
                if (dailySale.IsDue)
                {
                    UpdateDueAmount(db, dailySale, true);
                }
                else
                {
                    //TODO: Add this option in Create and Edit also
                    // Handle when payment is done by Coupons and Points.
                    // Need to create table to create Coupn and Royalty point.
                    // Points will go in head for Direct Expenses
                    // Coupon Table will be colloum for TAS Coupon and Apajita Retails.

                    //TODO: Need to handle is.
                    // If payment is cash and cashamount is zero then need to handle this option also
                    // may be error entry , might be due.

                    // throw new Exception();
                }

                UpDateAmount(db, dailySale, true);
            }
            //db.SaveChanges ();
        }

        public void OnUpdate(eStoreDbContext db, DailySale dailySale)
        {
            //TODO:SaleManager:OnUpdate
            var oldSale = db.DailySales.Find(dailySale.DailySaleId);

            UpDateAmount(db, oldSale, true);

            if (oldSale.IsSaleReturn)
            {
                // SaleRetun
            }
            else
            {
                // Normal Bill
                if (oldSale.IsDue)
                {
                    if (!dailySale.IsDue)
                    {
                        //UpdateSalesRetun (db, oldSale, true);
                        UpdateDueAmount(db, dailySale, true);
                    }
                    else
                    {
                        UpdateDueAmount(db, dailySale, true);
                    }
                }
                else
                { //TODO: Add due
                }

                UpDateAmount(db, oldSale, true);
                UpDateAmount(db, dailySale, false);
            }

            //TODO: SaleBot.NotifySale(db, dailySale.SalesmanId, dailySale.Amount);
        }
    }
}