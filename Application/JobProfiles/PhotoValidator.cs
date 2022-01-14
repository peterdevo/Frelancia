using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Application.JobProfiles
{
  public class PhotoValidator : AbstractValidator<IFormFile>
  {
    public PhotoValidator()
    {
      RuleFor(x => x.ContentType).
      Must(x => x.Equals("image/jpg") || x.Equals("image/jpeg") || x.Equals("image/png")).
      WithMessage("File type is not allowed");
    }
  }
}