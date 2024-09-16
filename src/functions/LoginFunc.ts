import DataObject from 'src/models/DataObject';
import ApiPath from 'src/util/ApiPath';
import ApiUtil from 'src/util/ApiUtil';
import FuncAsync from './FuncAsync';
import LoginModel from '../models/LoginModel'
export default class CountriesFun implements FuncAsync<DataObject, LoginModel> {
  async executeAsync(options?: DataObject): Promise<LoginModel> {
    try {
      if (!options) {
        options = {};
      }
      const url = ApiPath.COUNTRIES_GET; //edit this url should be in env file
      const res = await ApiUtil.post<LoginModel>(url, {
        ...options,
      });
      return Promise.resolve(res);
    } catch (error) {
      // Log any errors that occur during execution.
      console.error('Error - ' + JSON.stringify(error));
      // Return a rejected Promise with the error.
      return Promise.reject(error);
    }
  }
}
