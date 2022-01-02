using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
  public class EditPhoto
  {
    public class Command : IRequest<Result<PhotoDto>>
    {
      public IFormFile File { get; set; }
      public int Id { get; set; }
      
    }

    public class Handler : IRequestHandler<Command, Result<PhotoDto>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      private readonly IPhotoAccessor _photoAccessor;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor, IMapper mapper)
      {
        _mapper = mapper;
        _photoAccessor = photoAccessor;
        _userAccessor = userAccessor;
        _context = context;

      }

      public async Task<Result<PhotoDto>> Handle(Command request, CancellationToken cancellationToken)
      {
        var userId = _userAccessor.GetUserId();
        var user = await _context.Users.FindAsync(userId);

        if (user == null) return null;

        var responsePhoto = await _photoAccessor.AddPhoto(request.File);
        var nPhoto = await _context.UserPhotos.FirstOrDefaultAsync(p => p.Id == request.Id);

        if (nPhoto.PublicId!="")
        {
          await _photoAccessor.DeletePhoto(nPhoto.PublicId);
        }

        nPhoto.PublicId = responsePhoto.PublicId;
        nPhoto.Url = responsePhoto.Url;

        var photoDto = new PhotoDto();
        var mappedPhotoDto = _mapper.Map(nPhoto, photoDto);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Result<PhotoDto>.Success(mappedPhotoDto);

        return Result<PhotoDto>.Failure("Fail to add photo!");
      }
    }
  }
}