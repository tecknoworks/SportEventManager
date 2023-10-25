using BusinessLayer.Interfaces;
using BusinessLayer.DTOs;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) 
        {
            _userService = userService;
        }

        [HttpGet("/getUsers")] 
        public IActionResult GetUsers()
        {
            try
            {
                return Ok("Get users works!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("/createUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto newUser)
        {
            var result = await _userService.CreateUserAsyncLogic(newUser);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();  
        }

        [HttpPut("/updateUser/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] EventPlannerUser user)
        {
            try
            {
                return Ok("Update user works!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("/deleteUser/{id}")]
        public IActionResult DeleteUsers(int id)
        {
            try
            {
                return Ok("Delete user works!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
