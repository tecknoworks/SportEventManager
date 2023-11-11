using BusinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace BusinessLayer.Services
{
    public class ChatService : IChatService
    {

        private readonly IChatRepository _chatRepository;
        public ChatService(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public async Task SaveMessageAsync(Guid chatId, string userId, string message)
        {
            var newMessage = new Message()
            {
                MessageText = message,
                UserId = userId,
            };

            await _chatRepository.SaveMessageAsync(newMessage);

            var newChatMessage = new ChatMessage()
            {
                ChatId = chatId,
                MessageId = newMessage.Id,
            };

            await _chatRepository.SaveChatMessageAsync(newChatMessage);
        }

        public async Task<IEnumerable<ChatMessage>> GetMessageHistoryAsync(string eventId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CanUserJoinChatAsync(string userId, Guid chatId)
        {
            return await _chatRepository.CanUserJoinChatAsync(userId, chatId);  
        }
        public async Task<IList<Guid>> GetUserChats(string userId)
        {
            return await _chatRepository.GetUserChats(userId);
        }

    }
}
