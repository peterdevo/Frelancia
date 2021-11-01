using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
  public class List
  {

    public class Query : IRequest<Result<List<JobProfile>>> { }

    public class Handler : IRequestHandler<Query, Result<List<JobProfile>>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;

      }

      public async Task<Result<List<JobProfile>>> Handle(Query request, CancellationToken cancellationToken)
      {
        return Result<List<JobProfile>>.Success(await _context.JobProfiles.Include(p => p.JobLinks).ToListAsync());
      }
    }

  }
}