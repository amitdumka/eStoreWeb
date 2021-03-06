using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using eStore.Database;
using eStore.Lib.DataHelpers;
using eStore.Shared.Models.Common;
using eStore.Shared.Models.Payroll;
using eStore.Shared.Models.Tailoring;
using eStore.Shared.ViewModels.Payroll;
using Microsoft.EntityFrameworkCore;

namespace eStore.BL.Widgets
{
    public class IEReport
    {
        public IncomeExpensesReport GetWeeklyReport(eStoreDbContext db, DateTime? onDate=null)
        {

            if (onDate == null) onDate = DateTime.Today;
            var start = ((DateTime)onDate).StartOfWeek().Date;
            var end = ((DateTime)onDate).EndOfWeek().Date;
            IncomeExpensesReport ierData = new IncomeExpensesReport
            {
                OnDate = DateTime.Today,
                IncomeExpensesReportId = 1,

                //Income
                TotalSale = db.DailySales.Where(c => c.SaleDate.Date >= start.Date && c.SaleDate.Date <= end.Date && !c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                TotalManualSale = db.DailySales.Where(c => c.SaleDate.Date >= start.Date && c.SaleDate.Date <= end.Date && c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                TotalTailoringSale = db.DailySales.Where(c => c.SaleDate.Date >= start.Date && c.SaleDate.Date <= end.Date && c.IsTailoringBill).Sum(c => c.Amount),
                TotalCashRecipts = db.CashReceipts.Where(c => c.InwardDate.Date >= start.Date && c.InwardDate.Date <= end.Date).Sum(c => c.Amount),
                TotalRecipts = db.Receipts.Where(c => c.OnDate.Date >= start.Date && c.OnDate.Date <= end.Date).Sum(c => c.Amount),
                TotalOtherIncome = 0,

                //Expenses

                TotalExpenses = db.Expenses.Where(c => c.OnDate.Date >= start.Date && c.OnDate.Date <= end.Date).Sum(c => c.Amount)  /*+db.PettyCashExpenses.Where(c => c.ExpDate.Date >= start.Date && c.ExpDate.Date <= end.Date).Sum(c => c.Amount)*/,
                TotalOthersExpenses = 0,
                TotalPayments = db.Payments.Where(c => c.OnDate.Date >= start.Date && c.OnDate.Date <= end.Date).Sum(c => c.Amount),
                TotalStaffPayments = db.SalaryPayments.Where(c => c.PaymentDate.Date >= start.Date && c.PaymentDate.Date <= end.Date).Sum(c => c.Amount),
                //+ db.StaffAdvancePayments.Where(c => c.PaymentDate.Date >= start.Date && c.PaymentDate.Date <= end.Date).Sum(c => c.Amount),
                //TotalTailoringPayments = db.TailoringSalaryPayments.Where(c => c.PaymentDate.Date >= start.Date && c.PaymentDate.Date <= end.Date).Sum(c => c.Amount) +
                //                        db.TailoringStaffAdvancePayments.Where(c => c.PaymentDate.Date >= start.Date && c.PaymentDate.Date <= end.Date).Sum(c => c.Amount),

                TotalCashPayments = db.CashPayments.Where(c => c.PaymentDate.Date >= start.Date && c.PaymentDate.Date <= end.Date && c.Mode.Transcation != "Home Expenses").Sum(c => c.Amount),
                TotalHomeExpenses = db.CashPayments.Where(c => c.PaymentDate.Date >= start.Date && c.PaymentDate.Date <= end.Date && c.Mode.Transcation == "Home Expenses").Sum(c => c.Amount),

                //Dues

                TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.DailySale.SaleDate.Date >= start.Date && c.DailySale.SaleDate.Date <= end.Date).Sum(c => c.Amount),
                TotalRecovery = db.DueRecoverds.Where(c => c.PaidDate.Date >= start.Date && c.PaidDate.Date <= end.Date).Sum(c => c.AmountPaid)

            };
            ierData.TotalPendingDues = ierData.TotalDues - ierData.TotalRecovery;
            return ierData;
        }
        public IncomeExpensesReport GetMonthlyReport(eStoreDbContext db, DateTime onDate)
        {
            IncomeExpensesReport ierData = new IncomeExpensesReport
            {
                OnDate = onDate,
                IncomeExpensesReportId = 1,
                //Income
                TotalSale = db.DailySales.Where(c => c.SaleDate.Month == onDate.Month && !c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                TotalManualSale = db.DailySales.Where(c => c.SaleDate.Month == onDate.Month && c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                TotalTailoringSale = db.DailySales.Where(c => c.SaleDate.Month == onDate.Month && c.IsTailoringBill).Sum(c => c.Amount),
                TotalCashRecipts = db.CashReceipts.Where(c => c.InwardDate.Month == onDate.Month).Sum(c => c.Amount),
                TotalRecipts = db.Receipts.Where(c => c.OnDate.Month == onDate.Month).Sum(c => c.Amount),
                TotalOtherIncome = 0,
                //Expenses
                TotalExpenses = db.Expenses.Where(c => c.OnDate.Month == onDate.Month).Sum(c => c.Amount),// + db.PettyCashExpenses.Where(c => c.ExpDate.Month == onDate.Month).Sum(c => c.Amount),
                TotalOthersExpenses = 0,
                TotalPayments = db.Payments.Where(c => c.OnDate.Month == onDate.Month).Sum(c => c.Amount),
                TotalStaffPayments = db.SalaryPayments.Where(c => c.PaymentDate.Month == onDate.Month).Sum(c => c.Amount),//+ db.StaffAdvancePayments.Where(c => c.PaymentDate.Month == onDate.Month).Sum(c => c.Amount),
                // TotalTailoringPayments = db.TailoringSalaryPayments.Where(c => c.PaymentDate.Month == onDate.Month).Sum(c => c.Amount) + db.TailoringStaffAdvancePayments.Where(c => c.PaymentDate.Month == onDate.Month).Sum(c => c.Amount),
                TotalCashPayments = db.CashPayments.Where(c => c.PaymentDate.Month == onDate.Month && c.Mode.Transcation != "Home Expenses").Sum(c => c.Amount),
                TotalHomeExpenses = db.CashPayments.Where(c => c.PaymentDate.Month == onDate.Month && c.Mode.Transcation == "Home Expenses").Sum(c => c.Amount),
                //Dues
                TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.DailySale.SaleDate.Month == onDate.Month).Sum(c => c.Amount),
                TotalRecovery = db.DueRecoverds.Where(c => c.PaidDate.Month == onDate.Month).Sum(c => c.AmountPaid)

            };
            ierData.TotalPendingDues = ierData.TotalDues - ierData.TotalRecovery;
            return ierData;
        }
        public IncomeExpensesReport GetYearlyReport(eStoreDbContext db, DateTime onDate)
        {
            IncomeExpensesReport ierData = new IncomeExpensesReport
            {
                OnDate = onDate,
                IncomeExpensesReportId = 1,
                //Income
                TotalSale = db.DailySales.Where(c => c.SaleDate.Year == onDate.Year && !c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                TotalManualSale = db.DailySales.Where(c => c.SaleDate.Year == onDate.Year && c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                TotalTailoringSale = db.DailySales.Where(c => c.SaleDate.Year == onDate.Year && c.IsTailoringBill).Sum(c => c.Amount),
                TotalCashRecipts = db.CashReceipts.Where(c => c.InwardDate.Year == onDate.Year).Sum(c => c.Amount),
                TotalRecipts = db.Receipts.Where(c => c.OnDate.Year == onDate.Year).Sum(c => c.Amount),
                TotalOtherIncome = 0,
                //Expenses
                TotalExpenses = db.Expenses.Where(c => c.OnDate.Year == onDate.Year).Sum(c => c.Amount),// + db.PettyCashExpenses.Where(c => c.ExpDate.Year == onDate.Year).Sum(c => c.Amount),
                TotalOthersExpenses = 0,
                TotalPayments = db.Payments.Where(c => c.OnDate.Year == onDate.Year).Sum(c => c.Amount),
                TotalStaffPayments = db.SalaryPayments.Where(c => c.PaymentDate.Year == onDate.Year).Sum(c => c.Amount),// + db.StaffAdvancePayments.Where(c => c.PaymentDate.Year == onDate.Year).Sum(c => c.Amount),
                //  TotalTailoringPayments = db.TailoringSalaryPayments.Where(c => c.PaymentDate.Year == onDate.Year).Sum(c => c.Amount) + db.TailoringStaffAdvancePayments.Where(c => c.PaymentDate.Year == onDate.Year).Sum(c => c.Amount),
                TotalCashPayments = db.CashPayments.Where(c => c.PaymentDate.Year == onDate.Year && c.Mode.Transcation != "Home Expenses").Sum(c => c.Amount),
                TotalHomeExpenses = db.CashPayments.Where(c => c.PaymentDate.Year == onDate.Year && c.Mode.Transcation == "Home Expenses").Sum(c => c.Amount),
                //Dues
                TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.DailySale.SaleDate.Year == onDate.Year).Sum(c => c.Amount),
                TotalRecovery = db.DueRecoverds.Where(c => c.PaidDate.Year == onDate.Year).Sum(c => c.AmountPaid)
            };
            ierData.TotalPendingDues = ierData.TotalDues - ierData.TotalRecovery;
            return ierData;
        }
        public IncomeExpensesReport GetDailyReport(eStoreDbContext db, DateTime onDate)
        {
            IncomeExpensesReport ierData = new IncomeExpensesReport
            {
                OnDate = onDate,
                IncomeExpensesReportId = 1,
                //Income
                TotalSale = db.DailySales.Where(c => c.SaleDate.Date == onDate.Date && !c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                TotalManualSale = db.DailySales.Where(c => c.SaleDate.Date == onDate.Date && c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                TotalTailoringSale = db.DailySales.Where(c => c.SaleDate.Date == onDate.Date && c.IsTailoringBill).Sum(c => c.Amount),
                TotalCashRecipts = db.CashReceipts.Where(c => c.InwardDate.Date == onDate.Date).Sum(c => c.Amount),
                TotalRecipts = db.Receipts.Where(c => c.OnDate.Date == onDate.Date).Sum(c => c.Amount),
                TotalOtherIncome = 0,
                //Expenses
                TotalExpenses = db.Expenses.Where(c => c.OnDate.Date == onDate.Date).Sum(c => c.Amount),// + db.PettyCashExpenses.Where(c => c.ExpDate.Date == onDate.Date).Sum(c => c.Amount),
                TotalOthersExpenses = 0,
                TotalPayments = db.Payments.Where(c => c.OnDate.Date == onDate.Date).Sum(c => c.Amount),
                TotalStaffPayments = db.SalaryPayments.Where(c => c.PaymentDate.Date == onDate.Date).Sum(c => c.Amount),// + db.StaffAdvancePayments.Where(c => c.PaymentDate.Date == onDate.Date).Sum(c => c.Amount),
                // TotalTailoringPayments = db.TailoringSalaryPayments.Where(c => c.PaymentDate.Date == onDate.Date).Sum(c => c.Amount) + db.TailoringStaffAdvancePayments.Where(c => c.PaymentDate.Date == onDate.Date).Sum(c => c.Amount),
                TotalCashPayments = db.CashPayments.Where(c => c.PaymentDate.Date == onDate.Date && c.Mode.Transcation != "Home Expenses").Sum(c => c.Amount),
                TotalHomeExpenses = db.CashPayments.Where(c => c.PaymentDate.Date == onDate.Date && c.Mode.Transcation == "Home Expenses").Sum(c => c.Amount),
                //Dues
                TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.DailySale.SaleDate.Date == onDate.Date).Sum(c => c.Amount),
                TotalRecovery = db.DueRecoverds.Where(c => c.PaidDate.Date == onDate.Date).Sum(c => c.AmountPaid)
            };
            ierData.TotalPendingDues = ierData.TotalDues - ierData.TotalRecovery;
            return ierData;

        }
    }
    /// <summary>
    /// Widget for DashBoard and Home Page Info
    /// </summary>
    public class DashboardWidget
    {

        public static async System.Threading.Tasks.Task<List<SalesmanInfo>> GetSalesmenInfoAsync(eStoreDbContext db)
        {
            List<SalesmanInfo> InfoList = new List<SalesmanInfo>();
            var sm = db.Salesmen.ToList();
            foreach (var sales in sm)
            {
                var data = await db.DailySales.Where(c => c.SalesmanId == sales.SalesmanId).Select(c => new { c.SaleDate, c.Amount, c.IsSaleReturn }).ToListAsync();

                SalesmanInfo info = new SalesmanInfo
                {
                    SalesmanInfoId = sales.SalesmanId,
                    SalesmanName = sales.SalesmanName,
                    TotalBillCount = data.Count,
                    TotalSale = data.Sum(c => c.Amount),
                    CurrentYear = data.Where(c => c.SaleDate.Year == DateTime.Today.Year).Sum(c => c.Amount),
                    CurrentMonth = data.Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month).Sum(c => c.Amount),
                    LastYear = data.Where(c => c.SaleDate.Year == DateTime.Today.Year - 1).Sum(c => c.Amount),
                    LastMonth = data.Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month - 1).Sum(c => c.Amount),

                };

                info.Average = info.CurrentYear / 365;
                InfoList.Add(info);


            }
            return InfoList;




        }



        public static MasterViewReport GetMasterViewReport(eStoreDbContext _context)
        {
            MasterViewReport reportView = new MasterViewReport
            {

                SaleReport = GetSaleRecord(_context),
                TailoringReport = GetTailoringReport(_context),
                EmpInfoList = GetEmpInfo(_context),
                AccountsInfo = GetAccoutingRecord(_context),
                LeadingSalesman = GetTopSalesman(_context),
                BookingOverDues = GetTailoringBookingOverDue(_context)
            };
            return reportView;
        }
        public static List<string> GetTopSalesman(eStoreDbContext db)
        {
            List<string> topSalesmanName = new List<string>();
            int today = (int?)db.DailySales.Where(c => c.SaleDate.Date == DateTime.Today.Date).GroupBy(c => c.SalesmanId).Select(c => new { ID = c.Key, TA = c.Sum(c => c.Amount) }).OrderByDescending(c => c.TA).Select(c => c.ID).FirstOrDefault() ?? 0;
            int month = (int?)db.DailySales.Where(c => c.SaleDate.Month == DateTime.Today.Month && c.SaleDate.Year == DateTime.Today.Year).GroupBy(c => c.SalesmanId).Select(c => new { ID = c.Key, TA = c.Sum(c => c.Amount) }).OrderByDescending(c => c.TA).Select(c => c.ID).FirstOrDefault() ?? 0;
            int year = (int?)db.DailySales.Where(c => c.SaleDate.Year == DateTime.Today.Year).GroupBy(c => c.SalesmanId).Select(c => new { ID = c.Key, TA = c.Sum(c => c.Amount) }).OrderByDescending(c => c.TA).Select(c => c.ID).FirstOrDefault() ?? 0;

            string sName = "";
            if (year > 0)
            {
                sName = db.Salesmen.Find(year).SalesmanName;
                topSalesmanName.Add(sName);
            }
            if (month > 0)
            {
                if (year != month)
                    sName = db.Salesmen.Find(month).SalesmanName;
            }
            else
                sName = "";

            topSalesmanName.Add(sName);

            if (today > 0)
            {
                if (today != month)
                    sName = db.Salesmen.Find(today).SalesmanName;
            }
            else sName = "";


            topSalesmanName.Add(sName);
            return topSalesmanName;


        }
        //Sale
        public static DailySaleReport GetSaleRecord(eStoreDbContext db)
        {

            DailySaleReport record = new DailySaleReport
            {
                DailySale = (decimal?)db.DailySales.Where(C => (C.SaleDate.Date) == (DateTime.Today.Date)).Sum(c => (long?)c.Amount) ?? 0,
                MonthlySale = (decimal?)db.DailySales.Where(C => (C.SaleDate).Month == (DateTime.Today).Month && C.SaleDate.Year == DateTime.Today.Year).Sum(c => (long?)c.Amount) ?? 0,
                YearlySale = (decimal?)db.DailySales.Where(C => (C.SaleDate).Year == (DateTime.Today).Year).Sum(c => (long?)c.Amount) ?? 0,
                WeeklySale = (decimal?)db.DailySales.Where(C => C.SaleDate.Date <= DateTime.Today.Date && C.SaleDate.Date >= DateTime.Today.Date.AddDays(-7)).Sum(c => (long?)c.Amount) ?? 0,
                QuaterlySale = (decimal?)db.DailySales.Where(C => C.SaleDate.Month >= DateTime.Today.AddMonths(-3).Month && C.SaleDate.Month <= DateTime.Today.Month && C.SaleDate.Year == DateTime.Today.Year).Sum(c => (long?)c.Amount) ?? 0,
            };

            return record;

        }
        public static DailySaleReport GetSaleRecord(eStoreDbContext db, int StoreId)
        {

            DailySaleReport record = new DailySaleReport
            {
                DailySale = (decimal?)db.DailySales.Where(C => C.SaleDate.Date == DateTime.Today.Date && C.StoreId == StoreId).Sum(c => (long?)c.Amount) ?? 0,
                MonthlySale = (decimal?)db.DailySales.Where(C => C.SaleDate.Month == DateTime.Today.Month && C.SaleDate.Year == DateTime.Today.Year && C.StoreId == StoreId).Sum(c => (long?)c.Amount) ?? 0,
                YearlySale = (decimal?)db.DailySales.Where(C => C.SaleDate.Year == DateTime.Today.Year && C.StoreId == StoreId).Sum(c => (long?)c.Amount) ?? 0
            };

            return record;

        }

        //Taioring
        public static List<BookingOverDue> GetTailoringBookingOverDue(eStoreDbContext db)
        {
            DateTime date = DateTime.Today.AddDays(-11);
            var list = db.TalioringBookings.Where(c => !c.IsDelivered && c.DeliveryDate < date).ToList();

            List<BookingOverDue> DueList = new List<BookingOverDue>();
            foreach (var item in list)
            {
                BookingOverDue overDue = new BookingOverDue
                {
                    BookingDate = item.BookingDate,
                    BookingId = item.TalioringBookingId,
                    DelveryDate = item.DeliveryDate,
                    Quantity = item.TotalQty,
                    SlipNo = item.BookingSlipNo,
                    CustomerName = item.CustName,
                    NoDays = (DateTime.Today.Date - item.DeliveryDate.Date).Days
                };
                DueList.Add(overDue);
            }

            //DueList.Sort();
            return DueList;

        }
        public static TailoringReport GetTailoringReport(eStoreDbContext db)
        {
            return new TailoringReport()
            {
                TodayBooking = (int?)db.TalioringBookings.Where(c => c.BookingDate.Date == DateTime.Today).Count() ?? 0,
                TodayUnit = (int?)db.TalioringBookings.Where(c => c.BookingDate.Date == DateTime.Today).Sum(c => (int?)c.TotalQty) ?? 0,

                MonthlyBooking = (int?)db.TalioringBookings.Where(c => c.BookingDate.Month == DateTime.Today.Month && c.BookingDate.Year == DateTime.Today.Year).Count() ?? 0,
                MonthlyUnit = (int?)db.TalioringBookings.Where(c => c.BookingDate.Month == DateTime.Today.Month && c.BookingDate.Year == DateTime.Today.Year).Sum(c => (int?)c.TotalQty) ?? 0,

                YearlyBooking = (int?)db.TalioringBookings.Where(c => (c.BookingDate).Year == (DateTime.Today).Year).Count() ?? 0,
                YearlyUnit = (int?)db.TalioringBookings.Where(c => (c.BookingDate).Year == (DateTime.Today).Year).Sum(c => (int?)c.TotalQty) ?? 0,

                TodaySale = (decimal?)db.TailoringDeliveries.Where(c => (c.DeliveryDate.Date) == (DateTime.Today)).Sum(c => (long?)c.Amount) ?? 0,
                YearlySale = (decimal?)db.TailoringDeliveries.Where(c => (c.DeliveryDate).Year == (DateTime.Today).Year).Sum(c => (long?)c.Amount) ?? 0,
                MonthlySale = (decimal?)db.TailoringDeliveries.Where(c => c.DeliveryDate.Year == DateTime.Today.Year && c.DeliveryDate.Month == DateTime.Today.Month).Sum(c => (long?)c.Amount) ?? 0,
            };
        }
        //Income/Expenses/Accounting
        public static AccountsInfo GetAccoutingRecord(eStoreDbContext db, int StoreId)
        {
            AccountsInfo info = new AccountsInfo();
            CashInHand cih = db.CashInHands.Where(c => (c.CIHDate) == (DateTime.Today) && c.StoreId == StoreId).FirstOrDefault();

            if (cih != null)
            {
                info.CashInHand = cih.InHand;
                info.CashIn = cih.CashIn;
                info.CashOut = cih.CashOut;
                info.OpenningBal = cih.OpenningBalance;
            }

            CashInBank cib = db.CashInBanks.Where(c => (c.CIBDate) == (DateTime.Today) && c.StoreId == StoreId).FirstOrDefault();
            if (cib != null)
            {
                info.CashToBank = cib.CashIn;
                info.CashFromBank = cib.CashOut;
                info.CashInBank = cib.InHand;
            }

            // var CashExp = db.CashPayments.Where(c => (c.PaymentDate) == (DateTime.Today) && c.StoreId == StoreId);
            var CashPay = db.CashPayments.Where(c => (c.PaymentDate) == (DateTime.Today) && c.StoreId == StoreId);

            //if (CashExp != null)
            //{
            //    info.TotalCashPayments = (decimal?)CashExp.Sum(c => (decimal?)c.Amount) ?? 0;
            //}
            if (CashPay != null)
            {
                info.TotalCashPayments += (decimal?)CashPay.Sum(c => (decimal?)c.Amount) ?? 0;
            }
            return info;
        }
        public static AccountsInfo GetAccoutingRecord(eStoreDbContext db)
        {
            AccountsInfo info = new AccountsInfo();
            CashInHand cih = db.CashInHands.Where(c => (c.CIHDate) == (DateTime.Today)).FirstOrDefault();

            if (cih != null)
            {
                info.CashInHand = cih.InHand;
                info.CashIn = cih.CashIn;
                info.CashOut = cih.CashOut;
                info.OpenningBal = cih.OpenningBalance;
            }

            CashInBank cib = db.CashInBanks.Where(c => (c.CIBDate) == (DateTime.Today)).FirstOrDefault();
            if (cib != null)
            {
                info.CashToBank = cib.CashIn;
                info.CashFromBank = cib.CashOut;
                info.CashInBank = cib.InHand;
            }

            var CashPay = db.CashPayments.Where(c => c.PaymentDate == DateTime.Today).Select(c => c.Amount).Sum();
            info.TotalCashPayments = (decimal?)CashPay ?? 0;
            //if (CashPay != null)
            //{
            //    info.TotalCashPayments = (decimal?)CashPay.Sum(c => (long?)c.Amount) ?? 0;
            //}

            var exp = db.Expenses.Where(c => c.OnDate == DateTime.Today).Select(c => c.Amount).Sum();
            var pays = db.Payments.Where(c => c.OnDate == DateTime.Today).Select(c => c.Amount).Sum();
            info.TotalPayments = (decimal?)pays ?? 0;
            info.TotalExpenses = (decimal?)exp ?? 0;
            return info;
        }

        //Payroll
        public static List<EmployeeInfo> GetEmpInfo(eStoreDbContext db, bool WithTailor = false)
        {
            var emps = db.Attendances.Include(c => c.Employee).
                Where(c => c.AttDate == DateTime.Today && c.IsTailoring == false).OrderByDescending(c => c.Employee.FirstName);


            var empPresent = db.Attendances.Include(c => c.Employee)
                .Where(c => c.Status == AttUnit.Present && c.AttDate.Year == DateTime.Today.Year && c.AttDate.Month == DateTime.Today.Month && c.IsTailoring == false)
                .GroupBy(c => c.Employee.FirstName).OrderBy(c => c.Key).Select(g => new { StaffName = g.Key, Days = g.Count() }).ToList();

            var empAbsent = db.Attendances.Include(c => c.Employee)
                .Where(c => c.Status == AttUnit.Absent && c.AttDate.Year == DateTime.Today.Year && c.AttDate.Month == DateTime.Today.Month && c.IsTailoring == false)
                 .GroupBy(c => c.Employee.FirstName).OrderBy(c => c.Key).Select(g => new { StaffName = g.Key, Days = g.Count() }).ToList();

            var totalSale = db.DailySales.Include(c => c.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month)
                .Select(a => new { StaffName = a.Salesman.SalesmanName, a.Amount }).ToList();

            if (WithTailor)
            {
                emps = db.Attendances.Include(c => c.Employee).
                   Where(c => c.AttDate == DateTime.Today).OrderByDescending(c => c.Employee.FirstName);

                empPresent = db.Attendances.Include(c => c.Employee)
                   .Where(c => c.Status == AttUnit.Present && c.AttDate.Year == DateTime.Today.Year && c.AttDate.Month == DateTime.Today.Month)
                   .GroupBy(c => c.Employee.FirstName).OrderBy(c => c.Key).Select(g => new { StaffName = g.Key, Days = g.Count() }).ToList();

                empAbsent = db.Attendances.Include(c => c.Employee)
                   .Where(c => c.Status == AttUnit.Absent && c.AttDate.Year == DateTime.Today.Year && c.AttDate.Month == DateTime.Today.Month)
                    .GroupBy(c => c.Employee.FirstName).OrderBy(c => c.Key).Select(g => new { StaffName = g.Key, Days = g.Count() }).ToList();

                totalSale = db.DailySales.Include(c => c.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month).Select(a => new { StaffName = a.Salesman.SalesmanName, a.Amount }).ToList();
            }

            List<EmployeeInfo> infoList = new List<EmployeeInfo>();

            foreach (var item in emps)
            {
                if (item.Employee.StaffName != "Amit Kumar")
                {
                    EmployeeInfo info = new EmployeeInfo()
                    {
                        Name = item.Employee.StaffName,
                        EmpId = item.Employee.EmployeeId,
                        AbsentDays = 0,
                        NoOfBills = 0,
                        Present = "",
                        PresentDays = 0,
                        Ratio = 0,
                        TotalSale = 0
                    };

                    if (item.Status == AttUnit.Present || item.Status == AttUnit.Sunday)
                        info.Present = "Present";
                    else if (item.Status == AttUnit.HalfDay) info.Present = "Half Day Leave";

                    else
                        info.Present = "Absent";

                    try
                    {
                        if (item.Employee.Category == EmpType.Salesman)
                        {
                            info.IsSalesman = true;
                        }

                        if (empPresent != null)
                        {
                            var pd = empPresent.Where(c => info.Name.Contains(c.StaffName)).FirstOrDefault();
                            if (pd != null)
                                info.PresentDays = pd.Days;
                            else
                                info.PresentDays = 0;
                        }
                        else
                        {
                            info.PresentDays = 0;
                        }

                        if (empAbsent != null)
                        {
                            var ad = empAbsent.Where(c => info.Name.Contains(c.StaffName)).FirstOrDefault();
                            if (ad != null)
                                info.AbsentDays = ad.Days;
                            else
                                info.AbsentDays = 0;
                        }
                        else
                            info.AbsentDays = 0;

                        //var ts = db.DailySales.Include(c=>c.Salesman ).Where (c => c.Salesman.SalesmanName == info.Name && (c.SaleDate).Month == (DateTime.Today).Month).ToList();
                        if (totalSale != null && (item.Employee.Category == EmpType.Salesman || item.Employee.Category == EmpType.StoreManager))
                        {
                            var ts = totalSale.Where(c => c.StaffName.Trim() == info.Name.Trim()).ToList();
                            info.TotalSale = (decimal?)ts.Sum(c => (decimal?)c.Amount) ?? 0;
                            info.NoOfBills = (int?)ts.Count ?? 0;
                        }

                        if (info.PresentDays > 0 && info.TotalSale > 0)
                        {
                            info.Ratio = Math.Round((double)info.TotalSale / info.PresentDays, 2);
                        }
                    }
                    catch (Exception)
                    {
                        // Log.Error().Message("emp-present exception");
                    }
                    infoList.Add(info);
                }
            }
            return infoList.OrderBy(x => x.IsSalesman).ToList();
            // return infoList;
        }

        public static List<EmpBasicInfo> GetEmpBasicInfo(eStoreDbContext db, int StoreId)
        {
            var emps = db.Attendances.Include(c => c.Employee).
                Where(c => c.StoreId == StoreId && c.AttDate == DateTime.Today && c.IsTailoring == false && (c.Status == AttUnit.Present || c.Status == AttUnit.Sunday)).OrderByDescending(c => c.Employee.StaffName);

            var totalSale = db.DailySales.Include(c => c.Salesman).Where(c => c.StoreId == StoreId && c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month).Select(a => new { StaffName = a.Salesman.SalesmanName, a.Amount }).ToList();

            List<EmpBasicInfo> list = new List<EmpBasicInfo>();
            foreach (var item in emps)
            {
                EmpBasicInfo info = new EmpBasicInfo
                {
                    EmpId = item.EmployeeId,
                    Name = item.Employee.StaffName,
                    IsSalesman = false
                };
                if (item.Employee.Category == EmpType.Salesman)
                    info.IsSalesman = true;

                if (item.Employee.Category == EmpType.StoreManager)
                {
                    var ts = db.DailySales.Where(c => c.StoreId == StoreId && c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month).Select(a => new { a.Amount }).Sum(c => c.Amount);
                    info.TotalSale = ts;
                }
                else if (totalSale != null && (item.Employee.Category == EmpType.Salesman /*|| item.Employee.Category == EmpType.StoreManager*/))
                {
                    var ts = totalSale.Where(c => c.StaffName == info.Name).ToList();
                    info.TotalSale = (decimal?)ts.Sum(c => (decimal?)c.Amount) ?? 0;
                }
                list.Add(info);
            }

            return list;
        }

        public static List<EmpBasicInfo> GetEmpBasicInfo(eStoreDbContext db)
        {
            var emps = db.Attendances.Include(c => c.Employee).
                Where(c => c.AttDate == DateTime.Today && c.IsTailoring == false && (c.Status == AttUnit.Present || c.Status == AttUnit.Sunday)).OrderByDescending(c => c.Employee.StaffName);

            var totalSale = db.DailySales.Include(c => c.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month).Select(a => new { StaffName = a.Salesman.SalesmanName, a.Amount }).ToList();

            List<EmpBasicInfo> list = new List<EmpBasicInfo>();
            foreach (var item in emps)
            {
                EmpBasicInfo info = new EmpBasicInfo
                {
                    EmpId = item.EmployeeId,
                    Name = item.Employee.StaffName,
                    IsSalesman = false,
                    TotalSale = 0
                };
                if (item.Employee.Category == EmpType.Salesman)
                    info.IsSalesman = true;
                else if (totalSale != null && (item.Employee.Category == EmpType.Salesman /*|| item.Employee.Category == EmpType.StoreManager*/))
                {
                    var ts = totalSale.Where(c => c.StaffName == info.Name).ToList();
                    info.TotalSale = (decimal?)ts.Sum(c => (decimal?)c.Amount) ?? 0;
                }
                list.Add(info);
            }

            return list;
        }
        //Graphs

        //Others
        public static EmpAttReport GetEmployeeAttendanceReport(eStoreDbContext db, int EmpId, DateTime sDate, DateTime eDate)
        {
            Employee emp = db.Employees.Find(EmpId);
            if (emp == null)
            {
                return null;
            }

            var AttList = db.Attendances.Where(c => c.EmployeeId == EmpId && c.AttDate > sDate.AddDays(-1) && c.AttDate < eDate.AddDays(1)).ToList();

            EmpAttReport empAtt = new EmpAttReport
            {
                EmpAttReportId = -1,
                EmployeeId = EmpId,
                EmployeeName = emp.StaffName,
                IsWorking = emp.IsWorking,
                JoinningDate = emp.JoiningDate,
                LeavingDate = emp.LeavingDate,
                Type = emp.Category,
                Employee = emp,

                NoOfWorkingDays = 0,
                TotalDaysAbsent = 0,
                TotalDaysHalfDay = 0,
                TotalDaysPresent = 0,
                TotalFinalPresent = 0,
                TotalSundayPresent = 0


            };
            if (AttList.Count > 0)
            {
                empAtt.TotalDaysAbsent = AttList.Where(c => c.Status == AttUnit.Absent).Count();
                empAtt.TotalDaysHalfDay = AttList.Where(c => c.Status == AttUnit.HalfDay).Count();
                empAtt.TotalDaysPresent = AttList.Where(c => c.Status == AttUnit.Present).Count();
                empAtt.TotalSundayPresent = AttList.Where(c => c.Status == AttUnit.Sunday).Count();
                empAtt.TotalFinalPresent = empAtt.TotalDaysPresent + empAtt.TotalSundayPresent + (empAtt.TotalDaysHalfDay / 2);
                empAtt.EmpAttReportId = EmpId;
            }

            int NoOfNonWorkingDay = AttList.Where(c => c.Status == AttUnit.Holiday || c.Status == AttUnit.StoreClosed).Count();
            TimeSpan ts = (eDate - sDate);
            int NoofWorkingDay = ts.Days + 1 - NoOfNonWorkingDay;
            empAtt.NoOfWorkingDays = NoofWorkingDay;

            return empAtt;

        }

        public static EmpFinReport GetEmployeeFinReport(eStoreDbContext db, int EmpId, DateTime sDate, DateTime endDate)
        {

            Employee emp = db.Employees.Find(EmpId);
            if (emp == null) return null;

            int smId = (int?)db.Salesmen.Where(c => c.SalesmanName == emp.StaffName).Select(c => c.SalesmanId).FirstOrDefault() ?? 0;

            var SaleList = db.DailySales.Where(c => c.SalesmanId == smId && c.SaleDate > sDate.AddDays(-1) && c.SaleDate < endDate.AddDays(1)).Select(c => new { c.Amount, c.IsManualBill, c.IsSaleReturn, c.IsTailoringBill, c.StoreId }).ToList();

            var SalryPaidList = db.SalaryPayments.Where(c => c.EmployeeId == EmpId && c.PaymentDate > sDate.AddDays(-1) && c.PaymentDate < endDate.AddDays(1))
                .Select(c => new { c.SalaryPaymentId, c.SalaryComponet, c.SalaryMonth, c.Amount }).ToList();
            //TODO:var AdvPaidList = db.StaffAdvancePayments.Where(c => c.EmployeeId == EmpId && c.PaymentDate > sDate.AddDays(-1) && c.PaymentDate < endDate.AddDays(1))
            //  .Select(c => new { c.Amount, c.StaffAdvancePaymentId }).ToList();
            var AdvRecList = db.StaffAdvanceReceipts.Where(c => c.EmployeeId == EmpId && c.ReceiptDate > sDate.AddDays(-1) && c.ReceiptDate < endDate.AddDays(1))
               .Select(c => new { c.StaffAdvanceReceiptId, c.Amount }).ToList();


            EmpFinReport empFin = new EmpFinReport
            {
                EmpFinReportId = smId,
                EmployeeId = EmpId,
                Employee = emp,
                EmployeeName = emp.StaffName,
                IsWorking = emp.IsWorking,
                JoinningDate = emp.JoiningDate,
                LeavingDate = emp.LeavingDate,
                Type = emp.Category,
                NoOfBill = -1,
                TotalSale = -1,
                AverageSale = -1,
                TotalAdvancePaidOff = 0,
                TotalBalance = 0,
                TotalLastPcIncentive = 0,
                TotalSalaryAdvancePaid = 0,
                TotalSalaryPaid = 0,
                TotalSaleIncentive = 0,
                TotalWowBillIncentive = 0
            };

            if (smId > 0 && SaleList.Count > 0)
            {
                empFin.NoOfBill = SaleList.Where(c => !c.IsSaleReturn).Count();
                empFin.TotalSale = SaleList.Where(c => !c.IsSaleReturn).Sum(c => c.Amount);
                empFin.AverageSale = empFin.TotalSale / empFin.NoOfBill;
            }
            if (emp.Category == EmpType.Salesman)
            {
                empFin.TotalLastPcIncentive = SalryPaidList.Where(c => c.SalaryComponet == SalaryComponet.LastPcs).Sum(c => c.Amount);
                empFin.TotalWowBillIncentive = SalryPaidList.Where(c => c.SalaryComponet == SalaryComponet.WOWBill).Sum(c => c.Amount);
                empFin.TotalSaleIncentive = SalryPaidList.Where(c => c.SalaryComponet == SalaryComponet.Incentive).Sum(c => c.Amount);

            }
            else if (emp.Category == EmpType.StoreManager)
            {
                empFin.TotalSaleIncentive = SalryPaidList.Where(c => c.SalaryComponet == SalaryComponet.Incentive).Sum(c => c.Amount);

                empFin.NoOfBill = db.DailySales.Where(c => c.StoreId == emp.StoreId && c.SaleDate > sDate.AddDays(-1) && c.SaleDate < endDate.AddDays(1) && !c.IsManualBill && !c.IsSaleReturn && !c.IsTailoringBill).Select(c => new { c.Amount }).Count();
                empFin.TotalSale = db.DailySales.Where(c => c.StoreId == emp.StoreId && c.SaleDate > sDate.AddDays(-1) && c.SaleDate < endDate.AddDays(1) && !c.IsManualBill && !c.IsSaleReturn && !c.IsTailoringBill).Select(c => new { c.Amount }).Sum(c => c.Amount);
                if (empFin.TotalSale > 0 && empFin.NoOfBill > 0)
                    empFin.AverageSale = empFin.TotalSale / empFin.NoOfBill;
            }


            empFin.TotalSalaryPaid = SalryPaidList.Where(c => c.SalaryComponet == SalaryComponet.NetSalary).Sum(c => c.Amount);
            empFin.TotalSalaryPaid += SalryPaidList.Where(c => c.SalaryComponet == SalaryComponet.SundaySalary).Sum(c => c.Amount);
            empFin.TotalSalaryPaid += SalryPaidList.Where(c => c.SalaryComponet == SalaryComponet.Others).Sum(c => c.Amount);

            empFin.TotalSalaryAdvancePaid = 0;// AdvPaidList.Sum(c => c.Amount);
            empFin.TotalAdvancePaidOff = AdvRecList.Sum(c => c.Amount);
            empFin.TotalBalance = empFin.TotalSalaryAdvancePaid - empFin.TotalAdvancePaidOff;

            return empFin;


        }

    }
    //ViewModel


    public class ContactUsVM
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

    public class ManaulSaleReport
    {
        public decimal DailySale { get; set; }
        public decimal MonthlySale { get; set; }
        public decimal YearlySale { get; set; }
        public decimal PendingSale { get; set; }
        public decimal SaleAdjustest { get; set; }
        public decimal TotalFixedSale { get; set; }
    }


    public class MasterViewReport
    {
        public DailySaleReport SaleReport { get; set; }
        public TailoringReport TailoringReport { get; set; }
        public List<EmployeeInfo> EmpInfoList { get; set; }
        // public ManaulSaleReport ManaulSale { get; set; }
        //public List<EmpStatus> PresentEmp { get; set; }
        public AccountsInfo AccountsInfo { get; set; }
        public List<BookingOverDue>? BookingOverDues { get; set; }
        public List<string> LeadingSalesman { get; set; }

    }


    public class TailoringReport
    {
        [Display(Name = "Today")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodaySale { get; set; }
        [Display(Name = "Montly")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal MonthlySale { get; set; }
        [Display(Name = "Yearly")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal YearlySale { get; set; }
        //public decimal QuaterlySale { get; set; }

        [Display(Name = "Booking")]
        public int TodayBooking { get; set; }
        [Display(Name = "Item")]
        public int TodayUnit { get; set; }
        [Display(Name = "Booking")]
        public int MonthlyBooking { get; set; }
        [Display(Name = "Item")]
        public int MonthlyUnit { get; set; }
        [Display(Name = "Booking")]
        public int YearlyBooking { get; set; }
        [Display(Name = "Item")]
        public int YearlyUnit { get; set; }
    }

    public class DailySaleReport
    {

        [Display(Name = "Today")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal DailySale { get; set; }

        [Display(Name = "Monthly")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal MonthlySale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        [Display(Name = "Yearly")]
        public decimal YearlySale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        [Display(Name = "Weekly")]
        public decimal WeeklySale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        [Display(Name = "Quarterly")]
        public decimal QuaterlySale { get; set; }

    }

    public class EmployeeInfo
    {
        [Display(Name = "Emp ID")]
        public int EmpId { get; set; }
        [Display(Name = "Staff Name")]
        public string Name { get; set; }

        [Display(Name = "Present Today")]
        public string Present { get; set; }

        [Display(Name = "No of Days Present")]
        public double PresentDays { get; set; }

        [Display(Name = "No of Days Absent")]
        public double AbsentDays { get; set; }

        [Display(Name = "Ratio Of Attendance")]
        public double Ratio { get; set; }

        [Display(Name = "Current Month Sale")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalSale { get; set; }

        [Display(Name = "No Of Bills")]
        public int NoOfBills { get; set; }
        public bool IsSalesman { get; set; }

    }

    public class EmpBasicInfo
    {
        [Display(Name = "Emp ID")]
        public int EmpId { get; set; }
        [Display(Name = "Staff Name")]
        public string Name { get; set; }

        //[Display(Name = "Present Today")]
        //public string Present { get; set; }
        [Display(Name = "Current Month Sale")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalSale { get; set; }
        public bool IsSalesman { get; set; }

    }


    public class EmpStatus
    {
        public string StaffName { get; set; }
        public bool IsPresent { get; set; }
    }

    public class EndofDayDetails
    {
        // public EndOfDay EndofDay { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "DSR Date")]
        public DateTime EOD_Date { get; set; }

        public float Shirting { get; set; }
        public float Suiting { get; set; }
        public int USPA { get; set; }

        [Display(Name = "FM/Arrow/Others")]
        public int FM_Arrow { get; set; }

        [Display(Name = "Arvind RTW")]
        public int RWT { get; set; }

        [Display(Name = "Accessories")]
        public int Access { get; set; }
        [Display(Name = "Cash at Store")]
        public decimal CashInHand { get; set; }

        [Display(Name = "Total Sale")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodaySale { get; set; }
        [Display(Name = "Card Sale")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodayCardSale { get; set; }
        [Display(Name = "OtherMode Sale")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodayOtherSale { get; set; }
        [Display(Name = "Manual Sale")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodayManualSale { get; set; }

        [Display(Name = "Tailoring Delivery Sale")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodayTailoringSale { get; set; }
        [Display(Name = "Tailoring Booking ")]
        public int TodayTailoringBooking { get; set; }
        [Display(Name = "Total Unit")]
        public int TodayTotalUnit { get; set; }

        [Display(Name = "Total Expenses")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodayTotalExpenses { get; set; }
        [Display(Name = "Total Payments")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalPayments { get; set; }
        [Display(Name = "Total Receipts")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalReceipts { get; set; }

        [Display(Name = "Cash In Hand")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodayCashInHand { get; set; }


    }

    public class AccountsInfo
    {
        [Display(Name = "Cash-In-Hand")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashInHand { get; set; }
        [Display(Name = "Opening Balance")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal OpenningBal { get; set; }
        [Display(Name = "Income")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashIn { get; set; }
        [Display(Name = "Expenses")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashOut { get; set; }
        [Display(Name = "Cash Payments")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalCashPayments { get; set; }
        [Display(Name = "Bank Balance")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashInBank { get; set; }
        [Display(Name = "Deposited")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashToBank { get; set; }
        [Display(Name = "Withdrawal")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashFromBank { get; set; }
        [Display(Name = "Expenses")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalExpenses { get; set; }
        [Display(Name = "Payments")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalPayments { get; set; }
    }


    public class CashBook
    {
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Date")]
        public DateTime EDate { get; set; }
        public string Particulars { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashIn { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashOut { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal CashBalance { get; set; }
    }



    public class IncomeExpensesReport
    {
        public int IncomeExpensesReportId { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Date")]

        public DateTime OnDate { get; set; }

        //Income
        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Sale")]
        public decimal TotalSale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Tailoring Sale")]
        public decimal TotalTailoringSale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Manual Sale")]
        public decimal TotalManualSale { get; set; }


        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Receipts")]
        public decimal TotalRecipts { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Cash Receipts")]
        public decimal TotalCashRecipts { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Other Income")]
        public decimal TotalOtherIncome { get; set; }


        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Income")]
        public decimal TotalIncome { get { return (TotalSale + TotalTailoringSale + TotalManualSale + TotalRecipts + TotalCashRecipts + TotalOtherIncome); } }


        //Expenses
        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Staff Payments")]
        public decimal TotalStaffPayments { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Tailor Payments")]
        public decimal TotalTailoringPayments { get; set; }


        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Expenses")]
        public decimal TotalExpenses { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Home Expenses")]
        public decimal TotalHomeExpenses { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Payments")]
        public decimal TotalPayments { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Cash Payments")]
        public decimal TotalCashPayments { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Other Expenses")]
        public decimal TotalOthersExpenses { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Expenses")]
        public decimal TotalAllExpenses { get { return (TotalStaffPayments + TotalTailoringPayments + TotalExpenses + TotalPayments + TotalCashPayments + TotalOthersExpenses + TotalHomeExpenses); } }



        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Dues")]
        public decimal TotalDues { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Dues Recovered")]
        public decimal TotalRecovery { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Pending Dues")]
        public decimal TotalPendingDues { get; set; }

    }


    public class IERVM
    {
        public IncomeExpensesReport Today { get; set; }
        public IncomeExpensesReport CurrentWeek { get; set; }
        public IncomeExpensesReport Monthly { get; set; }
        public IncomeExpensesReport Yearly { get; set; }
    }

    public class IncomeExpensesVM
    {
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true), Display(Name = "Date")]
        public DateTime OnDate { get; set; }
        public string Particulars { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public bool IsNonCash { get; set; }
    }

    public class DetailIEVM
    {
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }
        public IERVM IncomeExpenseRepot { get; set; }
        public ICollection<IncomeExpensesVM> Income { get; set; }  // Details of Current Day/ or week
        public ICollection<IncomeExpensesVM> Expenses { get; set; } //Details of Current Day/ or week
    }
    public class EmpFinReport
    {
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

        public string EmployeeName { get; set; }
        public EmpType Type { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Joinning Date")]
        public DateTime JoinningDate { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Leaving Date")]
        public DateTime? LeavingDate { get; set; }
        public bool IsWorking { get; set; }


        public int EmpFinReportId { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal? TotalSale { get; set; }
        public int? NoOfBill { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal? AverageSale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal? TotalLastPcIncentive { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal? TotalWowBillIncentive { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal? TotalSaleIncentive { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalSalaryPaid { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalSalaryAdvancePaid { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalAdvancePaidOff { get; set; }
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalBalance { get; set; }
    }

    public class EmpReport
    {
        public int EmpReportId { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Start Date")]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "End Date")]
        public DateTime EndDate { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }


        public EmpAttReport? AttReport { get; set; }
        public EmpFinReport? FinReport { get; set; }

    }


    public class BookingOverDue
    {
        [Display(Name = "Booking ID")]
        public int BookingId { get; set; }
        [Display(Name = "Customer Name")]
        public string CustomerName { get; set; }
        [Display(Name = "Slip No")]
        public string SlipNo { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Booking Date")]
        public DateTime BookingDate { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Delivery Date")]
        public DateTime DelveryDate { get; set; }
        public int Quantity { get; set; }
        [Display(Name = "Due Days")]
        public int NoDays { get; set; }

    }
    public class EmpAttReport
    {
        public int EmpAttReportId { get; set; }

        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

        public string EmployeeName { get; set; }

        public EmpType Type { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Joinning Date")]
        public DateTime JoinningDate { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Leaving Date")]
        public DateTime? LeavingDate { get; set; }
        public bool IsWorking { get; set; }


        public decimal TotalDaysPresent { get; set; }

        public decimal TotalDaysAbsent { get; set; }

        public decimal TotalDaysHalfDay { get; set; }

        public decimal TotalSundayPresent { get; set; }

        public decimal TotalFinalPresent { get; set; }

        public int NoOfWorkingDays { get; set; }

    }
}
