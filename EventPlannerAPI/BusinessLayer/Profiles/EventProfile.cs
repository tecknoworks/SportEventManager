using AutoMapper;
using BusinessLayer.DTOs;
using DataAccessLayer.Models;

namespace BusinessLayer.Profiles
{
    public class EventProfile : Profile
    {
        public EventProfile() 
        {
            CreateMap<CreateEventDto, Event>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.IsClosed, opt => opt.MapFrom(src => src.IsClosed))
                .ForMember(dest => dest.Author, opt => opt.Ignore())
                .ForMember(dest => dest.SportType, opt => opt.Ignore())
                .ForMember(dest => dest.EventPositions, opt => opt.MapFrom(src => src.EventPositions))
                .ForMember(dest => dest.Participants, opt => opt.Ignore());

            CreateMap<UpsertEventPositionDto, EventPosition>()
                .ForMember(dest => dest.EventId, opt => opt.Ignore())
                .ForMember(dest => dest.Position, opt => opt.Ignore())
                .ForMember(dest => dest.Event, opt => opt.Ignore());

            CreateMap<Event, GetEventWithDetailsDto>()
                .ForMember(dest => dest.SportTypeName, opt => opt.MapFrom(src => src.SportType.Name))
                .ForMember(dest => dest.AuthorUserName, opt => opt.MapFrom(src => src.Author.UserName))
                .ForMember(dest => dest.EventPositions, opt => opt.MapFrom(src => src.EventPositions))
                .ForMember(dest => dest.HasPositions, opt => opt.MapFrom(src => src.SportType.HasPositions))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.SportType.ImageUrl));

            CreateMap<EventPosition, GetEventPositionDto>()
                .ForMember(dest => dest.PositionId, opt => opt.MapFrom(src => src.PositionId))
                .ForMember(dest => dest.PositionName, opt => opt.MapFrom(src => src.Position.Name));

            CreateMap<Participant, ParticipantDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.PositionName, opt => opt.MapFrom(src => src.EventPosition.Position.Name));

            CreateMap<UpdatedParticipant, Participant>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.EventId, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<SportType, SportTypeDto>();
            CreateMap<Position, PositionDto>();

            CreateMap<Event, GetEventDto>()
                .ForMember(dest => dest.SportTypeName, opt => opt.MapFrom(src => src.SportType.Name))
                .ForMember(dest => dest.AuthorUserName, opt => opt.MapFrom(src => src.Author.UserName));

            CreateMap<UpdateEventDto, Event>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.SportTypeId, opt => opt.Ignore())
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.LocationName, opt => opt.MapFrom(src => src.LocationName))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate))
                .ForMember(dest => dest.MaximumParticipants, opt => opt.MapFrom(src => src.MaximumParticipants))
                .ForMember(dest => dest.SkillLevel, opt => opt.MapFrom(src => src.SkillLevel))
                .ForMember(dest => dest.IsClosed, opt => opt.MapFrom(src => src.IsClosed))
                .ForMember(dest => dest.AuthorUserId, opt => opt.Ignore())
                .ForMember(dest => dest.Author, opt => opt.Ignore())
                .ForMember(dest => dest.SportType, opt => opt.Ignore())
                .ForMember(dest => dest.EventPositions, opt => opt.MapFrom(src => src.EventPositions));

            CreateMap<Event, GetEventForBrowse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SportTypeName, opt => opt.MapFrom(src => src.SportType.Name))
                .ForMember(dest => dest.EventPositions, opt => opt.MapFrom(src => src.EventPositions))
                .ForMember(dest => dest.HasPositions, opt => opt.MapFrom(src => src.SportType.HasPositions))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.SportType.ImageUrl));

            CreateMap<PaginatedResult<Event>, PaginatedResult<GetEventForBrowse>>()
                .ForMember(dest => dest.TotalEvents, opt => opt.MapFrom(src => src.TotalEvents))
                .ForMember(dest => dest.Events, opt => opt.MapFrom(src => src.Events));

        }
    }
}
