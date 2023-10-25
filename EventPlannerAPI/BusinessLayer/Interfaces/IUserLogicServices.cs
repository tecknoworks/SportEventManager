﻿using BusinessLayer.DTOs;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IUserLogicServices
    {
        Task<IdentityResult> CreateUserAsyncLogic(UserDto user);
    }
}