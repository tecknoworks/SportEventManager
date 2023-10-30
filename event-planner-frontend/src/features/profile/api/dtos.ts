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

export const defaultProfile: GetUserProfileDto = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: new Date(1976),
  country: '',
  county: '',
  city: '',
  profilePhoto: '',
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
