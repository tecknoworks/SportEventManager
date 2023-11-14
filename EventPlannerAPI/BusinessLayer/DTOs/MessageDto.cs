﻿namespace BusinessLayer.DTOs
{
    public class MessageDto
    {
        public string Username { get; set; }
        public string UserId { get; set; }
        public Guid ChatId { get; set; }    
        public string MessageText { get; set;}
        public string Date { get; set; }
    }
}
