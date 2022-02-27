using eStore.BL.Triggers;
using eStore.Database;
using eStore.Services.Mails;
using eStore.Shared.Models.Payroll;
using eStore.Shared.Models.Stores;
using eStore.Validator;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Payroll
{
    public class PayrollManager
    {
        /// <summary>
        /// Add Salesman when category is salesman.
        /// </summary>
        /// <param name="db"></param>
        /// <param name="employee"></param>
        /// <returns></returns>
        public static async Task AddSaleman(eStoreDbContext db, Employee employee)
        {
            if (DBDataChecker.IsSalesmanExists(db, employee.FirstName + " " + employee.LastName, employee.StoreId))
            {
                var sm = db.Salesmen.Where(c => c.SalesmanName == employee.FirstName + " " + employee.LastName && c.StoreId == employee.StoreId).First();
                sm.EmployeeId = employee.EmployeeId;
                sm.EntryStatus = EntryStatus.Updated;
                db.Update(sm);
            }
            else
            {
                Salesman sm = new Salesman
                {
                    EmployeeId = employee.EmployeeId,
                    IsReadOnly = true,
                    SalesmanName = employee.FirstName + " " + employee.LastName,
                    StoreId = employee.StoreId,
                    UserId = employee.UserId,
                    EntryStatus = EntryStatus.Added
                };
                db.Salesmen.Add(sm);
            }
            await db.SaveChangesAsync();
        }

        /// <summary>
        /// CRUD Trigger.
        /// </summary>
        /// <param name="db"></param>
        /// <param name="attendance"></param>
        /// <param name="isDeleted"></param>
        /// <param name="isUpdated"></param>
        public void ONInsertOrUpdate(eStoreDbContext db, Attendance attendance, CRUD mode)
        {
            string emailId = "amitnarayansah@gmail.com";
            try
            {
                if (mode == CRUD.Create)
                {
                    var sName = db.Employees.Find(attendance.EmployeeId).StaffName;
                    if (attendance.Status != AttUnit.Present && attendance.Status != AttUnit.Sunday && attendance.Status != AttUnit.SundayHoliday)
                    {
                        MyMail.SendEmail("Att(+):\t" + sName + " Attendance Report status.",
                            sName + " current status is " + attendance.Status + " on date " + attendance.AttDate, emailId);
                    }

                    // HRMBot.NotifyStaffAttandance(db, sName, attendance.AttendanceId, attendance.Status, attendance.EntryTime);
                }
                else if (mode == CRUD.Delete)
                {
                    var sName = db.Employees.Find(attendance.EmployeeId).StaffName;
                    MyMail.SendEmail(sName + " Attendance Report status for delete.",
                        sName + " is deleted and Old status was " + attendance.Status + " on date " + attendance.AttDate, emailId);
                }
                else if (mode == CRUD.Update)
                {
                    var sName = db.Employees.Find(attendance.EmployeeId).StaffName;
                    var before = db.Attendances.Where(c => c.AttendanceId == attendance.AttendanceId).Select(c => c.Status).FirstOrDefault();
                    MyMail.SendEmail(sName + " Attendance Report  status for Updated Record. It was " + before, sName + " is updated and current status is " + attendance.Status + " on date " + attendance.AttDate, emailId);
                    //  HRMBot.NotifyStaffAttandance(db, sName, attendance.AttendanceId, attendance.Status, attendance.EntryTime);
                }
            }
            catch (Exception ex)
            {
                MyMail.MError(emailId, "Error :" + ex.Message);
            }
        }

        public void OnInsert(eStoreDbContext db, StaffAdvanceReceipt salPayment)
        {
            UpdateInAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.ReceiptDate, false);
            // HRMBot.NotifyStaffPayment(db, "", salPayment.EmployeeId, salPayment.Amount, "Advance Receipt: " + salPayment.Details, true);
        }

        //public void OnInsert(eStoreDbContext db, StaffAdvancePayment salPayment)
        //{
        //    UpdateOutAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.PaymentDate, false);
        //    HRMBot.NotifyStaffPayment(db, "", salPayment.EmployeeId, salPayment.Amount, "Advance Payment: " + salPayment.Details);
        //}

        public void OnInsert(eStoreDbContext db, SalaryPayment salPayment)
        {
            UpdateOutAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.PaymentDate, false);
            // HRMBot.NotifyStaffPayment(db, "", salPayment.EmployeeId, salPayment.Amount, "Salary payment for month of " + salPayment.SalaryMonth + "  details: " + salPayment.Details);
            ;
        }

        public void OnDelete(eStoreDbContext db, SalaryPayment salPayment)
        {
            UpdateOutAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.PaymentDate, true);
        }

        public void OnDelete(eStoreDbContext db, StaffAdvanceReceipt salPayment)
        {
            UpdateOutAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.ReceiptDate, true);
        }

        //public void OnDelete(eStoreDbContext db, StaffAdvancePayment salPayment)
        //{
        //    UpdateOutAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.PaymentDate, true);
        //}

        public void OnUpdate(eStoreDbContext db, SalaryPayment salPayment)
        {
            //    var old = db.SalaryPayments.Where(c => c.SalaryPaymentId == salPayment.SalaryPaymentId).Select(d => new { d.Amount, d.PaymentDate, d.PayMode }).FirstOrDefault();
            //    if (old != null)
            //    {
            //        UpdateOutAmount(db, old.Amount, old.PayMode, old.PaymentDate, true);
            //    }
            //    UpdateOutAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.PaymentDate, false);
            //    HRMBot.NotifyStaffPayment(db, "", salPayment.EmployeeId, salPayment.Amount, "Salary payment for month of " + salPayment.SalaryMonth + "  details: " + salPayment.Details);
        }

        //public void OnUpdate(eStoreDbContext db, StaffAdvancePayment salPayment)
        //{
        //    var old = db.StaffAdvancePayments.Where(c => c.StaffAdvancePaymentId == salPayment.StaffAdvancePaymentId).Select(d => new { d.Amount, d.PaymentDate, d.PayMode }).FirstOrDefault();
        //    if (old != null)
        //    {
        //        UpdateOutAmount(db, old.Amount, old.PayMode, old.PaymentDate, true);
        //    }
        //    UpdateOutAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.PaymentDate, false);
        //    HRMBot.NotifyStaffPayment(db, "", salPayment.EmployeeId, salPayment.Amount, "Advance Payment: " + salPayment.Details);
        //}

        public void OnUpdate(eStoreDbContext db, StaffAdvanceReceipt salPayment)
        {
            //var old = db.StaffAdvanceReceipts.Where(c => c.StaffAdvanceReceiptId == salPayment.StaffAdvanceReceiptId).Select(d => new { d.Amount, d.ReceiptDate, d.PayMode }).FirstOrDefault();
            //if (old != null)
            //{
            //    UpdateInAmount(db, old.Amount, old.PayMode, old.ReceiptDate, true);
            //}
            //UpdateInAmount(db, salPayment.Amount, salPayment.PayMode, salPayment.ReceiptDate, false);
            //HRMBot.NotifyStaffPayment(db, "", salPayment.EmployeeId, salPayment.Amount, "Advance Receipt: " + salPayment.Details, true);
        }

        //private void UpDateSalaryAmount(eStoreDbContext db, SalaryPayment salPayment, bool IsEdit)
        //{
        //    if (IsEdit)
        //    {
        //        if (salPayment.PayMode == PayMode.Cash)
        //        {
        //            CashTrigger.UpDateCashOutHand(db, salPayment.PaymentDate, 0 - salPayment.Amount);

        //        }
        //        //TODO: in future make it more robust
        //        if (salPayment.PayMode != PayMode.Cash && salPayment.PayMode != PayMode.Coupons && salPayment.PayMode != PayMode.Points)
        //        {
        //            CashTrigger.UpDateCashOutBank(db, salPayment.PaymentDate, 0 - (salPayment.Amount - salPayment.Amount));
        //        }
        //    }
        //    else
        //    {
        //        if (salPayment.PayMode == PayMode.Cash )
        //        {
        //            CashTrigger.UpDateCashOutHand(db, salPayment.PaymentDate, salPayment.Amount);

        //        }
        //        //TODO: in future make it more robust
        //        if (salPayment.PayMode != PayMode.Cash && salPayment.PayMode != PayMode.Coupons && salPayment.PayMode != PayMode.Points)
        //        {
        //            CashTrigger.UpDateCashOutBank(db, salPayment.PaymentDate, salPayment.Amount - salPayment.Amount);
        //        }
        //    }

        //}
        //private void UpDateStaffPaymentAmount(eStoreDbContext db, StaffAdvancePayment salPayment, bool IsEdit)
        //{
        //    if (IsEdit)
        //    {
        //        if (salPayment.PayMode == PayMode.Cash)
        //        {
        //            CashTrigger.UpDateCashOutHand(db, salPayment.PaymentDate, 0 - salPayment.Amount);

        //        }
        //        //TODO: in future make it more robust
        //        if (salPayment.PayMode != PayMode.Cash && salPayment.PayMode != PayMode.Coupons && salPayment.PayMode != PayMode.Points)
        //        {
        //            CashTrigger.UpDateCashOutBank(db, salPayment.PaymentDate, 0 - (salPayment.Amount - salPayment.Amount));
        //        }
        //    }
        //    else
        //    {
        //        if (salPayment.PayMode == PayMode.Cash)
        //        {
        //            CashTrigger.UpDateCashOutHand(db, salPayment.PaymentDate, salPayment.Amount);

        //        }
        //        //TODO: in future make it more robust
        //        if (salPayment.PayMode != PayMode.Cash && salPayment.PayMode != PayMode.Coupons && salPayment.PayMode != PayMode.Points)
        //        {
        //            CashTrigger.UpDateCashOutBank(db, salPayment.PaymentDate, salPayment.Amount - salPayment.Amount);
        //        }
        //    }

        //}
        //private void UpDateStaffReciptAmount(eStoreDbContext db, StaffAdvanceReceipt salPayment, bool IsEdit)
        //{
        //    if (IsEdit)
        //    {
        //        if (salPayment.PayMode == PayMode.Cash)
        //        {
        //            CashTrigger.UpdateCashInHand(db, salPayment.ReceiptDate, 0 - salPayment.Amount);

        //        }
        //        //TODO: in future make it more robust
        //        if (salPayment.PayMode != PayMode.Cash && salPayment.PayMode != PayMode.Coupons && salPayment.PayMode != PayMode.Points)
        //        {
        //            CashTrigger.UpdateCashInBank(db, salPayment.ReceiptDate, 0 - (salPayment.Amount - salPayment.Amount));
        //        }
        //    }
        //    else
        //    {
        //        if (salPayment.PayMode == PayMode.Cash)
        //        {
        //            CashTrigger.UpdateCashInHand(db, salPayment.ReceiptDate, salPayment.Amount);

        //        }
        //        //TODO: in future make it more robust
        //        if (salPayment.PayMode != PayMode.Cash && salPayment.PayMode != PayMode.Coupons && salPayment.PayMode != PayMode.Points)
        //        {
        //            CashTrigger.UpdateCashInBank(db, salPayment.ReceiptDate, salPayment.Amount - salPayment.Amount);
        //        }
        //    }

        //}

        private void UpdateOutAmount(eStoreDbContext db, decimal Amount, PayMode PayMode, DateTime PaymentDate, bool IsEdit)
        {
            if (IsEdit)
            {
                if (PayMode == PayMode.Cash)
                {
                    CashTrigger.UpDateCashOutHand(db, PaymentDate, 0 - Amount);
                }
                //TODO: in future make it more robust
                if (PayMode != PayMode.Cash && PayMode != PayMode.Coupons && PayMode != PayMode.Points)
                {
                    CashTrigger.UpDateCashOutBank(db, PaymentDate, 0 - (Amount - Amount));
                }
            }
            else
            {
                if (PayMode == PayMode.Cash)
                {
                    CashTrigger.UpDateCashOutHand(db, PaymentDate, Amount);
                }
                //TODO: in future make it more robust
                if (PayMode != PayMode.Cash && PayMode != PayMode.Coupons && PayMode != PayMode.Points)
                {
                    CashTrigger.UpDateCashOutBank(db, PaymentDate, Amount - Amount);
                }
            }
        }

        private void UpdateInAmount(eStoreDbContext db, decimal Amount, PayMode PayMode, DateTime PaymentDate, bool IsEdit)
        {
            if (IsEdit)
            {
                if (PayMode == PayMode.Cash)
                {
                    CashTrigger.UpdateCashInHand(db, PaymentDate, 0 - Amount);
                }
                //TODO: in future make it more robust
                if (PayMode != PayMode.Cash && PayMode != PayMode.Coupons && PayMode != PayMode.Points)
                {
                    CashTrigger.UpdateCashInBank(db, PaymentDate, 0 - (Amount - Amount));
                }
            }
            else
            {
                if (PayMode == PayMode.Cash)
                {
                    CashTrigger.UpdateCashInHand(db, PaymentDate, Amount);
                }
                //TODO: in future make it more robust
                if (PayMode != PayMode.Cash && PayMode != PayMode.Coupons && PayMode != PayMode.Points)
                {
                    CashTrigger.UpdateCashInBank(db, PaymentDate, Amount - Amount);
                }
            }
        }
    }
}