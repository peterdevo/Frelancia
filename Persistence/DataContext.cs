using Domain;
using Microsoft.EntityFrameworkCore;


namespace Persistence
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
     modelBuilder.Entity<JobProfile>()
        .HasOne(p => p.Niche)
        .WithMany(b => b.JobProfiles)
        .HasForeignKey(p => p.NicheId);

    }

    public DbSet<JobProfile> JobProfiles { get; set; }

    public DbSet<JobLink> JobLinks { get; set; }

    public DbSet<Niche> Niches { get; set; }
  }
}
