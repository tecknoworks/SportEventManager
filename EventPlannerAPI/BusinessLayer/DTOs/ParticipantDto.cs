using DataAccessLayer.Helpers;
using System.ComponentModel.DataAnnotations;

namespace BusinessLayer.DTOs
{
    public class ParticipantDto
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public Guid? EventPositionId { get; set; }
        [Required]
        public string PositionName { get; set; }
        [Required]
        public ParticipantStatus Status { get; set; }
    }
}
