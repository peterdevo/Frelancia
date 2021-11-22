using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedData(DataContext context, UserManager<User> userManager)
    {

      if (!userManager.Users.Any())
      {
        var users = new List<User>{
            new User{DisplayName="Bob",UserName="bob",Email="bob@hotmail.com"},
          };

        foreach (var user in users)
        {
          await userManager.CreateAsync(user, "Pa$$w0rd");
        }

        var Niche = new List<Niche>{
        new Niche{Id=1,Title="Frontend"},
        new Niche{Id=2,Title="Backend"},
        new Niche{Id=3,Title="Fullstack"},
      };

        await context.AddRangeAsync(Niche);

        var links = new List<JobLink>{
              new JobLink {
                Id=1,
                URL="link1",
              },
              new JobLink {
                Id=2,
                URL="link2",
              }
            };

        await context.AddRangeAsync(links);

        var JobProfiles = new List<JobProfile>
            {
               new JobProfile{
                 Description="test1",
                 ProfileName="First profile",
                 Niche=Niche[0],
                 CreateAt=DateTime.Now,
                 Photos="photo1",
                 JobLinks=new List<JobLink>{links[0]},
                 User=users[0]



               },
               new JobProfile{
                 Description="test2",
                 ProfileName="Second profile",
                 Niche=Niche[1],
                 CreateAt=DateTime.Now,
                 Photos="photo2",
                 JobLinks=new List<JobLink>{links[1]},
                 User=users[0]
               }
            };
        await context.AddRangeAsync(JobProfiles);


        var jobs = new List<Job>{
        new Job {JobProfileId=JobProfiles[0].Id,Title="Looking for frontend",Introduction="Hello this is my first job",User=users[0]},
      };

        await context.AddRangeAsync(jobs);

        await context.SaveChangesAsync();
      }



    }
  }
}