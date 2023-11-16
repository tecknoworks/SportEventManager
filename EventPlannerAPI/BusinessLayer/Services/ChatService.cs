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

        public async Task<MessageDto> SaveMessageAsync(Guid chatId, string userId, string message)
        {
            var newMessage = new Message()
            {
                MessageText = message,
                UserId = userId,
                Date = DateTime.Now,
            };

            var messageToReturn = await _chatRepository.SaveMessageAsync(newMessage);

            var newChatMessage = new ChatMessage()
            {
                ChatId = chatId,
                MessageId = newMessage.Id,
            };

            await _chatRepository.SaveChatMessageAsync(newChatMessage);
            return _mapper.Map<MessageDto>(messageToReturn);
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

        public async Task<(IEnumerable<MessageDto>, int TotalCount)> GetChatMessagesAsync(Guid chatId, int pageNumber, int pageSize)
        {
            var (messages, totalCount) = await _chatRepository.GetChatMessagesAsync(chatId, pageNumber, pageSize);

            return (_mapper.Map<IEnumerable<MessageDto>>(messages), totalCount);
        }

    }
}
