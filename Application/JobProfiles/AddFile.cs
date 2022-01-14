using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.JobProfiles
{
  public class AddFile
  {
    public class Command : IRequest<Result<JobFile>>
    {
      public Guid Id { get; set; }
      public IFormFile File { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<JobFile>>
    {
      private DataContext _context;
      private IFileAccessor _fileAccessor;
      public Handler(DataContext context, IFileAccessor fileAccessor)
      {
        _fileAccessor = fileAccessor;
        _context = context;

      }

      public async Task<Result<JobFile>> Handle(Command request, CancellationToken cancellationToken)
      {

        var jp = await _context.JobProfiles.FindAsync(request.Id);

        if (jp == null) return null;

        var file = await _fileAccessor.AddFile(request.File);

        var jobFile = new JobFile
        {
          Name=request.File.FileName,
          PublicId = file.PublicId,
          Url = file.Url
        };

        _context.JobFiles.Add(jobFile);

        jp.JobFiles.Add(jobFile);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<JobFile>.Failure("Fail to add link");

        return Result<JobFile>.Success(jobFile);


      }
    }
  }
}