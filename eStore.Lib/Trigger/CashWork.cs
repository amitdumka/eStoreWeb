using eStore.Database;
using eStore.Shared.Models.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eStore.BL.Triggers
{
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
                    if (saveit)
                        db.SaveChanges();
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
                    if (saveit)
                        db.SaveChanges();
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