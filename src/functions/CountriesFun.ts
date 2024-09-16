import DataObject from 'src/models/DataObject';
import ApiPath from 'src/util/ApiPath';
import ApiUtil from 'src/util/ApiUtil';
import FuncAsync from './FuncAsync';
import Country from '../models/Country';
export default class CountriesFun implements FuncAsync<DataObject, Country[]> {
  async executeAsync(options?: DataObject): Promise<Country[]> {
    try {
      if (!options) {
        options = {};
      }
      const url = ApiPath.COUNTRIES_GET; //edit this url should be in env file
      const res = await ApiUtil.get<Country[]>(url);
      return Promise.resolve(res);
    } catch (error) {
      // Log any errors that occur during execution.
      console.error('Error - ' + JSON.stringify(error));
      // Return a rejected Promise with the error.
      return Promise.reject(error);
    }
  }
}
