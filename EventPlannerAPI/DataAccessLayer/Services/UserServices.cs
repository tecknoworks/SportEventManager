using DataAccessLayer.Contexts;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
namespace DataAccessLayer.Services
{
    public class UserServices: IUserServices
    {
        private readonly EventPlannerContext _eventPlannerContext;
        private readonly UserManager<EventPlannerUser> _userManager;
        private readonly SignInManager<EventPlannerUser> _signInManager;

        public UserServices(EventPlannerContext eventPlannerContext, UserManager<EventPlannerUser> userManager, SignInManager<EventPlannerUser> signInManager)
        {
            _eventPlannerContext = eventPlannerContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> CreateUserAsync (EventPlannerUser user, string password)
        {
            try
            {
                var result = await _userManager.CreateAsync(user, password);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured in Data access layer on create user");
            }
        }
    }
}
