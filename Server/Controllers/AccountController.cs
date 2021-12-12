using System.Security.Claims;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Services;

namespace Server.Controllers
{
  [AllowAnonymous]
  [ApiController]
  [Route("/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly TokenService _tokenService;
    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, TokenService tokenService)
    {
      _tokenService = tokenService;
      _signInManager = signInManager;
      _userManager = userManager;
    }



    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.FindByNameAsync(loginDto.UserName);
      if (user == null) return Unauthorized();

      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

      if (result.Succeeded) return CreateUserObject(user);

      return Unauthorized();
    }

    [HttpPost("register")]

    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {

      if (await _userManager.Users.AnyAsync(user => user.Email == registerDto.Email))
      {
        ModelState.AddModelError("email", "email is taken");
        return ValidationProblem();
      }

      if (await _userManager.Users.AnyAsync(user => user.UserName == registerDto.Username))
      {
        ModelState.AddModelError("username", "username is taken");
        return ValidationProblem();
      }



      var user = new User
      {
        FirstName = registerDto.FirstName,
        LastName = registerDto.LastName,
        Email = registerDto.Email,
        UserName = registerDto.Username,
        UserPhoto=new UserPhoto{
          PublicId="",
          Url="",
        }
      };

      var result = await _userManager.CreateAsync(user, registerDto.Password);


      if (result.Succeeded)
      {
        return CreateUserObject(user);
      }

      return BadRequest("Something went wrong with register");
    }



    [HttpGet]
    public async Task<ActionResult<UserDto>> GetUser()
    {
      var user = await _userManager.Users.Include(p => p.UserPhoto).FirstOrDefaultAsync(x => x.Id == User.FindFirstValue(ClaimTypes.NameIdentifier));

      return CreateUserObject(user);
    }

    private UserDto CreateUserObject(User user)
    {
      
      return new UserDto
      {
        Id = user.Id,
        FirstName = user.FirstName,
        UserPhoto = user?.UserPhoto?.Url,
        LastName = user.LastName,
        Token = _tokenService.CreateToken(user),
        UserName = user.UserName
      };
    }
  }


}