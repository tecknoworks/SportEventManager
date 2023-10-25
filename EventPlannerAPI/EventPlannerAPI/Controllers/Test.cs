using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventPlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Test : ControllerBase
    {

        [HttpGet]
        public string Get()
        {
            return "You hit me!";
        }
    }
}
