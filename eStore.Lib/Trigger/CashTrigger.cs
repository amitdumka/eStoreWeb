
using System;
using System.Collections.Generic;
using System.Linq;
using eStore.DL.Data;
using eStore.Shared.Models.Common;
using Microsoft.EntityFrameworkCore;

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
                if (saveit) db.SaveChanges();
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
                    if (saveit) db.SaveChanges();
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
                if (saveit) db.SaveChanges();
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
                    if (saveit) db.SaveChanges();
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
                if (saveit) db.SaveChanges();
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
                if (saveit) db.SaveChanges();
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
    public class CashWork
    {
        //StoreBased Action 
        public void ProcessOpenningBalance(eStoreDbContext db, DateTime date, int StoreId, bool saveit = false)
        {

            CashInHand today;
            today = db.CashInHands.Where(c => c.CIHDate.Date == date.Date && c.StoreId == StoreId).FirstOrDefault();

            DateTime yDate = date.AddDays(-1);
            CashInHand yesterday = db.CashInHands.Where(c => c.CIHDate.Date.Date == yDate.Date.Date && c.StoreId == StoreId).FirstOrDefault();
            bool isNew = false;
            if (today == null)
            {
                today = new CashInHand() { CashIn = 0, CashOut = 0, CIHDate = date, ClosingBalance = 0, OpenningBalance = 0, StoreId = StoreId };
                isNew = true;
            }

            if (yesterday == null)
            {
                yesterday = new CashInHand() { CashIn = 0, CashOut = 0, CIHDate = yDate, ClosingBalance = 0, OpenningBalance = 0, StoreId = StoreId };
                today.OpenningBalance = 0;
                today.ClosingBalance = today.OpenningBalance + today.CashIn - today.CashOut;
                db.CashInHands.Add(yesterday);
            }
            else
            {
                yesterday.ClosingBalance = yesterday.OpenningBalance + yesterday.CashIn - yesterday.CashOut;
                today.OpenningBalance = yesterday.ClosingBalance;
                today.ClosingBalance = today.OpenningBalance + today.CashIn - today.CashOut;
                db.Entry(yesterday).State = EntityState.Modified;

            }

            if (isNew)
                db.CashInHands.Add(today);
            else
                db.Entry(today).State = EntityState.Modified;

            if (saveit)
                db.SaveChanges();
        }
        //StoreBased Action
        public void ProcessClosingBalance(eStoreDbContext db, DateTime date, int StoreId, bool saveit = false)
        {
            CashInHand today;
            today = db.CashInHands.Where(c => c.CIHDate.Date == date.Date && c.StoreId == StoreId).FirstOrDefault();
            if (today != null)
            {
                if (today.ClosingBalance != today.OpenningBalance + today.CashIn - today.CashOut)
                {
                    today.ClosingBalance = today.OpenningBalance + today.CashIn - today.CashOut;
                    db.Entry(today).State = EntityState.Modified;
                    if (saveit) db.SaveChanges();
                }

            }
        }
        //StoreBased Action
        public void ProcessBankOpenningBalance(eStoreDbContext db, DateTime date, int StoreId, bool saveit = false)
        {

            CashInBank today;
            today = db.CashInBanks.Where(c => c.CIBDate.Date == date.Date && c.StoreId == StoreId).FirstOrDefault();

            DateTime yDate = date.AddDays(-1);
            CashInBank yesterday = db.CashInBanks.Where(c => c.CIBDate.Date == yDate.Date && c.StoreId == StoreId).FirstOrDefault();

            bool isNew = false;
            if (today == null)
            {
                today = new CashInBank() { CashIn = 0, CashOut = 0, CIBDate = date, ClosingBalance = 0, OpenningBalance = 0, StoreId = StoreId };
                isNew = true;
            }

            if (yesterday == null)
            {
                yesterday = new CashInBank() { CashIn = 0, CashOut = 0, CIBDate = yDate, ClosingBalance = 0, OpenningBalance = 0, StoreId = StoreId };
                today.OpenningBalance = 0;
                today.ClosingBalance = today.OpenningBalance + today.CashIn - today.CashOut;
                db.CashInBanks.Add(yesterday);
            }
            else
            {
                yesterday.ClosingBalance = yesterday.OpenningBalance + yesterday.CashIn - yesterday.CashOut;

                today.OpenningBalance = yesterday.ClosingBalance;
                today.ClosingBalance = today.OpenningBalance + today.CashIn - today.CashOut;

                db.Entry(yesterday).State = EntityState.Modified;

            }

            if (isNew)
                db.CashInBanks.Add(today);
            else
                db.Entry(today).State = EntityState.Modified;

            if (saveit)
                db.SaveChanges();
        }

        //StoreBased Action
        public void ProcessBankClosingBalance(eStoreDbContext db, DateTime date, int StoreId, bool saveit = false)
        {
            CashInBank today;
            today = db.CashInBanks.Where(c => c.CIBDate.Date == date.Date && c.StoreId == StoreId).FirstOrDefault();
            if (today != null)
            {
                if (today.ClosingBalance != today.OpenningBalance + today.CashIn - today.CashOut)
                {
                    today.ClosingBalance = today.OpenningBalance + today.CashIn - today.CashOut;
                    db.Entry(today).State = EntityState.Modified;
                    if (saveit) db.SaveChanges();
                }

            }
        }
        //StoreBased Action
        public void JobOpeningClosingBalance(eStoreDbContext db, int StoreId)
        {
            ProcessOpenningBalance(db, DateTime.Today, StoreId, true);
            ProcessClosingBalance(db, DateTime.Today, StoreId, true);
            ProcessBankOpenningBalance(db, DateTime.Today, StoreId, true);
            ProcessBankClosingBalance(db, DateTime.Today, StoreId, true);
        }
        //StoreBased Action
        public void CreateNextDayOpenningBalance(eStoreDbContext db, DateTime date, int StoreId, bool saveit = false)
        {
            date = date.AddDays(1);// Next Day
            ProcessOpenningBalance(db, date, StoreId, saveit); //TODO: many lines is repeating so create inline call or make new function
            ProcessBankOpenningBalance(db, date, StoreId, saveit);//TODO: many lines is repeating so create inline call or make new function
        }
        //StoreBased Action
        public decimal GetClosingBalance(eStoreDbContext db, DateTime forDate, int StoreId, bool IsBank = false)
        {
            if (IsBank)
            {
                var bal = db.CashInBanks.Where(c => c.CIBDate.Date == forDate.Date && c.StoreId == StoreId).Select(c => new { c.CashIn, c.CashOut, c.OpenningBalance }).FirstOrDefault();
                if (bal != null)
                {
                    return (bal.OpenningBalance + bal.CashIn - bal.CashOut);
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                var bal = db.CashInHands.Where(c => c.CIHDate.Date == forDate.Date && c.StoreId == StoreId).Select(c => new { c.CashIn, c.CashOut, c.OpenningBalance }).FirstOrDefault();
                if (bal != null)
                {
                    return (bal.OpenningBalance + bal.CashIn - bal.CashOut);
                }
                else
                {
                    return 0;
                }
            }

        }
        //StoreBased Action
        public void CashInHandCorrectionForMonth(eStoreDbContext db, DateTime forDate, int StoreId)
        {
            IEnumerable<CashInHand> cashs = db.CashInHands.Where(c => c.CIHDate.Month == forDate.Month && c.CIHDate.Year == forDate.Year && c.StoreId == StoreId).OrderBy(c => c.CIHDate);

            decimal cBal = 0;

            if (cashs != null && cashs.Any())
            {
                cBal = GetClosingBalance(db, cashs.First().CIHDate.AddDays(-1), StoreId);
                if (cBal == 0)
                    cBal = cashs.First().OpenningBalance;

                foreach (var cash in cashs)
                {
                    cash.OpenningBalance = cBal;

                    cash.ClosingBalance = cash.OpenningBalance + cash.CashIn - cash.CashOut;
                    cBal = cash.ClosingBalance;

                    db.Entry(cash).State = EntityState.Modified;

                }
                try
                {

                    db.SaveChanges();
                }
                catch (Exception)
                {

                    // Log.Info("CashInHand Correction failed");
                }

            }

        }

        //StoreBased Action
        public void CashInBankCorrectionForMonth(eStoreDbContext db, DateTime forDate, int StoreId)
        {
            IEnumerable<CashInBank> cashs = db.CashInBanks.Where(c => c.CIBDate.Month == forDate.Month && c.CIBDate.Year == forDate.Year && c.StoreId == StoreId).OrderBy(c => c.CIBDate);

            decimal cBal = 0;

            if (cashs != null && cashs.Any())
            {
                cBal = GetClosingBalance(db, cashs.First().CIBDate, StoreId);
                if (cBal == 0)
                    cBal = cashs.First().OpenningBalance;

                foreach (var cash in cashs)
                {
                    cash.OpenningBalance = cBal;

                    cash.ClosingBalance = cash.OpenningBalance + cash.CashIn - cash.CashOut;
                    cBal = cash.ClosingBalance;

                    db.Entry(cash).State = EntityState.Modified;

                }
                try
                {

                    db.SaveChanges();
                }
                catch (Exception)
                {

                    // Log.Info("CashInBank Correction failed");
                }

            }

        }



    }
}

