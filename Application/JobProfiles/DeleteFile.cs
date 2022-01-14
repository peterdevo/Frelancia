using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.JobProfiles
{
  public class DeleteFile
  {
    public class Command : IRequest<Result<Unit>>
    {
      public int Id { get; set; }

    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private DataContext _context;
      private IFileAccessor _fileAccessor;
      public Handler(DataContext context, IFileAccessor fileAccessor)
      {
        _fileAccessor = fileAccessor;
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {

        var jf = await _context.JobFiles.FindAsync(request.Id);

        await _fileAccessor.DeleteFile(jf.PublicId);
        _context.JobFiles.Remove(jf);
        var result = await _context.SaveChangesAsync() > 0;
        if (!result) return Result<Unit>.Failure("Fail to delete file");

        return Result<Unit>.Success(Unit.Value);

      }
    }
  }
}