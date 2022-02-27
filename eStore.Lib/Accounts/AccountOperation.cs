using eStore.Database;
using eStore.Shared.Models.Accounts;
using System;
using System.Linq;

namespace eStore.Lib.Accounts
{
    public class AccountOperation
    {
        public static int CreateLedgerMaster(eStoreDbContext db, Party party)
        {
            LedgerMaster master = new LedgerMaster
            {
                CreatingDate = DateTime.Today,
                PartyId = party.PartyId,
                LedgerTypeId = party.LedgerTypeId
            };
            db.Add(master);
            return db.SaveChanges();
        }

        public static int UpdateLedgerMaster(eStoreDbContext db, Party party)
        {
            var master = db.LedgerMasters.Where(c => c.PartyId == party.PartyId).FirstOrDefault();
            if (master != null)
            {
                master.LedgerTypeId = party.LedgerTypeId;
                db.Update(master);
                return db.SaveChanges();
            }
            else
                return -1;
        }
    }
}