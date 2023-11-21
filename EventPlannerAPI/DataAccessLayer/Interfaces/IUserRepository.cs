using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRepository
    {
		Task<IdentityResult> CreateUserAsync(EventPlannerUser user, string password);
        Task<IdentityResult> ConfirmEmailAsync(EventPlannerUser user, string token);
        Task<string> GenerateConfirmEmailTokenAsync(EventPlannerUser user);
        Task<EventPlannerUser> FindByEmailAsync(string email);
        Task<string> GeneratePasswordResetTokenAsync(EventPlannerUser user);
        Task<IdentityResult> ResetPasswordAsync(EventPlannerUser user, string token, string newPassword);
        Task<bool> LogInAsync(string userIdentifier, string password);
        Task<EventPlannerUser> GetUserByIdAsync(string userId);
        Task<UserProfileDetails> GetUserProfileDetailsAsync(string userId);
        Task<UserProfileDetails> CreateUserProfileDetailsAsync(string userId, UserProfileDetails userDetails);
        Task<bool> UserHasProfileAsync(string userId);  
        Task<string> SaveChangesAsync();
 		Task<IList<string>> GetRolesAsync(EventPlannerUser user);
        Task<EventPlannerUser> GetUserByIdentifier(string userIdentifier);
        Task<bool> UserExistsAsync(string userId);
        Task<IEnumerable<Event>> GetJoinedEventsAsync(string userId);
        Task<double> GetAverageRatingForUser(string userId);
    }
}
