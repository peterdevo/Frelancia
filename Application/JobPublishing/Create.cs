using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobPublishing
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Job Job { get; set; }
    }

    public class Handler : IRequestHandler<Command,Result<Unit>>


    {
      private readonly DataContext _context;
      private IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }

       public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());
        user.Jobs.Add(request.Job);
        _context.Jobs.Add(request.Job);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Fail to create job profile");

        return Result<Unit>.Success(Unit.Value);

      }
    }
  }
}

