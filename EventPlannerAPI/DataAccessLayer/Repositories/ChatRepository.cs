using DataAccessLayer.Contexts;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace DataAccessLayer.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly EventPlannerContext _eventPlannerContext;
        public ChatRepository(EventPlannerContext eventPlannerContext) 
        {
            _eventPlannerContext = eventPlannerContext;
        }

        public async Task<string> SaveMessageAsync(Message newMessage)
        {
            await _eventPlannerContext.Messages.AddAsync(newMessage);
            await _eventPlannerContext.SaveChangesAsync();
            return "Message saved";
        }

        public async Task<string> SaveChatMessageAsync(ChatMessage newChatMessage)
        {
            await _eventPlannerContext.ChatMessages.AddAsync(newChatMessage);
            await _eventPlannerContext.SaveChangesAsync();
            return "Chat message saved";
        }

        public async Task<string> SaveChatEventAsync(ChatEvent newChatEvent)
        {
            await _eventPlannerContext.ChatEvents.AddAsync(newChatEvent);
            await _eventPlannerContext.SaveChangesAsync();
            return "Event chat saved";
        }
        public async Task<bool> CanUserJoinChatAsync(string userId, Guid chatId)
        {
            return await _eventPlannerContext.Participants.AnyAsync(participant => participant.UserId == userId && participant.Event.ChatEvent.Id == chatId);
        }
        public async Task<IList<Guid>> GetUserChats(string userId)
        {
           return   await _eventPlannerContext.Participants
                            .Include(participant => participant.Event)
                                .ThenInclude(evnt => evnt.ChatEvent)
                            .Where(participant => participant.UserId == userId)
                            .Select(participant => participant.Event.ChatEvent.Id)
                            .ToListAsync();
        }
    }
}
