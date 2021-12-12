using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Persistence
{
  public class DataContext : IdentityDbContext<User>
  {
    public DataContext(DbContextOptions options) : base(options)
    {
      
    }

    public DbSet<JobProfile> JobProfiles { get; set; }
    public DbSet<JobLink> JobLinks { get; set; }
    public DbSet<Niche> Niches { get; set; }
    public DbSet<Job> Jobs { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<UserPhoto> UserPhotos { get; set; }
  }
}
