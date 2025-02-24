using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthECApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangeColumnNameOfDIBToDOB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DIB",
                table: "AspNetUsers",
                newName: "DOB");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DOB",
                table: "AspNetUsers",
                newName: "DIB");
        }
    }
}
