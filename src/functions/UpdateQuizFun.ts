
import DataObject from 'src/models/DataObject';
import FuncAsync from './FuncAsync';
import { Quiz } from 'src/models/QuizModel';
import { LocalStorage } from 'quasar';
export default class UpdateQuiz implements FuncAsync<DataObject, Quiz> {
  async executeAsync(data: DataObject): Promise<Quiz> {
    try {
      if (!data || !data.quiz && data.i) {
        data.quiz = {};
        data.i=null
      }
console.log(data,1);
const allQuiz:Quiz[]=LocalStorage.getItem('quizzes') ||[]
allQuiz.splice(data.i, 1, data.quiz);

      LocalStorage.set('quizzes',allQuiz);

      // return Promise.resolve(res);
    } catch (error) {
      // Log any errors that occur during execution.
      console.error('Error - ' + JSON.stringify(error));
      // Return a rejected Promise with the error.
      return Promise.reject(error);
    }
  }
}
