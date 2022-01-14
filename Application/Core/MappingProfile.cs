using System.Collections.Generic;
using Application.Market;
using Application.Users;
using AutoMapper;
using Domain;

namespace Application.Core
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<JobProfile, JobProfile>();
      CreateMap<Job, Job>();
      CreateMap<UpdatedUserDto, User>();
      CreateMap<User, DisplayUserDto>().ForMember(dest => dest.photoDto, opt => opt.MapFrom(p => p.UserPhoto));
      CreateMap<UserPhoto, PhotoDto>();
      CreateMap<Job, JobDetailDto>().ForMember(dest => dest.FirstName, opt => opt.MapFrom(j => j.User.FirstName)).
                                     ForMember(dest => dest.UserPhoto, opt => opt.MapFrom(j => j.User.UserPhoto.Url)).
                                     ForMember(dest => dest.LastName, opt => opt.MapFrom(j => j.User.LastName)).
                                     ForMember(dest => dest.Bio, opt => opt.MapFrom(j => j.User.Bio)).
                                     ForMember(dest => dest.City, opt => opt.MapFrom(j => j.User.City)).
                                     ForMember(dest => dest.State, opt => opt.MapFrom(j => j.User.State)).
                                     ForMember(dest => dest.ZipCode, opt => opt.MapFrom(j => j.User.ZipCode)).
                                     ForMember(dest => dest.Country, opt => opt.MapFrom(j => j.User.Country)).
                                     ForMember(dest => dest.Email, opt => opt.MapFrom(j => j.User.Email)).
                                     ForMember(dest => dest.Language, opt => opt.MapFrom(j => j.User.Language)).
                                     ForMember(dest => dest.SocialMedia, opt => opt.MapFrom(j => j.User.SocialMedia)).
                                     ForMember(dest => dest.Title, opt => opt.MapFrom(j => j.Title)).
                                     ForMember(dest => dest.Introduction, opt => opt.MapFrom(j => j.Introduction)).
                                     ForMember(dest => dest.Niche, opt => opt.MapFrom(j => j.JobProfile.Niche.Title)).
                                     ForMember(dest => dest.JobLinks, opt => opt.MapFrom(j => j.JobProfile.JobLinks)).
                                     ForMember(dest => dest.Photos, opt => opt.MapFrom(j => j.JobProfile.Photos)).
                                     ForMember(dest => dest.Description, opt => opt.MapFrom(j => j.JobProfile.Description));
      ;

      CreateMap<Job, JobDto>().ForMember(des => des.NicheId, opt => opt.MapFrom(opt => opt.JobProfile.NicheId));
    }
  }
}