﻿using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace EventPlannerAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        public ChatController(IChatService chatService) 
        {
            _chatService = chatService;
        }

        [HttpGet("GetChatsDetails")]
        public async Task<ActionResult<IEnumerable<ChatDetailsDto>>> GetChatDetailsForUser()
        {
            var userId = HttpContext.User.FindFirstValue(SolutionConfigurationConstants.JwtIdClaim);
            if (userId.IsNullOrEmpty()) return Unauthorized();

            return Ok(await _chatService.GetChatDetailsForUser(userId));
        }

        [HttpGet("GetChatMessages/{chatId}")]
        public async Task<ActionResult<IEnumerable<ChatDetailsDto>>> GetChatMessages(Guid chatId)
        {
            return Ok(await _chatService.GetChatMessagesAsync(chatId));
        }
    }
}
