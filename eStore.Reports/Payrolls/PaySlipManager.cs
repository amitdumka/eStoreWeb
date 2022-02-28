using eStore.Database;
using eStore.Shared.Models.Payroll;
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
        public PaySlip GenerateMonthlyPaySlip(eStoreDbContext db, int empId, DateTime month, decimal salaryRate)
        {
            var paySlip = new PaySlip
            { EmpId = empId, GenerationDate = DateTime.Today, OnDate = month };

            var attnds = db.Attendances.Where(c => c.EmployeeId == empId && c.AttDate.Month == month.Month && c.AttDate.Year == month.Year)
                .OrderBy(c => c.AttDate).Select(c => new { c.AttDate.Day, c.Status, c.IsTailoring });
            int days = DateTime.DaysInMonth(month.Month, month.Year);
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

        private decimal GetSalaryRate(eStoreDbContext db, int empId, DateTime onDate)
        {
            var sal = db.Salaries.Where(c => c.EmployeeId == empId &&
            c.EffectiveDate.Date <= onDate.Date && c.CloseDate.Value.Date >= onDate.Date)
                .OrderByDescending(c => c.EffectiveDate)
                .ToList();

            return sal[0].BasicSalary;

        }
        private Shared.Models.Payroll.CurrentSalary GetSalary(eStoreDbContext db, int empId, DateTime onDate)
        {
            var sal = db.Salaries.Where(c => c.EmployeeId == empId &&
            c.EffectiveDate.Date <= onDate.Date && c.CloseDate.Value.Date >= onDate.Date)
                .OrderByDescending(c => c.EffectiveDate)
                .ToList();

            return sal[0];

        }

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



        // Salary Calculation 

        public void MonthlySalaryCalculation(eStoreDbContext db, int empId, DateTime month, bool save = false)
        {
            var paySlip = new MonthlyAttendance
            { EmployeeId = empId, OnDate = month };
            var attnds = db.Attendances.Where(c => c.EmployeeId == empId && c.AttDate.Month == month.Month && c.AttDate.Year == month.Year)
                .OrderBy(c => c.AttDate).Select(c => new { c.AttDate.Day, c.Status, c.IsTailoring });
            int days = DateTime.DaysInMonth(month.Month, month.Year);
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
        }

        public void YearlySalaryCalculation(eStoreDbContext db, int empId, DateTime month, bool save = false)
        {
            var paySlip = new YearlyAttendance
            { EmployeeId = empId, OnDate = month };
            var attnds = db.Attendances.Where(c => c.EmployeeId == empId && c.AttDate.Year == month.Year)
                .OrderBy(c => c.AttDate).Select(c => new { c.AttDate.Day, c.Status, c.IsTailoring });
            int days = DateTime.DaysInMonth(month.Month, month.Year);
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


    }
}
