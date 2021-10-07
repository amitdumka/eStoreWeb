public enum EntryStatus { Added, Approved, Rejected, Updated, Deleted, DeleteApproved }

public enum CRUD { Create, Update, Delete, Invalid }

public enum ArvindAccount { ArvindLimited, ALBL, AFL, Others }

public enum ConnectionType { Commercial, Domestic, HighTension }

public enum RentType { WorkShop, Shop, Goods, Office, House, Others }

public enum Gender { Male, Female, TransGender }

public enum Unit { Meters, Nos, Pcs, Packets, NoUnit }

//public enum SalePayMode { Cash, Card, Mix }//TODO: check update based on data present
public enum Size { S, M, L, XL, XXL, XXXL, T28, T30, T32, T34, T36, T38, T40, T41, T42, T44, T46, T48, FreeSize, NS, NOTVALID }

public enum ProductCategory { Fabric, ReadyMade, Accessiories, Tailoring, Trims, PromoItems, Coupons, GiftVouchers, Others }

public enum CardMode { DebitCard, CreditCard, AmexCard }

public enum CardType { Visa, MasterCard, Mastro, Amex, Dinners, Rupay, }

public enum LedgerCategory { Credit, Debit, Income, Expenses, Assests, Bank, Loan, Purchase, Sale, Vendor, Customer }

public enum VPayMode { CA, DC, CC, Mix, Wal, CRD, OTH }

// Aprajita Retails Context
public enum WalletType { PayTm, GooglePay, PhonePay, AirtelPay, BhimPay, Others }

public enum PayMode { Cash, Card, RTGS, NEFT, IMPS, Wallets, Cheques, DemandDraft, Points, Others, Coupons, MixPayments, UPI };

public enum PaymentMode { Cash, Card, RTGS, NEFT, IMPS, Wallets, Cheques, DemandDraft, Others, UPI };

public enum AttUnit { Present, Absent, HalfDay, Sunday, Holiday, StoreClosed, SundayHoliday, SickLeave, PaidLeave, CasualLeave, OnLeave };

public enum SalaryComponet { NetSalary, LastPcs, WOWBill, SundaySalary, Incentive, Others, Advance, PaidLeave, SickLeave }

public enum BankPayMode { Cash, Card, Cheques, RTGS, NEFT, IMPS, Wallets, Others }

public enum EmpType { Salesman, StoreManager, HouseKeeping, Owner, Accounts, TailorMaster, Tailors, TailoringAssistance, Others }

public enum TaxType { GST, SGST, CGST, IGST, VAT, CST }

public enum MixPaymentMode { Card, Coupon, PointRedeemed, Others }

public enum SalePayMode { Cash, Card, Mix, SR }//TODO: check update based on data present

public enum LoginRole { Admin, StoreManager, Salesman, Accountant, RemoteAccountant, Member, PowerUser };

public enum LedgerEntryType { Expenses, Payment, Reciept, Salary, AdvacePayment, AdvaceReciept, ArvindLimited, Others }

public enum AccountType { Saving, Current, CashCredit, OverDraft, Others, Loan, CF }

public enum VoucherType { Payment, Reciept, Contra, DebitNote, CreditNote, JV }

public enum LedgerTo { CashSales, POSSale, Cash, TailorBook, Suspense }

public enum Head { Sale, HDFCCA, TailorBook, BikashPatwari, Sanjeev, Zafar, Suspense, IDBICA, ICICIBankCA, BandhanCA, SBIOD, SBICC, AmitKumar, Others }

public enum LedgerBy { AmitKumar, Cash, BandhanCA, BHARATQR, EDCBandhan, EDCEASYTAP, EDCHDFC, EDCICICI, EDCSBI, EXPUNDEF, HDFCCA, ICICIBankCA, IDBICA, Others, SBICC, Suspense, Zafar }

public enum Remark { Uploaded, Payment, Reciept, Expenses, BankDeposit, BankWithdrawal, Others }

public enum UploadType { Purchase, SaleRegister, SaleItemWise, InWard, Customer, Attendance, Search }

public enum UploadReturn { Success, Error, FileNotFound, NotExcelType, ImportNotSupported, OKGen }

public enum HolidayReason { GovertmentHoliday, Bandha, Festivals, WeeklyOff, ApproveHoliday, Other }

public enum SlipBookType { Payment, Reciept, PaymentRecieptCombo, DailyBook, DebitNote, CreditNote, TailoringBook }

public enum AssestCategory
{
    Computer, ComputerAccessory, ComputerParts, EDC,
    Telephone, Mobile, EletronicItem, EletricalItem, PrinterScanner, ElectricalAppliances, Table, Desk, Chair, Racks, AudioEquipments, MeterScale, PenDrives,
    Alimarah, Siscors, TailoringMachines, TailoringEquipment, OtherTailoringItem, OtherItem, RouterSwitchModems
}

public enum VendorType { EBO, MBO, Tailoring, NonSalable, OtherSaleable, Others, TempVendor }

public enum NotesType { DebitNote, CreditNote }