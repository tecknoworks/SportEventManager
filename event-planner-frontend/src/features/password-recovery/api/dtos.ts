type SendResetLinkDto = {
  email: string;
};

type SetNewPasswordDto = {
  password: string;
  confirmPassword: string;
  email: string | null;
  token: string | null;
};

export type { SendResetLinkDto, SetNewPasswordDto };
