using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobProfiles
{
  public class Delete
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;

      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var jobProfile = await _context.JobProfiles.Include(p => p.JobLinks).SingleOrDefaultAsync(p => p.Id == request.Id);

        _context.JobProfiles.Remove(jobProfile);
        
        foreach (var jobLink in jobProfile.JobLinks)
        {
          _context.JobLinks.Remove(jobLink);
        }

        await _context.SaveChangesAsync();

        return Unit.Value;

      }
    }
  }
}