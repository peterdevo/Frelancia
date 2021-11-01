using System;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
  public class BuggyController : BaseController
  {

    [HttpGet("not-found")]

    public ActionResult GetNotFound()
    {
      return NotFound("not-found");
    }

    [HttpGet("bad-request")]

    public ActionResult GetBadRequest()
    {
      return BadRequest("Bad-request");
    }

    [HttpGet("server-error")]

    public ActionResult GetServerError()
    {
      throw new Exception("Server error");
    }

    [HttpGet("unauthorized")]

    public ActionResult GetUnauthorized()
    {
      return Unauthorized();
    }


  }
}