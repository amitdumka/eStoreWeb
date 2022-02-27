using eStore.Database;
using eStore.Lib.DataHelpers;
using eStore.Shared.Models.Payroll;
using eStore.Shared.ViewModels.Payroll;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Payroll
{
    /// <summary>
    /// Client based Speical Ops.
    /// </summary>
    public class PayrollSpecialOps
    {
        /// <summary>
        /// Marked Attendance for Store Closed; Store Based Special Function;
        /// </summary>
        /// <param name="db"></param>
        /// <param name="StoreId">Store Id for Employee </param>
        /// <param name="onDate">Date when store is closed</param>
        /// <param name="isHoliday">Is it general holiday or store closed due to some other reason</param>
        /// <param name="Reason">Mention the reason store is closed.</param>
        /// <returns>return true when success; false when error occured.</returns>
        public static async Task<bool> StoreClosedAsync(eStoreDbContext db, int StoreId, DateTime onDate, bool isHoliday, string Reason)
        {
            var empId = await db.Employees.Where(c => c.StoreId == StoreId && c.IsWorking && !c.IsTailors).Select(c => c.EmployeeId).ToListAsync();
            List<Attendance> closedAtt = new List<Attendance>();
            foreach (var emp in empId)
            {
                Attendance newAtt = new Attendance
                {
                    AttDate = onDate.Date,
                    EmployeeId = emp,
                    EntryTime = String.Empty,
                    IsReadOnly = false,
                    IsTailoring = false,
                    Remarks = Reason,
                    StoreId = StoreId,
                    UserId = "AutoAdded",
                    EntryStatus = EntryStatus.Added
                };
                if (isHoliday)
                    newAtt.Status = AttUnit.Holiday;
                else
                    newAtt.Status = AttUnit.StoreClosed;
                closedAtt.Add(newAtt);
            }

            db.Attendances.AddRange(closedAtt);
            if (await db.SaveChangesAsync() > 0)
                return true;
            else
                return false;
        }

        /// <summary>
        /// Get Employee Attendance Report;
        /// </summary>
        /// <param name="db"></param>
        /// <param name="EmpId"></param>
        /// <param name="ondate"></param>
        /// <returns></returns>
        public static async Task<EmployeeAttendaceInfo> EmployeeAttendaceListAsync(eStoreDbContext db, int EmpId, DateTime? ondate)
        {
            var emp = db.Employees.Find(EmpId);
            if (emp == null)
                return null;

            var empid = emp.EmployeeId;

            DateTime ValidDate = ondate.HasValue ? (DateTime)ondate : DateTime.Today;

            var attList = await db.Attendances
                            .Where(c => c.EmployeeId == empid && c.AttDate.Month == ValidDate.Month && c.AttDate.Year == ValidDate.Year)
                            .OrderBy(c => c.AttDate).ToListAsync();

            if (attList != null)
            {
                var p = attList.Where(c => c.Status == AttUnit.Present).Count();
                var a = attList.Where(c => c.Status == AttUnit.Absent).Count();
                int noofdays = DateTime.DaysInMonth(DateTime.Today.Year, DateTime.Today.Month);
                int noofsunday = DateHelper.CountDays(DayOfWeek.Sunday, DateTime.Today);
                int sunPresent = attList.Where(c => c.Status == AttUnit.Sunday).Count();
                int halfDays = attList.Where(c => c.Status == AttUnit.HalfDay).Count();
                int totalAtt = p + sunPresent + (halfDays / 2);

                EmployeeAttendaceInfo info = new EmployeeAttendaceInfo
                {
                    EmpId = EmpId,
                    StaffName = emp.StaffName,
                    Present = p,
                    Absent = a,
                    WorkingDays = noofdays,
                    Sundays = noofsunday,
                    SundayPresent = sunPresent,
                    HalfDays = halfDays,
                    Total = totalAtt,
                    Attendances = attList
                };
                return info;
            }
            else
            { return null; }
        }
    }
}