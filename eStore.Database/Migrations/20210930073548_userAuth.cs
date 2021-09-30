using Microsoft.EntityFrameworkCore.Migrations;

namespace eStore.Database.Migrations
{
    public partial class userAuth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsEmployee = table.Column<bool>(type: "bit", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    UserType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "EmployeeId", "FullName", "IsActive", "IsEmployee", "Password", "StoreId", "UserName", "UserType" },
                values: new object[] { 1, 3, "Amit Kumar", true, false, "Admin", 1, "Admin", 3 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "EmployeeId", "FullName", "IsActive", "IsEmployee", "Password", "StoreId", "UserName", "UserType" },
                values: new object[] { 2, 1, "Alok Kumar", true, true, "Alok", 1, "Alok", 1 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "EmployeeId", "FullName", "IsActive", "IsEmployee", "Password", "StoreId", "UserName", "UserType" },
                values: new object[] { 3, 11, "Geetanjali Verma", true, true, "Geeta", 1, "Gita", 4 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
