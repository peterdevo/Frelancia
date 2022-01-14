using System;
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
      public IFileAccessor _fileAccessor;
      public Handler(DataContext dataContext, IFileAccessor fileAccessor)
      {
        _context = dataContext;
        _fileAccessor = fileAccessor;

      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var convertedGuid=new Guid(request.JobProfileId);

        var jobProfile = await _context.JobProfiles.FirstOrDefaultAsync(x => x.Id == convertedGuid);

        var photo = await _context.Photos.FirstOrDefaultAsync(x => x.PublicId == request.DeletedId);

        jobProfile.Photos.Remove(photo);

        _context.Photos.Remove(photo);


        await _fileAccessor.DeleteFile(request.DeletedId);


        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Result<Unit>.Success(Unit.Value);

        return Result<Unit>.Failure("Cannot delete photo");


      }
    }
  }
}