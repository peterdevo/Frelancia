
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Market
{
  public class List
  {

    public class Query : IRequest<Result<List<JobDto>>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<List<JobDto>>>
    {
      private DataContext _context;
      private IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<List<JobDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var jobs = await _context.Jobs.ToListAsync();
        if (jobs == null) return null;
        return Result<List<JobDto>>.Success(_mapper.Map<List<Job>, List<JobDto>>(jobs));
      }
    }
  }
}