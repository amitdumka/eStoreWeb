using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace eStore.Database.Migrations
{
    public partial class assests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assests",
                columns: table => new
                {
                    AssestId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccquiredDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AssestName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssestCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssestCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InvoiceDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpireDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CurrentStaus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assests", x => x.AssestId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assests");
        }
    }
}