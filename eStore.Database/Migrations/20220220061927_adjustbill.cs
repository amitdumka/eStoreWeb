using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace eStore.Database.Migrations
{
    public partial class adjustbill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAdjustedBill",
                table: "DailySales",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "AdjustedBills",
                columns: table => new
                {
                    AdjustedBillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TragetInvoices = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdjustedAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DifferenceAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdjustedBills", x => x.AdjustedBillId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdjustedBills");

            migrationBuilder.DropColumn(
                name: "IsAdjustedBill",
                table: "DailySales");
        }
    }
}
