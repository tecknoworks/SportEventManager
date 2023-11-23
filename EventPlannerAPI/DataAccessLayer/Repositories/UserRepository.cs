using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer.Contexts;
using Microsoft.AspNetCore.Identity;
using DataAccessLayer.Helpers;
using Azure.Core;
using System.Security.Policy;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Exceptions;

namespace DataAccessLayer.Repositories
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

        public async Task<EventPlannerUser> GetUserByIdentifier(string userIdentifier)
        {
            var userByEmailOrUsername = await _userManager.FindByEmailAsync(userIdentifier)
                           ?? await _userManager.FindByNameAsync(userIdentifier);

            if (userByEmailOrUsername == null)
            {
                _logger.Error("An error occurred while validating credentials");
                throw new BadHttpRequestException("Unable to find the user.");
            }
            return userByEmailOrUsername;
        }

        public async Task<IList<string>> GetRolesAsync(EventPlannerUser user)
        {
            return await _userManager.GetRolesAsync(user);
        }
       
        public async Task<IdentityResult> CreateUserAsync(EventPlannerUser user, string password)
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
                return false;
            }
           
            if (userByEmailOrUsername.IsBlocked)
            {
                _logger.Error($"User with identifier {userIdentifier} is blocked.");
                throw new EventPlannerException($"Access denied. User with identifier {userIdentifier} is blocked.");
            }


            if (!userByEmailOrUsername.EmailConfirmed) 
            {
                throw new EventPlannerException("Account is not confirmed.");
            }

            return await _userManager.CheckPasswordAsync(userByEmailOrUsername, password);
        }

        public async Task<IdentityResult> ConfirmEmailAsync(EventPlannerUser user, string token)
        {
            try
            {
                 return await _userManager.ConfirmEmailAsync(user, token);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error confirming user with email {user.Email}");
                var error = new IdentityError() { Description = "Error while confirming user!" };
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

        public async Task<bool> UserExistsAsync(string userId)
        {
            return await _eventPlannerContext.Users.AnyAsync(user => user.Id == userId);
        }

        public async Task<IEnumerable<Event>> GetJoinedEventsAsync(string userId)
        {
            var userExists = await UserExistsAsync(userId);
            if (!userExists)
            {
                _logger.Error($"User with id {userId} does not exist.");
                throw new EventPlannerException($"User with id {userId} does not exist.");
            }

            var events = await _eventPlannerContext.Participants
                 .Where(p => p.UserId == userId)
                 .Include(p => p.Event)
                     .ThenInclude(e => e.Author)
                 .Include(p => p.Event)
                     .ThenInclude(e => e.Participants)
                         .ThenInclude(part => part.User)
                            .ThenInclude(user => user.Profile) 
                 .Include(p => p.Event)
                     .ThenInclude(e => e.EventPositions)
                         .ThenInclude(ep => ep.Position)
                 .Select(p => p.Event)
                 .ToListAsync();
            return events;
        }

        public async Task<double> GetAverageRatingForUser(string userId)
        {
            var reviews = await _eventPlannerContext.Reviews
                            .Where(r => r.UserId == userId)
                            .ToListAsync();

            if (!reviews.Any())
            {
                throw new EventPlannerException($"No reviews found for user with id {userId}.");
            }

            double averageRating = reviews.Average(r => r.Rating);

            return averageRating;
        }

    }
}
