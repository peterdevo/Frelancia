using System;

using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Application.JobProfiles
{
  public class FileValidator : AbstractValidator<IFormFile>
  {
    public FileValidator()
    {
      RuleFor(x => x.ContentType).
      Must(x => x.Equals("application/pdf")).
      WithMessage("Only PDF type is allowed");
    }
  }
}