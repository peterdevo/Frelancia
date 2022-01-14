using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.JobProfiles
{
  public class DeleteLink
  {
    public class Command : IRequest<Result<Unit>>
    {
      public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var link = await _context.JobLinks.FindAsync(request.Id);

        _context.Remove(link);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Fail to delete link");

        return Result<Unit>.Success(Unit.Value);


      }
    }
  }
}