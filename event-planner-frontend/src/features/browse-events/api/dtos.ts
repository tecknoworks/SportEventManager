import { Participant } from "features/details-page/store/api/dtos";

type EventDto = {
  id: string;
  name: string;
  description: string;
  sportTypeId: string;
  sportTypeName: string;
  location: string;
  locationName: string;
  startDate: Date;
  endDate: Date;
  maximumParticipants: number;
  skillLevel: number;
  isClosed: boolean;
  authorUserId: string;
  authorUserName: string;
  eventPositions: EventExtendedPosition[];
  imageUrl: string;
  participants: Participant[]  ;
};

export type EventExtendedPosition = {
  eventId: string;
  positionId: string;
  positionName: string;
  availablePositions: number;
};

type EventsResponse = {
  totalEvents: number;
  events: EventDto[];
};

type SportType = {
  id: string;
  name: string;
  hasPositions: boolean;
};

type FilterParams = {
  pageNumber?: number;
  pageSize?: number;
  searchData?: string;
  sportTypeId?: string;
  startDate?: Date;
  maximumDuration?: number;
  location?: string;
  authorUserName?: string;
  authorId?: string;
};

type JoinEventDto = {
  userId: string | undefined;
  eventId: string;
  eventPositionId?: string;
};

export type { EventDto, SportType, FilterParams, EventsResponse, JoinEventDto };
