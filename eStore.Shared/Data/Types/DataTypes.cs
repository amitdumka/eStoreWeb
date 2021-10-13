/// <summary>
/// These are data type(s) enum used in the projects.
/// </summary>


public enum CRUD { Create, Update, Delete, Invalid }
public enum Gender { Male, Female, TransGender }
public enum Unit { Meters, Nos, Pcs, Packets, NoUnit }
public enum ConnectionType { Commercial, Domestic, HighTension }
public enum RentType { WorkShop, Shop, Goods, Office, House, Others }
public enum Size { S, M, L, XL, XXL, XXXL, T28, T30, T32, T34, T36, T38, T40, T41, T42, T44, T46, T48, FreeSize, NS, NOTVALID }
public enum ProductCategory { Fabric, ReadyMade, Accessiories, Tailoring, Trims, PromoItems, Coupons, GiftVouchers, Others }
public enum Card { DebitCard, CreditCard, AmexCard }
public enum CardType { Visa, MasterCard, Mastro, Amex, Dinners, Rupay, }
public enum LedgerCategory { Credit, Debit, Income, Expenses, Assests, Bank, Loan, Purchase, Sale, Vendor, Customer }
public enum WalletType { PayTm, GooglePay, PhonePay, AirtelPay, BhimPay, Others }
public enum AttUnit { Present, Absent, HalfDay, Sunday, Holiday, StoreClosed, SundayHoliday, SickLeave, PaidLeave, CasualLeave, OnLeave };
public enum SalaryComponet { NetSalary, LastPcs, WOWBill, SundaySalary, Incentive, Others, Advance, PaidLeave, SickLeave }
public enum EmpType { Salesman, StoreManager, HouseKeeping, Owner, Accounts, TailorMaster, Tailors, TailoringAssistance, Others }
public enum TaxType { GST, SGST, CGST, IGST, VAT, CST }
public enum LoginRole { Admin, StoreManager, Salesman, Accountant, RemoteAccountant, Member, PowerUser };
public enum AccountType { Saving, Current, CashCredit, OverDraft, Others, Loan, CF }
public enum HolidayReason { GovertmentHoliday, Bandha, Festivals, WeeklyOff, ApproveHoliday, Other }
public enum SlipBookType { Payment, Reciept, PaymentRecieptCombo, DailyBook, DebitNote, CreditNote, TailoringBook }
public enum VendorType { EBO, MBO, Tailoring, NonSalable, OtherSaleable, Others, TempVendor }
public enum NotesType { DebitNote, CreditNote }
public enum InvoiceType { Sales, SalesReturn, ManualSale, ManualSaleReturn }