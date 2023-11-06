export interface EditUserOrAdminDto {
  userName: string;
  email: string;
  phoneNumber: string;
  userId: string;
}

export interface UserOrAdminDto {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: number | ""
}