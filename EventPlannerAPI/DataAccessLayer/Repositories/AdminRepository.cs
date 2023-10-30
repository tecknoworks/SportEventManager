using DataAccessLayer.Contexts;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly EventPlannerContext _eventPlannerContext;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<EventPlannerUser> _userManager;
        private readonly Serilog.ILogger _logger;
        public AdminRepository(EventPlannerContext eventPlannerContext, UserManager<EventPlannerUser> userManager, Serilog.ILogger logger, RoleManager<IdentityRole> roleManager) 
        { 
            _eventPlannerContext = eventPlannerContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        public async Task<List<EventPlannerUser>> GetUsersAsync()
        {
            try
            {
                return await _eventPlannerContext.Users.ToListAsync<EventPlannerUser>();
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Error when getting all users");
                throw new Exception("Error when trying to get all users", ex);
            }
        }

        public async Task<IdentityResult> AddUserAsync(EventPlannerUser user, string password, string role)
        {
            try
            {
                var userRole = RoleConstants.ADMIN_ROLE;
                if (role == RoleConstants.USER_ROLE)
                {
                   userRole = RoleConstants.USER_ROLE;
                }

                bool userRoleExists = await _roleManager.RoleExistsAsync(userRole);
                if (!userRoleExists)
                {
                    _logger.Error("Error in user role management!");
                    var error = new IdentityError() { Description = "Error while creating user as admin!" };
                    return IdentityResult.Failed(error);
                }

                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, userRole);
                }
                return result;

            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"Error while creating user as admin!");
                var error = new IdentityError() { Description = "Error while creating user as admin!" };
                return IdentityResult.Failed(error);
            }
        }


    }
}
