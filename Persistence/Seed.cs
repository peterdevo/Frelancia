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

      var JobProfiles = new List<JobProfile>
            {
               new JobProfile{
                 Niche="Frontend",
                 Description="test1",
                 CreateAt=DateTime.Now
               },
               new JobProfile{
                 Niche="BackEnd",
                 Description="test2",
                 CreateAt=DateTime.Now
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
                URL="link1",
                JobProfile=JobProfiles[1]
              }
            };

      await context.AddRangeAsync(links);

      await context.SaveChangesAsync();
    }
  }
}