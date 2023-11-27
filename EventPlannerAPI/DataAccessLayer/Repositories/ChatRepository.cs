using BusinessLayer.DTOs;
using DataAccessLayer.Contexts;
using DataAccessLayer.Helpers;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Printing;
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

        public async Task<Message> SaveMessageAsync(Message newMessage)
        {
            await _eventPlannerContext.Messages.AddAsync(newMessage);
            await _eventPlannerContext.SaveChangesAsync();

            var messageWithUser = await _eventPlannerContext.Messages
                .Include(message => message.User)
                .Include(message => message.ChatMessage)
                .FirstOrDefaultAsync(m => m.Id == newMessage.Id);
            
            return messageWithUser;
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
        public async Task<IEnumerable<Guid>> GetUserChatIds(string userId)
        {
           var result = await _eventPlannerContext.Participants
                    .Where(participant => participant.UserId == userId && participant.Status == ParticipantStatus.Accepted)
                    .Include(participant => participant.Event)
                        .ThenInclude(evnt => evnt.ChatEvent)
                    .Select(participant => participant.Event.ChatEvent.Id)
                    .ToListAsync();
            return result;
        }

        public async Task<IEnumerable<ChatEvent>> GetChatDetailsForUser(string userId)
        {
            return await _eventPlannerContext.Participants
                    .Include(participant => participant.Event)
                        .ThenInclude(evnt => evnt.ChatEvent)
                    .Where(participant => participant.UserId == userId && participant.Event.ChatEvent.IsClosed == false && participant.Status == ParticipantStatus.Accepted)
                    .Select(participant => participant.Event.ChatEvent)
                    .ToListAsync();
        }

        public async Task<int> GetChatParticipantsCount(Guid chatId)
        {
            return await _eventPlannerContext.ChatEvents
                .Where(chatEvent => chatEvent.Id == chatId)
                    .Include(chatEvent => chatEvent.Event)
                    .Select(chatEvent => chatEvent.Event.Participants.Count)
                    .FirstOrDefaultAsync();
        }

        public async Task<(IEnumerable<Message> Messages, int TotalCount)> GetChatMessagesAsync(Guid chatId, int pageNumber, int pageSize)
        {
            int skip = (pageNumber - 1) * pageSize;
            var query = _eventPlannerContext.ChatEvents
                    .Where(chatEvent => chatEvent.Id == chatId)
                    .Include(chatEvent => chatEvent.ChatMessages)
                        .ThenInclude(chatMessage => chatMessage.Message)
                            .ThenInclude(message => message.User)
                    .SelectMany(chatEvent => chatEvent.ChatMessages)
                    .Select(chatMessage => chatMessage.Message)
                    .OrderBy(message => message.Date);

            var totalCount = await query.CountAsync();
            var messages = await query.Skip(skip)
                    .Take(pageSize)
                    .ToListAsync();
            return (messages, totalCount);
        }
    }
}
