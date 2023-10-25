using DataAccessLayer.Contexts;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;


namespace DataAccessLayer.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly EventPlannerContext _eventPlannerContext;
        private readonly UserManager<EventPlannerUser> _userManager;
        private readonly SignInManager<EventPlannerUser> _signInManager;
        private readonly Serilog.ILogger _logger;

        public UserRepository(UserManager<EventPlannerUser> userManager, SignInManager<EventPlannerUser> signInManager, EventPlannerContext eventPlannerContext, Serilog.ILogger logger)
        {
            _eventPlannerContext = eventPlannerContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        public async Task<EventPlannerUser> FindByEmailAsync(string email)
        {
            try
            {
                return await _userManager.FindByEmailAsync(email);
            }
            catch (Exception ex) 
            {
                _logger.Error(ex, $"Error finding user with email {email}");
                return null;
            }
        }

        public async Task<string> GeneratePasswordResetTokenAsync(EventPlannerUser user)
        {
            try
            {
                return await _userManager.GeneratePasswordResetTokenAsync(user);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error generating password reset token for user {user.Id}");
                return string.Empty;
            }
        }

        public async Task<IdentityResult> ResetPasswordAsync(EventPlannerUser user, string token, string newPassword)
        {
            try
            {
                return await _userManager.ResetPasswordAsync(user, token, newPassword);
            }
            catch(Exception ex) 
            {
                _logger.Error(ex, $"Error when reseting password for user with username {user.UserName}");
                var error = new IdentityError() { Description = "Something went wrong when setting the new password." };
                return IdentityResult.Failed(error);
            }
        }
    }
}
