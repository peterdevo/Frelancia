using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobProfiles
{
  public class DeletePhoto
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string JobProfileId { get; set; }
      public string DeletedId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      public DataContext _context;
      public IPhotoAccessor _photoAccessor;
      public Handler(DataContext dataContext, IPhotoAccessor photoAccessor)
      {
        _context = dataContext;
        _photoAccessor = photoAccessor;

      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var convertedGuid=new Guid(request.JobProfileId);

        var jobProfile = await _context.JobProfiles.FirstOrDefaultAsync(x => x.Id == convertedGuid);

        var photo = await _context.Photos.FirstOrDefaultAsync(x => x.PublicId == request.DeletedId);

        jobProfile.Photos.Remove(photo);

        _context.Photos.Remove(photo);


        await _photoAccessor.DeletePhoto(request.DeletedId);


        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Result<Unit>.Success(Unit.Value);

        return Result<Unit>.Failure("Cannot delete photo");


      }
    }
  }
}