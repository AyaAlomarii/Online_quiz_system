import DataObject from './DataObject';
import { Quiz } from './QuizModel';
import UserModel from './UserModel';

 //create empty object
 export interface newQuiz {
  quiz: Quiz;
  score: number;
  answersObj:DataObject;
  quizStartedAt:number
};
export  interface infoQuiz extends DataObject{
  user:UserModel,
  quizzes:newQuiz[]
}