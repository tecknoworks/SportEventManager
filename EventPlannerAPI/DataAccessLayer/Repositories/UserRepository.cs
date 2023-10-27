using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer.Contexts;
using Microsoft.AspNetCore.Identity;
using DataAccessLayer.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Exceptions;

namespace DataAccessLayer.Services
{
    public class UserRepository : IUserRepository
    {
		private readonly EventPlannerContext _eventPlannerContext;
        private readonly UserManager<EventPlannerUser> _userManager;
        private readonly Serilog.ILogger _logger;
        private readonly SignInManager<EventPlannerUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserRepository(EventPlannerContext eventPlannerContext, UserManager<EventPlannerUser> userManager, Serilog.ILogger logger, SignInManager<EventPlannerUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
			_eventPlannerContext = eventPlannerContext;
            _userManager = userManager;
            _logger = logger;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

 		public async Task<IdentityResult> CreateUserAsync (EventPlannerUser user, string password)
        {
            try
            {
                var userRole = RoleConstants.USER_ROLE;
                bool userRoleExists = await _roleManager.RoleExistsAsync(userRole);
                if (!userRoleExists)
                {
 					_logger.Error("Error in user role management!");
                	var error = new IdentityError() { Description = "Error while creating user!" };
                    return IdentityResult.Failed(error);
                }

                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, userRole);
                }
                return result;

            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error while creating user!");
                var error = new IdentityError() { Description = "Error while creating user!" };
                return IdentityResult.Failed(error);
            }
        }

        public async Task<bool> LogInAsync(string userIdentifier, string password)
        {
            var userByEmailOrUsername = await _userManager.FindByEmailAsync(userIdentifier)
                            ?? await _userManager.FindByNameAsync(userIdentifier);

            if (userByEmailOrUsername == null)
            {
                _logger.Error("An error occurred while validating credentials");
                throw new BadHttpRequestException("Unable to find the user.");
            }
            return await _userManager.CheckPasswordAsync(userByEmailOrUsername, password);
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

        public async Task<EventPlannerUser> GetUserByIdAsync(string userId) 
        {
            var user = await _eventPlannerContext.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if (user == null)
            {
                throw new EventPlannerException($"User with id {userId} does not exist.");
            }
            return user;
        }

        public async Task<UserProfileDetails> GetUserProfileDetailsAsync(string userId)
        {
            var userProfile = await _eventPlannerContext.UserProfileDetails
                .Include(profile => profile.User)
                .FirstOrDefaultAsync(profile => profile.UserId == userId);

            if (userProfile == null ) 
            {
                throw new EventPlannerException($"User with id {userId} does not have an associated profile.");
            }

            return userProfile;
        }

        public async Task<bool> UserHasProfileAsync(string userId)
        {
            return await _eventPlannerContext.UserProfileDetails.AnyAsync(profile => profile.UserId == userId);
        }

        public async Task<UserProfileDetails> CreateUserProfileDetailsAsync(string userId, UserProfileDetails userDetails) 
        {
            if (await UserHasProfileAsync(userId))
            {
                throw new EventPlannerException($"User with id {userId} already has a profile.");
            }
            await _eventPlannerContext.UserProfileDetails.AddAsync(userDetails);
            await _eventPlannerContext.SaveChangesAsync();
            return userDetails;
        }

        public async Task<string> SaveChangesAsync()
        {
            await _eventPlannerContext.SaveChangesAsync();
            return "Changes saved to the database";
        }
    }
}
