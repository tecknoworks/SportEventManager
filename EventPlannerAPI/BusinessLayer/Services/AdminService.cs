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
                    PhoneNumber = u.PhoneNumber,
                    IsBlocked=u.IsBlocked
                }).ToList();

                return usersDto;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Error when getting all users (error in business logic)");
                throw new Exception("Error when trying to get all users (business logic)", ex);
            }
        }

        public async Task<IdentityResult> AddUserAsyncLogic(RegisterWithRoleDto newUser)
        {
            try
            {
                var role = newUser.Role;
                RegisterUserDto userWithoutRole = new RegisterUserDto{
                    Email = newUser.Email,
                    PhoneNumber = newUser.PhoneNumber,
                    Password = newUser.Password,
                    UserName= newUser.UserName,
                };
                var user = _mapper.Map<EventPlannerUser>(userWithoutRole);
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
                await _mailService.SendEmailAsync(mail);

                return userCreated;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Error when adding user!");
                var error = new IdentityError() { Description = "Something went wrong when adding user." };
                return IdentityResult.Failed(error);
            }
        }

        public async Task<IdentityResult> EditUserAsyncLogic(EditedUserWithIdDto newUserEdited)
        {
            try
            {
                var userId = newUserEdited.UserId;
                var user = await _adminRepository.GetUserByIdAsync(userId);
                if (user == null)
                {
                    _logger.Error($"Error finding user: User with id {userId} does not exist");
                    var error = new IdentityError() { Description = "Error while searching for user!" };
                    return IdentityResult.Failed(error);
                }

                user.UserName = newUserEdited.UserName != null ? newUserEdited.UserName : user.UserName;
                user.Email = newUserEdited.Email != null ? newUserEdited.Email : user.Email;
                user.PhoneNumber = newUserEdited.PhoneNumber != null ? newUserEdited.PhoneNumber : user.PhoneNumber;

                var result = await _adminRepository.EditUserAsync(user);
                return result;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error editing user with id {newUserEdited.UserId}");
                var error = new IdentityError() { Description = "Error while editing user!" };
                return IdentityResult.Failed(error);
            }
        }

        public async Task<IdentityResult> DeleteUserAsyncLogic(string userId)
        {
            try
            {
                var user = await _adminRepository.GetUserByIdAsync(userId);
                if (user == null)
                {
                    _logger.Error($"Error finding user: User with id {userId} does not exist");
                    var error = new IdentityError() { Description = "Error while searching for user!" };
                    return IdentityResult.Failed(error);
                }

                var result = await _adminRepository.DeleteUserAsync(user);
                return result;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error deleting user with id {userId}");
                var error = new IdentityError() { Description = "Error while deleting user! User with this id not found!" };
                return IdentityResult.Failed(error);
            }
        }

        public async Task<string> SendRecoverPasswordEmailAsyncLogic(ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                var user = await _adminRepository.FindByEmailAsync(forgotPasswordDto.Email);
                if (user == null)
                {
                    _logger.Error($"Error sending reset link: User with email {forgotPasswordDto.Email} does not exist");
                    return string.Empty;
                }

                var token = await _adminRepository.GeneratePasswordResetTokenAsync(user);

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

        public async Task<IdentityResult> BlockUserAsync(BlockUserDto blockUserDto)
        {
            try
            {
                var result = await _adminRepository.SetUserBlockStatusAsync(blockUserDto.UserId, blockUserDto.IsBlocked);

                if (!result.Succeeded)
                {
                    _logger.Error($"Failed to update block status for user with ID {blockUserDto.UserId}");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error occurred while updating block status for user with ID {blockUserDto.UserId}");
                return IdentityResult.Failed(new IdentityError { Description = $"An error occurred while updating block status for user with ID {blockUserDto.UserId}" });
            }
        }

    }
}
