using BusinessLayer.DTOs;
using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface IChatRepository
    {
        Task<Message> SaveMessageAsync(Message newMessage);
        Task<string> SaveChatMessageAsync(ChatMessage newChatMessage);
        Task<string> SaveChatEventAsync(ChatEvent newChatEvent);
        Task<bool> CanUserJoinChatAsync(string userId, Guid chatId);
        Task<IEnumerable<Guid>> GetUserChatIds(string userId);
        Task<IEnumerable<ChatEvent>> GetChatDetailsForUser(string userId);
        Task<int> GetChatParticipantsCount(Guid chatId);
        Task<(IEnumerable<Message> Messages, int TotalCount)> GetChatMessagesAsync(Guid chatId, int pageNumber, int pageSize);
    }
}
