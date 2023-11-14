﻿namespace BusinessLayer.DTOs
{
    public class GetMessagesResponse
    {
        public IEnumerable<MessageDto?> Messages { get; set; }
        public Guid ChatId { get; set; }
    }
}
