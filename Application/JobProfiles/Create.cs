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
      public List<IFormFile> Files { get; set; } = new List<IFormFile>();

    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.JobProfile).SetValidator(new JobProfileValidator());
        RuleForEach(x => x.Files).SetValidator(new FileValidator());
      }
    }


    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private IUserAccessor _userAccessor;
      public IPhotoAccessor _photoAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
      {
        _photoAccessor = photoAccessor;
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());
        var requestResult = request.JobProfile;


        if (request.Files.Count > 0)
        {
          foreach (var file in request.Files)
          {
            var uploadedResult = await _photoAccessor.AddPhoto(file);

            var photo = new Photo
            {
              PublicId = uploadedResult.PublicId,
              Url = uploadedResult.Url
            };
            requestResult.Photos.Add(photo);

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