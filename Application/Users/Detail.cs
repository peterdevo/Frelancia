using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
  public class Detail
  {
    public class Query : IRequest<Result<DisplayUserDto>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<DisplayUserDto>>
    {
      private DataContext _context;
      private IUserAccessor _userAccessor;
      private IMapper _mapper;
      public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
      {
        _mapper = mapper;
        _userAccessor = userAccessor;
        _context = context;

      }

      public async Task<Result<DisplayUserDto>> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _context.Users.Include(p => p.UserPhoto).FirstOrDefaultAsync(p => p.Id == _userAccessor.GetUserId());

        if (user == null) return null;

        var displayUser = new DisplayUserDto();

        var mapperObj = _mapper.Map(user, displayUser);

        return Result<DisplayUserDto>.Success(mapperObj);
      }
    }
  }
}