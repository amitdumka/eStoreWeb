using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace eStore.Database.Migrations
{
    public partial class vendorwithslip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PrintedSlipBooks",
                columns: table => new
                {
                    PrintedSlipBookId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrintedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FirstUseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SlipBookType = table.Column<int>(type: "int", nullable: false),
                    SlipHeader = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StaringNumber = table.Column<int>(type: "int", nullable: false),
                    EndingNumber = table.Column<int>(type: "int", nullable: false),
                    BookCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrintedSlipBooks", x => x.PrintedSlipBookId);
                    table.ForeignKey(
                        name: "FK_PrintedSlipBooks_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsedSlips",
                columns: table => new
                {
                    UsedSlipId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SlipNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VoucherType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefId = table.Column<int>(type: "int", nullable: false),
                    RefDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsedSlips", x => x.UsedSlipId);
                    table.ForeignKey(
                        name: "FK_UsedSlips_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vendors",
                columns: table => new
                {
                    VendorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VendorName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VendorContactNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPersonName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CPPhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsValid = table.Column<bool>(type: "bit", nullable: false),
                    VendorType = table.Column<int>(type: "int", nullable: false),
                    PANNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GSTIN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankAccountNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IFSCCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankNameWithCity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vendors", x => x.VendorId);
                });

            migrationBuilder.CreateTable(
                name: "VendorNotes",
                columns: table => new
                {
                    VendorDebitCreditNoteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VendorId = table.Column<int>(type: "int", nullable: false),
                    NotesType = table.Column<int>(type: "int", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    PaymentDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorNotes", x => x.VendorDebitCreditNoteId);
                    table.ForeignKey(
                        name: "FK_VendorNotes_Vendors_VendorId",
                        column: x => x.VendorId,
                        principalTable: "Vendors",
                        principalColumn: "VendorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VendorPayments",
                columns: table => new
                {
                    VendorPaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VendorId = table.Column<int>(type: "int", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    CashDiscount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BankDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsFinalPayment = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    IsReadOnly = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorPayments", x => x.VendorPaymentId);
                    table.ForeignKey(
                        name: "FK_VendorPayments_Vendors_VendorId",
                        column: x => x.VendorId,
                        principalTable: "Vendors",
                        principalColumn: "VendorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrintedSlipBooks_StoreId",
                table: "PrintedSlipBooks",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_UsedSlips_StoreId",
                table: "UsedSlips",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_VendorNotes_VendorId",
                table: "VendorNotes",
                column: "VendorId");

            migrationBuilder.CreateIndex(
                name: "IX_VendorPayments_VendorId",
                table: "VendorPayments",
                column: "VendorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrintedSlipBooks");

            migrationBuilder.DropTable(
                name: "UsedSlips");

            migrationBuilder.DropTable(
                name: "VendorNotes");

            migrationBuilder.DropTable(
                name: "VendorPayments");

            migrationBuilder.DropTable(
                name: "Vendors");
        }
    }
}