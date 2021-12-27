using Domain;
using FluentValidation;

namespace Application.JobProfiles
{
  public class JobProfileValidator : AbstractValidator<JobProfile>
  {
    public JobProfileValidator()
    {
      RuleFor(jp => jp.NicheId).NotEmpty().WithMessage("Niche of profile must not be empty");;
      RuleFor(jp=>jp.ProfileName).NotEmpty().WithMessage("Name of profile must not be empty");
      RuleFor(jp => jp.Description).NotEmpty().WithMessage("Description of profile must not be empty");
      RuleFor(x => x.JobLinks)
      .Must(x => x.Count > 0).WithMessage("Links must not be empty");
      
    }
  }
}