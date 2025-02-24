using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthECApi.Migrations
{
    /// <inheritdoc />
    public partial class AddGenderDOBLibraryId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "DIB",
                table: "AspNetUsers",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "AspNetUsers",
                type: "nvarchar(10)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LibraryId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DIB",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LibraryId",
                table: "AspNetUsers");
        }
    }
}
