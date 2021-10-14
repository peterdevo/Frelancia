using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application;
using Application.JobProfiles;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
  public class ProfileController : BaseController
  {

    [HttpGet]
    public async Task<ActionResult<List<JobProfile>>> GetJobProfile()
    {
      return await Mediator.Send(new List.Query());
    }

    [HttpPost]

    public async Task<IActionResult> AddJobProfile(JobProfile jobProfile)
    {
      
      return Ok(await Mediator.Send(new Create.Command { JobProfile = jobProfile }));
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> EditJobProfile(Guid id,JobProfile jobProfile){

      jobProfile.Id=id;
      return Ok(await Mediator.Send(new Edit.Command{JobProfile=jobProfile}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJobProfile(Guid id){

        return Ok(await Mediator.Send(new Delete.Command{Id=id}));
    }
  }
}