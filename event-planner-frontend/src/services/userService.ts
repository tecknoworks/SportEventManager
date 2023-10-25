import CommonService from './commonService';

export default class UserServices extends CommonService {
  getUsers(params?: object) {
    return this.get('/getUsers', params);
  }

  createUser(data: object) {
    return this.post('/createUser', data);
  }

  updateUser(id: number, data: object) {
    return this.put(`/updateUser/${id}`, data);
  }

  deleteUser(id: number) {
    return this.delete(`/deleteUser/${id}`);
  }
}
