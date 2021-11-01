using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
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

    public class Handler : IRequestHandler<Command,Result<Unit>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;

      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var jobProfile = await _context.JobProfiles.Include(p => p.JobLinks).SingleOrDefaultAsync(p => p.Id == request.Id);
        
        _context.JobProfiles.Remove(jobProfile);
        
        foreach (var jobLink in jobProfile.JobLinks)
        {
          _context.JobLinks.Remove(jobLink);
        }

        var result= await _context.SaveChangesAsync()>0;

        if(!result)return Result<Unit>.Failure("Failed to delete job profile");

        return Result<Unit>.Success(Unit.Value);

      }
    }
  }
}