using Domain;
using FluentValidation;

namespace Application.JobProfiles
{
  public class JobProfileValidator : AbstractValidator<JobProfile>
  {
    public JobProfileValidator()
    {
      RuleFor(jp => jp.NicheId).NotEmpty();
      RuleFor(jp => jp.Description).NotEmpty();
      // RuleFor(x => x.JobLinks)
      // .Must(x => x.Count > 0).WithMessage("Links must not be empty");
    }
  }
}