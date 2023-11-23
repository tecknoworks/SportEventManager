using DataAccessLayer.Contexts;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Migrations;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly EventPlannerContext _eventPlannerContext;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<EventPlannerUser> _userManager;
        private readonly Serilog.ILogger _logger;
        public AdminRepository(EventPlannerContext eventPlannerContext, UserManager<EventPlannerUser> userManager, Serilog.ILogger logger, RoleManager<IdentityRole> roleManager) 
        { 
            _eventPlannerContext = eventPlannerContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        public async Task<List<EventPlannerUser>> GetUsersAsync()
        {
            try
            {
                return await _eventPlannerContext.Users.ToListAsync<EventPlannerUser>();
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Error when getting all users");
                throw new Exception("Error when trying to get all users", ex);
            }
        }

        public async Task<IdentityResult> AddUserAsync(EventPlannerUser user, string password, RoleType role)
        {
            try
            {
                var roleToCheck = role.ToString();
                bool userRoleExists = await _roleManager.RoleExistsAsync(roleToCheck);
                if (!userRoleExists)
                {
                    _logger.Error("Error in user role management!");
                    var error = new IdentityError() { Description = "Error while creating user!" };
                    return IdentityResult.Failed(error);
                }

                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, roleToCheck);
                    await CreateUserProfileDetailsAsync(user.Id, new UserProfileDetails()
                    {
                        FirstName = "",
                        LastName = "",
                        DateOfBirth = new DateTime(),
                        Country = "",
                        County = "",
                        City = "",
                        ProfilePhoto = "",
                        UserId = user.Id,
                    });
                }
                return result;

            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error while creating user as admin!");
                var error = new IdentityError() { Description = "Error while creating user as admin!" };
                return IdentityResult.Failed(error);
            }
        }

        public async Task<string> GenerateConfirmEmailTokenAsync(EventPlannerUser user)
        {
            try
            {
                return await _userManager.GenerateEmailConfirmationTokenAsync(user).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error generating password reset token for user.");
                return string.Empty;
            }
        }

        public async Task<EventPlannerUser> GetUserByIdAsync(string userId)
        {
            var user = await _eventPlannerContext.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if (user == null)
            {
                throw new Exception($"User with id {userId} does not exist.");
            }
            return user;
        }

        public async Task<IdentityResult> EditUserAsync(EventPlannerUser user)
        {
            try
            {
                return await _userManager.UpdateAsync(user);
            }
            catch(Exception ex)
            {
                _logger.Error(ex, $"Error editing user with id {user.Id}");
                var error = new IdentityError() { Description = "Error while editing user!" };
                return IdentityResult.Failed(error);
            }
        }

        public async Task<IdentityResult> DeleteUserAsync(EventPlannerUser user)
        {
            try
            {
                return await _userManager.DeleteAsync(user);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error deleting user with id {user.Id}");
                var error = new IdentityError() { Description = "Error while deleting user!" };
                return IdentityResult.Failed(error);
            }
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

        public async Task<IdentityResult> SetUserBlockStatusAsync(string userId, bool isBlocked)
        {
            try
            {
                var user = await GetUserByIdAsync(userId);

                user.IsBlocked = isBlocked;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    _logger.Error($"Error updating block status for user with id {userId}");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error setting block status for user with id {userId}");
                return IdentityResult.Failed(new IdentityError { Description = $"Error setting block status for user with id {userId}" });
            }
        }

    }
}
