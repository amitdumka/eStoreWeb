using AutoMapper;
using eStore.Shared.Dtos;
using eStore.Shared.DTOs.Accounting;
using eStore.Shared.DTOs.Payrolls;
using eStore.Shared.Models.Accounts;
using eStore.Shared.Models.Banking;
using eStore.Shared.Models.Payroll;
using eStore.Shared.Models.Stores;
using eStore.Shared.Models.Tailoring;

namespace eStore.Shared.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Attendance, AttendanceDto>();
            CreateMap<Employee, EmployeeBasicDto>();
            CreateMap<Store, StoreBasicDto>();
            CreateMap<StoreBasicDto, Store>();

            CreateMap<PaySlip, PaySlipDto>();
            CreateMap<StaffAdvanceReceipt, StaffAdvanceReceiptDto>();
            CreateMap<SalaryPayment, SalaryPaymentDto>();
            CreateMap<CurrentSalary, CurrentSalaryDto>();

            CreateMap<EmployeeDto, Employee>();
            CreateMap<AttendanceDto, Attendance>();
            CreateMap<PaySlipDto, PaySlip>();
            CreateMap<StaffAdvanceReceiptDto, StaffAdvanceReceipt>();
            CreateMap<SalaryPaymentDto, SalaryPayment>();
            CreateMap<CurrentSalaryDto, CurrentSalary>();

            CreateMap<Employee, EmployeeDto>();

            CreateMap<Party, PartyBasicDto>();
            CreateMap<Expense, ExpenseDto>();
            CreateMap<BankAccount, BankAccountDto>();
            CreateMap<LedgerType, LedgerTypeDto>();

            CreateMap<PartyBasicDto, Party>();
            CreateMap<ExpenseDto, Expense>();
            CreateMap<BankAccountDto, BankAccount>();
            CreateMap<LedgerTypeDto, LedgerType>();

            CreateMap<BasicVoucher, BasicVoucherDto>();
            CreateMap<BasicVoucherDto, BasicVoucher>();

            CreateMap<CashPayment, CashPaymentDto>();
            CreateMap<CashReceipt, CashReceiptDto>();
            CreateMap<CashReceiptDto, CashReceipt>();
            CreateMap<CashPaymentDto, CashPayment>();

            CreateMap<Receipt, ReceiptDto>();
            CreateMap<Payment, PaymentDto>();

            CreateMap<ReceiptDto, Receipt>();
            CreateMap<PaymentDto, Payment>();
            CreateMap<TalioringBooking, BookingBasicDto>();
            CreateMap<BookingBasicDto, TalioringBooking>();
        }
    }
}