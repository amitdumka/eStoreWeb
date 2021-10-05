using eStore.Shared.Models.Accounts;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Payroll
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class SalaryPayment : BaseST
    {
        public int SalaryPaymentId { get; set; }

        [Display (Name = "Staff Name")]
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        [Display (Name = "Salary/Year")]
        public string SalaryMonth { get; set; }

        [Display (Name = "Payment Reason")]
        public SalaryComponet SalaryComponet { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Payment Date")]
        public DateTime PaymentDate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal Amount { get; set; }

        [Display (Name = "Payment Mode")]
        public PayMode PayMode { get; set; }

        public string Details { get; set; }

        [Display (Name = "Party")]
        public int? PartyId { get; set; }

        public virtual Party Party { get; set; }
    }
}