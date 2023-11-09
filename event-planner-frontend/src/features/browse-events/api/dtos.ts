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
};

export type { EventDto, SportType, FilterParams, EventsResponse };
