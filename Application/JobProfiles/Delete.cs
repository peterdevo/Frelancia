using System;
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
  public class Delete
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private DataContext _context;
      private IFileAccessor _fileAccessor;
      public Handler(DataContext context, IFileAccessor fileAccessor)
      {
        _fileAccessor = fileAccessor;
        _context = context;

      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var jobProfile = await _context.JobProfiles.Include(p => p.JobLinks).SingleOrDefaultAsync(p => p.Id == request.Id);

        _context.JobProfiles.Remove(jobProfile);

        var jobs = _context.Jobs.Where(j => j.JobProfileId == request.Id);

        if (jobs.Count() > 0)
        {
          foreach (var job in jobs)
          {
            _context.Jobs.Remove(job);
          }
        }

        var photos = _context.Photos.Where(p => p.JobProfileId == jobProfile.Id);

        if (photos.Count() > 0)
        {
          foreach (var photo in photos)
          {
            await _fileAccessor.DeleteFile(photo.PublicId);
          }
        }

        var jobFiles = _context.JobFiles.Where(p => p.JobProfileId == jobProfile.Id);
        if (jobFiles.Count() > 0)
        {
          foreach (var jobFile in jobFiles)
          {
            await _fileAccessor.DeleteFile(jobFile.PublicId);
          }
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Fail to delete job profile");

        return Result<Unit>.Success(Unit.Value);

      }
    }
  }
}