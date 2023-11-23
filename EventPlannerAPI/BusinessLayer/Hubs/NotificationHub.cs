using BusinessLayer.Interfaces;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;

namespace BusinessLayer.Hubs
{
    [Authorize]
    public class NotificationHub : Hub
    {
        private readonly IEventRepository _eventRepository;

        public NotificationHub(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }
        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirst(SolutionConfigurationConstants.JwtIdClaim)?.Value;

            if (userId.IsNullOrEmpty())
            {
                await Clients.Caller.SendAsync("UnauthorizedAccess", "You are not authorized.");
                await Task.Delay(500);
                Context.Abort();
            }

            var events = await _eventRepository.GetUserCreatedOrJoinedEvents(userId);
            foreach (var eventId in events)
            {
                Console.WriteLine($"user with id {userId} is in chat with id {eventId}");
                await Groups.AddToGroupAsync(Context.ConnectionId, eventId.ToString().ToUpper());
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = Context.User?.FindFirst(SolutionConfigurationConstants.JwtIdClaim)?.Value;
            var events = await _eventRepository.GetUserCreatedOrJoinedEvents(userId);

            foreach (var eventId in events)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, eventId.ToString().ToUpper());
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
