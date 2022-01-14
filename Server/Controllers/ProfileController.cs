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

    [HttpPost("addlink/{id}")]
    public async Task<IActionResult> AddLink(Guid id, JobLink jobLink)
    {
      return HandleResult(await Mediator.Send(new AddLink.Command { Id = id, JobLink = jobLink }));
    }

    [HttpDelete("deletelink/{id}")]

    public async Task<IActionResult> DeleteLink(int Id)
    {
      return HandleResult(await Mediator.Send(new DeleteLink.Command { Id = Id }));
    }

    [HttpPost("addfile")]

    public async Task<IActionResult> AddFile([FromForm] AddFile.Command command)
    {
      return HandleResult(await Mediator.Send(command));
    }

    [HttpDelete("deletefile/{id}")]
    public async Task<IActionResult> DeleteFile(int id)
    {
      return HandleResult(await Mediator.Send(new DeleteFile.Command { Id = id }));
    }


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
    public async Task<IActionResult> UpdatePhoto([FromForm] DeletePhoto.Command command)
    {
      return HandleResult(await Mediator.Send(command));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJobProfile(Guid id)
    {
      return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }
  }
}