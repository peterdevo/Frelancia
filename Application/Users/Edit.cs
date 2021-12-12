
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Users
{
  public class Edit
  {
    public class Command : IRequest<Result<Unit>>
    {
      public UpdatedUserDto UpdatedUserDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private DataContext _context;
      private IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;

        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await _context.Users.FindAsync(request.UpdatedUserDto.Id);

        if (user == null) return null;
        var d = _mapper.Map(request.UpdatedUserDto, user);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Fail to update");

        return Result<Unit>.Success(Unit.Value);

      }
    }
  }
}