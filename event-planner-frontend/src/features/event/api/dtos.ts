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

export interface CreateEventDto {
  name: string;
  description: string;
  sportTypeId: string;
  location: string;
  startDate: Date;
  endDate: Date;
  maximumParticipants: number;
  isClosed: boolean;
  skillLevel: SkillLevel;
  authorUserId: string;
  eventPositions?: UpsertEventPositionDto[];
}
