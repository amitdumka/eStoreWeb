using eStore.Database;
using eStore.Shared.Models.Payroll;
using eStore.Shared.Models.Stores;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace eStore.BL.Commons
{
    public class StoreManager
    {
        public static async System.Threading.Tasks.Task<int> AddStoreCloseAsync(eStoreDbContext db, int StoreId)
        {
            StoreClose sc = new StoreClose
            {
                IsReadOnly = true,
                StoreId = StoreId,
                UserId = "Admin",
                Remarks = "",
                ClosingDate = DateTime.Now
            };
            //TODO: there should be store opening and Closing Date;
            //TODO: need to check system and brower type to verify for malpractice.
            await db.StoreCloses.AddAsync(sc);
            return await db.SaveChangesAsync();
        }

        public static async System.Threading.Tasks.Task<int> AddStoreOpenningAsync(eStoreDbContext db, int StoreId)
        {
            StoreOpen so = new StoreOpen { IsReadOnly = true, OpenningTime = DateTime.Now, Remarks = "", StoreId = StoreId, UserId = "Admin" };
            await db.StoreOpens.AddAsync(so);
            return await db.SaveChangesAsync();
        }

        public static PettyCashBook GeneratePettyCashBook(eStoreDbContext db, int storeId)
        {
            DateTime date = DateTime.Today.Date;
            PettyCashBook pettyCash = new PettyCashBook
            {
                OnDate = date,
                IsReadOnly = false,
                UserId = "Admin",
                StoreId = storeId,
                ClosingCash = 0,
                SystemSale = 0,
                TailoringSale = 0,
                ManualSale = 0,
                TotalDues = 0,
                CardSwipe = 0,
                CustomerDuesNames = "",
                OpeningCash = 0,
                CashReciepts = 0,
                TotalExpenses = 0,
                TotalPayments = 0,
                OhterReceipts = 0,
                BankDeposit = 0,
                PaymentRemarks = "",
                RecieptRemarks = ""
            };

            pettyCash.SystemSale = db.DailySales.Where(c => c.StoreId == storeId && c.SaleDate.Date == date.Date).Select(c => c.Amount).Sum();
            pettyCash.ManualSale = db.DailySales.Where(c => c.StoreId == storeId && c.SaleDate.Date == date.Date && c.IsManualBill).Select(c => c.Amount).Sum();
            pettyCash.TailoringSale = db.DailySales.Where(c => c.StoreId == storeId && c.SaleDate.Date == date.Date && c.IsTailoringBill).Select(c => c.Amount).Sum();
            pettyCash.CardSwipe = db.DailySales.Where(c => c.StoreId == storeId && c.SaleDate.Date == date.Date && c.PayMode != PayMode.Cash).Select(c => c.Amount).Sum();
            pettyCash.TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.StoreId == storeId && c.DailySale.SaleDate.Date == date.Date && !c.IsRecovered).Select(c => c.Amount).Sum();

            pettyCash.TotalExpenses = db.Expenses.Where(c => c.StoreId == storeId && c.OnDate.Date == date.Date && c.PayMode == PaymentMode.Cash).Select(c => c.Amount).Sum();
            pettyCash.TotalPayments = db.Payments.Where(c => c.StoreId == storeId && c.OnDate.Date == date.Date && c.PayMode == PaymentMode.Cash).Select(c => c.Amount).Sum();
            pettyCash.TotalPayments += db.CashPayments.Where(c => c.StoreId == storeId && c.PaymentDate.Date == date.Date).Select(c => c.Amount).Sum();

            pettyCash.CashReciepts = db.Receipts.Where(c => c.StoreId == storeId && c.OnDate.Date == date.Date && c.PayMode == PaymentMode.Cash).Select(c => c.Amount).Sum();
            pettyCash.CashReciepts += db.CashReceipts.Where(c => c.StoreId == storeId && c.InwardDate.Date == date.Date).Select(c => c.Amount).Sum();

            pettyCash.BankDeposit = db.BankDeposits.Where(c => c.StoreId == storeId && c.OnDate.Date == date.Date).Select(c => c.Amount).Sum();
            pettyCash.OhterReceipts = db.DueRecovereds.Where(c => c.StoreId == storeId && c.PaidDate.Date == date.Date).Select(c => c.AmountPaid).Sum();

            pettyCash.ClosingCash = (decimal?)db.PettyCashBooks.Where(c => c.OnDate.Date == date.AddDays(-1) && c.StoreId == storeId).Select(c => c.ClosingCash).FirstOrDefault() ?? 0;

            var expRem = db.Expenses.Where(c => c.StoreId == storeId && c.OnDate.Date == date.Date && c.PayMode == PaymentMode.Cash).Select(c => c.Particulars).ToList();
            var patRem = db.Payments.Where(c => c.StoreId == storeId && c.OnDate.Date == date.Date && c.PayMode == PaymentMode.Cash).Select(c => c.PartyName).ToList();
            if (expRem != null && expRem.Count > 0)
            {
                pettyCash.PaymentRemarks = "Expenes: ";
                foreach (var item in expRem)
                {
                    pettyCash.PaymentRemarks += item + " , ";
                }
            }

            if (patRem != null && patRem.Count > 0)
            {
                pettyCash.PaymentRemarks += " Payments:";
                foreach (var item in patRem)
                {
                    pettyCash.PaymentRemarks += item + " , ";
                }
            }
            patRem = db.CashPayments.Where(c => c.StoreId == storeId && c.PaymentDate.Date == date.Date).Select(c => c.PaidTo).ToList();
            if (patRem != null && patRem.Count > 0)
            {
                pettyCash.PaymentRemarks += " Cash Payments:";

                foreach (var item in patRem)
                {
                    pettyCash.PaymentRemarks += item + " , ";
                }
            }

            var recRem = db.Receipts.Where(c => c.StoreId == storeId && c.OnDate.Date == date.Date && c.PayMode == PaymentMode.Cash).Select(c => c.PartyName).ToList();
            var crecRem = db.CashReceipts.Where(c => c.StoreId == storeId && c.InwardDate.Date == date.Date).Select(c => c.ReceiptFrom).ToList();
            var dueRem = db.DailySales.Where(c => c.StoreId == storeId && c.SaleDate.Date == date.Date && c.IsDue).Select(c => c.InvNo).ToList();

            if (recRem != null && recRem.Count > 0)
            {
                pettyCash.RecieptRemarks = "Reciepts: ";
                foreach (var item in recRem)
                {
                    pettyCash.RecieptRemarks += item + " , ";
                }
            }
            if (crecRem != null && crecRem.Count > 0)
            {
                pettyCash.RecieptRemarks += " Cash Reciepts:";
                foreach (var item in crecRem)
                {
                    pettyCash.RecieptRemarks += item + " , ";
                }
            }
            if (dueRem != null && dueRem.Count > 0)
            {
                pettyCash.CustomerDuesNames = "Due Bill No(s): ";
                foreach (var item in dueRem)
                {
                    pettyCash.CustomerDuesNames += item + " , ";
                }
            }
            return pettyCash;
        }

        public static async System.Threading.Tasks.Task<bool> GenerateAttendancForStoreClosedAsync(eStoreDbContext db, int storeId, HolidayReason reason, string remark, DateTime onDate)
        {
            string remarks = "";
            AttUnit status = AttUnit.StoreClosed;
            switch (reason)
            {
                case HolidayReason.GovertmentHoliday:
                    remarks = "Goverment Holiday";
                    status = AttUnit.Holiday;
                    break;

                case HolidayReason.Bandha:
                    remarks = "Bandha/Strike";
                    status = AttUnit.StoreClosed;
                    break;

                case HolidayReason.Festivals:
                    remarks = "Festivals";
                    status = AttUnit.Holiday;
                    break;

                case HolidayReason.WeeklyOff:
                    remarks = "Weekly Off";
                    status = AttUnit.SundayHoliday;
                    break;

                case HolidayReason.ApproveHoliday:
                    remarks = "Approved Holiday";
                    status = AttUnit.StoreClosed;
                    break;

                case HolidayReason.Other:
                    remarks = "Other Reasons";
                    status = AttUnit.StoreClosed;
                    break;

                default:
                    status = AttUnit.Holiday;
                    remark = "Reason Not Listed: ";
                    break;
            }

            remarks += " : " + remark;
            var empids = await db.Employees.Where(c => c.StoreId == storeId && c.IsWorking && c.Category != EmpType.Owner).Select(c => new { c.EmployeeId, c.Category }).ToListAsync();
            foreach (var item in empids)
            {
                Attendance att = new Attendance
                {
                    EmployeeId = item.EmployeeId,
                    AttDate = onDate.Date,
                    EntryStatus = EntryStatus.Added,
                    EntryTime = "NR",
                    Remarks = remarks,
                    IsReadOnly = false,
                    StoreId = storeId,
                    UserId = "Admin",
                    Status = status,
                };
                switch (item.Category)
                {
                    case EmpType.TailorMaster:
                    case EmpType.Tailors:
                    case EmpType.TailoringAssistance:
                        att.IsTailoring = true;
                        break;

                    default:
                        att.IsTailoring = false;
                        break;
                }
                await db.Attendances.AddAsync(att);
            }
            try
            {
                int a = await db.SaveChangesAsync();
                if (a == empids.Count)
                    return true;
                else
                    return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public static async System.Threading.Tasks.Task<bool> GenerateAttendancForStoreClosedAsync(eStoreDbContext db, int storeId, HolidayReason reason, string remark, DateTime startDate, DateTime endDate)
        {
            string remarks = "";
            AttUnit status = AttUnit.StoreClosed;
            switch (reason)
            {
                case HolidayReason.GovertmentHoliday:
                    remarks = "Goverment Holiday";
                    status = AttUnit.Holiday;
                    break;

                case HolidayReason.Bandha:
                    remarks = "Bandha/Strike";
                    status = AttUnit.StoreClosed;
                    break;

                case HolidayReason.Festivals:
                    remarks = "Festivals";
                    status = AttUnit.Holiday;
                    break;

                case HolidayReason.WeeklyOff:
                    remarks = "Weekly Off";
                    status = AttUnit.SundayHoliday;
                    break;

                case HolidayReason.ApproveHoliday:
                    remarks = "Approved Holiday";
                    status = AttUnit.StoreClosed;
                    break;

                case HolidayReason.Other:
                    remarks = "Other Reasons";
                    status = AttUnit.StoreClosed;
                    break;

                default:
                    status = AttUnit.Holiday;
                    remark = "Reason Not Listed: ";
                    break;
            }

            remarks += " : " + remark;
            var empids = await db.Employees.Where(c => c.StoreId == storeId && c.IsWorking && c.Category != EmpType.Owner).Select(c => new { c.EmployeeId, c.Category }).ToListAsync();
            DateTime onDate = startDate;
            int ctr = 0;
            do
            {
                foreach (var item in empids)
                {
                    Attendance att = new Attendance
                    {
                        EmployeeId = item.EmployeeId,
                        AttDate = onDate.Date,
                        EntryStatus = EntryStatus.Added,
                        EntryTime = "NR",
                        Remarks = remarks,
                        IsReadOnly = false,
                        StoreId = storeId,
                        UserId = "Admin",
                        Status = status,
                    };
                    switch (item.Category)
                    {
                        case EmpType.TailorMaster:
                        case EmpType.Tailors:
                        case EmpType.TailoringAssistance:
                            att.IsTailoring = true;
                            break;

                        default:
                            att.IsTailoring = false;
                            break;
                    }
                    db.Attendances.Add(att);
                }
                ctr += await db.SaveChangesAsync();
                onDate = onDate.AddDays(1);
            } while (onDate > endDate);

            try
            {
                ctr += await db.SaveChangesAsync();
                if (ctr > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}