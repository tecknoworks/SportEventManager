using BusinessLayer.Interfaces;
using DataAccessLayer.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace EventPlannerAPI.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IEventService _eventService;
        
        public ChatHub(IEventService eventService) 
        {
            _eventService = eventService;
        }

        public Task SendMessageToEventGroup(string eventId, string message)
        {
            return Clients.Group(eventId).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            var eventId = new Guid(Context.GetHttpContext().Request.Query["eventId"]);
            var currentUserId = Context.User?.FindFirst(SolutionConfigurationConstants.JwtIdClaim)?.Value;
            if (await _eventService.IsUserParticipantOfEvent(currentUserId, eventId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, eventId.ToString());

                await base.OnConnectedAsync();

                Console.WriteLine($"User with id {currentUserId} connected to the group chat of event {eventId}");
            }
            else
            {
                await Clients.Caller.SendAsync("UnauthorizedAccess", "You are not authorized to join this event chat.");
                await Task.Delay(500);
                Context.Abort();
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string eventId = Context.GetHttpContext().Request.Query["eventId"];
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, eventId);

            await base.OnDisconnectedAsync(exception);
        }
    }

}
