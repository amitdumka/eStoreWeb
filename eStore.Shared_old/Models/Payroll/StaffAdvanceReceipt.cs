using eStore.Shared.Models.Accounts;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.Models.Payroll
{
    public class StaffAdvanceReceipt : BaseST
    {
        public int StaffAdvanceReceiptId { get; set; }

        [Display (Name = "Staff Name")]
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Receipt Date")]
        public DateTime ReceiptDate { get; set; }

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