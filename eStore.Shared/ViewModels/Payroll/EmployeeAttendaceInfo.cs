using eStore.Shared.Models.Payroll;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.ViewModels.Payroll
{
    /// <summary>
    /// Move to Model Section
    /// </summary>
    public class EmployeeAttendaceInfo
    {
        public int EmpId { get; set; }
        public string StaffName { get; set; }
        public int Present { get; set; }
        public int Absent { get; set; } // a;
        public int WorkingDays { get; set; } // noofdays;
        public int Sundays { get; set; } // noofsunday;
        public int SundayPresent { get; set; } // sunPresent;
        public int HalfDays { get; set; } // halfDays;
        public int Total { get; set; } // totalAtt;
        public List<Attendance> Attendances { get; set; }
    }

    public class SalesmanInfo
    {
        public int SalesmanInfoId { get; set; }

        [Display (Name = "Salesman")]
        public string SalesmanName { get; set; }

        //public int? EmployeeId { get; set; }
        //public virtual Employee Employee { get; set; }
        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TotalSale { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CurrentYear { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal CurrentMonth { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal LastMonth { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal LastYear { get; set; }

        public int TotalBillCount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Average { set; get; }
    }
}