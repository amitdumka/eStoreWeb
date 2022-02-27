using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace eStore.Database.Migrations
{
    public partial class eStoreInitCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Apps",
                columns: table => new
                {
                    AppInfoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublishDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatabaseVersion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsEffective = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apps", x => x.AppInfoId);
                });

            migrationBuilder.CreateTable(
                name: "Banks",
                columns: table => new
                {
                    BankId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banks", x => x.BankId);
                });

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    BrandId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrandName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.BrandId);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPrimaryCategory = table.Column<bool>(type: "bit", nullable: false),
                    IsSecondaryCategory = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Company",
                columns: table => new
                {
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPersonName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPersonEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPersonPhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WebSite = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Company", x => x.CompanyId);
                });

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    ContactId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobileNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EMailAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.ContactId);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    CustomerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Age = table.Column<int>(type: "int", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobileNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    NoOfBills = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "money", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.CustomerId);
                });

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    TodoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Size = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.TodoId);
                });

            migrationBuilder.CreateTable(
                name: "HSN",
                columns: table => new
                {
                    HSNCode = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rate = table.Column<int>(type: "int", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CESS = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HSN", x => x.HSNCode);
                });

            migrationBuilder.CreateTable(
                name: "InwardSummaries",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InwardNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InwardDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PartyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalQty = table.Column<decimal>(type: "money", nullable: false),
                    TotalMRPValue = table.Column<decimal>(type: "money", nullable: false),
                    TotalCost = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InwardSummaries", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ItemDatas",
                columns: table => new
                {
                    ItemDataId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BARCODE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrandName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductCategory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StyleCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaxRate = table.Column<decimal>(type: "money", nullable: false),
                    TaxDesc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemDatas", x => x.ItemDataId);
                });

            migrationBuilder.CreateTable(
                name: "LedgerTypes",
                columns: table => new
                {
                    LedgerTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LedgerNameType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LedgerTypes", x => x.LedgerTypeId);
                });

            migrationBuilder.CreateTable(
                name: "LocationMasters",
                columns: table => new
                {
                    LOCATIONCODE = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LOCATIONNAME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ADDRESS = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationMasters", x => x.LOCATIONCODE);
                });

            migrationBuilder.CreateTable(
                name: "OnlineVendors",
                columns: table => new
                {
                    OnlineVendorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VendorName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OffDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnlineVendors", x => x.OnlineVendorId);
                });

            migrationBuilder.CreateTable(
                name: "ProductLists",
                columns: table => new
                {
                    BarCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ItemCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrandCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UOM = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaxCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaxType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "money", nullable: false),
                    PRINCIPAL_FCD = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductLists", x => x.BarCode);
                });

            migrationBuilder.CreateTable(
                name: "ProductMasters",
                columns: table => new
                {
                    PRODUCTCODE = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PRODUCTNAME = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductMasters", x => x.PRODUCTCODE);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseTaxTypes",
                columns: table => new
                {
                    PurchaseTaxTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaxName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaxType = table.Column<int>(type: "int", nullable: false),
                    CompositeRate = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseTaxTypes", x => x.PurchaseTaxTypeId);
                });

            migrationBuilder.CreateTable(
                name: "RegisteredUsers",
                columns: table => new
                {
                    RegisteredUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLoggedIn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsUserLoggedIn = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisteredUsers", x => x.RegisteredUserId);
                });

            migrationBuilder.CreateTable(
                name: "SalesmanInfo",
                columns: table => new
                {
                    SalesmanInfoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SalesmanName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalSale = table.Column<decimal>(type: "money", nullable: false),
                    CurrentYear = table.Column<decimal>(type: "money", nullable: false),
                    CurrentMonth = table.Column<decimal>(type: "money", nullable: false),
                    LastMonth = table.Column<decimal>(type: "money", nullable: false),
                    LastYear = table.Column<decimal>(type: "money", nullable: false),
                    TotalBillCount = table.Column<int>(type: "int", nullable: false),
                    Average = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesmanInfo", x => x.SalesmanInfoId);
                });

            migrationBuilder.CreateTable(
                name: "SaleTaxTypes",
                columns: table => new
                {
                    SaleTaxTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaxName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaxType = table.Column<int>(type: "int", nullable: false),
                    CompositeRate = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleTaxTypes", x => x.SaleTaxTypeId);
                });

            migrationBuilder.CreateTable(
                name: "SaleWithCustomers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvoiceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<decimal>(type: "money", nullable: false),
                    BillAmt = table.Column<decimal>(type: "money", nullable: false),
                    PaymentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateofBirth = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleWithCustomers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    SupplierID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SuppilerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Warehouse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LocationCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.SupplierID);
                });

            migrationBuilder.CreateTable(
                name: "Taxes",
                columns: table => new
                {
                    TaxNameId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaxType = table.Column<int>(type: "int", nullable: false),
                    CompositeRate = table.Column<decimal>(type: "money", nullable: false),
                    OutPutTax = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxes", x => x.TaxNameId);
                });

            migrationBuilder.CreateTable(
                name: "TaxRegisters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrandName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BARCODE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StyleCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<decimal>(type: "money", nullable: false),
                    SaleValue = table.Column<decimal>(type: "money", nullable: false),
                    DiscountAmt = table.Column<decimal>(type: "money", nullable: false),
                    BasicAmt = table.Column<decimal>(type: "money", nullable: false),
                    TaxAmt = table.Column<decimal>(type: "money", nullable: false),
                    TaxRate = table.Column<decimal>(type: "money", nullable: false),
                    TaxDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BillAmt = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxRegisters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ToDoMessages",
                columns: table => new
                {
                    ToDoMessageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OverDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsOver = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoMessages", x => x.ToDoMessageId);
                });

            migrationBuilder.CreateTable(
                name: "TranscationModes",
                columns: table => new
                {
                    TranscationModeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Transcation = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TranscationModes", x => x.TranscationModeId);
                });

            migrationBuilder.CreateTable(
                name: "VoyBrandNames",
                columns: table => new
                {
                    BRANDCODE = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BRANDNAME = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoyBrandNames", x => x.BRANDCODE);
                });

            migrationBuilder.CreateTable(
                name: "VoyPurchaseInwards",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GRNNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GRNDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SupplierName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Barcode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StyleCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<decimal>(type: "money", nullable: false),
                    MRP = table.Column<decimal>(type: "money", nullable: false),
                    MRPValue = table.Column<decimal>(type: "money", nullable: false),
                    Cost = table.Column<decimal>(type: "money", nullable: false),
                    CostValue = table.Column<decimal>(type: "money", nullable: false),
                    TaxAmt = table.Column<decimal>(type: "money", nullable: false),
                    ExmillCost = table.Column<decimal>(type: "money", nullable: false),
                    Excise1 = table.Column<decimal>(type: "money", nullable: false),
                    Excise2 = table.Column<decimal>(type: "money", nullable: false),
                    Excise3 = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoyPurchaseInwards", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "VoySaleInvoices",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrandName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HSNCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BARCODE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StyleCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<decimal>(type: "money", nullable: false),
                    MRP = table.Column<decimal>(type: "money", nullable: false),
                    DiscountAmt = table.Column<decimal>(type: "money", nullable: false),
                    BasicAmt = table.Column<decimal>(type: "money", nullable: false),
                    TaxAmt = table.Column<decimal>(type: "money", nullable: false),
                    SGSTAmt = table.Column<decimal>(type: "money", nullable: false),
                    CGSTAmt = table.Column<decimal>(type: "money", nullable: false),
                    CESSAmt = table.Column<decimal>(type: "money", nullable: false),
                    LineTotal = table.Column<decimal>(type: "money", nullable: false),
                    RoundOff = table.Column<decimal>(type: "money", nullable: false),
                    BillAmt = table.Column<decimal>(type: "money", nullable: false),
                    PaymentMode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SalesManName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Coupon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CouponAmt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SUBTYPE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BillDiscount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LPFlag = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InstOrderCD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TailoringFlag = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoySaleInvoices", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "VoySaleInvoiceSums",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvoiceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<decimal>(type: "money", nullable: false),
                    MRP = table.Column<decimal>(type: "money", nullable: false),
                    DiscountAmt = table.Column<decimal>(type: "money", nullable: false),
                    BasicAmt = table.Column<decimal>(type: "money", nullable: false),
                    TaxAmt = table.Column<decimal>(type: "money", nullable: false),
                    RoundOff = table.Column<decimal>(type: "money", nullable: false),
                    BillAmt = table.Column<decimal>(type: "money", nullable: false),
                    PaymentMode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Coupon = table.Column<decimal>(type: "money", nullable: false),
                    CouponAmt = table.Column<decimal>(type: "money", nullable: false),
                    LPFlag = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InstOrderCD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TailoringFlag = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoySaleInvoiceSums", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "BankAccounts",
                columns: table => new
                {
                    BankAccountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankId = table.Column<int>(type: "int", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankAccounts", x => x.BankAccountId);
                    table.ForeignKey(
                        name: "FK_BankAccounts_Banks_BankId",
                        column: x => x.BankId,
                        principalTable: "Banks",
                        principalColumn: "BankId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductItems",
                columns: table => new
                {
                    Barcode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProductItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrandId = table.Column<int>(type: "int", nullable: false),
                    StyleCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Categorys = table.Column<int>(type: "int", nullable: false),
                    MainCategoryCategoryId = table.Column<int>(type: "int", nullable: true),
                    ProductCategoryCategoryId = table.Column<int>(type: "int", nullable: true),
                    ProductTypeCategoryId = table.Column<int>(type: "int", nullable: true),
                    MRP = table.Column<decimal>(type: "money", nullable: false),
                    TaxRate = table.Column<decimal>(type: "money", nullable: false),
                    Cost = table.Column<decimal>(type: "money", nullable: false),
                    HSNCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Size = table.Column<int>(type: "int", nullable: false),
                    Units = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductItems", x => x.Barcode);
                    table.ForeignKey(
                        name: "FK_ProductItems_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "BrandId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductItems_Categories_MainCategoryCategoryId",
                        column: x => x.MainCategoryCategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductItems_Categories_ProductCategoryCategoryId",
                        column: x => x.ProductCategoryCategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductItems_Categories_ProductTypeCategoryId",
                        column: x => x.ProductTypeCategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    StoreId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoreCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PinCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreManagerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreManagerPhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PanNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GSTNO = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoOfEmployees = table.Column<int>(type: "int", nullable: false),
                    OpeningDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ClosingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.StoreId);
                    table.ForeignKey(
                        name: "FK_Stores_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Todos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Done = table.Column<bool>(type: "bit", nullable: false),
                    Added = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueTo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FileTodoId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Todos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Todos_Files_FileTodoId",
                        column: x => x.FileTodoId,
                        principalTable: "Files",
                        principalColumn: "TodoId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Parties",
                columns: table => new
                {
                    PartyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PartyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OpenningDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OpenningBalance = table.Column<decimal>(type: "money", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PANNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GSTNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LedgerTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parties", x => x.PartyId);
                    table.ForeignKey(
                        name: "FK_Parties_LedgerTypes_LedgerTypeId",
                        column: x => x.LedgerTypeId,
                        principalTable: "LedgerTypes",
                        principalColumn: "LedgerTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BankDeposits",
                columns: table => new
                {
                    BankDepositId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    ChequeNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InNameOf = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsInHouse = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankDeposits", x => x.BankDepositId);
                    table.ForeignKey(
                        name: "FK_BankDeposits_BankAccounts_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "BankAccounts",
                        principalColumn: "BankAccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BankDeposits_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "BankWithdrawals",
                columns: table => new
                {
                    BankWithdrawalId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    ChequeNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InNameOf = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SignedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApprovedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankWithdrawals", x => x.BankWithdrawalId);
                    table.ForeignKey(
                        name: "FK_BankWithdrawals_BankAccounts_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "BankAccounts",
                        principalColumn: "BankAccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BankWithdrawals_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "CardMachine",
                columns: table => new
                {
                    EDCId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TID = table.Column<int>(type: "int", nullable: false),
                    EDCName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountNumberId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsWorking = table.Column<bool>(type: "bit", nullable: false),
                    MID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardMachine", x => x.EDCId);
                    table.ForeignKey(
                        name: "FK_CardMachine_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "CashDetail",
                columns: table => new
                {
                    CashDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "money", nullable: false),
                    C2000 = table.Column<int>(type: "int", nullable: false),
                    C1000 = table.Column<int>(type: "int", nullable: false),
                    C500 = table.Column<int>(type: "int", nullable: false),
                    C100 = table.Column<int>(type: "int", nullable: false),
                    C50 = table.Column<int>(type: "int", nullable: false),
                    C20 = table.Column<int>(type: "int", nullable: false),
                    C10 = table.Column<int>(type: "int", nullable: false),
                    C5 = table.Column<int>(type: "int", nullable: false),
                    Coin10 = table.Column<int>(type: "int", nullable: false),
                    Coin5 = table.Column<int>(type: "int", nullable: false),
                    Coin2 = table.Column<int>(type: "int", nullable: false),
                    Coin1 = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashDetail", x => x.CashDetailId);
                    table.ForeignKey(
                        name: "FK_CashDetail_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "CashInBanks",
                columns: table => new
                {
                    CashInBankId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CIBDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OpenningBalance = table.Column<decimal>(type: "money", nullable: false),
                    ClosingBalance = table.Column<decimal>(type: "money", nullable: false),
                    CashIn = table.Column<decimal>(type: "money", nullable: false),
                    CashOut = table.Column<decimal>(type: "money", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashInBanks", x => x.CashInBankId);
                    table.ForeignKey(
                        name: "FK_CashInBanks_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CashInHands",
                columns: table => new
                {
                    CashInHandId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CIHDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OpenningBalance = table.Column<decimal>(type: "money", nullable: false),
                    ClosingBalance = table.Column<decimal>(type: "money", nullable: false),
                    CashIn = table.Column<decimal>(type: "money", nullable: false),
                    CashOut = table.Column<decimal>(type: "money", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashInHands", x => x.CashInHandId);
                    table.ForeignKey(
                        name: "FK_CashInHands_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CashPayments",
                columns: table => new
                {
                    CashPaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TranscationModeId = table.Column<int>(type: "int", nullable: false),
                    PaidTo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    SlipNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashPayments", x => x.CashPaymentId);
                    table.ForeignKey(
                        name: "FK_CashPayments_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_CashPayments_TranscationModes_TranscationModeId",
                        column: x => x.TranscationModeId,
                        principalTable: "TranscationModes",
                        principalColumn: "TranscationModeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CashReceipts",
                columns: table => new
                {
                    CashReceiptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InwardDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TranscationModeId = table.Column<int>(type: "int", nullable: false),
                    ReceiptFrom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    SlipNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashReceipts", x => x.CashReceiptId);
                    table.ForeignKey(
                        name: "FK_CashReceipts_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_CashReceipts_TranscationModes_TranscationModeId",
                        column: x => x.TranscationModeId,
                        principalTable: "TranscationModes",
                        principalColumn: "TranscationModeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ElectricityConnections",
                columns: table => new
                {
                    ElectricityConnectionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConnectioName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PinCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConsumerNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConusumerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Connection = table.Column<int>(type: "int", nullable: false),
                    ConnectinDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DisconnectionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    KVLoad = table.Column<int>(type: "int", nullable: false),
                    OwnedMetter = table.Column<bool>(type: "bit", nullable: false),
                    TotalConnectionCharges = table.Column<decimal>(type: "money", nullable: false),
                    SecurityDeposit = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElectricityConnections", x => x.ElectricityConnectionId);
                    table.ForeignKey(
                        name: "FK_ElectricityConnections_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobileNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JoiningDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LeavingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsWorking = table.Column<bool>(type: "bit", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false),
                    IsTailors = table.Column<bool>(type: "bit", nullable: false),
                    EMail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdharNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PanNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherIdDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FatherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HighestQualification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_Employees_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EndOfDays",
                columns: table => new
                {
                    EndOfDayId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EOD_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Shirting = table.Column<float>(type: "real", nullable: false),
                    Suiting = table.Column<float>(type: "real", nullable: false),
                    USPA = table.Column<int>(type: "int", nullable: false),
                    FM_Arrow = table.Column<int>(type: "int", nullable: false),
                    RWT = table.Column<int>(type: "int", nullable: false),
                    Access = table.Column<int>(type: "int", nullable: false),
                    CashInHand = table.Column<decimal>(type: "money", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndOfDays", x => x.EndOfDayId);
                    table.ForeignKey(
                        name: "FK_EndOfDays_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OnlineSales",
                columns: table => new
                {
                    OnlineSaleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SaleDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    VoyagerInvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VoygerDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VoyagerAmount = table.Column<decimal>(type: "money", nullable: false),
                    ShippingMode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VendorFee = table.Column<decimal>(type: "money", nullable: false),
                    ProfitValue = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnlineVendorId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnlineSales", x => x.OnlineSaleId);
                    table.ForeignKey(
                        name: "FK_OnlineSales_OnlineVendors_OnlineVendorId",
                        column: x => x.OnlineVendorId,
                        principalTable: "OnlineVendors",
                        principalColumn: "OnlineVendorId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OnlineSales_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PettyCashBooks",
                columns: table => new
                {
                    PettyCashBookId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OpeningCash = table.Column<decimal>(type: "money", nullable: false),
                    ClosingCash = table.Column<decimal>(type: "money", nullable: false),
                    SystemSale = table.Column<decimal>(type: "money", nullable: false),
                    TailoringSale = table.Column<decimal>(type: "money", nullable: false),
                    ManualSale = table.Column<decimal>(type: "money", nullable: false),
                    CashReciepts = table.Column<decimal>(type: "money", nullable: false),
                    OhterReceipts = table.Column<decimal>(type: "money", nullable: false),
                    RecieptRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CardSwipe = table.Column<decimal>(type: "money", nullable: false),
                    BankDeposit = table.Column<decimal>(type: "money", nullable: false),
                    TotalExpenses = table.Column<decimal>(type: "money", nullable: false),
                    TotalPayments = table.Column<decimal>(type: "money", nullable: false),
                    PaymentRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerDuesNames = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalDues = table.Column<decimal>(type: "money", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PettyCashBooks", x => x.PettyCashBookId);
                    table.ForeignKey(
                        name: "FK_PettyCashBooks_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductPurchases",
                columns: table => new
                {
                    ProductPurchaseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InWardNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InWardDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalQty = table.Column<double>(type: "float", nullable: false),
                    TotalBasicAmount = table.Column<decimal>(type: "money", nullable: false),
                    ShippingCost = table.Column<decimal>(type: "money", nullable: false),
                    TotalTax = table.Column<decimal>(type: "money", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SupplierID = table.Column<int>(type: "int", nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    TotalMRPValue = table.Column<decimal>(type: "money", nullable: false),
                    TotalCost = table.Column<decimal>(type: "money", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPurchases", x => x.ProductPurchaseId);
                    table.ForeignKey(
                        name: "FK_ProductPurchases_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ProductPurchases_Suppliers_SupplierID",
                        column: x => x.SupplierID,
                        principalTable: "Suppliers",
                        principalColumn: "SupplierID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegularInvoices",
                columns: table => new
                {
                    InvoiceNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RegularInvoiceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsManualBill = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalItems = table.Column<int>(type: "int", nullable: false),
                    TotalQty = table.Column<double>(type: "float", nullable: false),
                    TotalBillAmount = table.Column<decimal>(type: "money", nullable: false),
                    TotalDiscountAmount = table.Column<decimal>(type: "money", nullable: false),
                    RoundOffAmount = table.Column<decimal>(type: "money", nullable: false),
                    TotalTaxAmount = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegularInvoices", x => x.InvoiceNo);
                    table.ForeignKey(
                        name: "FK_RegularInvoices_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegularInvoices_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "RentedLocations",
                columns: table => new
                {
                    RentedLocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VacatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobileNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RentAmount = table.Column<decimal>(type: "money", nullable: false),
                    AdvanceAmount = table.Column<decimal>(type: "money", nullable: false),
                    IsRented = table.Column<bool>(type: "bit", nullable: false),
                    RentType = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentedLocations", x => x.RentedLocationId);
                    table.ForeignKey(
                        name: "FK_RentedLocations_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SaleInvoices",
                columns: table => new
                {
                    InvoiceNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SaleInvoiceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsNonVendor = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalItems = table.Column<int>(type: "int", nullable: false),
                    TotalQty = table.Column<double>(type: "float", nullable: false),
                    TotalBillAmount = table.Column<decimal>(type: "money", nullable: false),
                    TotalDiscountAmount = table.Column<decimal>(type: "money", nullable: false),
                    RoundOffAmount = table.Column<decimal>(type: "money", nullable: false),
                    TotalTaxAmount = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleInvoices", x => x.InvoiceNo);
                    table.ForeignKey(
                        name: "FK_SaleInvoices_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SaleInvoices_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    StockId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductItemId = table.Column<int>(type: "int", nullable: true),
                    Barcode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SaleQty = table.Column<double>(type: "float", nullable: false),
                    PurchaseQty = table.Column<double>(type: "float", nullable: false),
                    HoldQty = table.Column<double>(type: "float", nullable: false),
                    Units = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.StockId);
                    table.ForeignKey(
                        name: "FK_Stocks_ProductItems_Barcode",
                        column: x => x.Barcode,
                        principalTable: "ProductItems",
                        principalColumn: "Barcode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Stocks_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "StoreCloses",
                columns: table => new
                {
                    StoreCloseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClosingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreCloses", x => x.StoreCloseId);
                    table.ForeignKey(
                        name: "FK_StoreCloses_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoreHolidays",
                columns: table => new
                {
                    StoreHolidayId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Reason = table.Column<int>(type: "int", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApprovedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreHolidays", x => x.StoreHolidayId);
                    table.ForeignKey(
                        name: "FK_StoreHolidays_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoreOpens",
                columns: table => new
                {
                    StoreOpenId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpenningTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreOpens", x => x.StoreOpenId);
                    table.ForeignKey(
                        name: "FK_StoreOpens_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TalioringBookings",
                columns: table => new
                {
                    TalioringBookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BookingSlipNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "money", nullable: false),
                    TotalQty = table.Column<int>(type: "int", nullable: false),
                    ShirtQty = table.Column<int>(type: "int", nullable: false),
                    ShirtPrice = table.Column<decimal>(type: "money", nullable: false),
                    PantQty = table.Column<int>(type: "int", nullable: false),
                    PantPrice = table.Column<decimal>(type: "money", nullable: false),
                    CoatQty = table.Column<int>(type: "int", nullable: false),
                    CoatPrice = table.Column<decimal>(type: "money", nullable: false),
                    KurtaQty = table.Column<int>(type: "int", nullable: false),
                    KurtaPrice = table.Column<decimal>(type: "money", nullable: false),
                    BundiQty = table.Column<int>(type: "int", nullable: false),
                    BundiPrice = table.Column<decimal>(type: "money", nullable: false),
                    Others = table.Column<int>(type: "int", nullable: false),
                    OthersPrice = table.Column<decimal>(type: "money", nullable: false),
                    IsDelivered = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TalioringBookings", x => x.TalioringBookingId);
                    table.ForeignKey(
                        name: "FK_TalioringBookings_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LedgerEntries",
                columns: table => new
                {
                    LedgerEntryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PartyId = table.Column<int>(type: "int", nullable: false),
                    EntryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntryType = table.Column<int>(type: "int", nullable: false),
                    ReferanceId = table.Column<int>(type: "int", nullable: false),
                    VoucherType = table.Column<int>(type: "int", nullable: false),
                    Particulars = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmountIn = table.Column<decimal>(type: "money", nullable: false),
                    AmountOut = table.Column<decimal>(type: "money", nullable: false),
                    LedgerEntryRefId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LedgerEntries", x => x.LedgerEntryId);
                    table.ForeignKey(
                        name: "FK_LedgerEntries_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "PartyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LedgerMasters",
                columns: table => new
                {
                    LedgerMasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PartyId = table.Column<int>(type: "int", nullable: false),
                    CreatingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LedgerTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LedgerMasters", x => x.LedgerMasterId);
                    table.ForeignKey(
                        name: "FK_LedgerMasters_LedgerTypes_LedgerTypeId",
                        column: x => x.LedgerTypeId,
                        principalTable: "LedgerTypes",
                        principalColumn: "LedgerTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LedgerMasters_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "PartyId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "CardTranscations",
                columns: table => new
                {
                    EDCTranscationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EDCId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CardEndingNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CardTypes = table.Column<int>(type: "int", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardTranscations", x => x.EDCTranscationId);
                    table.ForeignKey(
                        name: "FK_CardTranscations_CardMachine_EDCId",
                        column: x => x.EDCId,
                        principalTable: "CardMachine",
                        principalColumn: "EDCId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardTranscations_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "EletricityBills",
                columns: table => new
                {
                    EletricityBillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ElectricityConnectionId = table.Column<int>(type: "int", nullable: false),
                    BillNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BillDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MeterReadingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CurrentMeterReading = table.Column<double>(type: "float", nullable: false),
                    TotalUnit = table.Column<double>(type: "float", nullable: false),
                    CurrentAmount = table.Column<decimal>(type: "money", nullable: false),
                    ArrearAmount = table.Column<decimal>(type: "money", nullable: false),
                    NetDemand = table.Column<decimal>(type: "money", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EletricityBills", x => x.EletricityBillId);
                    table.ForeignKey(
                        name: "FK_EletricityBills_ElectricityConnections_ElectricityConnectionId",
                        column: x => x.ElectricityConnectionId,
                        principalTable: "ElectricityConnections",
                        principalColumn: "ElectricityConnectionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EletricityBills_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Attendances",
                columns: table => new
                {
                    AttendanceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    AttDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntryTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsTailoring = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendances", x => x.AttendanceId);
                    table.ForeignKey(
                        name: "FK_Attendances_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Attendances_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    IsWorking = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeUsers_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Salaries",
                columns: table => new
                {
                    CurrentSalaryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    BasicSalary = table.Column<decimal>(type: "money", nullable: false),
                    LPRate = table.Column<decimal>(type: "money", nullable: false),
                    IncentiveRate = table.Column<decimal>(type: "money", nullable: false),
                    IncentiveTarget = table.Column<decimal>(type: "money", nullable: false),
                    WOWBillRate = table.Column<decimal>(type: "money", nullable: false),
                    WOWBillTarget = table.Column<decimal>(type: "money", nullable: false),
                    IsFullMonth = table.Column<bool>(type: "bit", nullable: false),
                    IsSundayBillable = table.Column<bool>(type: "bit", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CloseDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsEffective = table.Column<bool>(type: "bit", nullable: false),
                    IsTailoring = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salaries", x => x.CurrentSalaryId);
                    table.ForeignKey(
                        name: "FK_Salaries_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalaryPayments",
                columns: table => new
                {
                    SalaryPaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    SalaryMonth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SalaryComponet = table.Column<int>(type: "int", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PartyId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryPayments", x => x.SalaryPaymentId);
                    table.ForeignKey(
                        name: "FK_SalaryPayments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SalaryPayments_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "PartyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SalaryPayments_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Salesmen",
                columns: table => new
                {
                    SalesmanId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SalesmanName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salesmen", x => x.SalesmanId);
                    table.ForeignKey(
                        name: "FK_Salesmen_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Salesmen_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "StaffAdvanceReceipts",
                columns: table => new
                {
                    StaffAdvanceReceiptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    ReceiptDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PartyId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffAdvanceReceipts", x => x.StaffAdvanceReceiptId);
                    table.ForeignKey(
                        name: "FK_StaffAdvanceReceipts_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StaffAdvanceReceipts_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "PartyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StaffAdvanceReceipts_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "OnlineSaleReturns",
                columns: table => new
                {
                    OnlineSaleReturnId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OnlineSaleId = table.Column<int>(type: "int", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    VoyagerInvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VoygerDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VoyagerAmount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsRecived = table.Column<bool>(type: "bit", nullable: false),
                    RecivedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnlineSaleReturns", x => x.OnlineSaleReturnId);
                    table.ForeignKey(
                        name: "FK_OnlineSaleReturns_OnlineSales_OnlineSaleId",
                        column: x => x.OnlineSaleId,
                        principalTable: "OnlineSales",
                        principalColumn: "OnlineSaleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OnlineSaleReturns_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseItem",
                columns: table => new
                {
                    PurchaseItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductPurchaseId = table.Column<int>(type: "int", nullable: false),
                    ProductItemId = table.Column<int>(type: "int", nullable: false),
                    ProductItemBarcode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Barcode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qty = table.Column<double>(type: "float", nullable: false),
                    Unit = table.Column<int>(type: "int", nullable: false),
                    Cost = table.Column<decimal>(type: "money", nullable: false),
                    TaxAmout = table.Column<decimal>(type: "money", nullable: false),
                    PurchaseTaxTypeId = table.Column<int>(type: "int", nullable: true),
                    CostValue = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseItem", x => x.PurchaseItemId);
                    table.ForeignKey(
                        name: "FK_PurchaseItem_ProductItems_ProductItemBarcode",
                        column: x => x.ProductItemBarcode,
                        principalTable: "ProductItems",
                        principalColumn: "Barcode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseItem_ProductPurchases_ProductPurchaseId",
                        column: x => x.ProductPurchaseId,
                        principalTable: "ProductPurchases",
                        principalColumn: "ProductPurchaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseItem_PurchaseTaxTypes_PurchaseTaxTypeId",
                        column: x => x.PurchaseTaxTypeId,
                        principalTable: "PurchaseTaxTypes",
                        principalColumn: "PurchaseTaxTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PaymentDetails",
                columns: table => new
                {
                    InvoiceNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PaymentDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    CashAmount = table.Column<decimal>(type: "money", nullable: false),
                    CardAmount = table.Column<decimal>(type: "money", nullable: false),
                    MixAmount = table.Column<decimal>(type: "money", nullable: false),
                    IsManualBill = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentDetails", x => x.InvoiceNo);
                    table.ForeignKey(
                        name: "FK_PaymentDetails_RegularInvoices_InvoiceNo",
                        column: x => x.InvoiceNo,
                        principalTable: "RegularInvoices",
                        principalColumn: "InvoiceNo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rents",
                columns: table => new
                {
                    RentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RentedLocationId = table.Column<int>(type: "int", nullable: false),
                    RentType = table.Column<int>(type: "int", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Period = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Mode = table.Column<int>(type: "int", nullable: false),
                    PaymentDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rents", x => x.RentId);
                    table.ForeignKey(
                        name: "FK_Rents_RentedLocations_RentedLocationId",
                        column: x => x.RentedLocationId,
                        principalTable: "RentedLocations",
                        principalColumn: "RentedLocationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rents_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "TailoringDeliveries",
                columns: table => new
                {
                    TalioringDeliveryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TalioringBookingId = table.Column<int>(type: "int", nullable: false),
                    InvNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TailoringDeliveries", x => x.TalioringDeliveryId);
                    table.ForeignKey(
                        name: "FK_TailoringDeliveries_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_TailoringDeliveries_TalioringBookings_TalioringBookingId",
                        column: x => x.TalioringBookingId,
                        principalTable: "TalioringBookings",
                        principalColumn: "TalioringBookingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    ExpenseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Particulars = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PartyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    PaymentDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PartyId = table.Column<int>(type: "int", nullable: true),
                    LedgerEnteryId = table.Column<int>(type: "int", nullable: true),
                    IsCash = table.Column<bool>(type: "bit", nullable: false),
                    IsOn = table.Column<bool>(type: "bit", nullable: true),
                    IsDyn = table.Column<bool>(type: "bit", nullable: false),
                    LedgerEntryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.ExpenseId);
                    table.ForeignKey(
                        name: "FK_Expenses_BankAccounts_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "BankAccounts",
                        principalColumn: "BankAccountId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Expenses_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Expenses_LedgerEntries_LedgerEntryId",
                        column: x => x.LedgerEntryId,
                        principalTable: "LedgerEntries",
                        principalColumn: "LedgerEntryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Expenses_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "PartyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Expenses_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PartyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentSlipNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    PaymentDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PartyId = table.Column<int>(type: "int", nullable: true),
                    LedgerEnteryId = table.Column<int>(type: "int", nullable: true),
                    IsCash = table.Column<bool>(type: "bit", nullable: false),
                    IsOn = table.Column<bool>(type: "bit", nullable: true),
                    IsDyn = table.Column<bool>(type: "bit", nullable: false),
                    LedgerEntryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_Payments_BankAccounts_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "BankAccounts",
                        principalColumn: "BankAccountId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Payments_LedgerEntries_LedgerEntryId",
                        column: x => x.LedgerEntryId,
                        principalTable: "LedgerEntries",
                        principalColumn: "LedgerEntryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Payments_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "PartyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Payments_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Receipts",
                columns: table => new
                {
                    ReceiptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PartyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecieptSlipNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    PaymentDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PartyId = table.Column<int>(type: "int", nullable: true),
                    LedgerEnteryId = table.Column<int>(type: "int", nullable: true),
                    IsCash = table.Column<bool>(type: "bit", nullable: false),
                    IsOn = table.Column<bool>(type: "bit", nullable: true),
                    IsDyn = table.Column<bool>(type: "bit", nullable: false),
                    LedgerEntryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receipts", x => x.ReceiptId);
                    table.ForeignKey(
                        name: "FK_Receipts_BankAccounts_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "BankAccounts",
                        principalColumn: "BankAccountId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Receipts_LedgerEntries_LedgerEntryId",
                        column: x => x.LedgerEntryId,
                        principalTable: "LedgerEntries",
                        principalColumn: "LedgerEntryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Receipts_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "PartyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Receipts_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "BillPayments",
                columns: table => new
                {
                    EBillPaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EletricityBillId = table.Column<int>(type: "int", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Mode = table.Column<int>(type: "int", nullable: false),
                    PaymentDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPartialPayment = table.Column<bool>(type: "bit", nullable: false),
                    IsBillCleared = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillPayments", x => x.EBillPaymentId);
                    table.ForeignKey(
                        name: "FK_BillPayments_EletricityBills_EletricityBillId",
                        column: x => x.EletricityBillId,
                        principalTable: "EletricityBills",
                        principalColumn: "EletricityBillId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillPayments_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PaySlips",
                columns: table => new
                {
                    PaySlipId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    CurrentSalaryId = table.Column<int>(type: "int", nullable: true),
                    BasicSalary = table.Column<decimal>(type: "money", nullable: false),
                    NoOfDaysPresent = table.Column<int>(type: "int", nullable: false),
                    TotalSale = table.Column<decimal>(type: "money", nullable: false),
                    SaleIncentive = table.Column<decimal>(type: "money", nullable: false),
                    WOWBillAmount = table.Column<decimal>(type: "money", nullable: false),
                    WOWBillIncentive = table.Column<decimal>(type: "money", nullable: false),
                    LastPcsAmount = table.Column<decimal>(type: "money", nullable: false),
                    LastPCsIncentive = table.Column<decimal>(type: "money", nullable: false),
                    OthersIncentive = table.Column<decimal>(type: "money", nullable: false),
                    GrossSalary = table.Column<decimal>(type: "money", nullable: false),
                    StandardDeductions = table.Column<decimal>(type: "money", nullable: false),
                    TDSDeductions = table.Column<decimal>(type: "money", nullable: false),
                    PFDeductions = table.Column<decimal>(type: "money", nullable: false),
                    AdvanceDeducations = table.Column<decimal>(type: "money", nullable: false),
                    OtherDeductions = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsTailoring = table.Column<bool>(type: "bit", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaySlips", x => x.PaySlipId);
                    table.ForeignKey(
                        name: "FK_PaySlips_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaySlips_Salaries_CurrentSalaryId",
                        column: x => x.CurrentSalaryId,
                        principalTable: "Salaries",
                        principalColumn: "CurrentSalaryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DailySales",
                columns: table => new
                {
                    DailySaleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SaleDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    CashAmount = table.Column<decimal>(type: "money", nullable: false),
                    SalesmanId = table.Column<int>(type: "int", nullable: false),
                    IsDue = table.Column<bool>(type: "bit", nullable: false),
                    IsManualBill = table.Column<bool>(type: "bit", nullable: false),
                    IsTailoringBill = table.Column<bool>(type: "bit", nullable: false),
                    IsSaleReturn = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMatchedWithVOy = table.Column<bool>(type: "bit", nullable: false),
                    TaxAmount = table.Column<decimal>(type: "money", nullable: true),
                    EDCTranscationId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailySales", x => x.DailySaleId);
                    table.ForeignKey(
                        name: "FK_DailySales_CardTranscations_EDCTranscationId",
                        column: x => x.EDCTranscationId,
                        principalTable: "CardTranscations",
                        principalColumn: "EDCTranscationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DailySales_Salesmen_SalesmanId",
                        column: x => x.SalesmanId,
                        principalTable: "Salesmen",
                        principalColumn: "SalesmanId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DailySales_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "RegularSaleItems",
                columns: table => new
                {
                    RegularSaleItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceNo1 = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProductItemId = table.Column<int>(type: "int", nullable: false),
                    ProductItemBarcode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    BarCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qty = table.Column<double>(type: "float", nullable: false),
                    Units = table.Column<int>(type: "int", nullable: false),
                    MRP = table.Column<decimal>(type: "money", nullable: false),
                    BasicAmount = table.Column<decimal>(type: "money", nullable: false),
                    Discount = table.Column<decimal>(type: "money", nullable: false),
                    TaxAmount = table.Column<decimal>(type: "money", nullable: false),
                    SaleTaxTypeId = table.Column<int>(type: "int", nullable: true),
                    BillAmount = table.Column<decimal>(type: "money", nullable: false),
                    SalesmanId = table.Column<int>(type: "int", nullable: false),
                    HSNCode = table.Column<long>(type: "bigint", nullable: true),
                    HSNCode1 = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegularSaleItems", x => x.RegularSaleItemId);
                    table.ForeignKey(
                        name: "FK_RegularSaleItems_HSN_HSNCode1",
                        column: x => x.HSNCode1,
                        principalTable: "HSN",
                        principalColumn: "HSNCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RegularSaleItems_ProductItems_ProductItemBarcode",
                        column: x => x.ProductItemBarcode,
                        principalTable: "ProductItems",
                        principalColumn: "Barcode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RegularSaleItems_RegularInvoices_InvoiceNo1",
                        column: x => x.InvoiceNo1,
                        principalTable: "RegularInvoices",
                        principalColumn: "InvoiceNo",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RegularSaleItems_Salesmen_SalesmanId",
                        column: x => x.SalesmanId,
                        principalTable: "Salesmen",
                        principalColumn: "SalesmanId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegularSaleItems_SaleTaxTypes_SaleTaxTypeId",
                        column: x => x.SaleTaxTypeId,
                        principalTable: "SaleTaxTypes",
                        principalColumn: "SaleTaxTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SaleItems",
                columns: table => new
                {
                    SaleItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNo = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProductItemId = table.Column<int>(type: "int", nullable: false),
                    ProductItemBarcode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    BarCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qty = table.Column<double>(type: "float", nullable: false),
                    Units = table.Column<int>(type: "int", nullable: false),
                    MRP = table.Column<decimal>(type: "money", nullable: false),
                    BasicAmount = table.Column<decimal>(type: "money", nullable: false),
                    Discount = table.Column<decimal>(type: "money", nullable: false),
                    TaxAmount = table.Column<decimal>(type: "money", nullable: false),
                    SaleTaxTypeId = table.Column<int>(type: "int", nullable: true),
                    BillAmount = table.Column<decimal>(type: "money", nullable: false),
                    SalesmanId = table.Column<int>(type: "int", nullable: false),
                    HSNCode = table.Column<long>(type: "bigint", nullable: true),
                    HSNCode1 = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleItems", x => x.SaleItemId);
                    table.ForeignKey(
                        name: "FK_SaleItems_HSN_HSNCode1",
                        column: x => x.HSNCode1,
                        principalTable: "HSN",
                        principalColumn: "HSNCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SaleItems_ProductItems_ProductItemBarcode",
                        column: x => x.ProductItemBarcode,
                        principalTable: "ProductItems",
                        principalColumn: "Barcode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SaleItems_SaleInvoices_InvoiceNo",
                        column: x => x.InvoiceNo,
                        principalTable: "SaleInvoices",
                        principalColumn: "InvoiceNo",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SaleItems_Salesmen_SalesmanId",
                        column: x => x.SalesmanId,
                        principalTable: "Salesmen",
                        principalColumn: "SalesmanId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SaleItems_SaleTaxTypes_SaleTaxTypeId",
                        column: x => x.SaleTaxTypeId,
                        principalTable: "SaleTaxTypes",
                        principalColumn: "SaleTaxTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CardDetails",
                columns: table => new
                {
                    RegularCardDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CardType = table.Column<int>(type: "int", nullable: false),
                    CardCode = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    AuthCode = table.Column<int>(type: "int", nullable: false),
                    LastDigit = table.Column<int>(type: "int", nullable: false),
                    InvoiceNo = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardDetails", x => x.RegularCardDetailId);
                    table.ForeignKey(
                        name: "FK_CardDetails_PaymentDetails_InvoiceNo",
                        column: x => x.InvoiceNo,
                        principalTable: "PaymentDetails",
                        principalColumn: "InvoiceNo",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SaleCardDetails",
                columns: table => new
                {
                    SaleCardDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CardType = table.Column<int>(type: "int", nullable: false),
                    CardCode = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    AuthCode = table.Column<int>(type: "int", nullable: false),
                    LastDigit = table.Column<int>(type: "int", nullable: false),
                    InvoiceNo = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleCardDetails", x => x.SaleCardDetailId);
                    table.ForeignKey(
                        name: "FK_SaleCardDetails_PaymentDetails_InvoiceNo",
                        column: x => x.InvoiceNo,
                        principalTable: "PaymentDetails",
                        principalColumn: "InvoiceNo",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BankPayments",
                columns: table => new
                {
                    BankPaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReferenceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    DailySaleId = table.Column<int>(type: "int", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankPayments", x => x.BankPaymentId);
                    table.ForeignKey(
                        name: "FK_BankPayments_DailySales_DailySaleId",
                        column: x => x.DailySaleId,
                        principalTable: "DailySales",
                        principalColumn: "DailySaleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BankPayments_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "CouponPayments",
                columns: table => new
                {
                    CouponPaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CouponNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    DailySaleId = table.Column<int>(type: "int", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CouponPayments", x => x.CouponPaymentId);
                    table.ForeignKey(
                        name: "FK_CouponPayments_DailySales_DailySaleId",
                        column: x => x.DailySaleId,
                        principalTable: "DailySales",
                        principalColumn: "DailySaleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CouponPayments_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "DailySalePayments",
                columns: table => new
                {
                    DailySalePaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mode = table.Column<int>(type: "int", nullable: false),
                    DailySaleId = table.Column<int>(type: "int", nullable: false),
                    InvNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentRefNo = table.Column<int>(type: "int", nullable: false),
                    LinkInfo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailySalePayments", x => x.DailySalePaymentId);
                    table.ForeignKey(
                        name: "FK_DailySalePayments_DailySales_DailySaleId",
                        column: x => x.DailySaleId,
                        principalTable: "DailySales",
                        principalColumn: "DailySaleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DuesLists",
                columns: table => new
                {
                    DuesListId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    IsRecovered = table.Column<bool>(type: "bit", nullable: false),
                    RecoveryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DailySaleId = table.Column<int>(type: "int", nullable: false),
                    IsPartialRecovery = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuesLists", x => x.DuesListId);
                    table.ForeignKey(
                        name: "FK_DuesLists_DailySales_DailySaleId",
                        column: x => x.DailySaleId,
                        principalTable: "DailySales",
                        principalColumn: "DailySaleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DuesLists_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "MixPayments",
                columns: table => new
                {
                    MixAndCouponPaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModeMixAndCouponPaymentId = table.Column<int>(type: "int", nullable: true),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    DailySaleId = table.Column<int>(type: "int", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MixPayments", x => x.MixAndCouponPaymentId);
                    table.ForeignKey(
                        name: "FK_MixPayments_DailySales_DailySaleId",
                        column: x => x.DailySaleId,
                        principalTable: "DailySales",
                        principalColumn: "DailySaleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MixPayments_MixPayments_ModeMixAndCouponPaymentId",
                        column: x => x.ModeMixAndCouponPaymentId,
                        principalTable: "MixPayments",
                        principalColumn: "MixAndCouponPaymentId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MixPayments_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PointRedeemeds",
                columns: table => new
                {
                    PointRedeemedId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerMobileNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    DailySaleId = table.Column<int>(type: "int", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointRedeemeds", x => x.PointRedeemedId);
                    table.ForeignKey(
                        name: "FK_PointRedeemeds_DailySales_DailySaleId",
                        column: x => x.DailySaleId,
                        principalTable: "DailySales",
                        principalColumn: "DailySaleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PointRedeemeds_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "WalletPayments",
                columns: table => new
                {
                    WalletPaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WalletType = table.Column<int>(type: "int", nullable: false),
                    CustomerMobileNoRef = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    DailySaleId = table.Column<int>(type: "int", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WalletPayments", x => x.WalletPaymentId);
                    table.ForeignKey(
                        name: "FK_WalletPayments_DailySales_DailySaleId",
                        column: x => x.DailySaleId,
                        principalTable: "DailySales",
                        principalColumn: "DailySaleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WalletPayments_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "SaleInvoicePayments",
                columns: table => new
                {
                    InvoiceNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    InvoicePaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    CashAmount = table.Column<decimal>(type: "money", nullable: false),
                    NonCashAmount = table.Column<decimal>(type: "money", nullable: false),
                    OtherAmount = table.Column<decimal>(type: "money", nullable: false),
                    CardDetailSaleCardDetailId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleInvoicePayments", x => x.InvoiceNo);
                    table.ForeignKey(
                        name: "FK_SaleInvoicePayments_SaleCardDetails_CardDetailSaleCardDetailId",
                        column: x => x.CardDetailSaleCardDetailId,
                        principalTable: "SaleCardDetails",
                        principalColumn: "SaleCardDetailId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SaleInvoicePayments_SaleInvoices_InvoiceNo",
                        column: x => x.InvoiceNo,
                        principalTable: "SaleInvoices",
                        principalColumn: "InvoiceNo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DueRecoverds",
                columns: table => new
                {
                    DueRecoverdId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaidDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DuesListId = table.Column<int>(type: "int", nullable: false),
                    AmountPaid = table.Column<decimal>(type: "money", nullable: false),
                    IsPartialPayment = table.Column<bool>(type: "bit", nullable: false),
                    Modes = table.Column<int>(type: "int", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DueRecoverds", x => x.DueRecoverdId);
                    table.ForeignKey(
                        name: "FK_DueRecoverds_DuesLists_DuesListId",
                        column: x => x.DuesListId,
                        principalTable: "DuesLists",
                        principalColumn: "DuesListId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DueRecoverds_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.InsertData(
                table: "Banks",
                columns: new[] { "BankId", "BankName" },
                values: new object[,]
                {
                    { 1, "State Bank of India" },
                    { 2, "ICICI Bank" },
                    { 3, "Bandhan Bank" },
                    { 4, "Punjab National Bank" },
                    { 5, "Bank of Baroda" },
                    { 6, "Axis Bank" },
                    { 7, "HDFC Bank" }
                });

            migrationBuilder.InsertData(
                table: "SaleTaxTypes",
                columns: new[] { "SaleTaxTypeId", "CompositeRate", "TaxName", "TaxType" },
                values: new object[,]
                {
                    { 1, 5m, "Local Output GST@ 5%  ", 0 },
                    { 2, 12m, "Local Output GST@ 12%  ", 0 },
                    { 3, 5m, "Output IGST@ 5%  ", 3 },
                    { 4, 12m, "Output IGST@ 12%  ", 3 },
                    { 5, 5m, "Output Vat@ 12%  ", 4 },
                    { 6, 12m, "Output VAT@ 5%  ", 4 },
                    { 7, 5m, "Output Vat Free  ", 4 }
                });

            migrationBuilder.InsertData(
                table: "Stores",
                columns: new[] { "StoreId", "Address", "City", "ClosingDate", "CompanyId", "EntryStatus", "GSTNO", "IsReadOnly", "NoOfEmployees", "OpeningDate", "PanNo", "PhoneNo", "PinCode", "Status", "StoreCode", "StoreManagerName", "StoreManagerPhoneNo", "StoreName", "UserId" },
                values: new object[] { 1, "Bhagalpur Road Dumka", "Dumka", null, null, 0, "20AJHPA739P1zv", false, 9, new DateTime(2016, 2, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "AJHPA7396P", "06434-224461", "814101", true, "JH0006", "Alok Kumar", "", "Aprajita Retails", null });

            migrationBuilder.InsertData(
                table: "Taxes",
                columns: new[] { "TaxNameId", "CompositeRate", "Name", "OutPutTax", "TaxType" },
                values: new object[,]
                {
                    { 2, 12m, "Local Output GST@ 12%  ", false, 0 },
                    { 1, 5m, "Local Output GST@ 5%  ", false, 0 },
                    { 14, 0m, "Input Vat Free  ", true, 4 },
                    { 13, 12m, "Input VAT@ 5%  ", true, 4 },
                    { 12, 5m, "Input Vat@ 12%  ", true, 4 },
                    { 11, 12m, "Input IGST@ 12%  ", true, 3 },
                    { 10, 5m, "Input IGST@ 5%  ", true, 3 },
                    { 9, 12m, "Local Input GST@ 12%  ", true, 0 },
                    { 8, 5m, "Local Input GST@ 5%  ", true, 0 },
                    { 7, 0m, "Output Vat Free  ", false, 4 },
                    { 6, 12m, "Output VAT@ 5%  ", false, 4 },
                    { 5, 5m, "Output Vat@ 12%  ", false, 4 },
                    { 4, 12m, "Output IGST@ 12%  ", false, 3 },
                    { 3, 5m, "Output IGST@ 5%  ", false, 3 }
                });

            migrationBuilder.InsertData(
                table: "TranscationModes",
                columns: new[] { "TranscationModeId", "Transcation" },
                values: new object[,]
                {
                    { 16, "Cup Glass" },
                    { 15, "Coffee" },
                    { 14, "Lunch" },
                    { 13, "Breakfast" },
                    { 12, "Dan" },
                    { 11, "Petty Cash Expenses" },
                    { 10, "OnLinePurchase" },
                    { 7, "CashOut" },
                    { 8, "Regular" },
                    { 17, "Battery" },
                    { 6, "CashIn" },
                    { 5, "Amit Kumar Expenses" },
                    { 4, "Amit Kumar" }
                });

            migrationBuilder.InsertData(
                table: "TranscationModes",
                columns: new[] { "TranscationModeId", "Transcation" },
                values: new object[,]
                {
                    { 2, "Other Home Expenses" },
                    { 1, "Home Expenses" },
                    { 9, "Suspence" },
                    { 3, "Mukesh(Home Staff)" }
                });

            migrationBuilder.InsertData(
                table: "Salesmen",
                columns: new[] { "SalesmanId", "EmployeeId", "EntryStatus", "IsReadOnly", "SalesmanName", "StoreId", "UserId" },
                values: new object[] { 1, null, 0, false, "Manager", 1, null });

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_EmployeeId",
                table: "Attendances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_StoreId",
                table: "Attendances",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_BankAccounts_BankId",
                table: "BankAccounts",
                column: "BankId");

            migrationBuilder.CreateIndex(
                name: "IX_BankDeposits_BankAccountId",
                table: "BankDeposits",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_BankDeposits_StoreId",
                table: "BankDeposits",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_BankPayments_DailySaleId",
                table: "BankPayments",
                column: "DailySaleId");

            migrationBuilder.CreateIndex(
                name: "IX_BankPayments_StoreId",
                table: "BankPayments",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_BankWithdrawals_BankAccountId",
                table: "BankWithdrawals",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_BankWithdrawals_StoreId",
                table: "BankWithdrawals",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_BillPayments_EletricityBillId",
                table: "BillPayments",
                column: "EletricityBillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillPayments_StoreId",
                table: "BillPayments",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CardDetails_InvoiceNo",
                table: "CardDetails",
                column: "InvoiceNo",
                unique: true,
                filter: "[InvoiceNo] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CardMachine_StoreId",
                table: "CardMachine",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CardTranscations_EDCId",
                table: "CardTranscations",
                column: "EDCId");

            migrationBuilder.CreateIndex(
                name: "IX_CardTranscations_StoreId",
                table: "CardTranscations",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CashDetail_StoreId",
                table: "CashDetail",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CashInBanks_StoreId",
                table: "CashInBanks",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CashInHands_StoreId",
                table: "CashInHands",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CashPayments_StoreId",
                table: "CashPayments",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CashPayments_TranscationModeId",
                table: "CashPayments",
                column: "TranscationModeId");

            migrationBuilder.CreateIndex(
                name: "IX_CashReceipts_StoreId",
                table: "CashReceipts",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CashReceipts_TranscationModeId",
                table: "CashReceipts",
                column: "TranscationModeId");

            migrationBuilder.CreateIndex(
                name: "IX_CouponPayments_DailySaleId",
                table: "CouponPayments",
                column: "DailySaleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CouponPayments_StoreId",
                table: "CouponPayments",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_DailySalePayments_DailySaleId",
                table: "DailySalePayments",
                column: "DailySaleId");

            migrationBuilder.CreateIndex(
                name: "IX_DailySales_EDCTranscationId",
                table: "DailySales",
                column: "EDCTranscationId");

            migrationBuilder.CreateIndex(
                name: "IX_DailySales_SalesmanId",
                table: "DailySales",
                column: "SalesmanId");

            migrationBuilder.CreateIndex(
                name: "IX_DailySales_StoreId",
                table: "DailySales",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_DueRecoverds_DuesListId",
                table: "DueRecoverds",
                column: "DuesListId");

            migrationBuilder.CreateIndex(
                name: "IX_DueRecoverds_StoreId",
                table: "DueRecoverds",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_DuesLists_DailySaleId",
                table: "DuesLists",
                column: "DailySaleId");

            migrationBuilder.CreateIndex(
                name: "IX_DuesLists_StoreId",
                table: "DuesLists",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_ElectricityConnections_StoreId",
                table: "ElectricityConnections",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_EletricityBills_ElectricityConnectionId",
                table: "EletricityBills",
                column: "ElectricityConnectionId");

            migrationBuilder.CreateIndex(
                name: "IX_EletricityBills_StoreId",
                table: "EletricityBills",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_StoreId",
                table: "Employees",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeUsers_EmployeeId",
                table: "EmployeeUsers",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EndOfDays_StoreId",
                table: "EndOfDays",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_BankAccountId",
                table: "Expenses",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_EmployeeId",
                table: "Expenses",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_LedgerEntryId",
                table: "Expenses",
                column: "LedgerEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_PartyId",
                table: "Expenses",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_StoreId",
                table: "Expenses",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_LedgerEntries_PartyId",
                table: "LedgerEntries",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_LedgerMasters_LedgerTypeId",
                table: "LedgerMasters",
                column: "LedgerTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LedgerMasters_PartyId",
                table: "LedgerMasters",
                column: "PartyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MixPayments_DailySaleId",
                table: "MixPayments",
                column: "DailySaleId");

            migrationBuilder.CreateIndex(
                name: "IX_MixPayments_ModeMixAndCouponPaymentId",
                table: "MixPayments",
                column: "ModeMixAndCouponPaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_MixPayments_StoreId",
                table: "MixPayments",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_OnlineSaleReturns_OnlineSaleId",
                table: "OnlineSaleReturns",
                column: "OnlineSaleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OnlineSaleReturns_StoreId",
                table: "OnlineSaleReturns",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_OnlineSales_OnlineVendorId",
                table: "OnlineSales",
                column: "OnlineVendorId");

            migrationBuilder.CreateIndex(
                name: "IX_OnlineSales_StoreId",
                table: "OnlineSales",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Parties_LedgerTypeId",
                table: "Parties",
                column: "LedgerTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_BankAccountId",
                table: "Payments",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_LedgerEntryId",
                table: "Payments",
                column: "LedgerEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_PartyId",
                table: "Payments",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_StoreId",
                table: "Payments",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_PaySlips_CurrentSalaryId",
                table: "PaySlips",
                column: "CurrentSalaryId");

            migrationBuilder.CreateIndex(
                name: "IX_PaySlips_EmployeeId",
                table: "PaySlips",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PettyCashBooks_StoreId",
                table: "PettyCashBooks",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_PointRedeemeds_DailySaleId",
                table: "PointRedeemeds",
                column: "DailySaleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PointRedeemeds_StoreId",
                table: "PointRedeemeds",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductItems_BrandId",
                table: "ProductItems",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductItems_MainCategoryCategoryId",
                table: "ProductItems",
                column: "MainCategoryCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductItems_ProductCategoryCategoryId",
                table: "ProductItems",
                column: "ProductCategoryCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductItems_ProductTypeCategoryId",
                table: "ProductItems",
                column: "ProductTypeCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPurchases_StoreId",
                table: "ProductPurchases",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPurchases_SupplierID",
                table: "ProductPurchases",
                column: "SupplierID");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseItem_ProductItemBarcode",
                table: "PurchaseItem",
                column: "ProductItemBarcode");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseItem_ProductPurchaseId",
                table: "PurchaseItem",
                column: "ProductPurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseItem_PurchaseTaxTypeId",
                table: "PurchaseItem",
                column: "PurchaseTaxTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_BankAccountId",
                table: "Receipts",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_LedgerEntryId",
                table: "Receipts",
                column: "LedgerEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_PartyId",
                table: "Receipts",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_StoreId",
                table: "Receipts",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_RegularInvoices_CustomerId",
                table: "RegularInvoices",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_RegularInvoices_StoreId",
                table: "RegularInvoices",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_RegularSaleItems_HSNCode1",
                table: "RegularSaleItems",
                column: "HSNCode1");

            migrationBuilder.CreateIndex(
                name: "IX_RegularSaleItems_InvoiceNo1",
                table: "RegularSaleItems",
                column: "InvoiceNo1");

            migrationBuilder.CreateIndex(
                name: "IX_RegularSaleItems_ProductItemBarcode",
                table: "RegularSaleItems",
                column: "ProductItemBarcode");

            migrationBuilder.CreateIndex(
                name: "IX_RegularSaleItems_SalesmanId",
                table: "RegularSaleItems",
                column: "SalesmanId");

            migrationBuilder.CreateIndex(
                name: "IX_RegularSaleItems_SaleTaxTypeId",
                table: "RegularSaleItems",
                column: "SaleTaxTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_RentedLocations_StoreId",
                table: "RentedLocations",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Rents_RentedLocationId",
                table: "Rents",
                column: "RentedLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Rents_StoreId",
                table: "Rents",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Salaries_EmployeeId",
                table: "Salaries",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryPayments_EmployeeId",
                table: "SalaryPayments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryPayments_PartyId",
                table: "SalaryPayments",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryPayments_StoreId",
                table: "SalaryPayments",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleCardDetails_InvoiceNo",
                table: "SaleCardDetails",
                column: "InvoiceNo");

            migrationBuilder.CreateIndex(
                name: "IX_SaleInvoicePayments_CardDetailSaleCardDetailId",
                table: "SaleInvoicePayments",
                column: "CardDetailSaleCardDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleInvoices_CustomerId",
                table: "SaleInvoices",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleInvoices_StoreId",
                table: "SaleInvoices",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleItems_HSNCode1",
                table: "SaleItems",
                column: "HSNCode1");

            migrationBuilder.CreateIndex(
                name: "IX_SaleItems_InvoiceNo",
                table: "SaleItems",
                column: "InvoiceNo");

            migrationBuilder.CreateIndex(
                name: "IX_SaleItems_ProductItemBarcode",
                table: "SaleItems",
                column: "ProductItemBarcode");

            migrationBuilder.CreateIndex(
                name: "IX_SaleItems_SalesmanId",
                table: "SaleItems",
                column: "SalesmanId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleItems_SaleTaxTypeId",
                table: "SaleItems",
                column: "SaleTaxTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Salesmen_EmployeeId",
                table: "Salesmen",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Salesmen_StoreId",
                table: "Salesmen",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffAdvanceReceipts_EmployeeId",
                table: "StaffAdvanceReceipts",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffAdvanceReceipts_PartyId",
                table: "StaffAdvanceReceipts",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffAdvanceReceipts_StoreId",
                table: "StaffAdvanceReceipts",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_Barcode",
                table: "Stocks",
                column: "Barcode");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_StoreId",
                table: "Stocks",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreCloses_StoreId",
                table: "StoreCloses",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreHolidays_StoreId",
                table: "StoreHolidays",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreOpens_StoreId",
                table: "StoreOpens",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Stores_CompanyId",
                table: "Stores",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_TailoringDeliveries_StoreId",
                table: "TailoringDeliveries",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_TailoringDeliveries_TalioringBookingId",
                table: "TailoringDeliveries",
                column: "TalioringBookingId");

            migrationBuilder.CreateIndex(
                name: "IX_TalioringBookings_StoreId",
                table: "TalioringBookings",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Todos_FileTodoId",
                table: "Todos",
                column: "FileTodoId");

            migrationBuilder.CreateIndex(
                name: "IX_TranscationModes_Transcation",
                table: "TranscationModes",
                column: "Transcation",
                unique: true,
                filter: "[Transcation] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WalletPayments_DailySaleId",
                table: "WalletPayments",
                column: "DailySaleId");

            migrationBuilder.CreateIndex(
                name: "IX_WalletPayments_StoreId",
                table: "WalletPayments",
                column: "StoreId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Apps");

            migrationBuilder.DropTable(
                name: "Attendances");

            migrationBuilder.DropTable(
                name: "BankDeposits");

            migrationBuilder.DropTable(
                name: "BankPayments");

            migrationBuilder.DropTable(
                name: "BankWithdrawals");

            migrationBuilder.DropTable(
                name: "BillPayments");

            migrationBuilder.DropTable(
                name: "CardDetails");

            migrationBuilder.DropTable(
                name: "CashDetail");

            migrationBuilder.DropTable(
                name: "CashInBanks");

            migrationBuilder.DropTable(
                name: "CashInHands");

            migrationBuilder.DropTable(
                name: "CashPayments");

            migrationBuilder.DropTable(
                name: "CashReceipts");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "CouponPayments");

            migrationBuilder.DropTable(
                name: "DailySalePayments");

            migrationBuilder.DropTable(
                name: "DueRecoverds");

            migrationBuilder.DropTable(
                name: "EmployeeUsers");

            migrationBuilder.DropTable(
                name: "EndOfDays");

            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "InwardSummaries");

            migrationBuilder.DropTable(
                name: "ItemDatas");

            migrationBuilder.DropTable(
                name: "LedgerMasters");

            migrationBuilder.DropTable(
                name: "LocationMasters");

            migrationBuilder.DropTable(
                name: "MixPayments");

            migrationBuilder.DropTable(
                name: "OnlineSaleReturns");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "PaySlips");

            migrationBuilder.DropTable(
                name: "PettyCashBooks");

            migrationBuilder.DropTable(
                name: "PointRedeemeds");

            migrationBuilder.DropTable(
                name: "ProductLists");

            migrationBuilder.DropTable(
                name: "ProductMasters");

            migrationBuilder.DropTable(
                name: "PurchaseItem");

            migrationBuilder.DropTable(
                name: "Receipts");

            migrationBuilder.DropTable(
                name: "RegisteredUsers");

            migrationBuilder.DropTable(
                name: "RegularSaleItems");

            migrationBuilder.DropTable(
                name: "Rents");

            migrationBuilder.DropTable(
                name: "SalaryPayments");

            migrationBuilder.DropTable(
                name: "SaleInvoicePayments");

            migrationBuilder.DropTable(
                name: "SaleItems");

            migrationBuilder.DropTable(
                name: "SalesmanInfo");

            migrationBuilder.DropTable(
                name: "SaleWithCustomers");

            migrationBuilder.DropTable(
                name: "StaffAdvanceReceipts");

            migrationBuilder.DropTable(
                name: "Stocks");

            migrationBuilder.DropTable(
                name: "StoreCloses");

            migrationBuilder.DropTable(
                name: "StoreHolidays");

            migrationBuilder.DropTable(
                name: "StoreOpens");

            migrationBuilder.DropTable(
                name: "TailoringDeliveries");

            migrationBuilder.DropTable(
                name: "Taxes");

            migrationBuilder.DropTable(
                name: "TaxRegisters");

            migrationBuilder.DropTable(
                name: "ToDoMessages");

            migrationBuilder.DropTable(
                name: "Todos");

            migrationBuilder.DropTable(
                name: "VoyBrandNames");

            migrationBuilder.DropTable(
                name: "VoyPurchaseInwards");

            migrationBuilder.DropTable(
                name: "VoySaleInvoices");

            migrationBuilder.DropTable(
                name: "VoySaleInvoiceSums");

            migrationBuilder.DropTable(
                name: "WalletPayments");

            migrationBuilder.DropTable(
                name: "EletricityBills");

            migrationBuilder.DropTable(
                name: "TranscationModes");

            migrationBuilder.DropTable(
                name: "DuesLists");

            migrationBuilder.DropTable(
                name: "OnlineSales");

            migrationBuilder.DropTable(
                name: "Salaries");

            migrationBuilder.DropTable(
                name: "ProductPurchases");

            migrationBuilder.DropTable(
                name: "PurchaseTaxTypes");

            migrationBuilder.DropTable(
                name: "BankAccounts");

            migrationBuilder.DropTable(
                name: "LedgerEntries");

            migrationBuilder.DropTable(
                name: "RentedLocations");

            migrationBuilder.DropTable(
                name: "SaleCardDetails");

            migrationBuilder.DropTable(
                name: "HSN");

            migrationBuilder.DropTable(
                name: "SaleInvoices");

            migrationBuilder.DropTable(
                name: "SaleTaxTypes");

            migrationBuilder.DropTable(
                name: "ProductItems");

            migrationBuilder.DropTable(
                name: "TalioringBookings");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "ElectricityConnections");

            migrationBuilder.DropTable(
                name: "DailySales");

            migrationBuilder.DropTable(
                name: "OnlineVendors");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Banks");

            migrationBuilder.DropTable(
                name: "Parties");

            migrationBuilder.DropTable(
                name: "PaymentDetails");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "CardTranscations");

            migrationBuilder.DropTable(
                name: "Salesmen");

            migrationBuilder.DropTable(
                name: "LedgerTypes");

            migrationBuilder.DropTable(
                name: "RegularInvoices");

            migrationBuilder.DropTable(
                name: "CardMachine");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Stores");

            migrationBuilder.DropTable(
                name: "Company");
        }
    }
}