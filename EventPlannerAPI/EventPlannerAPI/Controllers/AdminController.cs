using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using BusinessLayer.Services;
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
        public async Task<IActionResult> AddUser([FromBody] UserDto newUser, string role)
        {
            var result = await _adminService.AddUserAsyncLogic(newUser, role);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok("User created!");
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut("EditUser")]
        public async Task<IActionResult> EditUser([FromBody] EdittedUserDetails newUserEdited, string userId)
        {
            return Ok("User editted!");
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser()
        {
            return Ok("User deleted");
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("SendRecoverPasswordEmail/{id}")]
        public async Task<IActionResult> SendRecoverPasswordEmail()
        {
            return Ok("Email sent");
        }
    }
}
