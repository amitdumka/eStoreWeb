using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Payroll
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    //TODO: convert to implement tailioring division also
    public class PaySlip : BaseNT
    {
        public int PaySlipId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        public int Month { get; set; }
        public int Year { get; set; }

        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

        public int? CurrentSalaryId { get; set; }
        public virtual CurrentSalary CurrentSalary { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal BasicSalary { get; set; }

        public int NoOfDaysPresent { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TotalSale { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal SaleIncentive { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal WOWBillAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal WOWBillIncentive { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal LastPcsAmount { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal LastPCsIncentive { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal OthersIncentive { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal GrossSalary { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal StandardDeductions { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal TDSDeductions { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal PFDeductions { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal AdvanceDeducations { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal OtherDeductions { get; set; }

        public string Remarks { get; set; }

        public bool? IsTailoring { get; set; }
    }
}