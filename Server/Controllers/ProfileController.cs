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
      return HandleResult(await Mediator.Send(new List.Query { }));
    }

    [HttpGet("niche")]

    public async Task<IActionResult> GetNiche()
    {
      return HandleResult(await Mediator.Send(new ListNiche.Query()));
    }


    // [HttpGet("{id}")]

    // public async Task<IActionResult> GetJobProfile(Guid id)
    // {
    //   return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    // }

    [HttpPost]
    public async Task<IActionResult> AddJobProfile([FromForm] Create.Command command)
    {
      return HandleResult(await Mediator.Send(command));
    }

    [HttpPost("addjobprofilephoto")]
    public async Task<IActionResult> AddJobProfilePhoto([FromForm] AddPhoto.Command command)
    {
      return HandleResult(await Mediator.Send(command));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditJobProfile(Guid id, JobProfile jobProfile)
    {

      jobProfile.Id = id;
      return HandleResult(await Mediator.Send(new Edit.Command { JobProfile = jobProfile }));
    }

    [HttpPut("updatephoto")]
    public async Task<IActionResult> UpdatePhoto([FromForm] DeletePhoto.Command command){
        return HandleResult(await Mediator.Send(command));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJobProfile(Guid id)
    {
      return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }
  }
}