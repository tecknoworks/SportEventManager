using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public class UserLogicServices : IUserLogicServices
    {
        private readonly IUserServices _userServices;
        private readonly IMapper _mapper;

        public UserLogicServices(IUserServices userServices, IMapper mapper)
        {
            _userServices = userServices;
            _mapper = mapper;
        }
        public async Task<IdentityResult> CreateUserAsyncLogic(UserDto newUser)
        {
            var user = _mapper.Map<EventPlannerUser>(newUser);
            try
            {
                return await _userServices.CreateUserAsync(user, newUser.Password);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
