using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using BusinessLayer.Services;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = RoleConstants.ADMIN_ROLE)]
    public class AdminController:ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService) 
        {
            _adminService = adminService;
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet("GetUsers")]
        public async Task<IList<UserDetailsDto>> GetUsers()
        {
            try
            {
                return await _adminService.GetUsersAsyncLogic();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody] RegisterWithRoleDto newUser)
        {
            var result = await _adminService.AddUserAsyncLogic(newUser);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok("User created!");
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut("EditUser")]
        public async Task<IActionResult> EditUser([FromBody] EditedUserWithIdDto newUserEdited)
        {
            var result = await _adminService.EditUserAsyncLogic(newUserEdited);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok("User edited!");
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpDelete("DeleteUser")]

        public async Task<IActionResult> DeleteUser(string userId)
        {
            var result = await _adminService.DeleteUserAsyncLogic(userId);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok("User deleted!");
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("SendRecoverPasswordEmail")]
        public async Task<IActionResult> SendRecoverPasswordEmail([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            var errorMessage = await _adminService.SendRecoverPasswordEmailAsyncLogic(forgotPasswordDto);
            if (!errorMessage.IsNullOrEmpty()) return BadRequest(errorMessage);
            return Ok("If there's an account associated with this email address, we've sent instructions for resetting the password.");
        }


        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPatch("BlockUser")]
        public async Task<IActionResult> BlockUser([FromBody] BlockUserDto blockUserDto)
        {
            if (blockUserDto == null || string.IsNullOrEmpty(blockUserDto.UserId))
            {
                return BadRequest("Invalid user data.");
            }

            try
            {
                var result = await _adminService.BlockUserAsync(blockUserDto);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                return Ok($"User {(blockUserDto.IsBlocked ? "blocked" : "unblocked")} successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

    }
}