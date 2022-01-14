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

namespace Application
{
  public class List
  {

    public class Query : IRequest<Result<List<JobProfile>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<JobProfile>>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;

        _context = context;

      }
      public async Task<Result<List<JobProfile>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var jp = await _context.JobProfiles.Include(jp => jp.JobLinks).Include(jp => jp.Photos).Include(jp=>jp.JobFiles).AsSingleQuery()
          .Where(x => x.UserId == _userAccessor.GetUserId()).ToListAsync();
        if (jp == null) return null;
        return Result<List<JobProfile>>.Success(jp);
      }
    }

  }
}