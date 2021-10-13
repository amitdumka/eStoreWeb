using Microsoft.EntityFrameworkCore.Migrations;

namespace eStore.Database.Migrations
{
    public partial class NewInvoice2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InvoiceNumber",
                table: "InvoicePayments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNumber",
                table: "InvoiceItems",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InvoicePayments_InvoiceNumber",
                table: "InvoicePayments",
                column: "InvoiceNumber",
                unique: true,
                filter: "[InvoiceNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItems_InvoiceNumber",
                table: "InvoiceItems",
                column: "InvoiceNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceItems_Invoices_InvoiceNumber",
                table: "InvoiceItems",
                column: "InvoiceNumber",
                principalTable: "Invoices",
                principalColumn: "InvoiceNumber",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoicePayments_Invoices_InvoiceNumber",
                table: "InvoicePayments",
                column: "InvoiceNumber",
                principalTable: "Invoices",
                principalColumn: "InvoiceNumber",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceItems_Invoices_InvoiceNumber",
                table: "InvoiceItems");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoicePayments_Invoices_InvoiceNumber",
                table: "InvoicePayments");

            migrationBuilder.DropIndex(
                name: "IX_InvoicePayments_InvoiceNumber",
                table: "InvoicePayments");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceItems_InvoiceNumber",
                table: "InvoiceItems");

            migrationBuilder.DropColumn(
                name: "InvoiceNumber",
                table: "InvoicePayments");

            migrationBuilder.DropColumn(
                name: "InvoiceNumber",
                table: "InvoiceItems");
        }
    }
}
