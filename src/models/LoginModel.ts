import DataObject from './DataObject';

export interface LoginModel extends DataObject {
  email: string;
  password: string;
}

