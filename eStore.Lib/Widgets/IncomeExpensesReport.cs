using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eStore.BL.Widgets
{
    public class IncomeExpensesReport
    {
        public int IncomeExpensesReportId { get; set; }

        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Date")]
        public DateTime OnDate { get; set; }

        //Income
        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Sale")]
        public decimal TotalSale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Tailoring Sale")]
        public decimal TotalTailoringSale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Manual Sale")]
        public decimal TotalManualSale { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Receipts")]
        public decimal TotalReceipts { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Cash Receipts")]
        public decimal TotalCashReceipts { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Other Income")]
        public decimal TotalOtherIncome { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Income")]
        public decimal TotalIncome { get { return (TotalSale + TotalTailoringSale + TotalManualSale + TotalReceipts + TotalCashReceipts + TotalOtherIncome); } }

        //Expenses
        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Staff Payments")]
        public decimal TotalStaffPayments { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Tailor Payments")]
        public decimal TotalTailoringPayments { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Expenses")]
        public decimal TotalExpenses { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Home Expenses")]
        public decimal TotalHomeExpenses { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Payments")]
        public decimal TotalPayments { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Cash Payments")]
        public decimal TotalCashPayments { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Other Expenses")]
        public decimal TotalOthersExpenses { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Expenses")]
        public decimal TotalAllExpenses { get { return (TotalStaffPayments + TotalTailoringPayments + TotalExpenses + TotalPayments + TotalCashPayments + TotalOthersExpenses + TotalHomeExpenses); } }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Total Dues")]
        public decimal TotalDues { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Dues Recovered")]
        public decimal TotalRecovery { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money"), Display(Name = "Pending Dues")]
        public decimal TotalPendingDues { get; set; }
    }
}