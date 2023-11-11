using BusinessLayer.DTOs;

namespace BusinessLayer.Interfaces
{
    public interface IChatService
    {
        Task SaveMessageAsync(Guid eventId, string userId, string message);
        Task<bool> CanUserJoinChatAsync(string userId, Guid chatId);
        Task<IEnumerable<Guid>> GetUserChatIds(string userId);
        Task<IEnumerable<ChatDetailsDto>> GetChatDetailsForUser(string userId);
        Task<IEnumerable<MessageDto>> GetChatMessagesAsync(Guid chatId);
    }
}
