﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class BlockUserDto
    {
        public string UserId { get; set; }
        public bool IsBlocked { get; set; }
    }
}
