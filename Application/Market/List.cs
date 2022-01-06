
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Market
{
  public class List
  {

    public class Query : IRequest<Result<PagedList<JobDto>>>
    {
      public PagingParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<JobDto>>>
    {
      private DataContext _context;
      private IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<PagedList<JobDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var query = _context.Jobs.OrderBy(p=>p.CreatedAt).ProjectTo<JobDto>(_mapper.ConfigurationProvider).AsQueryable();
        return Result<PagedList<JobDto>>.Success(await PagedList<JobDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
      }
    }
  }
}