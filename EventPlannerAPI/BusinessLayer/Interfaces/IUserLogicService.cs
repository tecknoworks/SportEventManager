using BusinessLayer.DTOs;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IUserLogicService
    {
        public Task<bool> LogIn(LogInUserDto eventPlannerUser);
    }
}
