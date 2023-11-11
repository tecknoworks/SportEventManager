using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface IChatRepository
    {
        Task<string> SaveMessageAsync(Message newMessage);
        Task<string> SaveChatMessageAsync(ChatMessage newChatMessage);
        Task<string> SaveChatEventAsync(ChatEvent newChatEvent);
        Task<bool> CanUserJoinChatAsync(string userId, Guid chatId);
        Task<IList<Guid>> GetUserChats(string userId);
    }
}
