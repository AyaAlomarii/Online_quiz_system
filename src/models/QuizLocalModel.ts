import DataObject from './DataObject';
import { Quiz } from './QuizModel';
import UserModel from './UserModel';

 //create empty object
 export interface newQuiz {
  quiz: Quiz;
  score: number;
  answersObj:DataObject;
};
export  interface infoQuiz extends DataObject{
  user:UserModel,
  userStartTime:string,
  quizzes:newQuiz[]
}