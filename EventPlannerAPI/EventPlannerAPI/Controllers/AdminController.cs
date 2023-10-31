using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController:ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService) 
        {
            _adminService = adminService;
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("GetUsers")]
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
        public async Task<IActionResult> AddUser([FromBody] RegisterUserDto newUser, string role)
        {
            try
            {
                return Ok(await _adminService.AddUserAsyncLogic(newUser, role));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut("EditUser")]
        public async Task<IActionResult> EditUser([FromBody] EdittedUserDetails newUserEdited, string userId)
        {
            try
            {
                return Ok(await _adminService.EditUserAsyncLogic(newUserEdited, userId));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser([FromBody] string userId)
        {
            try
            {
                return Ok(await _adminService.DeleteUserAsyncLogic(userId));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("SendRecoverPasswordEmail")]
        public async Task<IActionResult> SendRecoverPasswordEmail([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                return Ok(await _adminService.SendRecoverPasswordEmailAsyncLogic(forgotPasswordDto));
            }
            catch (EventPlannerException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return Problem("Something went wrong.");
            }
        }
    }
}