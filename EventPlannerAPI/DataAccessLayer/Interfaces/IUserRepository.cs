﻿using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRepository
    {
        Task<EventPlannerUser> FindByEmailAsync(string email);
        Task<string> GeneratePasswordResetTokenAsync(EventPlannerUser user);
        Task<IdentityResult> ResetPasswordAsync(EventPlannerUser user, string token, string newPassword);
    }
}
