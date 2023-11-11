using AutoMapper;
using AutoMapper.Configuration.Conventions;
using BusinessLayer.DTOs;
using BusinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace BusinessLayer.Services
{
    public class ChatService : IChatService
    {

        private readonly IChatRepository _chatRepository;
        private readonly IMapper _mapper;
        public ChatService(IChatRepository chatRepository, IMapper mapper)
        {
            _chatRepository = chatRepository;
            _mapper = mapper;
        }

        public async Task SaveMessageAsync(Guid chatId, string userId, string message)
        {
            var newMessage = new Message()
            {
                MessageText = message,
                UserId = userId,
                Date = DateTime.Now,
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
        public async Task<IEnumerable<Guid>> GetUserChatIds(string userId)
        {
            return await _chatRepository.GetUserChatIds(userId);
        }

        public async Task<IEnumerable<ChatDetailsDto>> GetChatDetailsForUser(string userId)
        {
            var chatEvents = await _chatRepository.GetChatDetailsForUser(userId);
            var chatDetailsDto = _mapper.Map<IEnumerable<ChatDetailsDto>>(chatEvents);
            foreach (var dto in chatDetailsDto)
            {
                var participantsCount = await _chatRepository.GetChatParticipantsCount(dto.Id);
                dto.ParticipantsCount = participantsCount;
            }
            return chatDetailsDto;
        }

        public async Task<IEnumerable<MessageDto>> GetChatMessagesAsync(Guid chatId)
        {
            var messages = await _chatRepository.GetChatMessagesAsync(chatId);

            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

    }
}
