using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly Serilog.ILogger _logger;
        private readonly IMapper _mapper;

        public AdminService(IAdminRepository adminRepository, Serilog.ILogger logger, IMapper mapper)
        {
            _adminRepository = adminRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task <List<UserDetailsDto>> GetUsersAsyncLogic()
        {
            try
            {
                var users = await _adminRepository.GetUsersAsync();
                var usersDto = users.Select(u => new UserDetailsDto
                {
                    UserName = u.UserName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber
                }).ToList();

                return usersDto;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Error when getting all users (error in business logic)");
                throw new Exception("Error when trying to get all users (business logic)", ex);
            }
        }

        public async Task<IdentityResult> AddUserAsyncLogic(UserDto newUser, string role)
        {
            try
            {
                var user = _mapper.Map<EventPlannerUser>(newUser);
                return await _adminRepository.AddUserAsync(user, newUser.Password, role);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Error when adding user!");
                var error = new IdentityError() { Description = "Something went wrong when adding user." };
                return IdentityResult.Failed(error);
            }
        }
    }
}
