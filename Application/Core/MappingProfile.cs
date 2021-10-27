using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<JobProfile,JobProfile>();
            CreateMap<Job,Job>();
        }
    }
}