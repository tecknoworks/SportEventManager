import UserServices from 'services/userServices';
import { useEffect } from 'react';
import CommonService from 'services/commonServices';

function App() {
  const userService: UserServices = new UserServices();

  useEffect(() => {
    userService
      .getUsers()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    let data: object = { name: 'Mirel' };
    userService
      .createUser(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    userService
      .updateUser(10, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    userService
      .deleteUser(10)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log('not ok', err.response.data);
      });
  }, []);

  return <div>Event Planner</div>;
}

export default App;
