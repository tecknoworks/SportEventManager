using AutoMapper;
using BusinessLayer.DTOs;
using DataAccessLayer.Migrations;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Profiles
{
    public class UserProfileForLogIn:Profile
    {
 /*       public UserProfileForLogIn()
        {
            CreateMap<EventPlannerUser, LogInUserDto>()
                    .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                    .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.PasswordHash));
        }*/
    }

}

