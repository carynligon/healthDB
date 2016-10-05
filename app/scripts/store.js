import Session from './Models/Session';
import Users from './Collections/Users';

export default {
  session: new Session(),
  users: new Users()
};
