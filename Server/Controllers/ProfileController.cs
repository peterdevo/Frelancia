using System;
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
    public async Task<IActionResult> GetJobProfiles()
    {
      return HandleResult(await Mediator.Send(new List.Query()));
    }



    [HttpGet("{id}")]

    public async Task<IActionResult> GetJobProfile(Guid id)
    {
      return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }

    [HttpPost]

    public async Task<IActionResult> AddJobProfile(JobProfile jobProfile)
    {

      return HandleResult(await Mediator.Send(new Create.Command { JobProfile = jobProfile }));
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> EditJobProfile(Guid id, JobProfile jobProfile)
    {

      jobProfile.Id = id;
      return HandleResult(await Mediator.Send(new Edit.Command { JobProfile = jobProfile }));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJobProfile(Guid id)
    {

      return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }
  }
}