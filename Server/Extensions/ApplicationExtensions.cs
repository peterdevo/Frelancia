using Application;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace Server.Extensions
{
  public static class ApplicationExtensions
  {

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {

      services.AddMediatR(typeof(List.Handler).Assembly);
      services.AddAutoMapper(typeof(MappingProfile).Assembly);

      services.AddCors(options =>
         {
           options.AddPolicy("PolicyCors",
                              builder =>
                              {
                                builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                              });
         });
      services.AddSwaggerGen(c =>
     {
       c.SwaggerDoc("v1", new OpenApiInfo { Title = "Server", Version = "v1" });
     });
      services.AddDbContext<DataContext>(opt => opt.UseSqlite(config.GetConnectionString("DefaultConnection")));

      return services;
    }

  }
}