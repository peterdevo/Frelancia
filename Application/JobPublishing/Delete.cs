using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.JobPublishing
{
  public class Delete
  {

    public class Command : IRequest<Result<Unit>> {
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
        var job=await _context.Jobs.FindAsync(request.Id);

        _context.Remove(job);

       var result= await _context.SaveChangesAsync()>0;

       if(!result) return Result<Unit>.Failure("Fail to delete job");

        return Result<Unit>.Success(Unit.Value);
      }
    }

  }
}