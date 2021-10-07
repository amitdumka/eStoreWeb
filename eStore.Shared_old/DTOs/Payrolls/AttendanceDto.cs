using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.Shared.DTOs.Payrolls
{
    public class StoreBasicDto
    {
        public int StoreId { get; set; }

        [Display (Name = "Code")]
        public string StoreCode { get; set; }

        [Display (Name = "Store")]
        public string StoreName { get; set; }

        public string City { get; set; }

        [Display (Name = "Contact")]
        public string PhoneNo { get; set; }

        [Display (Name = "Store Manager")]
        public string StoreManagerName { get; set; }

        [Display (Name = "SM Contact No")]
        public string StoreManagerPhoneNo { get; set; }

        public bool Status { get; set; }
    }

    public class EmployeeBasicDto
    {
        public int EmployeeId { get; set; }

        [Display (Name = "First Name")]
        public string FirstName { get; set; }

        [Display (Name = "Last    Name")]
        public string LastName { get; set; }

        [Display (Name = "Employee Name")]
        public string StaffName { get { return FirstName + " " + LastName; } }

        [Display (Name = "Mobile No"), Phone]
        public string MobileNo { get; set; }

        [Display (Name = "Working")]
        public bool IsWorking { get; set; }

        [Display (Name = "Job Category")]
        [DefaultValue (0)]
        public EmpType Category { get; set; }

        [DefaultValue (false)]
        [Display (Name = "Tailoring Division")]
        public bool IsTailors { get; set; }

        public int StoreId { get; set; }
        public StoreBasicDto Store { get; set; }
    }

    public class AttendanceDto
    {
        public int AttendanceId { get; set; }

        [Display (Name = "Staff Name")]
        public int EmployeeId { get; set; }

        public EmployeeBasicDto Employee { get; set; }

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

    public class EmployeeDto
    {
        public int EmployeeId { get; set; }

        [Display (Name = "First Name")]
        public string FirstName { get; set; }

        [Display (Name = "Last    Name")]
        public string LastName { get; set; }

        [Display (Name = "Employee Name")]
        public string StaffName { get { return FirstName + " " + LastName; } }

        [Display (Name = "Mobile No"), Phone]
        public string MobileNo { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Joining Date")]
        public DateTime JoiningDate { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Leaving Date")]
        public DateTime? LeavingDate { get; set; }

        [Display (Name = "Working")]
        public bool IsWorking { get; set; }

        [Display (Name = "Job Category")]
        [DefaultValue (0)]
        public EmpType Category { get; set; }

        [DefaultValue (false)]
        [Display (Name = "Tailoring Division")]
        public bool IsTailors { get; set; }

        [Display (Name = "eMail"), EmailAddress]
        public string EMail { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display (Name = "Date Of Birth")]
        public DateTime DateOfBirth { get; set; }

        public string AdharNumber { get; set; }
        public string PanNo { get; set; }
        public string OtherIdDetails { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string FatherName { get; set; }
        public string HighestQualification { get; set; }

        public StoreBasicDto Store { get; set; }
        public int StoreId { get; set; }
    }

    public class EmployeeSelectList
    {
        public int EmployeeId { get; set; }
        public int StoreId { get; set; }
        public string StaffName { get; set; }
    }

    public class SalaryPaymentDto
    {
        public int SalaryPaymentId { get; set; }

        public int EmployeeId { get; set; }

        [Display (Name = "Staff Name")]
        public EmployeeBasicDto Employee { get; set; }

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

        // public string PartyName { get; set; } //TODO: Make Party DTO to handel this

        public int StoreId { get; set; }
        public StoreBasicDto Store { get; set; }
    }

    //TODO: party DTo need to be added.

    public class PaySlipDto
    {
        public int PaySlipId { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OnDate { get; set; }

        public int Month { get; set; }
        public int Year { get; set; }

        public int EmployeeId { get; set; }
        public string StaffName { get; set; }

        public int? CurrentSalaryId { get; set; }
        public string CurrentSalary { get; set; }

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

    public class StaffAdvanceReceiptDto
    {
        public int StaffAdvanceReceiptId { get; set; }

        [Display (Name = "Staff Name")]
        public int EmployeeId { get; set; }

        public string StaffName { get; set; }

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

        public string PartyName { get; set; }
    }

    public class CurrentSalaryDto
    {
        public int CurrentSalaryId { get; set; }

        public int EmployeeId { get; set; }
        public string StaffName { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal BasicSalary { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal LPRate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal IncentiveRate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal IncentiveTarget { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal WOWBillRate { get; set; }

        [DataType (DataType.Currency), Column (TypeName = "money")]
        public decimal WOWBillTarget { get; set; }

        [DefaultValue (true)]
        public bool IsFullMonth { get; set; }

        public bool IsSundayBillable { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime EffectiveDate { get; set; }

        [DataType (DataType.Date), DisplayFormat (DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? CloseDate { get; set; }

        public bool IsEffective { get; set; }

        [DefaultValue (false)]
        public bool IsTailoring { get; set; }
    }
}