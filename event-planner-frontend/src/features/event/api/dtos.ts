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
