﻿namespace DataAccessLayer.Models
{
    public class ChatMessage
    {
        public Guid Id { get; set; }
        public string ChatName { get; set; }
        public Guid ChatId { get; set; }
        public Guid MessageId { get; set; }
        public Message Message { get; set; }
        public ChatEvent ChatEvent { get; set; }
    }
}
