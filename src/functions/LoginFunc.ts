import DataObject from 'src/models/DataObject';
import FuncAsync from './FuncAsync';
import LoginModel from '../models/LoginModel'
import { LocalStorage } from 'quasar';
export default class LoginFun implements FuncAsync<DataObject, LoginModel> {
  async executeAsync(data?: DataObject): Promise<LoginModel> {
    try {
      if (!data) {
        data = {};
      }
const users = LocalStorage.getItem('users')
return users
    } catch (error) {
      // Log any errors that occur during execution.
      console.error('Error - ' + JSON.stringify(error));
      // Return a rejected Promise with the error.
      return Promise.reject(error);
    }
  }
}
