using BusinessLayer.DTOs;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Interfaces
{
    public interface IUserService
    {
		Task<IdentityResult> CreateUserAsync(RegisterUserDto user);
        Task<string> SendPasswordResetLinkAsync(ForgotPasswordDto forgotPasswordDto);
        Task<IdentityResult> SetNewPasswordAsync(SetNewPasswordDto setNewPasswordDto);
        Task<bool> LogInAsync(LogInUserDto eventPlannerUser);
        Task<GetUserProfileDetailsDto> GetUserProfileDetailsAsync(string userId);
        Task<GetUserProfileDetailsDto> CreateUserProfileDetailsAsync(string userId, UpsertUserProfileDetailsDto userDetails);
        Task<GetUserProfileDetailsDto> UpdateUserProfileDetailsAsync(string userId, UpsertUserProfileDetailsDto userDetails);
    }
}
