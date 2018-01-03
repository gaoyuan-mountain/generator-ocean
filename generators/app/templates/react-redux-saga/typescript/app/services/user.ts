import Fetch from '../utils/fetch';

const UserService = {
  login(username, password) {
    return Fetch.post('/api/login', {
        username,
        password
      });
  }
};

export default UserService;
