using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateNicheAndImageProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Niche",
                table: "JobProfiles",
                newName: "Photos");

            migrationBuilder.AddColumn<int>(
                name: "NicheId",
                table: "JobProfiles",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Niches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Niches", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobProfiles_NicheId",
                table: "JobProfiles",
                column: "NicheId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobProfiles_Niches_NicheId",
                table: "JobProfiles",
                column: "NicheId",
                principalTable: "Niches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobProfiles_Niches_NicheId",
                table: "JobProfiles");

            migrationBuilder.DropTable(
                name: "Niches");

            migrationBuilder.DropIndex(
                name: "IX_JobProfiles_NicheId",
                table: "JobProfiles");

            migrationBuilder.DropColumn(
                name: "NicheId",
                table: "JobProfiles");

            migrationBuilder.RenameColumn(
                name: "Photos",
                table: "JobProfiles",
                newName: "Niche");
        }
    }
}
