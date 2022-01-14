using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobProfiles
{
  public class AddPhoto
  {
    public class Command : IRequest<Result<Photo>>
    {
      public IFormFile File { get; set; }
      public Guid JobProfileId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Photo>>
    {
      public IFileAccessor _fileAccessor;
      public DataContext _context;
      public Handler(DataContext context, IFileAccessor fileAccessor)
      {
        _context = context;
        _fileAccessor = fileAccessor;
      }

      public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
      {

        var jobProfile = await _context.JobProfiles.FirstOrDefaultAsync(x => x.Id == request.JobProfileId);

        var response = await _fileAccessor.AddFile(request.File);

        var photo = new Photo
        {
          PublicId = response.PublicId,
          Url = response.Url
        };

        _context.Photos.Add(photo);

        jobProfile.Photos.Add(photo);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Photo>.Failure("Fail to add image to profile");

        return Result<Photo>.Success(photo);



      }
    }

  }
}