using eStore.Database;
using eStore.Shared.Models.Common;
using eStore.Shared.Models.Payroll;
using eStore.Shared.ViewModels.Payroll;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eStore.BL.Widgets
{
    public class DashboardWidgetBase
    {

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
    }
}