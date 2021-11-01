using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
  public class Edit
  {
    public class Command : IRequest<Result<Unit>>
    {
      public JobProfile JobProfile { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var jobProfile = await _context.JobProfiles.FindAsync(request.JobProfile.Id);
        if (jobProfile == null) return null;
        _mapper.Map(request.JobProfile, jobProfile);

        var result = await _context.SaveChangesAsync() > 0;
        if (!result) return Result<Unit>.Failure("Failed to update");

        return Result<Unit>.Success(Unit.Value);

      }
    }
  }
}