
using System.Threading.Tasks;
using Application.Users;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
  public class UserController : BaseController
  {
    [HttpGet]

    public async Task<IActionResult> GetUser()
    {
      return HandleResult(await Mediator.Send(new Detail.Query()));
    }

    [HttpPut]
    public async Task<IActionResult> EditUser(UpdatedUserDto updatedUserDto)
    {
      return HandleResult(await Mediator.Send(new Edit.Command { UpdatedUserDto = updatedUserDto }));
    }

    [HttpPut("edituserphoto")]
    public async Task<IActionResult> EditUserPhoto([FromForm] EditPhoto.Command command){
      return HandleResult(await Mediator.Send(command));
    }
    
  }
}