import DataObject from 'src/models/DataObject';
import FuncAsync from './FuncAsync';
import { LocalStorage } from 'quasar';
import { Quiz } from '@/models/QuizModel';

export default class GetAllQuizzes
  implements FuncAsync<DataObject, DataObject>
{
  async executeAsync(options?: DataObject): Promise<DataObject> {
    try {
      if (!options) {
        options = {};
      }
      const allQuizzes = (LocalStorage.getItem('quizzes') || []) as Quiz[];
      if (allQuizzes) {

        return Promise.resolve(allQuizzes);
      } else {
        console.log('no data');

        return Promise.resolve([]);
      }
    } catch (error) {
      // Log any errors that occur during execution.
      console.error('Error - ' + JSON.stringify(error));
      // Return a rejected Promise with the error.
      return Promise.reject(error);
    }
  }
}
