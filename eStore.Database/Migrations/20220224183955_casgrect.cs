using Microsoft.EntityFrameworkCore.Migrations;

namespace eStore.Database.Migrations
{
    public partial class casgrect : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DueRecoverds_DuesLists_DuesListId",
                table: "DueRecoverds");

            migrationBuilder.DropForeignKey(
                name: "FK_DueRecoverds_Stores_StoreId",
                table: "DueRecoverds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DueRecoverds",
                table: "DueRecoverds");

            migrationBuilder.RenameTable(
                name: "DueRecoverds",
                newName: "DueRecovereds");

            migrationBuilder.RenameColumn(
                name: "RecieptSlipNo",
                table: "Receipts",
                newName: "ReceiptSlipNo");

            migrationBuilder.RenameIndex(
                name: "IX_DueRecoverds_StoreId",
                table: "DueRecovereds",
                newName: "IX_DueRecovereds_StoreId");

            migrationBuilder.RenameIndex(
                name: "IX_DueRecoverds_DuesListId",
                table: "DueRecovereds",
                newName: "IX_DueRecovereds_DuesListId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DueRecovereds",
                table: "DueRecovereds",
                column: "DueRecoverdId");

            migrationBuilder.AddForeignKey(
                name: "FK_DueRecovereds_DuesLists_DuesListId",
                table: "DueRecovereds",
                column: "DuesListId",
                principalTable: "DuesLists",
                principalColumn: "DuesListId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DueRecovereds_Stores_StoreId",
                table: "DueRecovereds",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DueRecovereds_DuesLists_DuesListId",
                table: "DueRecovereds");

            migrationBuilder.DropForeignKey(
                name: "FK_DueRecovereds_Stores_StoreId",
                table: "DueRecovereds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DueRecovereds",
                table: "DueRecovereds");

            migrationBuilder.RenameTable(
                name: "DueRecovereds",
                newName: "DueRecoverds");

            migrationBuilder.RenameColumn(
                name: "ReceiptSlipNo",
                table: "Receipts",
                newName: "RecieptSlipNo");

            migrationBuilder.RenameIndex(
                name: "IX_DueRecovereds_StoreId",
                table: "DueRecoverds",
                newName: "IX_DueRecoverds_StoreId");

            migrationBuilder.RenameIndex(
                name: "IX_DueRecovereds_DuesListId",
                table: "DueRecoverds",
                newName: "IX_DueRecoverds_DuesListId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DueRecoverds",
                table: "DueRecoverds",
                column: "DueRecoverdId");

            migrationBuilder.AddForeignKey(
                name: "FK_DueRecoverds_DuesLists_DuesListId",
                table: "DueRecoverds",
                column: "DuesListId",
                principalTable: "DuesLists",
                principalColumn: "DuesListId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DueRecoverds_Stores_StoreId",
                table: "DueRecoverds",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
