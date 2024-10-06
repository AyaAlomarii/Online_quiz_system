import DataObject from './DataObject';

export default interface UserModel extends DataObject {
  username:string;
  email: string;
  password: string;
  role:string
  //the role type is different
}

