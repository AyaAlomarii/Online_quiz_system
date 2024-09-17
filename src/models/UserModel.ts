import DataObject from './DataObject';

export interface UserModel extends DataObject {
  username:string;
  email: string;
  password: string;
  role:string 
  //the role type is different 
}

