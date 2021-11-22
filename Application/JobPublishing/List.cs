using System.Collections.Generic;
using System.Linq;
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
  public class List
  {
    public class Query : IRequest<Result<List<Job>>> { }


    public class Handler : IRequestHandler<Query, Result<List<Job>>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;

      }

      public async Task<Result<List<Job>>> Handle(Query request, CancellationToken cancellationToken)
      {

        var result = await _context.Jobs.Include(j => j.JobProfile).Include(j => j.JobProfile.JobLinks)
        .Where(x => x.UserId == _userAccessor.GetUserId()).ToListAsync();

        if(result==null)return null;

        return Result<List<Job>>.Success(result);
      }
    }

  }
}