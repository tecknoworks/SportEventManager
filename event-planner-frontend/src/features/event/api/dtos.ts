import { ParticipantStatus } from 'features/event-users/api/dtos';
import { SkillLevel } from './models';

export interface GetSportTypesDto {
  id: string;
  name: string;
  hasPositions: boolean;
}

export interface GetPositionForSportTypeDto {
  id: string;
  sportTypeId: string;
  name: string;
}

export interface UpsertEventPositionDto {
  positionId: string;
  availablePositions: number;
}
export interface GetEventPositionDto {
  eventId: string;
  positionId: string;
  positionName: string;
  availablePositions: number;
}

export interface CreateEventDto {
  name: string;
  description: string;
  sportTypeId: string;
  location: string;
  locationName: string;
  startDate: Date;
  endDate: Date;
  maximumParticipants: number;
  isClosed: boolean;
  skillLevel: SkillLevel;
  authorUserId: string;
  eventPositions?: UpsertEventPositionDto[];
}

export interface ParticipantDto {
  userId: string;
  userName: string;
  eventPositionId?: string;
  positionName: string;
  status: ParticipantStatus;
}

export interface GetEventDto {
  id: string;
  name: string;
  description: string;
  sportTypeId: string;
  sportTypeName: string;
  hasPositions: boolean;
  location: string;
  locationName: string;
  startDate: Date;
  endDate: Date;
  maximumParticipants: number;
  skillLevel: number;
  isClosed: boolean;
  authorUserId: string;
  authorUserName: string;
  eventPositions: GetEventPositionDto[];
  participants: ParticipantDto[];
}

export interface UpdateEventDto {
  name: string;
  description?: string;
  location?: string;
  locationName?: string;
  startDate?: Date;
  endDate?: Date;
  maximumParticipants?: number;
  skillLevel?: number;
  isClosed?: boolean;
  eventPositions?: UpsertEventPositionDto[];
}

export interface CloseEventDto {
  eventId: string;
}
