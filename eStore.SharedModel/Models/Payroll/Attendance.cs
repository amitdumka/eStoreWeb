using System;
using System.ComponentModel.DataAnnotations;

namespace eStore.Shared.Models.Payroll
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>

    public class Attendance : BaseST
    {
        public int AttendanceId { get; set; }

        [Display(Name = "Staff Name")]
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Attendance Date")]
        public DateTime AttDate { get; set; }

        [Display(Name = "Entry Time")]
        public string EntryTime { get; set; }

        public AttUnit Status { get; set; }
        public string Remarks { get; set; }

        [Display(Name = "Tailor")]
        public bool IsTailoring { get; set; }
    }
    public class MonthlyAttendance: AttendanceBase
    {
        public int MonthlyAttendanceId { get; set; }
        
    }
    public class YearlyAttendance : AttendanceBase
    {
        public int YearlyAttendanceId { get; set; }

    }
    public class AttendanceBase : BaseST
    {
        public DateTime OnDate { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
        public int Present { get; set; }
        public int HalfDay { get; set; }
        public int Sunday { get; set; }
        public int PaidLeave { get; set; }
        public int CasualLeave { get; set; }
        public int Absent { get; set; }
        public int WeeklyLeave { get; set; }
        public int Holidays { get; set; }
        public string Remarks { get; set; }
        public int NoOfWorkingDays { get; set; }
        public decimal BillableDays { get; set; }
    }
}