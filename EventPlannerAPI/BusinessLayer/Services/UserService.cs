using AutoMapper;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
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
        public UserService(IUserRepository userRepository, IMailService mailService, Serilog.ILogger logger, IConfiguration configuration, IMapper mapper)
        {
            _userRepository = userRepository;
            _mailService = mailService;
            _logger = logger;
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<IdentityResult> CreateUserAsyncLogic(RegisterUserDto newUser)
        {
            try
            {
                var user = _mapper.Map<EventPlannerUser>(newUser);
                var baseUrl = _configuration[SolutionConfigurationConstants.FrontendBaseUrl];
                var userCreated = await _userRepository.CreateUserAsync(user, newUser.Password);
                if (userCreated == null)
                {
                    _logger.Error("Error creating user");
                    var error = new IdentityError() { Description = "Error while creating user!" };
                    return IdentityResult.Failed(error); ;
                }

                var token = await _userRepository.GenerateConfirmEmailTokenAsync(user);
                var confirmLink = baseUrl + "/confirm-account?token=" + HttpUtility.UrlEncode(token) + "&email=" + HttpUtility.UrlEncode(user.Email);
                var mail = MailRequest.ConfirmAccount(user.Email, user.UserName, confirmLink);
                await _mailService.SendEmailAsync(mail);

                return userCreated;
                
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

        public async Task<IdentityResult> ConfirmEmailAsyncLogic(ConfirmEmailDto confirmEmailDto)
        {
            try
            {
                var user = await _userRepository.FindByEmailAsync(HttpUtility.UrlDecode(confirmEmailDto.Email));
                if (user == null)
                {
                    _logger.Error($"Error confirming: User with email {confirmEmailDto.Email} does not exist");
                    var error = new IdentityError() { Description = "Error while confirming user!" };
                    return IdentityResult.Failed(error);
                }

                var result = await _userRepository.ConfirmEmailAsync(user, HttpUtility.UrlDecode(confirmEmailDto.Token));
                return result;

            }
            catch (Exception ex) 
            {
                _logger.Error(ex, "Error confirm user email");
                var error = new IdentityError() { Description = "Error while confirming user email" };
                return IdentityResult.Failed(error);

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

        public async Task<bool> LogInAsync(LogInUserDto userDto)
        {
            try
            {
                return await _userRepository.LogInAsync(userDto.UserIdentifier, userDto.Password);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "An error occurred while logging in");
                throw;
            }
        }

        public async Task<GetUserProfileDetailsDto> GetUserProfileDetailsAsync(string userId)
        {
            try
            {
                return _mapper.Map<GetUserProfileDetailsDto>(await _userRepository.GetUserProfileDetailsAsync(userId));
            }
            catch(Exception ex) 
            {
                _logger.Error(ex, $"Something went wrong when trying to retrieve user with id {userId}");
                throw;
            }
        }

        public async Task<GetUserProfileDetailsDto> UpdateUserProfileDetailsAsync(string userId, UpsertUserProfileDetailsDto newUserDetails)
        {
            try
            {
                var detailsToUpdate = await _userRepository.GetUserProfileDetailsAsync(userId);
                _mapper.Map(newUserDetails, detailsToUpdate);
                await _userRepository.SaveChangesAsync();
                return _mapper.Map<GetUserProfileDetailsDto>(detailsToUpdate);
            }
            catch (Exception ex) 
            {
                _logger.Error(ex, $"Something went wrong while updating user profile for user with id ${userId}");
                throw;
            }
        }
        public async Task<EventPlannerUser> GetUserByIdentifier(string userIdentifier)
        {
            try
            {
                return await _userRepository.GetUserByIdentifier(userIdentifier);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "An error occurred while getting the user");
                throw;
            }
        }

        public async Task<IList<string>> GetRolesAsync(EventPlannerUser user)
        {
            return await _userRepository.GetRolesAsync(user);
        }

        public async Task<IEnumerable<GetEventWithDetailsDto>> GetJoinedEventsAsync(string userId)
        {
            try
            {
               return _mapper.Map<IEnumerable<GetEventWithDetailsDto>>(await _userRepository.GetJoinedEventsAsync(userId));
            }catch(Exception ex)
            {
                _logger.Error(ex, $"Something went wrong while retrieving events for user with ID {userId}");
                throw;
            }
        }

        public async Task<double> GetAverageRatingForUserAsync(string userId)
        {
            try
            {
                return await _userRepository.GetAverageRatingForUser(userId);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"An unexpected error occurred while getting the average rating for user with id {userId}.");
                throw;
            }
        }
    }
}
