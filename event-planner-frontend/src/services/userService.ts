import { SendResetLinkDto, SetNewPasswordDto } from 'features/password-recovery/api/dtos';
import CommonService from './commonService';
import { UserDto } from 'features/registration/api/Dtos';
import { UpdateUserProfileDto } from 'features/profile/api/dtos';
import { ConfirmEmailDto } from 'features/account-confirmation/api/dtos';
import { LogInDto } from 'features/login/api/dtos';

const MOCK_USER_ID = '5a56cef4-71b6-4301-a69b-f0a60ed5bcdf'; //TODO: get user id from JWT token

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

  getUserProfile(userId: string) {
    return this.get('/User/GetUserProfileDetails/' + userId);
  }

  updateUserProfile(data: UpdateUserProfileDto) {
    return this.put('/User/UpdateUserProfileDetails/' + MOCK_USER_ID, data);
  }

  logInUser(data: LogInDto) {
    return this.post('/User/Login', data);
  }

  getAllUsers() {
    return this.get('/Admin/GetUsers')
  }
}
