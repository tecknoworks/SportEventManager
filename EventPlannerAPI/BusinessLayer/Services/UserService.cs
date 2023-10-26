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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMailService _mailService;
        private readonly Serilog.ILogger _logger;
        private readonly IConfiguration _configuration;
		private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IMailService mailService, Serilog.ILogger logger, IConfiguration configuration,  IMapper mapper)
        {
            _userRepository = userRepository;
            _mailService = mailService;
            _logger = logger;
            _configuration = configuration;
			_mapper = mapper;
        }

		 public async Task<IdentityResult> CreateUserAsyncLogic(UserDto newUser)
        {
            var user = _mapper.Map<EventPlannerUser>(newUser);
            try
            {
                return await _userRepository.CreateUserAsync(user, newUser.Password);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> SendPasswordResetLinkAsync(ForgotPasswordDto forgotPasswordDto)
        {
            try 
            {
                var user = await _userRepository.FindByEmailAsync(forgotPasswordDto.Email);

                if (user == null)
                {
                    _logger.Error($"Error sending reset link: User with email {forgotPasswordDto.Email} does not exist");
                    return string.Empty;
                }

                var token = await _userRepository.GeneratePasswordResetTokenAsync(user);
                var baseUrl = _configuration[SolutionConfigurationConstants.FrontendBaseUrl];
                var resetLink = baseUrl + "/reset-password?token=" + HttpUtility.UrlEncode(token) + "&email=" + HttpUtility.UrlEncode(user.Email);

                var mail = MailRequest.ResetPassword(user.Email, user.UserName, resetLink);

                _mailService.SendEmailAsync(mail);
                return string.Empty;
            } 
            catch (Exception ex) 
            {
                _logger.Error(ex, $"Error when sending reset link for user with email {forgotPasswordDto.Email}");
                return "Something went wrong when trying to send the reset link";
            }
        }

        public async Task<IdentityResult> SetNewPasswordAsync(SetNewPasswordDto setNewPasswordDto)
        {
            try
            {
                var user = await _userRepository.FindByEmailAsync(setNewPasswordDto.Email);

                if (user == null)
                {
                    var error = new IdentityError { Description = $"User with email {setNewPasswordDto.Email} not found." };
                    return IdentityResult.Failed(error);
                }

                return await _userRepository.ResetPasswordAsync(user, setNewPasswordDto.Token, setNewPasswordDto.Password);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error when reseting password for user with email {setNewPasswordDto.Email}");
                var error = new IdentityError() { Description = "Something went wrong when resetting the password." };
                return IdentityResult.Failed(error);
            }
        }

        public async Task<UserProfileDetails?> GetUserProfileDetailsAsync(string userId)
        {
            return await _userRepository.GetUserProfileDetailsAsync(userId);
        }
    }
}
