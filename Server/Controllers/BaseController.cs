using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Server.Extensions;

namespace Server.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class BaseController : ControllerBase
  {
    private IMediator _mediator;

    protected IMediator Mediator
    {
      get
      {
        return _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
      }
    }

    protected ActionResult HandleResult<T>(Result<T> result)
    {
      if (result == null) return NotFound();
      if (result.IsSuccess && result.Value != null)
        return Ok(result.Value);
      if (result.IsSuccess && result.Value == null)
        return NotFound();

      return BadRequest(result.Error);

    }


    protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
    {
      if (result == null) return NotFound();
      if (result.IsSuccess && result.Value != null)
      {
        Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize, 
                                    result.Value.TotalCount, result.Value.TotalPages);
        return Ok(result.Value);
      }

      if (result.IsSuccess && result.Value == null)
        return NotFound();

      return BadRequest(result.Error);

    }
  }
}