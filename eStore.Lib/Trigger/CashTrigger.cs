using eStore.Database;
using eStore.Shared.Models.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace eStore.BL.Triggers
{
    /// <summary>
    ///
    /// </summary>
    public class CashTrigger : ITrigger
    {
        void ITrigger.OnChange<T>(eStoreDbContext db, T objectValue)
        {
            throw new NotImplementedException();
        }

        void ITrigger.OnDelete<T>(eStoreDbContext db, T objectValue)
        {
            throw new NotImplementedException();
        }

        void ITrigger.OnInsert<T>(eStoreDbContext db, T objectValue)
        {
            throw new NotImplementedException();
        }

        void ITrigger.OnInsertOrUpdate<T>(eStoreDbContext db, T objectValue, bool isUpdate)
        {
            throw new NotImplementedException();
        }

        void ITrigger.OnUpdate<T>(eStoreDbContext db, T objectValue)
        {
            throw new NotImplementedException();
        }

        //Edit Based on Required Below Function
        //Create CashInHand/Bank
        public static void CreateCashInHand(eStoreDbContext db, DateTime date, decimal inAmt, decimal outAmt, bool saveit = false)
        {
            // throw new NotImplementedException();
            //TODO: make new age function error free
            //One Day Back
            DateTime yDate = date.AddDays(-1);
            CashInHand yesterday = db.CashInHands.Where(c => c.CIHDate == yDate).FirstOrDefault();
            CashInHand today = new CashInHand() { CashIn = inAmt, CashOut = outAmt, CIHDate = date, ClosingBalance = 0, OpenningBalance = 0 };

            if (yesterday != null)
            {
                yesterday.ClosingBalance = yesterday.OpenningBalance + yesterday.CashIn - yesterday.CashOut;
                today.ClosingBalance = today.OpenningBalance = yesterday.ClosingBalance;
                db.CashInHands.Add(today);
                if (saveit)
                    db.SaveChanges();
            }
            else
            {
                //if (db.CashInHands.Count() > 0)
                //    throw new Exception();
                //TODO: if yesterday one or day back data not present handel this
                //else
                {
                    today.ClosingBalance = today.OpenningBalance = 0;
                    db.CashInHands.Add(today);
                    if (saveit)
                        db.SaveChanges();
                }
            }
        }

        public static void CreateCashInBank(eStoreDbContext db, DateTime date, decimal inAmt, decimal outAmt, bool saveit = false)
        {
            //throw new NotImplementedException();

            CashInBank today;

            DateTime yDate = date.AddDays(-1);
            CashInBank yesterday = db.CashInBanks.Where(c => c.CIBDate == yDate).FirstOrDefault();

            today = new CashInBank() { CashIn = inAmt, CashOut = outAmt, CIBDate = date, ClosingBalance = 0, OpenningBalance = 0 };

            if (yesterday != null)
            {
                yesterday.ClosingBalance = yesterday.OpenningBalance + yesterday.CashIn - yesterday.CashOut;
                today.ClosingBalance = today.OpenningBalance = yesterday.ClosingBalance;
                db.CashInBanks.Add(today);
                if (saveit)
                    db.SaveChanges();
            }
            else
            {
                //TODO: need to option to create cashinbank entry for all missing entry and correct
                //if (db.CashInBanks.Count() > 0)
                //    throw new Exception();
                //else
                {
                    today.ClosingBalance = today.OpenningBalance = 0;
                    db.CashInBanks.Add(today);
                    if (saveit)
                        db.SaveChanges();
                }
            }
        }

        //Update CashInHand/Bank
        public static void UpdateCashInHand(eStoreDbContext db, DateTime dateTime, decimal Amount, bool saveit = false)
        {
            //throw new NotImplementedException();
            CashInHand cashIn = db.CashInHands.Where(d => d.CIHDate == dateTime).FirstOrDefault();
            if (cashIn != null)
            {
                cashIn.CashIn += Amount;
                db.Entry(cashIn).State = EntityState.Modified;
                if (saveit)
                    db.SaveChanges();
            }
            else
            {
                CreateCashInHand(db, dateTime, Amount, 0, saveit);
            }
        }

        public static void UpdateCashInBank(eStoreDbContext db, DateTime dateTime, decimal Amount, bool saveit = false)
        {
            //throw new NotImplementedException();
            CashInBank cashIn = db.CashInBanks.Where(d => d.CIBDate == dateTime).FirstOrDefault();
            if (cashIn != null)
            {
                cashIn.CashIn += Amount;
                db.SaveChanges();
            }
            else
            {
                CreateCashInBank(db, dateTime, Amount, 0, saveit);
            }
        }

        //Update CashOutHand/Bank
        public static void UpDateCashOutHand(eStoreDbContext db, DateTime dateTime, decimal Amount, bool saveit = false)
        {
            //throw new NotImplementedException();
            CashInHand cashIn = db.CashInHands.Where(d => d.CIHDate == dateTime).FirstOrDefault();
            if (cashIn != null)
            {
                cashIn.CashOut += Amount;
                db.Entry(cashIn).State = EntityState.Modified;
                if (saveit)
                    db.SaveChanges();
            }
            else
            {
                CreateCashInHand(db, dateTime, 0, Amount, saveit);
            }
        }

        public static void UpDateCashOutBank(eStoreDbContext db, DateTime dateTime, decimal Amount, bool saveit = false)
        {
            //throw new NotImplementedException();

            CashInBank cashIn = db.CashInBanks.Where(d => d.CIBDate == dateTime).FirstOrDefault();
            if (cashIn != null)
            {
                cashIn.CashOut += Amount;
                db.SaveChanges();
            }
            else
            {
                CreateCashInBank(db, dateTime, 0, Amount, saveit);
            }
        }

        //Suspense
        public static void UpdateSuspenseAccount(eStoreDbContext db, DateTime dateTime, decimal Amount, bool isOut, string referanceDetails, bool isUpdate, bool saveit = false)
        {
            //Implement on Edit/Update so some thing can be done for that
            //TODO: Implement this urgent basis
            throw new NotImplementedException();
        }
    }
}