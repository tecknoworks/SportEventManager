namespace BusinessLayer.Interfaces
{
    public interface IChatService
    {
        Task SaveMessageAsync(Guid eventId, string userId, string message);
        Task<bool> CanUserJoinChatAsync(string userId, Guid chatId);
        Task<IList<Guid>> GetUserChats(string userId);
    }
}
