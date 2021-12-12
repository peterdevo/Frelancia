using Application.Users;
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
            CreateMap<UpdatedUserDto,User>();
            CreateMap<User,DisplayUserDto>().ForMember(dest=>dest.photoDto,opt=>opt.MapFrom(p=>p.UserPhoto));
            CreateMap<UserPhoto,PhotoDto>();
        }
    }
}