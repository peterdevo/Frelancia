using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.JobProfiles;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
    {
      public JobProfile JobProfile { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.JobProfile).SetValidator(new JobProfileValidator());
      }
    }


    public class Handler : IRequestHandler<Command, Result<Unit>>
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
        user.JobProfiles.Add(request.JobProfile);
        _context.JobProfiles.Add(request.JobProfile);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Fail to create job profile");

        return Result<Unit>.Success(Unit.Value);

      }
    }
  }
}