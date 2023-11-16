using DataAccessLayer.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class UpdatedParticipant
    {
        public string UserId { get; set; }
        public Guid EventId { get; set; }
        public ParticipantStatus Status { get; set;}
    }
}
