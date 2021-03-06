
using Application;
using FluentValidation.AspNetCore;
using Infrastructure.FilesUploader;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Server.Extensions;
using Server.Middleware;

namespace Server
{
  public class Startup
  {

    private readonly IConfiguration _config;
    public Startup(IConfiguration config)
    {
      _config = config;

    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers(opt=>
      {
        var policy=new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        opt.Filters.Add(new AuthorizeFilter(policy));
      }
      ).AddFluentValidation(config =>
      {
        config.RegisterValidatorsFromAssemblyContaining<Create>();
      });
      services.AddApplicationServices(_config);
      services.AddIdentityServices(_config);
      services.Configure<CloudinarySetting>(_config.GetSection("Cloudinary"));

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseMiddleware<ExceptionMiddleware>();
      if (env.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Server v1"));
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseCors("PolicyCors");

      app.UseAuthentication();
      
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
