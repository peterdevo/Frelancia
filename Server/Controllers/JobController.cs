using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.JobPublishing;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
  public class JobController : BaseController
  {


    [HttpGet]

    public async Task<ActionResult<List<Job>>> GetJobs()
    {
      return HandleResult( await Mediator.Send(new List.Query { }));
    }
    [HttpPost]
    public async Task<IActionResult> CreateJob(Job job)
    {
      return HandleResult(await Mediator.Send(new Create.Command { Job = job }));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(Guid id)
    {
      return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditJob(Guid id, Job job)
    {
      job.Id=id;
      return Ok(await Mediator.Send(new Edit.Command { Job = job }));
    }
  }
}