using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.JobProfiles
{
  public class Details
  {
    public class Query : IRequest<Result<JobProfile>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<JobProfile>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;

      }

      public async Task<Result<JobProfile>> Handle(Query request, CancellationToken cancellationToken)
      {
          var jobProfile= await _context.JobProfiles.FindAsync(request.Id);

          return Result<JobProfile>.Success(jobProfile);
      }

    }
  }
}