﻿using System.ComponentModel.DataAnnotations;

namespace BusinessLayer.DTOs
{
    public class ConfirmEmailDto
    {

        public string Email { get; set; }
        public string Token { get; set; }
    }
}
