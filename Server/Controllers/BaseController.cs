using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

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
  }
}