using DataAccessLayer.Contexts;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccessLayer.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly EventPlannerContext _eventPlannerContext;
        private readonly UserManager<EventPlannerUser> _userManager;
        private readonly SignInManager<EventPlannerUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserRepository(EventPlannerContext eventPlannerContext, UserManager<EventPlannerUser> userManager, SignInManager<EventPlannerUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _eventPlannerContext = eventPlannerContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> CreateUserAsync (EventPlannerUser user, string password)
        {
            try
            {
                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    bool userRoleExists = await _roleManager.RoleExistsAsync("User");
                    if (!userRoleExists)
                    {
                       var roleResult = await _roleManager.CreateAsync(new IdentityRole("User"));
                       if (!roleResult.Succeeded) {
                            throw new Exception("User role does not exist and could not be created");
                       }
                    }

                    await _userManager.AddToRoleAsync(user, "User");
                }
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
