using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class GetEventForBrowse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid SportTypeId { get; set; }
        public string SportTypeName { get; set; }
        public bool HasPositions { get; set; }
        public string Location { get; set; }
        public string LocationName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int MaximumParticipants { get; set; }
        public string ImageUrl { get; set; }
        public int SkillLevel { get; set; }
        public bool IsClosed { get; set; }
        public string AuthorUserId { get; set; }
        public string AuthorUserName { get; set; }
        public List<GetEventPositionDto> EventPositions { get; set; }
        public List<ParticipantDto> Participants { get; set; }
    }
}
