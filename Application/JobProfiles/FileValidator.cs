using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Application.JobProfiles
{
  public class FileValidator : AbstractValidator<IFormFile>
  {
    public FileValidator()
    {
      RuleFor(x => x.ContentType).
      Must(x => x.Equals("image/jpg") || x.Equals("image/jpeg") || x.Equals("image/png")).
      WithMessage("File type is not allowed");
    }
  }
}