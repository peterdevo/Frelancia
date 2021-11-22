using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddProfileToUse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "JobProfiles",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobProfiles_UserId",
                table: "JobProfiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobProfiles_AspNetUsers_UserId",
                table: "JobProfiles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobProfiles_AspNetUsers_UserId",
                table: "JobProfiles");

            migrationBuilder.DropIndex(
                name: "IX_JobProfiles_UserId",
                table: "JobProfiles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "JobProfiles");
        }
    }
}
