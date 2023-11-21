export type SportEvent = {
    id: string;
    name: string;
    description: string;
    sportTypeId: string;
    location: string;
    locationName: string;
    startDate: string;
    endDate: string;
    maximumParticipants: number;
    skillLevel: number;
    isClosed: boolean;
    authorUserId: string;
    authorUserName: string | null;
    sportType: any | null;
    eventPositions: any | null;
    participants: any | null;
};

export type Events = SportEvent[];