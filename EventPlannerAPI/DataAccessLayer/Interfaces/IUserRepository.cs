using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRepository
    {
		Task<IdentityResult> CreateUserAsync(EventPlannerUser user, string password);
        Task<EventPlannerUser> FindByEmailAsync(string email);
        Task<string> GeneratePasswordResetTokenAsync(EventPlannerUser user);
        Task<IdentityResult> ResetPasswordAsync(EventPlannerUser user, string token, string newPassword);
        Task<bool> LogInAsync(string userIdentifier, string password);
        Task<UserProfileDetails?> GetUserProfileDetailsAsync(string userId);
    }
}
