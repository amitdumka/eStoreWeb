using eStore.Database;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eStore.BL.Reports.Payroll
{
    public class Att
    {
        public int Id { get; set; }
        public bool IsValid { get; set; }
        public DateTime OnDate { get; set; }
        public string Remarks { get; set; }
        public AttUnit Status { get; set; }
        public decimal Unit { get; set; }
    }

    public class AttendanceMontly
    {
        public int EmployeeId { get; set; }
        public DateTime OnDate { get; set; }

        public decimal Apr { get; set; }
        public decimal May { get; set; }
        public decimal Jun { get; set; }

        public decimal Jul { get; set; }
        public decimal Aug { get; set; }
        public decimal Sept { get; set; }

        public decimal Oct { get; set; }
        public decimal Nov { get; set; }
        public decimal Dec { get; set; }

        public decimal Feb { get; set; }
        public decimal Jan { get; set; }
        public decimal Mar { get; set; }

    }

    public class AttendanceReport
    {
        public EmpType Category { get; set; }
        public string Email { get; set; }
        public int EmployeeId { get; set; }
        public int Id { get; set; }
        public bool IsTailor { get; set; }
        public List<MonthlyAttendance> MonthlyAttendances { get; set; }
        public DateTime ReportGenerationDate { get; set; }
        public string StaffName { get; set; }
    }

    public class MonthlyAttendance
    {
        public int EmployeeId { get; set; }
        public DateTime OnDate { get; set; }

        public List<Att> Apr { get; set; }
        public List<Att> Aug { get; set; }
        public List<Att> Dec { get; set; }

        public List<Att> Feb { get; set; }
        public List<Att> Jan { get; set; }
        public List<Att> Jul { get; set; }
        public List<Att> Jun { get; set; }
        public List<Att> Mar { get; set; }
        public List<Att> May { get; set; }
        public List<Att> Nov { get; set; }
        public List<Att> Oct { get; set; }

        public List<Att> Sept { get; set; }
    }

    public class PayrollReport
    {
        /// <summary>
        /// Generate All Employee Attendance Report
        /// </summary>
        /// <param name="db"></param>
        /// <param name="StoreId"></param>
        /// <returns></returns>
        public static List<AttendanceReport> GenerateAllEmployeeAttendanceReport(eStoreDbContext db, int StoreId)
        {
            var EmpList = db.Employees.Where(c => c.StoreId == StoreId && c.Category != EmpType.Owner).Select(c => new { c.EmployeeId, c.StaffName, c.IsTailors, c.Category, c.EMail }).ToList();
            List<AttendanceReport> attendanceReports = new List<AttendanceReport>();
            int ctr = 0;
            foreach (var emp in EmpList)
            {
                AttendanceReport rep = new AttendanceReport
                {
                    Id = ++ctr,
                    Category = emp.Category,
                    Email = emp.EMail,
                    EmployeeId = emp.EmployeeId,
                    IsTailor = emp.IsTailors,
                    StaffName = emp.StaffName,
                    ReportGenerationDate = DateTime.Now,
                    MonthlyAttendances = new List<MonthlyAttendance>()
                };

                var attList = db.Attendances.Where(c => c.EmployeeId == emp.EmployeeId).OrderByDescending(c => c.AttDate).Select(c => new Att { OnDate = c.AttDate, Remarks = c.Remarks, Status = c.Status, IsValid = false, Unit = 0, Id = c.AttendanceId }).ToList();

                var YearList = attList.Select(c => c.OnDate.Year).ToList().Distinct();

                foreach (var year in YearList)
                {
                    MonthlyAttendance monthly = new MonthlyAttendance { EmployeeId = emp.EmployeeId, OnDate = new DateTime(year, 01, 01) };
                    var atts = attList.Where(c => c.OnDate.Year == year).ToList();
                    monthly = SortMonthly(atts, monthly, ref attList);
                    rep.MonthlyAttendances.Add(monthly);
                }
                attendanceReports.Add(rep);
            }
            return attendanceReports;
        }

        /// <summary>
        /// Generate Employee Attendance Report
        /// </summary>
        /// <param name="db"></param>
        /// <param name="EmpId"></param>
        /// <returns></returns>
        public static AttendanceReport GenerateEmployeeAttendanceReport(eStoreDbContext db, int EmpId, int finyear = 0, int finmonth = 0)
        {
            var emp = db.Employees.Find(EmpId);

            AttendanceReport rep = new AttendanceReport
            {
                Id = emp.EmployeeId,
                Category = emp.Category,
                Email = emp.EMail,
                EmployeeId = emp.EmployeeId,
                IsTailor = emp.IsTailors,
                StaffName = emp.StaffName,
                ReportGenerationDate = DateTime.Now,
                MonthlyAttendances = new List<MonthlyAttendance>()
            };

            var attList = db.Attendances.Where(c => c.EmployeeId == emp.EmployeeId && c.AttDate.Month == DateTime.Today.Month && c.AttDate.Year == DateTime.Today.Year)
                .OrderByDescending(c => c.AttDate).Select(c => new Att { OnDate = c.AttDate, Remarks = c.Remarks, Status = c.Status, IsValid = false, Unit = 0, Id = c.AttendanceId }).ToList();
            if (finyear > 0 && finmonth == 0)
            {
                DateTime sDate = new DateTime(finyear, 04, 01);
                DateTime eDate = new DateTime(finyear + 1, 03, 31);

                attList = db.Attendances.Where(c => c.EmployeeId == emp.EmployeeId &&
                c.AttDate.Date >= sDate && c.AttDate.Date <= eDate)
                 .OrderByDescending(c => c.AttDate).Select(c => new Att { OnDate = c.AttDate, Remarks = c.Remarks, Status = c.Status, IsValid = false, Unit = 0, Id = c.AttendanceId }).ToList();
                MonthlyAttendance monthly = new MonthlyAttendance { EmployeeId = emp.EmployeeId, OnDate = new DateTime(finyear, 01, 01) };
                monthly.Jan = new List<Att>();
                monthly.Feb = new List<Att>();
                monthly.Mar = new List<Att>();
                monthly.Apr = new List<Att>();
                monthly.May = new List<Att>();
                monthly.Jun = new List<Att>();
                monthly.Jul = new List<Att>();
                monthly.Aug = new List<Att>();
                monthly.Sept = new List<Att>();
                monthly.Oct = new List<Att>();
                monthly.Nov = new List<Att>();
                monthly.Dec = new List<Att>();
                var atts = attList.ToList();
                monthly = SortMonthly(atts, monthly, ref attList);
                rep.MonthlyAttendances.Add(monthly);
            }
            else if (finmonth > 0 && finyear > 0)
            {
                attList = db.Attendances.Where(c => c.EmployeeId == emp.EmployeeId && c.AttDate.Month == finmonth && c.AttDate.Year == finyear)
                  .OrderByDescending(c => c.AttDate).Select(c => new Att { OnDate = c.AttDate, Remarks = c.Remarks, Status = c.Status, IsValid = false, Unit = 0, Id = c.AttendanceId }).ToList();
                MonthlyAttendance monthly = new MonthlyAttendance { EmployeeId = emp.EmployeeId, OnDate = new DateTime(finyear, finmonth, 01) };
                monthly.Jan = new List<Att>();
                monthly.Feb = new List<Att>();
                monthly.Mar = new List<Att>();
                monthly.Apr = new List<Att>();
                monthly.May = new List<Att>();
                monthly.Jun = new List<Att>();
                monthly.Jul = new List<Att>();
                monthly.Aug = new List<Att>();
                monthly.Sept = new List<Att>();
                monthly.Oct = new List<Att>();
                monthly.Nov = new List<Att>();
                monthly.Dec = new List<Att>();
                var atts = attList.Where(c => c.OnDate.Year == finyear && c.OnDate.Month == finmonth).ToList();
                monthly = SortMonthly(atts, monthly, ref attList);
                rep.MonthlyAttendances.Add(monthly);
            }
            else
            {
                attList = db.Attendances.Where(c => c.EmployeeId == emp.EmployeeId).OrderByDescending(c => c.AttDate).Select(c => new Att { OnDate = c.AttDate, Remarks = c.Remarks, Status = c.Status, IsValid = false, Unit = 0, Id = c.AttendanceId }).ToList();
                var YearList = attList.Select(c => c.OnDate.Year).ToList().Distinct();
                foreach (var year in YearList)
                {
                    MonthlyAttendance monthly = new MonthlyAttendance { EmployeeId = emp.EmployeeId, OnDate = new DateTime(year, 01, 01) };
                    monthly.Jan = new List<Att>();
                    monthly.Feb = new List<Att>();
                    monthly.Mar = new List<Att>();
                    monthly.Apr = new List<Att>();
                    monthly.May = new List<Att>();
                    monthly.Jun = new List<Att>();
                    monthly.Jul = new List<Att>();
                    monthly.Aug = new List<Att>();
                    monthly.Sept = new List<Att>();
                    monthly.Oct = new List<Att>();
                    monthly.Nov = new List<Att>();
                    monthly.Dec = new List<Att>();
                    var atts = attList.Where(c => c.OnDate.Year == year).ToList();
                    monthly = SortMonthly(atts, monthly, ref attList);
                    rep.MonthlyAttendances.Add(monthly);
                }
            }

            return rep;
        }

        private static MonthlyAttendance SortMonthly(List<Att> atts, MonthlyAttendance monthly, ref List<Att> attList)
        {
            DateTime date = DateTime.Now;

            foreach (var att in atts)
            {
                if (att.Status == AttUnit.Present || att.Status == AttUnit.Holiday || att.Status == AttUnit.StoreClosed || att.Status == AttUnit.Sunday || att.Status == AttUnit.PaidLeave)
                    att.Unit = 1;
                else if (att.Status == AttUnit.HalfDay)
                    att.Unit = (decimal)0.5;

                switch (att.OnDate.Month)
                {
                    case 1:
                        monthly.Jan.Add(att);
                        break;

                    case 2:
                        monthly.Feb.Add(att);
                        break;

                    case 3:
                        monthly.Mar.Add(att);
                        break;

                    case 4:
                        monthly.Apr.Add(att);
                        break;

                    case 5:
                        monthly.May.Add(att);
                        break;

                    case 6:
                        monthly.Jun.Add(att);
                        break;

                    case 7:
                        monthly.Jul.Add(att);
                        break;

                    case 8:
                        monthly.Aug.Add(att);
                        break;

                    case 9:
                        monthly.Sept.Add(att);
                        break;

                    case 10:
                        monthly.Oct.Add(att);
                        break;

                    case 11:
                        monthly.Nov.Add(att);
                        break;

                    case 12:
                        monthly.Dec.Add(att);
                        break;

                    default:
                        break;
                }
                attList.Remove(att);
            }
            return monthly;
        }
    }
}