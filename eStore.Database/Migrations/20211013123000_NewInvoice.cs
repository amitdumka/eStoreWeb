using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace eStore.Database.Migrations
{
    public partial class NewInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CouponAndPoints",
                columns: table => new
                {
                    CouponAndPointId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReferanceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AuthCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPointRedeemed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CouponAndPoints", x => x.CouponAndPointId);
                });

            migrationBuilder.CreateTable(
                name: "EDC",
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
                    table.PrimaryKey("PK_EDC", x => x.EDCId);
                    table.ForeignKey(
                        name: "FK_EDC_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InvoiceItems",
                columns: table => new
                {
                    InvoiceItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Barcode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qty = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Units = table.Column<int>(type: "int", nullable: false),
                    BasicPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalesmanId = table.Column<int>(type: "int", nullable: false),
                    HSNCode = table.Column<long>(type: "bigint", nullable: true),
                    HSNCode1 = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceItems", x => x.InvoiceItemId);
                    table.ForeignKey(
                        name: "FK_InvoiceItems_HSN_HSNCode1",
                        column: x => x.HSNCode1,
                        principalTable: "HSN",
                        principalColumn: "HSNCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InvoiceItems_Salesmen_SalesmanId",
                        column: x => x.SalesmanId,
                        principalTable: "Salesmen",
                        principalColumn: "SalesmanId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    InvoiceNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalTaxAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalDiscount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RoundOff = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalQty = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InvoiceType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.InvoiceNumber);
                    table.ForeignKey(
                        name: "FK_Invoices_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InvoicePayments",
                columns: table => new
                {
                    InvoicePaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PayMode = table.Column<int>(type: "int", nullable: false),
                    CashAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NonCashAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentRef = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EDCId = table.Column<int>(type: "int", nullable: true),
                    CouponAndPointId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoicePayments", x => x.InvoicePaymentId);
                    table.ForeignKey(
                        name: "FK_InvoicePayments_CouponAndPoints_CouponAndPointId",
                        column: x => x.CouponAndPointId,
                        principalTable: "CouponAndPoints",
                        principalColumn: "CouponAndPointId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InvoicePayments_EDC_EDCId",
                        column: x => x.EDCId,
                        principalTable: "EDC",
                        principalColumn: "EDCId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EDC_StoreId",
                table: "EDC",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItems_HSNCode1",
                table: "InvoiceItems",
                column: "HSNCode1");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItems_SalesmanId",
                table: "InvoiceItems",
                column: "SalesmanId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoicePayments_CouponAndPointId",
                table: "InvoicePayments",
                column: "CouponAndPointId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoicePayments_EDCId",
                table: "InvoicePayments",
                column: "EDCId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_CustomerId",
                table: "Invoices",
                column: "CustomerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvoiceItems");

            migrationBuilder.DropTable(
                name: "InvoicePayments");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "CouponAndPoints");

            migrationBuilder.DropTable(
                name: "EDC");
        }
    }
}
