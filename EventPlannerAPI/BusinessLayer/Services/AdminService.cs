using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Web;

namespace BusinessLayer.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMailService _mailService;
        private readonly IConfiguration _configuration;
        private readonly Serilog.ILogger _logger;
        private readonly IMapper _mapper;

        public AdminService(IAdminRepository adminRepository, Serilog.ILogger logger, IMapper mapper, IMailService mailService, IConfiguration configuration)
        {
            _adminRepository = adminRepository;
            _logger = logger;
            _mapper = mapper;
            _mailService = mailService;
            _configuration = configuration;
        }

        public async Task <List<UserDetailsDto>> GetUsersAsyncLogic()
        {
            try
            {
                var users = await _adminRepository.GetUsersAsync();
                var usersDto = users.Select(u => new UserDetailsDto
                {
                    UserId = u.Id,
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
                var baseUrl = _configuration[SolutionConfigurationConstants.FrontendBaseUrl];
                var userCreated = await _adminRepository.AddUserAsync(user, newUser.Password, role);
                if (userCreated == null)
                {
                    _logger.Error("Error creating user");
                    var error = new IdentityError() { Description = "Error while creating user!" };
                    return IdentityResult.Failed(error); ;
                }

                var token = await _adminRepository.GenerateConfirmEmailTokenAsync(user);
                var confirmLink = baseUrl + "/confirm-account?token=" + HttpUtility.UrlEncode(token) + "&email=" + HttpUtility.UrlEncode(user.Email);
                var mail = MailRequest.ConfirmAccount(user.Email, user.UserName, confirmLink);

                if (userCreated != null)
                {
                    await _mailService.SendEmailAsync(mail);
                }

                return userCreated;
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
