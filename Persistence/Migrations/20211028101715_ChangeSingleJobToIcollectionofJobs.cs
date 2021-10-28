using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ChangeSingleJobToIcollectionofJobs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Jobs_JobProfileId",
                table: "Jobs");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_JobProfileId",
                table: "Jobs",
                column: "JobProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Jobs_JobProfileId",
                table: "Jobs");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_JobProfileId",
                table: "Jobs",
                column: "JobProfileId",
                unique: true);
        }
    }
}
