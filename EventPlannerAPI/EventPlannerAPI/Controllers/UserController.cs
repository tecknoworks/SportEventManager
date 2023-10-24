using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController() { }

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
