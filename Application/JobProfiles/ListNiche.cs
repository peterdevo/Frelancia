using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobProfiles
{
  public class ListNiche
  {
    public class Query : IRequest<Result<List<Niche>>> { }

    public class Handler : IRequestHandler<Query, Result<List<Niche>>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;


      }

      public async Task<Result<List<Niche>>> Handle(Query request, CancellationToken cancellationToken)
      {

        return Result<List<Niche>>.Success(await _context.Niches.ToListAsync());
      }
    }
  }
}