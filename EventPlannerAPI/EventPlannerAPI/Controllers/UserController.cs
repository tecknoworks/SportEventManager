using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private IUserLogicService _userLogicService;

        public UserController(IUserLogicService userLogicService)
        {
            this._userLogicService = userLogicService;
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody]LogInUserDto logInUserDto)
        {
            var result = await _userLogicService.LogIn(logInUserDto);

            if (!result) return BadRequest("Invalid login attempt.");

            return Ok("token");
        }











        [HttpPost("/createUser")]
        public IActionResult CreateUser([FromBody] EventPlannerUser user)
        {
            try
            {
                return Ok("Create user works!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
