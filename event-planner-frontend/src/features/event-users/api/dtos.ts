export enum ParticipantStatus {
  Pending = 0,
  Accepted = 1,
}

export type ChangeStatusDto = {
  userId: string | undefined;
  eventId: string | undefined;
  status: ParticipantStatus;
};

export type DeleteParticipantDto = {
  userId: string | undefined;
  eventId: string | undefined;
};
