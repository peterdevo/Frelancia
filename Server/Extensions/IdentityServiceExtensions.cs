using System.Text;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using Server.Services;

namespace Server.Extensions
{
  public static class IdentityServiceExtensions
  {
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddIdentityCore<User>(opt =>
      {
        opt.Password.RequireNonAlphanumeric = false;
      }).AddEntityFrameworkStores<DataContext>().AddSignInManager<SignInManager<User>>();

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["SecretKey"]));
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(opt =>
      {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = key,
          ValidateIssuer = false,
          ValidateAudience=false

        };
      });
      services.AddScoped<TokenService>();

      return services;
    }
  }
}