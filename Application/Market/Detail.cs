using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Market
{
  public class Detail
  {
    public class Query : IRequest<Result<JobDetailDto>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<JobDetailDto>>
    {
      private DataContext _context;
      private IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;

      }

      public async Task<Result<JobDetailDto>> Handle(Query request, CancellationToken cancellationToken)
      {

        var jp = await _context.Jobs.Include(u => u.User).ThenInclude(u => u.UserPhoto).
        Include(j => j.JobProfile.JobLinks).
        Include(j => j.JobProfile.Niche).
        Include(j => j.JobProfile).ThenInclude(j => j.Photos).
        AsSingleQuery().FirstOrDefaultAsync(j => j.Id == request.Id);

        if (jp == null) return null;



        return Result<JobDetailDto>.Success(_mapper.Map(jp, new JobDetailDto()));
      }
    }
  }
}