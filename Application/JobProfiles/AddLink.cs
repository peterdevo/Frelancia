using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.JobProfiles
{
  public class AddLink
  {
    public class Command : IRequest<Result<JobLink>>
    {
      public Guid Id { get; set; }
      public JobLink JobLink { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<JobLink>>
    {
      private DataContext _context;

      public Handler(DataContext context)
      {
        _context = context;

      }

      public async Task<Result<JobLink>> Handle(Command request, CancellationToken cancellationToken)
      {
        var jp = await _context.JobProfiles.FindAsync(request.Id);

        var jl = _context.JobLinks.Add(request.JobLink);

        jp.JobLinks.Add(request.JobLink);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<JobLink>.Failure("Fail to add link");

        return Result<JobLink>.Success(request.JobLink);
      }
    }
  }

}