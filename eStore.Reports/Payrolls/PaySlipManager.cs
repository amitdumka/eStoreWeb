using eStore.Database;
using eStore.Reports.Pdfs;
using eStore.Shared.Models.Payroll;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace eStore.Reports.Payrolls
{
    //View Models
    public class PaySlip
    {
        [Key]
        public int EmpId { get; set; }

        public DateTime OnDate { get; set; }
        public DateTime GenerationDate { get; set; }

        public int NoOfWorkingDays { get; set; }
        public decimal Absent { get; set; }
        public decimal Present { get; set; }
        public decimal Sunday { get; set; }
        public decimal HalfDay { get; set; }
        public decimal PaidLeave { get; set; }
        public decimal WeeklyLeave { get; set; }

        public int NoOfAttendance
        { get { return (int)(Absent + PaidLeave + Present + Sunday + HalfDay); } }

        public decimal BillableDays { get; set; }

        public decimal SalaryPerDay { get; set; }
        public decimal NetSalary { get; set; }

        public decimal GrossSalary { get; set; }
        public string Remarks { get; set; }
    }

    public class PaySlips
    {
        [Key]
        public int EmpId { get; set; }

        public int SYear { get; set; }
        public int EYear { get; set; }

        public PaySlip Jan { get; set; }
        public PaySlip Feb { get; set; }
        public PaySlip Mar { get; set; }
        public PaySlip April { get; set; }
        public PaySlip May { get; set; }
        public PaySlip June { get; set; }
        public PaySlip July { get; set; }
        public PaySlip Aug { get; set; }
        public PaySlip Sept { get; set; }

        public PaySlip Oct { get; set; }
        public PaySlip Nov { get; set; }
        public PaySlip Dec { get; set; }
    }

    public class PaySlipManager
    {
        private decimal GetAttdUnit(AttUnit unit)
        {
            switch (unit)
            {
                case AttUnit.Present:
                    return 1;

                case AttUnit.Absent:
                    return 0;

                case AttUnit.HalfDay:
                    return (decimal)0.5;

                case AttUnit.Sunday:
                    return 1;

                case AttUnit.Holiday:
                    return 1;

                case AttUnit.StoreClosed:
                    return 1;

                case AttUnit.SundayHoliday:
                    return 0;

                case AttUnit.SickLeave:
                    return 1;

                case AttUnit.PaidLeave:
                    return 1;

                case AttUnit.CasualLeave:
                    return 0;

                case AttUnit.OnLeave:
                    return 0;

                default:
                    return 0;
            }
        }
        /// <summary>
        /// Get Salary for an employee based on the month and year
        /// </summary>
        /// <param name="db"></param>
        /// <param name="empId"></param>
        /// <param name="onDate"></param>
        /// <returns></returns>
        private decimal GetSalaryRate(eStoreDbContext db, int empId, DateTime onDate)
        {
            var sal = db.Salaries.Where(c => c.EmployeeId == empId &&
            c.EffectiveDate.Date <= onDate.Date && c.CloseDate.Value.Date >= onDate.Date)
                .OrderByDescending(c => c.EffectiveDate)
                .ToList();
            if (sal != null && sal.Count > 0)
                return sal[0].BasicSalary;
            else return 0;
        }
        /// <summary>
        /// Get Salary for employee
        /// </summary>
        /// <param name="db"></param>
        /// <param name="empId"></param>
        /// <param name="onDate"></param>
        /// <returns></returns>
        private Shared.Models.Payroll.CurrentSalary GetSalary(eStoreDbContext db, int empId, DateTime onDate)
        {
            var sal = db.Salaries.Where(c => c.EmployeeId == empId &&
            c.EffectiveDate.Date <= onDate.Date && c.CloseDate.Value.Date >= onDate.Date)
                .OrderByDescending(c => c.EffectiveDate)
                .ToList();

            return sal[0];
        }

        [Obsolete]
        public PaySlips GeneratePaySlipFinYear(eStoreDbContext db, int empId, int sYear, int eYear)
        {
            var paySlips = new PaySlips { EmpId = empId, SYear = sYear, EYear = eYear };
            for (int i = 4; i <= 12; i++)
            {
                var paySlip = GenerateMonthlyPaySlip(db, empId, new DateTime(sYear, i, 1), 0);
            }
            for (int i = 1; i <= 3; i++)
            {
                var paySlip = GenerateMonthlyPaySlip(db, empId, new DateTime(eYear, i, 1), 0);
            }
            return paySlips;
        }

        [Obsolete]
        public PaySlip GenerateMonthlyPaySlip(eStoreDbContext db, int empId, DateTime month, decimal salaryRate)
        {
            var paySlip = new PaySlip
            { EmpId = empId, GenerationDate = DateTime.Today, OnDate = month };

            var attnds = db.Attendances.Where(c => c.EmployeeId == empId && c.AttDate.Month == month.Month && c.AttDate.Year == month.Year)
                .OrderBy(c => c.AttDate).Select(c => new { c.AttDate.Day, c.Status, c.IsTailoring });
            int days = DateTime.DaysInMonth(month.Year, month.Month);
            int count = attnds.Select(c => c.Day).Distinct().Count();

            if (count != days)
            {
                paySlip.Remarks = "No of Attendance not matching.";
                // Do Verification
                for (int i = 1; i <= days; i++)
                {
                    if (attnds.Where(c => c.Day == i).Count() != 1) paySlip.Remarks += " #D-" + i;
                }
            }

            paySlip.Present = attnds.Where(c => c.Status == AttUnit.Present ||
            c.Status == AttUnit.Holiday || c.Status == AttUnit.StoreClosed
            ).Count();
            paySlip.PaidLeave = attnds.Where(c => c.Status == AttUnit.PaidLeave || c.Status == AttUnit.SickLeave).Count();
            paySlip.Absent = attnds.Where(c => c.Status == AttUnit.Absent || c.Status == AttUnit.CasualLeave
            || c.Status == AttUnit.OnLeave).Count();
            paySlip.HalfDay = (attnds.Where(c => c.Status == AttUnit.HalfDay).Count());
            paySlip.WeeklyLeave= (attnds.Where(c => c.Status == AttUnit.SundayHoliday).Count());
            paySlip.Sunday = attnds.Where(c => c.Status == AttUnit.Sunday).Count();
            paySlip.NoOfWorkingDays = days;

            // Get Salary
            if (salaryRate <= 0)
                salaryRate = GetSalaryRate(db, empId, month);
            if ((paySlip.Present + ((decimal)0.5 * paySlip.HalfDay) + paySlip.Sunday) > 15)
            {
                paySlip.SalaryPerDay = salaryRate / 30;
            }
            else
            {
                paySlip.SalaryPerDay = salaryRate / 26;
            }

            // Calculate salary for 31 days and 28/29 days Feb
            if (days == 31)
            {
                // Months for 31 days
            }
            else if (month.Month == 2)
            {
                //Feb month
                if (days == 28)
                    paySlip.NetSalary = paySlip.SalaryPerDay * (2 + paySlip.Present + paySlip.PaidLeave + paySlip.Sunday + paySlip.HalfDay * (decimal)0.5);
                else //Feb month    with leap year
                    paySlip.NetSalary = paySlip.SalaryPerDay * (1 + paySlip.Present + paySlip.PaidLeave + paySlip.Sunday + paySlip.HalfDay * (decimal)0.5);
            }
            else
            {
                // Months having 30 days and 4 or more 5 sundays
                paySlip.NetSalary = paySlip.SalaryPerDay * (paySlip.Present + paySlip.PaidLeave + paySlip.Sunday + paySlip.HalfDay * (decimal)0.5);
            }

            return paySlip;
        }


        // Salary Calculation 
        /// <summary>
        /// Monthly Salary calculation for employee for a particular month/year
        /// </summary>
        /// <param name="db"></param>
        /// <param name="empId"></param>
        /// <param name="month"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        public MonthlyAttendance MonthlySalaryCalculation(eStoreDbContext db, int empId, DateTime month, bool save = false)
        {
            var paySlip = new MonthlyAttendance
            { EmployeeId = empId, OnDate = month };
            var attnds = db.Attendances.Where(c => c.EmployeeId == empId && c.AttDate.Month == month.Month && c.AttDate.Year == month.Year)
                .OrderBy(c => c.AttDate).Select(c => new { c.AttDate.Day, c.Status, c.IsTailoring });
            int days = DateTime.DaysInMonth(month.Year, month.Month);
            int count = attnds.Select(c => c.Day).Distinct().Count();

            if (count != days)
            {
                paySlip.Remarks = "No of Attendance not matching.";
                // Do Verification
                for (int i = 1; i <= days; i++)
                {
                    if (attnds.Where(c => c.Day == i).Count() != 1) paySlip.Remarks += " #D-" + i;
                }
            }

            paySlip.Present = attnds.Where(c => c.Status == AttUnit.Present).Count();
            paySlip.Holidays = attnds.Where(c => c.Status == AttUnit.Holiday || c.Status == AttUnit.StoreClosed).Count();
            paySlip.PaidLeave = attnds.Where(c => c.Status == AttUnit.PaidLeave || c.Status == AttUnit.SickLeave).Count();
            paySlip.Absent = attnds.Where(c => c.Status == AttUnit.Absent || c.Status == AttUnit.OnLeave).Count();
            paySlip.HalfDay = attnds.Where(c => c.Status == AttUnit.HalfDay).Count();
            paySlip.CasualLeave = attnds.Where(c => c.Status == AttUnit.CasualLeave).Count();
            paySlip.Sunday = attnds.Where(c => c.Status == AttUnit.Sunday).Count();
            paySlip.NoOfWorkingDays = days;

            //Calucalte Billable Days
            //TODO: check where to be done

            paySlip.BillableDays = paySlip.PaidLeave + paySlip.Present + paySlip.Holidays + paySlip.Sunday + ((decimal)0.5 * paySlip.HalfDay);

            if (save)
            {
                db.MonthlyAttendances.Add(paySlip);
                db.SaveChanges();
            }
            return paySlip;
        }

        /// <summary>
        /// Yearly Salary calculation. May be obsulute in future.
        /// </summary>
        /// <param name="db"></param>
        /// <param name="empId"></param>
        /// <param name="month"></param>
        /// <param name="save"></param>
        public void YearlySalaryCalculation(eStoreDbContext db, int empId, DateTime month, bool save = false)
        {
            var paySlip = new YearlyAttendance
            { EmployeeId = empId, OnDate = month };
            var attnds = db.Attendances.Where(c => c.EmployeeId == empId && c.AttDate.Year == month.Year)
                .OrderBy(c => c.AttDate).Select(c => new { c.AttDate.Day, c.Status, c.IsTailoring });
            int days = DateTime.DaysInMonth(month.Year, month.Month);
            int count = attnds.Select(c => c.Day).Distinct().Count();

            //Handle for Yearly
            //if (count != days)
            //{
            //    paySlip.Remarks = "No of Attendance not matching.";
            //    // Do Verification
            //    for (int i = 1; i <= days; i++)
            //    {
            //        if (attnds.Where(c => c.Day == i).Count() != 1) paySlip.Remarks += " #D-" + i;
            //    }
            //}

            paySlip.Present = attnds.Where(c => c.Status == AttUnit.Present).Count();
            paySlip.Holidays = attnds.Where(c => c.Status == AttUnit.Holiday || c.Status == AttUnit.StoreClosed).Count();
            paySlip.PaidLeave = attnds.Where(c => c.Status == AttUnit.PaidLeave || c.Status == AttUnit.SickLeave).Count();
            paySlip.Absent = attnds.Where(c => c.Status == AttUnit.Absent || c.Status == AttUnit.OnLeave).Count();
            paySlip.HalfDay = attnds.Where(c => c.Status == AttUnit.HalfDay).Count();
            paySlip.CasualLeave = attnds.Where(c => c.Status == AttUnit.CasualLeave).Count();
            paySlip.Sunday = attnds.Where(c => c.Status == AttUnit.Sunday).Count();
            paySlip.NoOfWorkingDays = days;

            //Calucalte Billable Days
            //TODO: check where to be done

            paySlip.BillableDays = paySlip.PaidLeave + paySlip.Present + paySlip.Holidays + paySlip.Sunday + ((decimal)0.5 * paySlip.HalfDay);

            if (save)
            {
                db.YearlyAttendances.Add(paySlip);
                db.SaveChanges();
            }
        }

        //Calculate Payslip from Monthly Attendance

        /// <summary>
        /// Generate pay slip for a month for an employee
        /// </summary>
        /// <param name="db"></param>
        /// <param name="onDate"></param>
        /// <param name="empId"></param>
        /// <returns></returns>
        public PaySlip GenerateMonthlyPaySlip(eStoreDbContext db, DateTime onDate, int empId)
        {
            //Fetch attendance from database based on emaployee id and month/year
            var paySlip = db.MonthlyAttendances.Where(c => c.EmployeeId == empId && c.OnDate.Month == onDate.Month
            && c.OnDate.Year == onDate.Year)
               .Select(c => new PaySlip
               {
                   EmpId = empId,
                   Absent = c.Absent + c.CasualLeave,
                   GenerationDate = DateTime.Today,
                   HalfDay = c.HalfDay,
                   OnDate = onDate,
                   GrossSalary = 0,
                   NetSalary = 0,
                   NoOfWorkingDays = c.NoOfWorkingDays,
                   PaidLeave = c.PaidLeave,
                   Present = c.Present + c.Holidays,
                   Sunday = c.Sunday,
                   BillableDays = c.BillableDays,
                   Remarks = c.Remarks,
                   SalaryPerDay = 0, WeeklyLeave=c.WeeklyLeave

               }).FirstOrDefault();

            if (paySlip != null)
            {

                // Getting Salary rate for emp for that month
                var salaryRate = GetSalaryRate(db, empId, onDate);

                // Calculating salary per day based on no of days present in month
                if ((paySlip.Present + ((decimal)0.5 * paySlip.HalfDay) + paySlip.Sunday) > 15)
                {
                    paySlip.SalaryPerDay = salaryRate / 30;
                }
                else
                {
                    paySlip.SalaryPerDay = salaryRate / 26;
                }

                // Calculate salary for 31 days and 28/29 days Feb
                if (paySlip.NoOfWorkingDays == 31)
                {
                    // Months for 31 days
                    paySlip.NetSalary = paySlip.SalaryPerDay * (paySlip.Present + paySlip.PaidLeave + paySlip.Sunday + paySlip.HalfDay * (decimal)0.5 - 1);
                }
                else if (onDate.Month == 2)
                {
                    //Calculation for Feb month and Leap Year take in considiration 
                    //Feb month   
                    if (paySlip.NoOfWorkingDays == 28)
                        paySlip.NetSalary = paySlip.SalaryPerDay * (2 + paySlip.Present + paySlip.PaidLeave + paySlip.Sunday + paySlip.HalfDay * (decimal)0.5);
                    else //Feb month    with leap year
                        paySlip.NetSalary = paySlip.SalaryPerDay * (1 + paySlip.Present + paySlip.PaidLeave + paySlip.Sunday + paySlip.HalfDay * (decimal)0.5);
                }
                else
                {
                    // Months having 30 days and 4 or more 5 sundays
                    paySlip.NetSalary = paySlip.SalaryPerDay * (paySlip.Present + paySlip.PaidLeave + paySlip.Sunday + paySlip.HalfDay * (decimal)0.5);
                }
                // it will return payslip for employee for particular month. 
                return paySlip;
            }
            else
            {
                // it will return null for the employee if no attendance is recorded, it for safety check. 
                return null;
            }
        }
        /// <summary>
        /// Generating Yearly payslip for an employee. Fin year 
        /// </summary>
        /// <param name="db"></param>
        /// <param name="empId"></param>
        /// <param name="sYear"></param>
        /// <param name="eYear"></param>
        /// <returns></returns>
        public PaySlips GeneratePaySlipForFinYear(eStoreDbContext db, int empId, int sYear, int eYear)
        {
            var paySlips = new PaySlips { EmpId = empId, SYear = sYear, EYear = eYear };
            for (int i = 4; i <= 12; i++)
            {
                var paySlip = GenerateMonthlyPaySlip(db, new DateTime(sYear, i, 1), empId);
                switch (i)
                {
                    case 4: paySlips.April = paySlip; break;
                    case 5: paySlips.May = paySlip; break;
                    case 6: paySlips.June = paySlip; break;

                    case 7: paySlips.July = paySlip; break;
                    case 8: paySlips.Aug = paySlip; break;
                    case 9: paySlips.Sept = paySlip; break;

                    case 10: paySlips.Oct = paySlip; break;
                    case 11: paySlips.Nov = paySlip; break;
                    case 12: paySlips.Dec = paySlip; break;
                    default: break;
                }
            }
            for (int i = 1; i <= 3; i++)
            {
                var paySlip = GenerateMonthlyPaySlip(db, new DateTime(eYear, i, 1), empId);
                switch (i)
                {
                    case 1: paySlips.Jan = paySlip; break;
                    case 2: paySlips.Feb = paySlip; break;
                    case 3: paySlips.Mar = paySlip; break;
                    default: break;
                }
            }
            return paySlips;
        }

        /// <summary>
        /// Calculate Salary/PaySlip of all employee for an period 
        /// </summary>
        /// <param name="db"></param>
        /// <param name="onDate"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        public SortedDictionary<string, PaySlip> SalaryCalculation(eStoreDbContext db, DateTime onDate, bool save = false)
        {
            ///Fetching List of Employee id whose attendance is recorded for the perdiod. 
            var empids = db.Attendances.Include(c => c.Employee).Where(c => c.AttDate.Month == onDate.Month && c.AttDate.Year == onDate.Year).Select(c => new { c.EmployeeId, c.Employee.StaffName }).
                Distinct().ToList();
            // Collection of paySlip defined
            SortedDictionary<string, PaySlip> paySlips = new SortedDictionary<string, PaySlip>();

            foreach (var emp in empids)
            {
                // Fetching generated Payslip for the employee for the month
                paySlips.Add(emp.StaffName, GenerateMonthlyPaySlip(db, onDate, emp.EmployeeId));
            }

            //Returning all payslips as collections
            return paySlips;
        }
    }

    public class PayrollManager
    {
        /// <summary>
        /// Its calculate  Monthly attendance for each employees  and save it
        /// </summary>
        /// <param name="db"></param>
        /// <param name="onDate"></param>
        /// <returns> return it is saved or not .</returns>
        public bool CalculateMonthlyAttendance(eStoreDbContext db, DateTime onDate)
        {
            //List of attendance for a month
            var attends = db.Attendances.Where(c => c.AttDate.Month == onDate.Month && c.AttDate.Year == onDate.Year)
                .Select(c => new { c.EmployeeId, c.Status, c.AttDate, c.StoreId }).OrderBy(c => c.EmployeeId)
                .ToList();
            if (attends == null && attends.Count < 1) return false;

            var empIds = attends.Select(c => c.EmployeeId).Distinct().ToList();

            foreach (var emp in empIds)
            {
                MonthlyAttendance mA = new MonthlyAttendance
                {
                    EmployeeId = emp,
                    IsReadOnly = true,
                    EntryStatus = EntryStatus.Approved,
                    OnDate = onDate,
                    Remarks = "Auto Generated",
                    NoOfWorkingDays = DateTime.DaysInMonth(onDate.Year, onDate.Month),

                    PaidLeave = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.PaidLeave
                    || c.Status == AttUnit.SickLeave ).Count(),
                    
                    //Sunday Holiday
                    WeeklyLeave=attends.Where(c=>c.EmployeeId==emp && c.Status == AttUnit.SundayHoliday).Count(),
                    Absent = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Absent
                    || c.Status == AttUnit.OnLeave).Count(),

                    CasualLeave = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.CasualLeave).Count(),

                    HalfDay = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.HalfDay).Count(),

                    Holidays = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Holiday || c.Status == AttUnit.StoreClosed).Count(),

                    Present = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Present).Count(),

                    Sunday = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Sunday).Count(),

                    UserId = $"AutoAdmin ##{attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Absent || c.Status == AttUnit.OnLeave).Count()}##",
                    StoreId = attends.Where(c => c.EmployeeId == emp).Select(c => c.StoreId).FirstOrDefault(),
                };
                mA.BillableDays = (decimal)(mA.Present + mA.Sunday + mA.Holidays + mA.PaidLeave + (mA.HalfDay * 0.5));

                int days = mA.Present + mA.PaidLeave + mA.Absent + mA.CasualLeave + mA.HalfDay + mA.Holidays + mA.Sunday;
                if (days != mA.NoOfWorkingDays)
                {
                    mA.EntryStatus = EntryStatus.Rejected;
                    mA.Remarks += $"     #Working Not matching, WD-{mA.NoOfWorkingDays},TA-{days}, Diff->{mA.NoOfWorkingDays - days}";
                }

                db.MonthlyAttendances.Add(mA);
            }
            if (DeleteMonthlyAttendance(db, onDate))
                return db.SaveChanges() > 0;
            else return false;
        }

        public bool CalculateYearlyAttendance(eStoreDbContext db, DateTime onDate)
        {
            //List of attendance for a month
            var attends = db.Attendances.Where(c => c.AttDate.Year == onDate.Year)
                .Select(c => new { c.EmployeeId, c.Status, c.AttDate, c.StoreId }).OrderBy(c => c.EmployeeId)
                .ToList();
            var empIds = attends.Select(c => c.EmployeeId).Distinct().ToList();

            foreach (var emp in empIds)
            {
                YearlyAttendance mA = new YearlyAttendance
                {
                    EmployeeId = emp,
                    IsReadOnly = true,
                    EntryStatus = EntryStatus.Approved,
                    OnDate = onDate,
                    Remarks = "Auto Generated",
                    NoOfWorkingDays = DateTime.IsLeapYear(onDate.Year) ? 366 : 365,
                    PaidLeave = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.PaidLeave || c.Status == AttUnit.SickLeave).Count(),
                    Absent = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Absent || c.Status == AttUnit.SundayHoliday || c.Status == AttUnit.OnLeave).Count(),
                    CasualLeave = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.CasualLeave).Count(),
                    HalfDay = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.HalfDay).Count(),
                    Holidays = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Holiday || c.Status == AttUnit.StoreClosed).Count(),
                    Present = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Present).Count(),
                    Sunday = attends.Where(c => c.EmployeeId == emp && c.Status == AttUnit.Sunday).Count(),
                    UserId = "AutoAdmin",
                    StoreId = attends.Where(c => c.EmployeeId == emp).Select(c => c.StoreId).FirstOrDefault(),
                };
                mA.BillableDays = (decimal)(mA.Present + mA.Sunday + mA.Holidays + mA.PaidLeave + (mA.HalfDay * 0.5));

                int days = mA.Present + mA.PaidLeave + mA.Absent + mA.CasualLeave + mA.HalfDay + mA.Holidays + mA.Sunday;
                if (days != mA.NoOfWorkingDays)
                {
                    mA.EntryStatus = EntryStatus.Rejected;
                    mA.Remarks += $"     #Working Not matching, WD-{mA.NoOfWorkingDays},TA-{days}, Diff->{mA.NoOfWorkingDays - days}";
                }

                db.YearlyAttendances.Add(mA);
            }

            return db.SaveChanges() > 0;
        }

        public bool DeleteMonthlyAttendance(eStoreDbContext db, DateTime ondateTime)
        {
            var list = db.MonthlyAttendances.Where(c => c.OnDate.Month == ondateTime.Month && c.OnDate.Year == ondateTime.Year);
            if (list != null && list.Count() > 0)
            {
                db.MonthlyAttendances.RemoveRange(list);
                return db.SaveChanges() > 0;
            }
            else return true;
        }

        public bool ProcessMonthlyAttendance(eStoreDbContext db)
        {
            int count = 0;
            var empIDs = db.Attendances.Select(c => c.EmployeeId).Distinct().ToList();
            //foreach (var emp in empIDs)
            //{
            var yrs = db.Attendances.Select(c => c.AttDate.Year).Distinct().ToList();

            foreach (var year in yrs)
            {
                for (int i = 1; i <= 12; i++)
                {
                    if (CalculateMonthlyAttendance(db, new DateTime(year, i, 1))) count++;
                }

            }

            //}
            return count > 0;
        }
    }

    public class PayrollReports
    {
        public void PaySlipReportForEmployee(eStoreDbContext db, DateTime onDate, int empId)
        {
            var emp = db.Employees.Find(empId);

            // TODO: get Salary before hand for multiple month.
            var paySlips = new PaySlipManager().GenerateMonthlyPaySlip(db, onDate, empId);
        }

        public void PaySlipFinYearReport(eStoreDbContext db, int empId, int SYear, int EYear)
        { }

        /// <summary>
        /// Generate Pay Slip for All Emp
        /// </summary>
        /// <param name="db"></param>
        /// <param name="onDate"></param>
        /// <returns></returns>
        public string PaySlipReportForAllEmpoyee(eStoreDbContext db, DateTime onDate)
        {
            ReportPDFGenerator pdfGen = new ReportPDFGenerator();
            List<Object> pList = new List<Object>();
            var P1 = pdfGen.AddParagraph($"No of Working Days: {DateTime.DaysInMonth(onDate.Year, onDate.Month)}", iText.Layout.Properties.TextAlignment.CENTER, ColorConstants.BLUE);
            pList.Add(P1);
            float[] columnWidths = { 1, 5, 5, 1, 1, 1, 1, 1, 1, 1 ,1};

            Cell[] HeaderCell = new Cell[]{
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("#")),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Staff Name").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Working Days / Count").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("@Salary(PD)").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Attendance").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Absent").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Sunday").SetTextAlignment(TextAlignment.CENTER)),
                new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Weekly").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Salary").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Advance").SetTextAlignment(TextAlignment.CENTER)),
                    new Cell().SetBackgroundColor(new DeviceGray(0.75f)).Add(new Paragraph("Net Salary").SetTextAlignment(TextAlignment.CENTER)),
            };

            var table = pdfGen.GenerateTable(columnWidths, HeaderCell);

            //TODO: Check for usablilty.
            int count = 0;
            decimal totalPayment = 0;
            bool isValid = true;
            int nDays = DateTime.DaysInMonth(onDate.Year, onDate.Month);

            //Adding Data to Table.
            // Fetching Salary Calculation for the date. 
            var salaries = new PaySlipManager().SalaryCalculation(db, onDate);
            foreach (var item in salaries)
            {
                try
                {
                    
                    //var StaffName = item.Key;
                    /// Calculating Total Advance paid in last month
                    var sa = db.SalaryPayments.Where(c => c.EmployeeId == item.Value.EmpId && c.SalaryComponet == SalaryComponet.Advance
                        && c.PaymentDate.Month == item.Value.OnDate.Month && c.PaymentDate.Year == item.Value.OnDate.Year)
                        .Select(c => c.Amount).Sum();

                    // Calculatig no of Attendance recorded in record.
                    var noa = item.Value.HalfDay + item.Value.Absent + item.Value.PaidLeave + item.Value.Present +
                        item.Value.Sunday;

                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((++count) + "")));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Key)));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.NoOfWorkingDays.ToString() + "/" + item.Value.NoOfAttendance.ToString())));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.SalaryPerDay.ToString("0.##"))));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.BillableDays.ToString("0.##"))));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.Absent.ToString())));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.Sunday.ToString())));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.BillableDays.ToString())));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(item.Value.GrossSalary.ToString("0.##"))));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph(sa.ToString("0.##"))));
                    table.AddCell(new Cell().SetTextAlignment(TextAlignment.CENTER).Add(new Paragraph((item.Value.GrossSalary - sa).ToString("0.##"))));

                    // Total Salary Payable in particulat month
                    totalPayment += (item.Value.GrossSalary - sa);

                    //TODO: salary advance in last month noofattenance.
                    if (nDays != item.Value.NoOfAttendance)
                        isValid = false;
                }
                catch (Exception ex)
                {
                    System.Console.WriteLine("Error=> " + ex.Message);
                    var pError = pdfGen.AddParagraph($"Error=>\t {ex.Message}",
                        iText.Layout.Properties.TextAlignment.CENTER, ColorConstants.RED);
                    pList.Add(pError);
                }
            }
            //Setting up caption.
            var P3 = pdfGen.AddParagraph($"Total Monthly Salary:Rs. {totalPayment} /-", 
                iText.Layout.Properties.TextAlignment.CENTER, ColorConstants.BLACK);
            Div d = new Div(); d.Add(P3);
            table.SetCaption(d);

            //Adding table collection pList.
            pList.Add(table);

            if (!isValid)
            {
                // Adding Note If the Calculation detect some calculation mistake due to incorrect data.
                PdfFont font = PdfFontFactory.CreateFont(StandardFonts.COURIER_OBLIQUE);
                Paragraph pRrr = new Paragraph("\nImportant Note: In one or few or all Employee Salary Calculation is incorrect as No. of Attendance and No. of Days in Month in matching. So which ever Employee's No. of attendance and days not matching, there attendance need to be corrected and again this report need to be generated! \n").SetFontColor(ColorConstants.RED).SetTextAlignment(TextAlignment.CENTER);
                pRrr.SetItalic();
                pRrr.SetFont(font);

                var Br = new SolidBorder(1);
                Br.SetColor(ColorConstants.BLUE);
                pRrr.SetBorder(Br);
                pList.Add(pRrr);
            }

            //Adding Advisory note
            Paragraph P2 = new Paragraph("Note: Salary Advances and any other deducation has not be been considered. That is will be deducated in actuals if applicable").SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER).SetFontColor(ColorConstants.RED);
            pList.Add(P2);

            return pdfGen.CreatePdf("Salary Report", $"Salary Report of Month {onDate.Month}/{onDate.Year}", pList, true);
        }
    }
}

//NOTE Thing to be done.
//Calculate Attendance
// Calculate Slary
// Thing to be done by month wise and emp wise
// then combine with year;y fin- yealy , then all or set of emp.
// then for store wise also .
// Then Generate Report from that data and add heading based on that.
// Middle ware class for generating report and fetching data.
// Makes this system modular and less code will be reating. use old codes for help and remove those. 