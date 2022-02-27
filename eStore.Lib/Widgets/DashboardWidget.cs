using eStore.Database;
using eStore.Shared.Models.Common;
using eStore.Shared.Models.Payroll;
using eStore.Shared.ViewModels.Payroll;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace eStore.BL.Widgets
{
    /// <summary>
    /// Widget for DashBoard and Home Page Info
    /// </summary>
    public class DashboardWidget
    {

        public static MasterViewReport GetMasterViewReport(eStoreDbContext _context)
        {
            MasterViewReport reportView = new MasterViewReport
            {
                SaleReport = GetSaleRecord(_context),
                TailoringReport = GetTailoringReport(_context),
                EmpInfoList = GetEmpInfo(_context),
                AccountsInfo = GetAccountRecord(_context, 1),
                LeadingSalesman = GetTopSalesman(_context),
                BookingOverDues = GetTailoringBookingOverDue(_context),
                OpeningCashInHand = GetOpeningCashInHand(_context)
            };
            return reportView;
        }
        //TODO: Need to implement Store Wise Master View Report. at earliest as possible.
        public static MasterViewReport GetMasterViewReport(eStoreDbContext _context, int StoreId)
        {
            MasterViewReport reportView = new MasterViewReport
            {
                SaleReport = GetSaleRecord(_context),
                TailoringReport = GetTailoringReport(_context),
                EmpInfoList = GetEmpInfo(_context),
                AccountsInfo = GetAccountRecord(_context, 1),
                LeadingSalesman = GetTopSalesman(_context),
                BookingOverDues = GetTailoringBookingOverDue(_context),
                OpeningCashInHand = GetOpeningCashInHand(_context)
            };
            return reportView;
        }
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

        public static decimal GetOpeningCashInHand(eStoreDbContext db, int storeId = 1)
        {
            try
            {
                var d = db.EndOfDays.Where(c => c.StoreId == storeId && c.EOD_Date.Date == DateTime.Today.AddDays(-1).Date).FirstOrDefault();
                if (d != null)
                    return d.CashInHand;
                else
                    return 0;
            }
            catch (Exception)
            {
                return -1;
            }
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
            else
                sName = "";

            topSalesmanName.Add(sName);
            return topSalesmanName;
        }

        //Sale
        public static DailySaleReport GetSaleRecord(eStoreDbContext db)
        {
            DailySaleReport record = new DailySaleReport
            {
                DailySale = (decimal?)db.DailySales.Where(C => (C.SaleDate.Date) == (DateTime.Today.Date)).Sum(c => (long?)c.Amount) ?? 0,
                YesterdaySale = (decimal?)db.DailySales.Where(C => (C.SaleDate.Date) == (DateTime.Today.Date.AddDays(-1))).Sum(c => (long?)c.Amount) ?? 0,

                MonthlySale = (decimal?)db.DailySales.Where(C => (C.SaleDate).Month == (DateTime.Today).Month && C.SaleDate.Year == DateTime.Today.Year).Sum(c => (long?)c.Amount) ?? 0,
                YearlySale = (decimal?)db.DailySales.Where(C => (C.SaleDate).Year == (DateTime.Today).Year).Sum(c => (long?)c.Amount) ?? 0,
                WeeklySale = (decimal?)db.DailySales.Where(C => C.SaleDate.Date <= DateTime.Today.Date && C.SaleDate.Date >= DateTime.Today.Date.AddDays(-7)).Sum(c => (long?)c.Amount) ?? 0,
                QuarterlySale = (decimal?)db.DailySales.Where(C => C.SaleDate.Month >= DateTime.Today.AddMonths(-3).Month && C.SaleDate.Month <= DateTime.Today.Month && C.SaleDate.Year == DateTime.Today.Year).Sum(c => (long?)c.Amount) ?? 0,
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
        public static AccountsInfo GetAccountRecord(eStoreDbContext db, int StoreId = 1)
        {
            AccountsInfo info = new AccountsInfo();

            info = new AccountsInfo
            {
                CashFromBank = 0,
                CashIn = 0,
                CashInBank = 0,
                CashInHand = 0,
                CashOut = 0,
                CashToBank = 0,
                OpenningBal = 0,
                TotalCashPayments = 0,
                TotalExpenses = 0,
                TotalPayments = 0
            };

            info.OpenningBal = (decimal?)((decimal?)db.EndOfDays.Where(c => c.StoreId == StoreId && c.EOD_Date.Date == DateTime.Today.AddDays(1).Date).Sum(c => c.CashInHand)) ?? 0;
            info.CashIn = db.DailySales.Where(c => c.StoreId == StoreId && c.SaleDate.Date == DateTime.Today.Date).Sum(c => c.CashAmount);
            info.TotalCashPayments = db.CashPayments.Where(c => c.PaymentDate.Date == DateTime.Today.Date && c.StoreId == StoreId).Sum(c => (decimal?)c.Amount) ?? 0;
            info.TotalPayments = (decimal?)db.Expenses.Where(c => c.OnDate.Date == DateTime.Today.Date).Select(c => c.Amount).Sum() ?? 0;
            info.TotalExpenses = (decimal?)db.Payments.Where(c => c.OnDate.Date == DateTime.Today.Date).Select(c => c.Amount).Sum() ?? 0;
            info.CashIn += db.Receipts.Where(c => c.StoreId == StoreId && c.OnDate.Date == DateTime.Today.Date && c.PayMode == PaymentMode.Cash).Sum(c => c.Amount);
            info.CashIn += db.CashReceipts.Where(c => c.StoreId == StoreId && c.InwardDate.Date == DateTime.Today.Date).Sum(c => c.Amount);
            info.CashOut += db.Expenses.Where(c => c.StoreId == StoreId && c.OnDate.Date == DateTime.Today.Date && c.PayMode == PaymentMode.Cash).Sum(c => c.Amount);
            info.CashOut += db.Payments.Where(c => c.StoreId == StoreId && c.OnDate.Date == DateTime.Today.Date && c.PayMode == PaymentMode.Cash).Sum(c => c.Amount);

            info.CashToBank = db.BankDeposits.Where(c => c.StoreId == StoreId && c.OnDate.Date == DateTime.Today.Date && c.PayMode == PaymentMode.Cash).Sum(c => c.Amount);
            info.CashFromBank = db.BankWithdrawals.Where(c => c.StoreId == StoreId && c.OnDate.Date == DateTime.Today.Date).Sum(c => c.Amount);

            //This should be last line
            info.CashOut += info.TotalCashPayments + info.CashToBank;
            info.CashInHand = info.OpenningBal + info.CashIn - info.CashOut;
            return info;
        }
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

            var CashPay = db.CashPayments.Where(c => (c.PaymentDate) == (DateTime.Today) && c.StoreId == StoreId);

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

            var totalSale = db.DailySales.Include(c => c.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.Year && !c.IsAdjustedBill && c.SaleDate.Month == DateTime.Today.Month)
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

                totalSale = db.DailySales.Include(c => c.Salesman).Where(c => c.SaleDate.Year == DateTime.Today.Year && c.SaleDate.Month == DateTime.Today.Month && !c.IsAdjustedBill).Select(a => new { StaffName = a.Salesman.SalesmanName, a.Amount }).ToList();
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
                    else if (item.Status == AttUnit.HalfDay)
                        info.Present = "Half Day Leave";
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
                JoiningsDate = emp.JoiningDate,
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
            if (emp == null)
                return null;

            int smId = (int?)db.Salesmen.Where(c => c.SalesmanName == emp.StaffName).Select(c => c.SalesmanId).FirstOrDefault() ?? 0;

            var SaleList = db.DailySales.Where(c => c.SalesmanId == smId && c.SaleDate > sDate.AddDays(-1) && c.SaleDate < endDate.AddDays(1)).Select(c => new { c.Amount, c.IsManualBill, c.IsSaleReturn, c.IsTailoringBill, c.StoreId }).ToList();

            var SalaryPaidList = db.SalaryPayments.Where(c => c.EmployeeId == EmpId && c.PaymentDate > sDate.AddDays(-1) && c.PaymentDate < endDate.AddDays(1))
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
                JoiningDate = emp.JoiningDate,
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
                empFin.TotalLastPcIncentive = SalaryPaidList.Where(c => c.SalaryComponet == SalaryComponet.LastPcs).Sum(c => c.Amount);
                empFin.TotalWowBillIncentive = SalaryPaidList.Where(c => c.SalaryComponet == SalaryComponet.WOWBill).Sum(c => c.Amount);
                empFin.TotalSaleIncentive = SalaryPaidList.Where(c => c.SalaryComponet == SalaryComponet.Incentive).Sum(c => c.Amount);
            }
            else if (emp.Category == EmpType.StoreManager)
            {
                empFin.TotalSaleIncentive = SalaryPaidList.Where(c => c.SalaryComponet == SalaryComponet.Incentive).Sum(c => c.Amount);

                empFin.NoOfBill = db.DailySales.Where(c => c.StoreId == emp.StoreId && c.SaleDate > sDate.AddDays(-1) && c.SaleDate < endDate.AddDays(1) && !c.IsManualBill && !c.IsSaleReturn && !c.IsTailoringBill).Select(c => new { c.Amount }).Count();
                empFin.TotalSale = db.DailySales.Where(c => c.StoreId == emp.StoreId && c.SaleDate > sDate.AddDays(-1) && c.SaleDate < endDate.AddDays(1) && !c.IsManualBill && !c.IsSaleReturn && !c.IsTailoringBill).Select(c => new { c.Amount }).Sum(c => c.Amount);
                if (empFin.TotalSale > 0 && empFin.NoOfBill > 0)
                    empFin.AverageSale = empFin.TotalSale / empFin.NoOfBill;
            }

            empFin.TotalSalaryPaid = SalaryPaidList.Where(c => c.SalaryComponet == SalaryComponet.NetSalary).Sum(c => c.Amount);
            empFin.TotalSalaryPaid += SalaryPaidList.Where(c => c.SalaryComponet == SalaryComponet.SundaySalary).Sum(c => c.Amount);
            empFin.TotalSalaryPaid += SalaryPaidList.Where(c => c.SalaryComponet == SalaryComponet.Others).Sum(c => c.Amount);

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

        // public ManualSaleReport ManualSale { get; set; }
        //public List<EmpStatus> PresentEmp { get; set; }
        public AccountsInfo AccountsInfo { get; set; }

        public List<BookingOverDue>? BookingOverDues { get; set; }
        public List<string> LeadingSalesman { get; set; }
        public decimal OpeningCashInHand { get; set; }
    }

    public class TailoringReport
    {
        [Display(Name = "Today")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TodaySale { get; set; }

        [Display(Name = "Monthly")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal MonthlySale { get; set; }

        [Display(Name = "Yearly")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal YearlySale { get; set; }

        //public decimal QuarterlySale { get; set; }

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

        [Display(Name = "Yesterday")]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal YesterdaySale { get; set; }

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
        public decimal QuarterlySale { get; set; }
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
        [Display(Name = "Joining Date")]
        public DateTime JoiningDate { get; set; }

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
        [Display(Name = "Joining Date")]
        public DateTime JoiningsDate { get; set; }

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