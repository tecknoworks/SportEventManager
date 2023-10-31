﻿using BusinessLayer.DTOs;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsyncLogic(RegisterUserDto user);
        Task<IdentityResult> ConfirmEmailAsyncLogic(ConfirmEmailDto confirmEmailDto);
        Task<string> SendPasswordResetLinkAsync(ForgotPasswordDto forgotPasswordDto);
        Task<IdentityResult> SetNewPasswordAsync(SetNewPasswordDto setNewPasswordDto);
        Task<bool> LogInAsync(LogInUserDto eventPlannerUser);
        Task<GetUserProfileDetailsDto> GetUserProfileDetailsAsync(string userId);
        Task<GetUserProfileDetailsDto> CreateUserProfileDetailsAsync(string userId, UpsertUserProfileDetailsDto userDetails);
        Task<GetUserProfileDetailsDto> UpdateUserProfileDetailsAsync(string userId, UpsertUserProfileDetailsDto newUserDetails);
    }
}
