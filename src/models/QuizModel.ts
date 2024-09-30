import DataObject from './DataObject';

export interface Question {
  question: string;
  multipleChoices: boolean;
  options: {
    text: string;
    correct: boolean;
  };
}

export interface Quiz extends DataObject {
  id: number;
  date: string;
  description: string;
  name: string;
  teacher: string;
  points: number;
  students: number;
  start: string;
  end: string;
  status: string;
  questions: Question[];
}

/* interface Question {

question:string;
multipleChoices: boolean;
options: {
  text: string;
  correct: boolean;
};

}


interface Quiz {
id: number;
date: string;
description: string;
name: string;
teacher: string;
points: number;
students: number;
start: string;
end: string;
status: string;
questions:Question[]
} */
