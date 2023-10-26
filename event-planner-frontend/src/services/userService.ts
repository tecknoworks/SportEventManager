import { SendResetLinkDto, SetNewPasswordDto } from 'features/password-recovery/api/dtos';
import CommonService from './commonService';

export default class UserService extends CommonService {
  sendResetLink(data: SendResetLinkDto) {
    return this.post('/User/ResetPassword', data);
  }

  setNewPassword(data: SetNewPasswordDto) {
    return this.post('/User/SetNewPassword', data);
  }
}
