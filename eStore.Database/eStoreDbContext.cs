using eStore.Shared.Models;
using eStore.Shared.Models.Accounts;
using eStore.Shared.Models.Accounts.Expenses;
using eStore.Shared.Models.Banking;
using eStore.Shared.Models.Common;
using eStore.Shared.Models.Identity;
using eStore.Shared.Models.Payroll;
using eStore.Shared.Models.Personals;
using eStore.Shared.Models.Purchases;
using eStore.Shared.Models.Sales;
using eStore.Shared.Models.Sales.Payments;
using eStore.Shared.Models.Stores;
using eStore.Shared.Models.Tailoring;
using eStore.Shared.Models.Todos;
using eStore.Shared.Models.Users;
using eStore.Shared.Uploader;
using eStore.Shared.ViewModels.Banking;
using eStore.SharedModel.Models.Sales.Invoicing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Invoice = eStore.SharedModel.Models.Sales.Invoicing.Invoice;

namespace eStore.Database
{
    public class eStoreDbContext : DbContext
    {
        public eStoreDbContext(DbContextOptions<eStoreDbContext> options) : base(options)
        {
            //ApplyMigrations(this);
        }


        //UserAuth Api
        public DbSet<User> Users { get; set; }
        public DbSet<StockList> StockLists { get; set; }


        public DbSet<Assest> Assests { get; set; }
        public DbSet<Shared.Models.Sales.Payments.DailySalePayment> DailySalePayments { get; set; }

        public DbSet<WalletPayment> WalletPayments { get; set; }
        public DbSet<BankPayment> BankPayments { get; set; }

        public DbSet<MixAndCouponPayment> MixPayments { get; set; } //APi
        public DbSet<CouponPayment> CouponPayments { get; set; }//API
        public DbSet<PointRedeemed> PointRedeemeds { get; set; }//API

        public DbSet<PettyCashBook> PettyCashBooks { get; set; }

        public DbSet<Store> Stores { get; set; } //Ok//UI /API
        public DbSet<RegisteredUser> RegisteredUsers { get; set; }
        public DbSet<AppInfo> Apps { get; set; } //ok//API
        public DbSet<StoreClose> StoreCloses { get; set; }//api
        public DbSet<StoreHoliday> StoreHolidays { get; set; }//api
        public DbSet<StoreOpen> StoreOpens { get; set; }//api

        ////Payrolls
        public DbSet<Employee> Employees { get; set; } //ok//UI //API

        public DbSet<EmployeeUser> EmployeeUsers { get; set; }
        public DbSet<Attendance> Attendances { get; set; } //ok//UI//API
        public DbSet<Salesman> Salesmen { get; set; } //ok//API

        public DbSet<TranscationMode> TranscationModes { get; set; } //ok//UI //API
        public DbSet<SaleTaxType> SaleTaxTypes { get; set; } //ok//UI //API
        public DbSet<PurchaseTaxType> PurchaseTaxTypes { get; set; }//UI //API

        //Banking
        public DbSet<Bank> Banks { get; set; } //ok //API

        ////TODO
        public DbSet<ToDoMessage> ToDoMessages { get; set; }

        public DbSet<TodoItem> Todos { get; set; }
        public DbSet<FileInfo> Files { get; set; }

        //Tailoring
        public DbSet<TalioringBooking> TalioringBookings { get; set; }//UI //API

        public DbSet<TalioringDelivery> TailoringDeliveries { get; set; }//UI //API

        ////End of Day
        public DbSet<EndOfDay> EndOfDays { get; set; }//UI //API

        public DbSet<CashDetail> CashDetail { get; set; }//UI //API

        //Rent and Electricity
        public DbSet<RentedLocation> RentedLocations { get; set; }//UI//API

        public DbSet<Rent> Rents { get; set; }//UI //API
        public DbSet<ElectricityConnection> ElectricityConnections { get; set; }//UI//API
        public DbSet<EletricityBill> EletricityBills { get; set; }//UI //API
        public DbSet<EBillPayment> BillPayments { get; set; } //UI //API

        public DbSet<Contact> Contacts { get; set; }// API

        ////Import Table Data
        //public DbSet<ImportSearchList> ImportSearches { get; set; }
        //public DbSet<ImportInWard> ImportInWards { get; set; }
        //public DbSet<ImportPurchase> ImportPurchases { get; set; }
        //public DbSet<ImportSaleItemWise> ImportSaleItemWises { get; set; }
        //public DbSet<ImportSaleRegister> ImportSaleRegisters { get; set; }
        //public DbSet<BookEntry> ImportBookEntries { get; set; }
        //public DbSet<BankStatement> BankStatements { get; set; }

        //Bots
        //public DbSet<TelegramAuthUser> TelegramAuthUsers { get; set; }

        public DbSet<DailySale> DailySales { get; set; } //API

        public DbSet<OnlineSale> OnlineSales { get; set; } //APi
        public DbSet<OnlineSaleReturn> OnlineSaleReturns { get; set; } //APi
        public DbSet<OnlineVendor> OnlineVendors { get; set; }//API

        public DbSet<RegularInvoice> RegularInvoices { get; set; } //Api
        public DbSet<RegularSaleItem> RegularSaleItems { get; set; } //APi
        public DbSet<PaymentDetail> PaymentDetails { get; set; } //Api
        public DbSet<RegularCardDetail> CardDetails { get; set; } //APi

        public DbSet<DuesList> DuesLists { get; set; } //API
        public DbSet<DueRecoverd> DueRecovereds { get; set; } //API

        public DbSet<CashInHand> CashInHands { get; set; }//APi
        public DbSet<CashInBank> CashInBanks { get; set; }//API

        public DbSet<Customer> Customers { get; set; } //API

        // New Accounting section
        public DbSet<LedgerType> LedgerTypes { get; set; }//API

        public DbSet<Party> Parties { get; set; }//APi
        public DbSet<LedgerMaster> LedgerMasters { get; set; }//APi
        public DbSet<LedgerEntry> LedgerEntries { get; set; } //api

        // new Expenses/Reciept System with Party Support
        public DbSet<Expense> Expenses { get; set; }//API

        public DbSet<Shared.Models.Accounts.Payment> Payments { get; set; }//APi
        public DbSet<Receipt> Receipts { get; set; }//API

        public DbSet<CashPayment> CashPayments { get; set; }//API
        public DbSet<CashReceipt> CashReceipts { get; set; }//API

        public DbSet<BankAccount> BankAccounts { get; set; }//APi
        public DbSet<CurrentSalary> Salaries { get; set; } //API
        public DbSet<PaySlip> PaySlips { get; set; }//API

        //TODO: review
        public DbSet<SalaryPayment> SalaryPayments { get; set; } //API

        //public DbSet<StaffAdvancePayment> StaffAdvancePayments { get; set; }
        public DbSet<StaffAdvanceReceipt> StaffAdvanceReceipts { get; set; } //API

        public DbSet<BankDeposit> BankDeposits { get; set; } //API
        public DbSet<BankWithdrawal> BankWithdrawals { get; set; } //API

        //Voyager Data
        public DbSet<InwardSummary> InwardSummaries { get; set; }

        public DbSet<VoyBrandName> VoyBrandNames { get; set; }
        public DbSet<VoyPurchaseInward> VoyPurchaseInwards { get; set; }
        public DbSet<VoySaleInvoice> VoySaleInvoices { get; set; }
        public DbSet<VoySaleInvoiceSum> VoySaleInvoiceSums { get; set; }
        public DbSet<TaxRegister> TaxRegisters { get; set; }
        public DbSet<ProductMaster> ProductMasters { get; set; }
        public DbSet<ProductList> ProductLists { get; set; }
        public DbSet<SaleWithCustomer> SaleWithCustomers { get; set; }
        public DbSet<LocationMaster> LocationMasters { get; set; }
        public DbSet<ItemData> ItemDatas { get; set; }

        //purchase
        public DbSet<Brand> Brands { get; set; }

        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ProductPurchase> ProductPurchases { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductItem> ProductItems { get; set; }//API
        public DbSet<Stock> Stocks { get; set; }//API
        public DbSet<eStore.Shared.Models.Purchases.PurchaseItem> PurchaseItem { get; set; } //API
        //Salepurchase

        public DbSet<SaleItem> SaleItems { get; set; }
        public DbSet<SaleInvoice> SaleInvoices { get; set; }
        public DbSet<eStore.Shared.Models.Sales.InvoicePayment> SaleInvoicePayments { get; set; }
        public DbSet<SaleCardDetail> SaleCardDetails { get; set; }
        public DbSet<TaxName> Taxes { get; set; }

        public DbSet<eStore.Shared.ViewModels.Payroll.SalesmanInfo> SalesmanInfo { get; set; }
        public DbSet<PersonalExpense> PersonalExpenses { get; set; }

        //Vendor system
        public DbSet<Vendor> Vendors { get; set; }

        public DbSet<VendorPayment> VendorPayments { get; set; }
        public DbSet<VendorDebitCreditNote> VendorNotes { get; set; }

        public DbSet<PrintedSlipBook> PrintedSlipBooks { get; set; }
        public DbSet<UsedSlip> UsedSlips { get; set; }

        //Version 6.0  New Invoice System. 
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
        public DbSet<eStore.SharedModel.Models.Sales.Invoicing.InvoicePayment> InvoicePayments { get; set; }
        public DbSet<CouponAndPoint> CouponAndPoints { get; set; }
        public DbSet<eStore.Shared.Models.Sales.Payments.EDC> CardMachine { get; set; } //APi
        public DbSet<eStore.Shared.Models.Sales.Payments.EDCTranscation> CardTranscations { get; set; }//API

        public DbSet<AdjustedBill> AdjustedBills { get; set; }

        public DbSet<eStore.Shared.Models.Payroll.MonthlyAttendance> MonthlyAttendances { get; set; }
        public DbSet<YearlyAttendance> YearlyAttendances { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<TodoItem>().ToTable("Todo");
            //modelBuilder.Entity<FileInfo>().ToTable("File");
            //modelBuilder.Entity<TodoItem>()
            //    .Property(e => e.Tags)
            //    .HasConversion(v => string.Join(',', v),
            //    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

            modelBuilder.Entity<TranscationMode>()
              .HasIndex(b => b.Transcation)
              .IsUnique();

            modelBuilder.Entity<Store>().HasData(new Store
            {
                StoreId = 1,
                StoreCode = "JH0006",
                Address = "Bhagalpur Road Dumka",
                City = "Dumka",
                GSTNO = "20AJHPA739P1zv",
                NoOfEmployees = 9,
                OpeningDate = new DateTime(2016, 2, 17).Date,
                PanNo = "AJHPA7396P",
                StoreName = "Aprajita Retails",
                PinCode = "814101",
                Status = true,
                PhoneNo = "06434-224461",
                StoreManagerName = "Alok Kumar",
                StoreManagerPhoneNo = ""
            });

            modelBuilder.Entity<User>().HasData(new User { FullName = "Amit Kumar", IsActive = true, EmployeeId = 3, Password = "Admin", StoreId = 1, IsEmployee = false, UserId = 1, UserName = "Admin", UserType = EmpType.Owner });
            modelBuilder.Entity<User>().HasData(new User { FullName = "Alok Kumar", IsActive = true, EmployeeId = 1, Password = "Alok", StoreId = 1, IsEmployee = true, UserId = 2, UserName = "Alok", UserType = EmpType.StoreManager });
            modelBuilder.Entity<User>().HasData(new User { FullName = "Geetanjali Verma", IsActive = true, EmployeeId = 11, Password = "Geeta", StoreId = 1, IsEmployee = true, UserId = 3, UserName = "Gita", UserType = EmpType.Accounts });

            modelBuilder.Entity<Salesman>().HasData(new Salesman { SalesmanId = 1, SalesmanName = "Manager", StoreId = 1 });
            // modelBuilder.Entity<Salesman>().HasData(new Salesman { SalesmanId = 1, SalesmanName = "Sanjeev Mishra", StoreId = 1 });
            // modelBuilder.Entity<Salesman>().HasData(new Salesman { SalesmanId = 2, SalesmanName = "Mukesh Mandal", StoreId = 1 });
            // modelBuilder.Entity<Salesman>().HasData(new Salesman { SalesmanId = 4, SalesmanName = "Bikash Kumar Sah", StoreId = 1 });

            modelBuilder.Entity<Bank>().HasData(new Bank() { BankId = 1, BankName = "State Bank of India" });
            modelBuilder.Entity<Bank>().HasData(new Bank() { BankId = 2, BankName = "ICICI Bank" });
            modelBuilder.Entity<Bank>().HasData(new Bank() { BankId = 3, BankName = "Bandhan Bank" });
            modelBuilder.Entity<Bank>().HasData(new Bank() { BankId = 4, BankName = "Punjab National Bank" });
            modelBuilder.Entity<Bank>().HasData(new Bank() { BankId = 5, BankName = "Bank of Baroda" });
            modelBuilder.Entity<Bank>().HasData(new Bank() { BankId = 6, BankName = "Axis Bank" });
            modelBuilder.Entity<Bank>().HasData(new Bank() { BankId = 7, BankName = "HDFC Bank" });

            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 1, Transcation = "Home Expenses" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 2, Transcation = "Other Home Expenses" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 3, Transcation = "Mukesh(Home Staff)" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 4, Transcation = "Amit Kumar" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 5, Transcation = "Amit Kumar Expenses" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 6, Transcation = "CashIn" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 7, Transcation = "CashOut" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 8, Transcation = "Regular" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 9, Transcation = "Suspence" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 10, Transcation = "OnLinePurchase" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 11, Transcation = "Petty Cash Expenses" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 12, Transcation = "Dan" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 13, Transcation = "Breakfast" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 14, Transcation = "Lunch" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 15, Transcation = "Coffee" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 16, Transcation = "Cup Glass" });
            modelBuilder.Entity<TranscationMode>().HasData(new TranscationMode { TranscationModeId = 17, Transcation = "Battery" });

            modelBuilder.Entity<SaleTaxType>().HasData(new SaleTaxType { SaleTaxTypeId = 1, CompositeRate = 5, TaxName = "Local Output GST@ 5%  ", TaxType = TaxType.GST });
            modelBuilder.Entity<SaleTaxType>().HasData(new SaleTaxType { SaleTaxTypeId = 2, CompositeRate = 12, TaxName = "Local Output GST@ 12%  ", TaxType = TaxType.GST });
            modelBuilder.Entity<SaleTaxType>().HasData(new SaleTaxType { SaleTaxTypeId = 3, CompositeRate = 5, TaxName = "Output IGST@ 5%  ", TaxType = TaxType.IGST });
            modelBuilder.Entity<SaleTaxType>().HasData(new SaleTaxType { SaleTaxTypeId = 4, CompositeRate = 12, TaxName = "Output IGST@ 12%  ", TaxType = TaxType.IGST });
            modelBuilder.Entity<SaleTaxType>().HasData(new SaleTaxType { SaleTaxTypeId = 5, CompositeRate = 5, TaxName = "Output Vat@ 12%  ", TaxType = TaxType.VAT });
            modelBuilder.Entity<SaleTaxType>().HasData(new SaleTaxType { SaleTaxTypeId = 6, CompositeRate = 12, TaxName = "Output VAT@ 5%  ", TaxType = TaxType.VAT });
            modelBuilder.Entity<SaleTaxType>().HasData(new SaleTaxType { SaleTaxTypeId = 7, CompositeRate = 5, TaxName = "Output Vat Free  ", TaxType = TaxType.VAT });

            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 1, CompositeRate = 5, Name = "Local Output GST@ 5%  ", TaxType = TaxType.GST, OutPutTax = false });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 2, CompositeRate = 12, Name = "Local Output GST@ 12%  ", TaxType = TaxType.GST, OutPutTax = false });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 3, CompositeRate = 5, Name = "Output IGST@ 5%  ", TaxType = TaxType.IGST, OutPutTax = false });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 4, CompositeRate = 12, Name = "Output IGST@ 12%  ", TaxType = TaxType.IGST, OutPutTax = false });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 5, CompositeRate = 5, Name = "Output Vat@ 12%  ", TaxType = TaxType.VAT, OutPutTax = false });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 6, CompositeRate = 12, Name = "Output VAT@ 5%  ", TaxType = TaxType.VAT, OutPutTax = false });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 7, CompositeRate = 0, Name = "Output Vat Free  ", TaxType = TaxType.VAT, OutPutTax = false });

            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 8, CompositeRate = 5, Name = "Local Input GST@ 5%  ", TaxType = TaxType.GST, OutPutTax = true });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 9, CompositeRate = 12, Name = "Local Input GST@ 12%  ", TaxType = TaxType.GST, OutPutTax = true });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 10, CompositeRate = 5, Name = "Input IGST@ 5%  ", TaxType = TaxType.IGST, OutPutTax = true });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 11, CompositeRate = 12, Name = "Input IGST@ 12%  ", TaxType = TaxType.IGST, OutPutTax = true });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 12, CompositeRate = 5, Name = "Input Vat@ 12%  ", TaxType = TaxType.VAT, OutPutTax = true });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 13, CompositeRate = 12, Name = "Input VAT@ 5%  ", TaxType = TaxType.VAT, OutPutTax = true });
            modelBuilder.Entity<TaxName>().HasData(new TaxName { TaxNameId = 14, CompositeRate = 0, Name = "Input Vat Free  ", TaxType = TaxType.VAT, OutPutTax = true });
        }

        public void ApplyMigrations(eStoreDbContext context)
        {
            if (context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }
        }
    }
}