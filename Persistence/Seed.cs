using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedData(DataContext context)
    {

      if (context.JobProfiles.Any()) return;

      var Niche = new List<Niche>{
        new Niche{Id=1,Title="Frontend"},
        new Niche{Id=2,Title="Backend"},
        new Niche{Id=3,Title="Fullstack"},

      };

      await context.AddRangeAsync(Niche);


      var JobProfiles = new List<JobProfile>
            {
               new JobProfile{
                 Description="test1",
                 Niche=Niche[0],
                 CreateAt=DateTime.Now,
                 Photos="photo1",

               },
               new JobProfile{
                 Description="test2",
                 Niche=Niche[1],
                 CreateAt=DateTime.Now,
                 Photos="photo2"
               }
            };
      await context.AddRangeAsync(JobProfiles);

      var links = new List<JobLink>{
              new JobLink {
                Id=1,
                URL="link1",
                JobProfile=JobProfiles[0]
              },
              new JobLink {
                Id=2,
                URL="link2",
                JobProfile=JobProfiles[1]
              }
            };

      await context.AddRangeAsync(links);


      var jobs = new List<Job>{
        new Job {JobProfileId=JobProfiles[0].Id,Title="Looking for frontend",Introduction="Hello this is my first job"},
      };

      await context.AddRangeAsync(jobs);

      await context.SaveChangesAsync();
    }
  }
}