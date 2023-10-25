using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using BusinessLayer.Models;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System.Net.Http.Headers;

namespace BusinessLayer.Services
{
    public class UserService : IUserService
    {
        private readonly DataAccessLayer.Interfaces.IUserRepository _userService;
        private readonly IMailService _mailService;
        private readonly IMapper _mapper;
        private readonly Serilog.ILogger _logger;
        public UserService(DataAccessLayer.Interfaces.IUserRepository userService, IMailService mailService, IMapper mapper, Serilog.ILogger logger)
        {
            _userService = userService;
            _mailService = mailService;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<string> SendPasswordResetLinkAsync(ForgotPasswordDto forgotPasswordDto)
        {
            try 
            {
                var user = await _userService.FindByEmailAsync(forgotPasswordDto.Email);

                if (user == null)
                {
                    _logger.Error($"Error sending reset link: User with email {forgotPasswordDto.Email} does not exist");
                    return string.Empty;
                }

                var token = await _userService.GeneratePasswordResetTokenAsync(user);
                var resetLink = "https://eventplanner.com/reset-password?token=" + token;

                var mail = MailRequest.ResetPassword(user.Email, user.UserName, resetLink);

                await _mailService.SendEmailAsync(mail);
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
                var user = await _userService.FindByEmailAsync(setNewPasswordDto.Email);

                if (user == null)
                {
                    var error = new IdentityError { Description = $"User with email {setNewPasswordDto.Email} not found." };
                    return IdentityResult.Failed(error);
                }

                return await _userService.ResetPasswordAsync(user, setNewPasswordDto.Token, setNewPasswordDto.Password);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error when reseting password for user with email {setNewPasswordDto.Email}");
                var error = new IdentityError() { Description = "Something went wrong when resetting the password." };
                return IdentityResult.Failed(error);
            }
        }
    }
}
