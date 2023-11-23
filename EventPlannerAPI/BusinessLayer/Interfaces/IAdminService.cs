using BusinessLayer.DTOs;
using DataAccessLayer.Helpers;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IAdminService
    {
        Task<List<UserDetailsDto>> GetUsersAsyncLogic();
        Task<IdentityResult> AddUserAsyncLogic(RegisterWithRoleDto newUser);
        Task<IdentityResult> EditUserAsyncLogic(EditedUserWithIdDto newUserEdited);
        Task<IdentityResult> DeleteUserAsyncLogic(string userId);
        Task<string> SendRecoverPasswordEmailAsyncLogic(ForgotPasswordDto forgotPasswordDto);
        Task<IdentityResult> BlockUserAsync(BlockUserDto blockUserDto);
    }
}
