import Session from './Models/Session';
import Users from './Collections/Users';
import Nutrients from './Collections/NutrientData';

export default {
  session: new Session(),
  users: new Users(),
  nutrients: new Nutrients()
};
