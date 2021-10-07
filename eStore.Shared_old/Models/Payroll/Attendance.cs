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

        [Display (Name = "Staff Name")]
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Attendance Date")]
        public DateTime AttDate { get; set; }

        [Display (Name = "Entry Time")]
        public string EntryTime { get; set; }

        public AttUnit Status { get; set; }
        public string Remarks { get; set; }

        [Display (Name = "Tailor")]
        public bool IsTailoring { get; set; }
    }
}