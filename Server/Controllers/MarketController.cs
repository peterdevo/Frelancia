

using System;
using System.Threading.Tasks;
using Application.Market;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

  [AllowAnonymous]
  public class MarketController : BaseController
  {

    [HttpGet]
    public async Task<IActionResult> GetAllJobs()
    {
      return HandleResult(await Mediator.Send(new List.Query { }));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetJobDetail(Guid id)
    {
      return HandleResult(await Mediator.Send(new Detail.Query { Id = id }));
    }
  }
}