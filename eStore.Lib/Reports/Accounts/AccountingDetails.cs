using eStore.BL.Widgets;
using eStore.Database;
using eStore.Lib.DataHelpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eStore.BL.Reports.Accounts
{
    public class AccountingDetails
    {
        public DetailIEVM DetailIEVM { get; set; }

        public DetailIEVM GetAccountDetails(eStoreDbContext db, DateTime onDate, bool IsWeekly = false)
        {
            DetailIEVM = new DetailIEVM
            {
                // Expenses  = CalculateExpenseDetails (db, onDate),
                // Income= CalculateIncomeDetails (db, onDate),
                OnDate = onDate
            };
            if (IsWeekly)
            {
                DetailIEVM.Expenses = CalculateExpenseDetails(db, onDate, true);
                DetailIEVM.Income = CalculateIncomeDetails(db, onDate, true);
            }
            else
            {
                DetailIEVM.Expenses = CalculateExpenseDetails(db, onDate);
                DetailIEVM.Income = CalculateIncomeDetails(db, onDate);
            }
            DetailIEVM.IncomeExpenseRepot = new IERVM
            {
                Today = CalculateIncomeExpenses(db, onDate, false, false),
                Monthly = CalculateIncomeExpenses(db, onDate, true, false),
                Yearly = CalculateIncomeExpenses(db, onDate, false, true),
                CurrentWeek = CalculateIncomeExpenses(db, onDate, false, false, true),
            };

            return DetailIEVM;
        }

        public IncomeExpensesReport CalculateIncomeExpenses(eStoreDbContext db, DateTime onDate, bool IsMonth, bool IsYear, bool IsWeekLy = false)
        {
            IncomeExpensesReport ierData = null;
            if (IsMonth)
            {
                ierData = new IncomeExpensesReport
                {
                    OnDate = onDate,
                    //Income
                    TotalManualSale = db.DailySales.Where(c => c.IsManualBill && (c.SaleDate).Month == (onDate).Month).Sum(c => c.Amount),
                    TotalSale = db.DailySales.Where(c => c.SaleDate.Month == (onDate).Month && !c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                    TotalTailoringSale = db.DailySales.Where(c => c.IsTailoringBill && (c.SaleDate).Month == (onDate).Month).Sum(c => c.Amount),
                    TotalOtherIncome = 0,

                    //Expenses
                    TotalExpenses = db.Expenses.Where(c => (c.OnDate).Month == (onDate).Month).Sum(c => c.Amount),

                    TotalHomeExpenses = db.CashPayments.Where(c => (c.PaymentDate).Month == (onDate).Month
                   && (c.Mode.Transcation == "Home Expenses" || c.Mode.Transcation == "Amit Kumar	" || c.Mode.Transcation == "	Mukesh(Home Staff")).Sum(c => c.Amount),

                    TotalOthersExpenses = db.CashPayments.Where(c => (c.PaymentDate).Month == (onDate).Month &&
                    (c.Mode.Transcation != "Home Expenses" && c.Mode.Transcation != "Amit Kumar	" && c.Mode.Transcation != "	Mukesh(Home Staff")).Sum(c => c.Amount),

                    TotalCashPayments = 0,//db.PettyCashExpenses.Where(c => (c.ExpDate).Month == (onDate).Month).Sum(c => c.Amount),

                    //Payments
                    TotalPayments = db.Payments.Where(c => (c.OnDate).Month == (onDate).Month).Sum(c => c.Amount),

                    //Staff/Tailoring
                    TotalStaffPayments = db.SalaryPayments.Where(c => (c.PaymentDate).Month == (onDate).Month).Sum(c => c.Amount),
                    //+ db.StaffAdvancePayments.Where(c => (c.PaymentDate).Month == (onDate).Month).Sum(c => c.Amount),
                    //TotalTailoringPayments = db.TailoringSalaryPayments.Where (c => ( c.PaymentDate ).Month == ( onDate ).Month).Sum (c => c.Amount) + db.TailoringStaffAdvancePayments.Where (c => ( c.PaymentDate ).Month == ( onDate ).Month).Sum (c => c.Amount),

                    //Receipts
                    TotalReceipts = db.Receipts.Where(c => (c.OnDate).Month == (onDate).Month).Sum(c => c.Amount) +
              db.StaffAdvanceReceipts.Where(c => (c.ReceiptDate).Month == (onDate).Month).Sum(c => c.Amount),
                    //+ db.TailoringStaffAdvanceReceipts.Where (c => ( c.ReceiptDate ).Month == ( onDate ).Month).Sum (c => c.Amount),
                    TotalCashReceipts = db.CashReceipts.Where(c => (c.InwardDate).Month == (onDate).Month).Sum(c => c.Amount),

                    TotalRecovery = db.DuesLists.Where(c => c.RecoveryDate.Value.Month == onDate.Month).Sum(c => c.Amount),

                    //Dues
                    TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.IsRecovered == false && c.DailySale.SaleDate.Month == onDate.Month).Sum(c => c.Amount),
                    TotalPendingDues = db.DuesLists.Where(c => !c.IsRecovered).Sum(c => c.Amount),
                };
            }
            else if (IsYear)
            {
                ierData = new IncomeExpensesReport
                {
                    OnDate = onDate,
                    //Income
                    TotalManualSale = db.DailySales.Where(c => c.IsManualBill && (c.SaleDate).Year == (onDate).Year).Sum(c => c.Amount),
                    TotalSale = db.DailySales.Where(c => c.SaleDate.Year == (onDate).Year && !c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                    TotalTailoringSale = db.DailySales.Where(c => c.IsTailoringBill && (c.SaleDate).Year == (onDate).Year).Sum(c => c.Amount),
                    TotalOtherIncome = 0,

                    //Expenses
                    TotalExpenses = db.Expenses.Where(c => (c.OnDate).Year == (onDate).Year).Sum(c => c.Amount),

                    TotalHomeExpenses = db.CashPayments.Where(c => (c.PaymentDate).Year == (onDate).Year
                   && (c.Mode.Transcation == "Home Expenses" || c.Mode.Transcation == "Amit Kumar	" || c.Mode.Transcation == "	Mukesh(Home Staff")).Sum(c => c.Amount),

                    TotalOthersExpenses = db.CashPayments.Where(c => (c.PaymentDate).Year == (onDate).Year &&
                    (c.Mode.Transcation != "Home Expenses" && c.Mode.Transcation != "Amit Kumar	" && c.Mode.Transcation != "	Mukesh(Home Staff")).Sum(c => c.Amount),

                    TotalCashPayments = 0,// db.PettyCashExpenses.Where(c => (c.ExpDate).Year == (onDate).Year).Sum(c => c.Amount),

                    //Payments
                    TotalPayments = db.Payments.Where(c => (c.OnDate).Year == (onDate).Year).Sum(c => c.Amount),

                    //Staff/Tailoring
                    TotalStaffPayments = db.SalaryPayments.Where(c => (c.PaymentDate).Year == (onDate).Year).Sum(c => c.Amount),// + db.StaffAdvancePayments.Where(c => (c.PaymentDate).Year == (onDate).Year).Sum(c => c.Amount),
                    //TotalTailoringPayments = db.TailoringSalaryPayments.Where (c => ( c.PaymentDate ).Year == ( onDate ).Year).Sum (c => c.Amount) + db.TailoringStaffAdvancePayments.Where (c => ( c.PaymentDate ).Year == ( onDate ).Year).Sum (c => c.Amount),

                    //Receipts
                    TotalReceipts = db.Receipts.Where(c => (c.OnDate).Year == (onDate).Year).Sum(c => c.Amount) +
              db.StaffAdvanceReceipts.Where(c => (c.ReceiptDate).Year == (onDate).Year).Sum(c => c.Amount),
                    //+db.TailoringStaffAdvanceReceipts.Where (c => ( c.ReceiptDate ).Year == ( onDate ).Year).Sum (c => c.Amount),
                    TotalCashReceipts = db.CashReceipts.Where(c => (c.InwardDate).Year == (onDate).Year).Sum(c => c.Amount),

                    TotalRecovery = db.DuesLists.Where(c => c.RecoveryDate.Value.Year == onDate.Year).Sum(c => c.Amount),

                    //Dues
                    TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.IsRecovered == false && c.DailySale.SaleDate.Year == onDate.Year).Sum(c => c.Amount),
                    TotalPendingDues = db.DuesLists.Where(c => !c.IsRecovered).Sum(c => c.Amount),
                };
            }
            else if (IsWeekLy)
            {
                DateTime startDate = onDate.StartOfWeek();
                DateTime endDate = onDate.EndOfWeek();
                ierData = new IncomeExpensesReport
                {
                    OnDate = onDate,
                    //Income
                    TotalManualSale = db.DailySales.Where(c => c.IsManualBill && (c.SaleDate).Date >= startDate.Date && c.SaleDate.Date <= endDate.Date).Sum(c => c.Amount),
                    TotalSale = db.DailySales.Where(c => c.SaleDate.Date >= startDate.Date && c.SaleDate.Date <= endDate.Date && !c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                    TotalTailoringSale = db.DailySales.Where(c => c.IsTailoringBill && (c.SaleDate).Date >= startDate.Date && c.SaleDate.Date <= endDate.Date).Sum(c => c.Amount),
                    TotalOtherIncome = 0,

                    //Expenses
                    TotalExpenses = db.Expenses.Where(c => (c.OnDate).Date >= startDate.Date && c.OnDate.Date <= endDate.Date).Sum(c => c.Amount),

                    TotalHomeExpenses = db.CashPayments.Where(c => (c.PaymentDate).Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date
                   && (c.Mode.Transcation == "Home Expenses" || c.Mode.Transcation == "Amit Kumar	" || c.Mode.Transcation == "	Mukesh(Home Staff")).Sum(c => c.Amount),

                    TotalOthersExpenses = db.CashPayments.Where(c => (c.PaymentDate).Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date &&
                    (c.Mode.Transcation != "Home Expenses" && c.Mode.Transcation != "Amit Kumar	" && c.Mode.Transcation != "	Mukesh(Home Staff")).Sum(c => c.Amount),

                    TotalCashPayments = 0,// db.PettyCashExpenses.Where(c => (c.ExpDate).Date >= startDate.Date && c.ExpDate.Date <= endDate.Date).Sum(c => c.Amount),

                    //Payments
                    TotalPayments = db.Payments.Where(c => (c.OnDate).Date >= startDate.Date && c.OnDate.Date <= endDate.Date).Sum(c => c.Amount),

                    //Staff/Tailoring
                    TotalStaffPayments = db.SalaryPayments.Where(c => (c.PaymentDate).Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).Sum(c => c.Amount),// + db.StaffAdvancePayments.Where(c => (c.PaymentDate).Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).Sum(c => c.Amount),
                    // TotalTailoringPayments = db.TailoringSalaryPayments.Where (c => ( c.PaymentDate ).Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).Sum (c => c.Amount) + db.TailoringStaffAdvancePayments.Where (c => ( c.PaymentDate ).Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).Sum (c => c.Amount),

                    //Receipts
                    TotalReceipts = db.Receipts.Where(c => (c.OnDate).Date >= startDate.Date && c.OnDate.Date <= endDate.Date).Sum(c => c.Amount) +
             db.StaffAdvanceReceipts.Where(c => (c.ReceiptDate).Date >= startDate.Date && c.ReceiptDate.Date <= endDate.Date).Sum(c => c.Amount),
                    //+ db.TailoringStaffAdvanceReceipts.Where (c => ( c.ReceiptDate ).Date >= startDate.Date && c.ReceiptDate.Date <= endDate.Date).Sum (c => c.Amount),
                    TotalCashReceipts = db.CashReceipts.Where(c => (c.InwardDate).Date >= startDate.Date && c.InwardDate.Date <= endDate.Date).Sum(c => c.Amount),

                    TotalRecovery = db.DuesLists.Where(c => c.RecoveryDate.Value.Date == onDate.Date).Sum(c => c.Amount),

                    //Dues
                    TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.IsRecovered == false && c.DailySale.SaleDate.Date >= startDate.Date && c.DailySale.SaleDate.Date <= endDate.Date).Sum(c => c.Amount),
                    TotalPendingDues = db.DuesLists.Where(c => !c.IsRecovered).Sum(c => c.Amount),
                };
            }
            else
            {
                ierData = new IncomeExpensesReport
                {
                    OnDate = onDate,
                    //Income
                    TotalManualSale = db.DailySales.Where(c => c.IsManualBill && (c.SaleDate).Date == (onDate).Date).Sum(c => c.Amount),
                    TotalSale = db.DailySales.Where(c => c.SaleDate.Date == (onDate).Date && !c.IsManualBill && !c.IsTailoringBill).Sum(c => c.Amount),
                    TotalTailoringSale = db.DailySales.Where(c => c.IsTailoringBill && (c.SaleDate).Date == (onDate).Date).Sum(c => c.Amount),
                    TotalOtherIncome = 0,

                    //Expenses
                    TotalExpenses = db.Expenses.Where(c => (c.OnDate).Date == (onDate).Date).Sum(c => c.Amount),

                    TotalHomeExpenses = db.CashPayments.Where(c => (c.PaymentDate).Date == (onDate).Date
                   && (c.Mode.Transcation == "Home Expenses" || c.Mode.Transcation == "Amit Kumar	" || c.Mode.Transcation == "	Mukesh(Home Staff")).Sum(c => c.Amount),

                    TotalOthersExpenses = db.CashPayments.Where(c => (c.PaymentDate).Date == (onDate).Date &&
                    (c.Mode.Transcation != "Home Expenses" && c.Mode.Transcation != "Amit Kumar	" && c.Mode.Transcation != "	Mukesh(Home Staff")).Sum(c => c.Amount),

                    TotalCashPayments = 0,// db.PettyCashExpenses.Where(c => (c.ExpDate).Date == (onDate).Date).Sum(c => c.Amount),

                    //Payments
                    TotalPayments = db.Payments.Where(c => (c.OnDate).Date == (onDate).Date).Sum(c => c.Amount),

                    //Staff/Tailoring
                    TotalStaffPayments = db.SalaryPayments.Where(c => (c.PaymentDate).Date == (onDate).Date).Sum(c => c.Amount),// + db.StaffAdvancePayments.Where(c => (c.PaymentDate).Date == (onDate).Date).Sum(c => c.Amount),
                    // TotalTailoringPayments = db.TailoringSalaryPayments.Where (c => ( c.PaymentDate ).Date == ( onDate ).Date).Sum (c => c.Amount) + db.TailoringStaffAdvancePayments.Where (c => ( c.PaymentDate ).Date == ( onDate ).Date).Sum (c => c.Amount),

                    //Receipts
                    TotalReceipts = db.Receipts.Where(c => (c.OnDate).Date == (onDate).Date).Sum(c => c.Amount) +
              db.StaffAdvanceReceipts.Where(c => (c.ReceiptDate).Date == (onDate).Date).Sum(c => c.Amount),
                    //+  db.TailoringStaffAdvanceReceipts.Where (c => ( c.ReceiptDate ).Date == ( onDate ).Date).Sum (c => c.Amount),
                    TotalCashReceipts = db.CashReceipts.Where(c => (c.InwardDate).Date == (onDate).Date).Sum(c => c.Amount),

                    TotalRecovery = db.DuesLists.Where(c => c.RecoveryDate.Value.Date == onDate.Date).Sum(c => c.Amount),

                    //Dues
                    TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => c.IsRecovered == false && c.DailySale.SaleDate.Date == onDate.Date).Sum(c => c.Amount),
                    TotalPendingDues = db.DuesLists.Where(c => !c.IsRecovered).Sum(c => c.Amount),
                };
            }
            return ierData;
        }

        public List<IncomeExpensesVM> CalculateIncomeDetails(eStoreDbContext db, DateTime onDate)
        {
            List<IncomeExpensesVM> IncomeDetails = new List<IncomeExpensesVM>();

            var sales = db.DailySales.Where(c => c.SaleDate.Date == onDate.Date);
            var cashRec = db.CashReceipts.Where(c => c.InwardDate.Date == onDate.Date);
            // var tailor = db.TailoringStaffAdvanceReceipts.Where (c => c.ReceiptDate.Date == onDate.Date);
            var staff = db.StaffAdvanceReceipts.Where(c => c.ReceiptDate.Date == onDate.Date);
            var rec = db.Receipts.Where(c => c.OnDate.Date == onDate.Date);
            var recover = db.DueRecovereds.Where(c => c.PaidDate.Date == onDate.Date);
            foreach (var item in sales)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.SaleDate,
                    Particulars = item.InvNo,
                    IsNonCash = (item.PayMode == PayMode.Cash ? false : true)
                };
                IncomeDetails.Add(vmdata);
            }

            foreach (var item in cashRec)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.InwardDate,
                    Particulars = $"Slip No:{item.SlipNo}\t From: {item.ReceiptFrom}",
                    IsNonCash = false
                };
                IncomeDetails.Add(vmdata);
            }

            //foreach ( var item in tailor )
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.ReceiptDate,
            //        Particulars = item.Employee.StaffName,
            //        IsNonCash = ( item.PayMode == PayMode.Cash ? false : true )
            //    };
            //    IncomeDetails.Add (vmdata);
            //}

            foreach (var item in staff)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.ReceiptDate,
                    Particulars = item.Employee.StaffName,
                    IsNonCash = (item.PayMode == PayMode.Cash ? false : true)
                };
                IncomeDetails.Add(vmdata);
            }
            foreach (var item in rec)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.OnDate,
                    Particulars = $"Slip No:{item.ReceiptSlipNo}\t From: {item.PartyName}",
                    IsNonCash = (item.PayMode == PaymentMode.Cash ? false : true)
                };
                IncomeDetails.Add(vmdata);
            }
            foreach (var item in recover)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.AmountPaid,
                    OnDate = item.PaidDate,
                    Particulars = "Dues Recovered :" + item.DuesList.DailySale.InvNo,
                    IsNonCash = (item.Modes == PaymentMode.Cash ? false : true)
                };
                IncomeDetails.Add(vmdata);
            }
            return IncomeDetails;
        }

        public List<IncomeExpensesVM> CalculateExpenseDetails(eStoreDbContext db, DateTime onDate)
        {
            List<IncomeExpensesVM> ExpensesDetails = new List<IncomeExpensesVM>();

            var exp = db.Expenses.Where(c => c.OnDate.Date == onDate.Date);
            // var pettycashexp = null;// db.PettyCashExpenses.Where(c => c.ExpDate.Date == onDate.Date);
            var cashpay = db.CashPayments.Include(c => c.Mode).Where(c => c.PaymentDate.Date == onDate.Date);
            //var tailor = db.TailoringSalaryPayments.Where (c => c.PaymentDate.Date == onDate.Date);
            var staff = db.SalaryPayments.Where(c => c.PaymentDate.Date == onDate.Date);
            var TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => !c.IsRecovered && c.DailySale.SaleDate.Date == onDate.Date);
            var paym = db.Payments.Where(c => c.OnDate.Date == onDate.Date);
            //var tailoradv = db.TailoringStaffAdvancePayments.Include (c => c.Employee).Where (c => c.PaymentDate.Date == onDate.Date).ToList ();
            var staffavc = 0;// db.StaffAdvancePayments.Include(c => c.Employee).Where(c => c.PaymentDate.Date == onDate.Date).ToList();

            foreach (var item in paym)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.OnDate,
                    Particulars = item.PartyName,
                    IsNonCash = (item.PayMode == PaymentMode.Cash ? false : true)
                };
                ExpensesDetails.Add(vmdata);
            }
            foreach (var item in cashpay)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.PaymentDate,
                    Particulars = $"Paid to: {item.PaidTo}\t onAcc: {item.Mode.Transcation}",
                    IsNonCash = false
                };
                ExpensesDetails.Add(vmdata);
            }
            //foreach (var item in pettycashexp)
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.ExpDate,
            //        Particulars = item.Particulars,
            //        IsNonCash = false// ( item.PayMode == PaymentMode.Cash ? false : true )
            //    };
            //    ExpensesDetails.Add(vmdata);
            //}
            foreach (var item in exp)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.OnDate,
                    Particulars = item.Particulars,
                    IsNonCash = (item.PayMode == PaymentMode.Cash ? false : true)
                };
                ExpensesDetails.Add(vmdata);
            }
            //foreach ( var item in tailor )
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.PaymentDate,
            //        Particulars = item.Employee.StaffName + "\t " + item.SalaryMonth,
            //        IsNonCash = ( item.PayMode == PayMode.Cash ? false : true )
            //    };
            //    ExpensesDetails.Add (vmdata);
            //}

            //foreach ( var item in tailoradv )
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.PaymentDate,
            //        Particulars = item.Employee.StaffName + "\t " + item.Details,
            //        IsNonCash = ( item.PayMode == PayMode.Cash ? false : true )
            //    };
            //    ExpensesDetails.Add (vmdata);
            //}
            foreach (var item in exp)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.OnDate,
                    Particulars = item.Particulars,
                    IsNonCash = (item.PayMode == PaymentMode.Cash ? false : true)
                };
                ExpensesDetails.Add(vmdata);
            }

            //foreach (var item in staffavc)
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.PaymentDate,
            //        Particulars = item.Employee.StaffName + "\t " + item.Details,
            //        IsNonCash = (item.PayMode == PayMode.Cash ? false : true)
            //    };
            //    ExpensesDetails.Add(vmdata);
            //}
            foreach (var item in TotalDues)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.DailySale.SaleDate,
                    Particulars = "Dues of Inv:" + item.DailySale.InvNo,
                    IsNonCash = true
                };
                ExpensesDetails.Add(vmdata);
            }

            return ExpensesDetails;
        }

        public List<IncomeExpensesVM> CalculateIncomeDetails(eStoreDbContext db, DateTime onDate, bool Weekly)
        {
            List<IncomeExpensesVM> IncomeDetails = new List<IncomeExpensesVM>();

            DateTime startDate = onDate.StartOfWeek();
            DateTime endDate = onDate.EndOfWeek();
            // var tailor = db.TailoringStaffAdvanceReceipts.Include (c => c.Employee).Where (c => c.ReceiptDate.Date >= startDate.Date && c.ReceiptDate.Date <= endDate.Date).ToList ();
            var sales = db.DailySales.Where(c => c.SaleDate.Date >= startDate.Date && c.SaleDate.Date <= endDate.Date).ToList();
            var cashRec = db.CashReceipts.Where(c => c.InwardDate.Date >= startDate.Date && c.InwardDate.Date <= endDate.Date).ToList();
            var staff = db.StaffAdvanceReceipts.Include(c => c.Employee).Where(c => c.ReceiptDate.Date >= startDate.Date && c.ReceiptDate.Date <= endDate.Date).ToList();
            var rec = db.Receipts.Where(c => c.OnDate.Date >= startDate.Date && c.OnDate.Date <= endDate.Date).ToList();

            var recover = db.DueRecovereds.Include(c => c.DuesList).Include(c => c.DuesList.DailySale).Where(c => c.PaidDate.Date >= startDate.Date && c.PaidDate.Date <= endDate.Date).ToList();

            foreach (var item in sales)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.SaleDate,
                    Particulars = item.InvNo,
                    IsNonCash = (item.PayMode == PayMode.Cash ? false : true)
                };
                IncomeDetails.Add(vmdata);
            }

            foreach (var item in cashRec)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.InwardDate,
                    Particulars = $"Slip No:{item.SlipNo}\t From: {item.ReceiptFrom}",
                    IsNonCash = false
                };
                IncomeDetails.Add(vmdata);
            }

            //foreach ( var item in tailor )
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.ReceiptDate,
            //        Particulars = item.Employee.StaffName,
            //        IsNonCash = ( item.PayMode == PayMode.Cash ? false : true )
            //    };
            //    IncomeDetails.Add (vmdata);
            //}

            foreach (var item in staff)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.ReceiptDate,
                    Particulars = item.Employee.StaffName,
                    IsNonCash = (item.PayMode == PayMode.Cash ? false : true)
                };
                IncomeDetails.Add(vmdata);
            }
            foreach (var item in rec)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.OnDate,
                    Particulars = $"Slip No:{item.ReceiptSlipNo}\t From: {item.PartyName}",
                    IsNonCash = (item.PayMode == PaymentMode.Cash ? false : true)
                };
                IncomeDetails.Add(vmdata);
            }
            foreach (var item in recover)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.AmountPaid,
                    OnDate = item.PaidDate,
                    Particulars = "Dues Recovered :" + item.DuesList.DailySale.InvNo,
                    IsNonCash = (item.Modes == PaymentMode.Cash ? false : true)
                };
                IncomeDetails.Add(vmdata);
            }

            return IncomeDetails;
        }

        public List<IncomeExpensesVM> CalculateExpenseDetails(eStoreDbContext db, DateTime onDate, bool Weekly)
        {
            List<IncomeExpensesVM> ExpensesDetails = new List<IncomeExpensesVM>();
            DateTime startDate = onDate.StartOfWeek();
            DateTime endDate = onDate.EndOfWeek();

            var exp = db.Expenses.Where(c => c.OnDate.Date >= startDate.Date && c.OnDate.Date <= endDate.Date).ToList();
            // var tailoradv = db.TailoringStaffAdvancePayments.Include (c => c.Employee).Where (c => c.PaymentDate.Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).ToList ();

            // var pettycashexp = db.PettyCashExpenses.Where(c => c.ExpDate.Date >= startDate.Date && c.ExpDate.Date <= endDate.Date).ToList();
            // var tailor = db.TailoringSalaryPayments.Include (c => c.Employee).Where (c => c.PaymentDate.Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).ToList ();

            var cashpay = db.CashPayments.Include(c => c.Mode).Where(c => c.PaymentDate.Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).ToList();
            var staff = db.SalaryPayments.Include(c => c.Employee).Where(c => c.PaymentDate.Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).ToList();
            // var staffavc = db.StaffAdvancePayments.Include(c => c.Employee).Where(c => c.PaymentDate.Date >= startDate.Date && c.PaymentDate.Date <= endDate.Date).ToList();
            var TotalDues = db.DuesLists.Include(c => c.DailySale).Where(c => !c.IsRecovered && c.DailySale.SaleDate.Date >= startDate.Date && c.RecoveryDate.Value.Date <= endDate.Date).ToList();
            var paym = db.Payments.Where(c => c.OnDate.Date >= startDate.Date && c.OnDate.Date <= endDate.Date).ToList();

            foreach (var item in paym)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.OnDate,
                    Particulars = item.PartyName,
                    IsNonCash = (item.PayMode == PaymentMode.Cash ? false : true)
                };
                ExpensesDetails.Add(vmdata);
            }
            foreach (var item in cashpay)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.PaymentDate,
                    Particulars = $"Paid to: {item.PaidTo}\t onAcc: {item.Mode.Transcation}",
                    IsNonCash = false
                };
                ExpensesDetails.Add(vmdata);
            }
            //foreach (var item in pettycashexp)
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.ExpDate,
            //        Particulars = item.Particulars,
            //        IsNonCash = false// ( item.PayMode == PaymentMode.Cash ? false : true )
            //    };
            //    ExpensesDetails.Add(vmdata);
            //}
            foreach (var item in exp)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.OnDate,
                    Particulars = item.Particulars,
                    IsNonCash = (item.PayMode == PaymentMode.Cash ? false : true)
                };
                ExpensesDetails.Add(vmdata);
            }

            //foreach ( var item in tailor )
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.PaymentDate,
            //        Particulars = item.Employee.StaffName + "\t " + item.SalaryMonth,
            //        IsNonCash = ( item.PayMode == PayMode.Cash ? false : true )
            //    };
            //    ExpensesDetails.Add (vmdata);
            //}

            //foreach ( var item in tailoradv )
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.PaymentDate,
            //        Particulars = item.Employee.StaffName + "\t " + item.Details,
            //        IsNonCash = ( item.PayMode == PayMode.Cash ? false : true )
            //    };
            //    ExpensesDetails.Add (vmdata);
            //}
            foreach (var item in exp)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.OnDate,
                    Particulars = item.Particulars,
                    IsNonCash = (item.PayMode == PaymentMode.Cash ? false : true)
                };
                ExpensesDetails.Add(vmdata);
            }

            //foreach (var item in staffavc)
            //{
            //    IncomeExpensesVM vmdata = new IncomeExpensesVM
            //    {
            //        Amount = item.Amount,
            //        OnDate = item.PaymentDate,
            //        Particulars = item.Employee.StaffName + "\t " + item.Details,
            //        IsNonCash = (item.PayMode == PayMode.Cash ? false : true)
            //    };
            //    ExpensesDetails.Add(vmdata);
            //}
            foreach (var item in TotalDues)
            {
                IncomeExpensesVM vmdata = new IncomeExpensesVM
                {
                    Amount = item.Amount,
                    OnDate = item.DailySale.SaleDate,
                    Particulars = "Dues of Inv:" + item.DailySale.InvNo,
                    IsNonCash = true
                };
                ExpensesDetails.Add(vmdata);
            }

            return ExpensesDetails;
        }
    }
}