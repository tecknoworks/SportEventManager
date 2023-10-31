export type GetUserProfileDto = {
  userName?: string;
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  country?: string;
  county?: string;
  city?: string;
  profilePhoto?: string;
};

export type UpdateUserProfileDto = {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  country?: string;
  county?: string;
  city?: string;
  profilePhoto?: string;
};
