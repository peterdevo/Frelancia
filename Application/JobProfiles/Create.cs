using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.JobProfiles;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
    {
      public JobProfile JobProfile { get; set; }
      public List<IFormFile> PhotoFiles { get; set; } = new List<IFormFile>();
      public List<IFormFile> JobFiles { get; set; } = new List<IFormFile>();

    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.JobProfile).SetValidator(new JobProfileValidator());
        RuleForEach(x => x.PhotoFiles).SetValidator(new PhotoValidator());
        RuleForEach(x => x.JobFiles).SetValidator(new FileValidator());
      }
    }


    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private DataContext _context;
      private IUserAccessor _userAccessor;
      private IFileAccessor _fileAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor, IFileAccessor fileAccessor)
      {
        _fileAccessor = fileAccessor;
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());
        var requestResult = request.JobProfile;



        if (request.PhotoFiles.Count > 0)
        {
          foreach (var file in request.PhotoFiles)
          {
            var uploadedResult = await _fileAccessor.AddFile(file);

            var photo = new Photo
            {
              PublicId = uploadedResult.PublicId,
              Url = uploadedResult.Url
            };
            requestResult.Photos.Add(photo);

          }
        }

        if (request.JobFiles.Count > 0)
        {
          foreach (var jobfile in request.JobFiles)
          {
            var uploadedResult = await _fileAccessor.AddFile(jobfile);

            var file = new JobFile
            {
              PublicId = uploadedResult.PublicId,
              Url = uploadedResult.Url,
              Name = jobfile.FileName
            };
            requestResult.JobFiles.Add(file);

          }
        }

        user.JobProfiles.Add(requestResult);

        _context.JobProfiles.Add(requestResult);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Fail to create job profile");

        return Result<Unit>.Success(Unit.Value);

      }
    }
  }
}