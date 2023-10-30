import { SendResetLinkDto, SetNewPasswordDto } from 'features/password-recovery/api/dtos';
import CommonService from './commonService';
import { UserDto } from 'features/registration/api/Dtos';
import { ConfirmEmailDto } from 'features/account-confirmation/api/dtos';

export default class UserService extends CommonService {
  createUser(data: UserDto) {
    return this.post('/User/CreateUser', data);
  }

  confirmEmail(data: ConfirmEmailDto) {
    return this.get('/User/ConfirmEmail', data);
  }

  sendResetLink(data: SendResetLinkDto) {
    return this.post('/User/ResetPassword', data);
  }

  setNewPassword(data: SetNewPasswordDto) {
    return this.post('/User/SetNewPassword', data);
  }
}
