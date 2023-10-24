

using AutoMapper;
using BusinessLayer.DTOs;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace BusinessLayer.Services
{
    public class UserLogicService
    {
        private IUserService _userService;
        private IMapper _mapper;

        public UserLogicService(IUserService _userService, IMapper mapper)
        {
            this._userService = _userService;
            this._mapper = mapper;
        }


        public async Task<bool> LogIn(LogInUserDto userDto)
        {
           return await _userService.LogIn(userDto.UserIdentifier, userDto.Password);

        }







    }
}
