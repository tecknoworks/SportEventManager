export type EventPosition = {
    availablePositions?: number | null;
    eventId?: string | null;
    positionId?: string | null;
    positionName?: string | null;
};

export type Participant = {
    eventPositionId?: string | null;
    positionName?: string | null;
    status?: number | null;
    statusName?: string | null;
    userId?: string | null;
    userName?: string | null;
};

export type EventDetails = {
    authorUserId?: string | null;
    authorUserName?: string | null;
    description?: string | null;
    endDate?: string | null;
    eventPositions?: EventPosition[] | null;
    hasPositions?: boolean | null;
    id?: string | null;
    isClosed?: boolean | null;
    location?: string | null;
    locationName?: string | null;
    maximumParticipants?: number | null;
    name?: string | null;
    participants?: Participant[] | null;
    skillLevel?: number | null;
    sportTypeId?: string | null;
    sportTypeName?: string | null;
    startDate?: string | null;
};