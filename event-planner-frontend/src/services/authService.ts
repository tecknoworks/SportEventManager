import { UserDto } from 'features/registration/api/Dtos';
import CommonService from './commonServices';

const service: CommonService = new CommonService();

const register = (data: UserDto) => {
  service
    .post('/createUser', data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

const authService = {
  register,
};

export default authService;
