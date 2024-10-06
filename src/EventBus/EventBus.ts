// src/eventBus.ts
import DataObject from '@/models/DataObject';
// import {Quiz,Question} from 'src/models/QuizModel'
import { reactive } from 'vue';

const eventBus = reactive<DataObject>({
  quiz:{},
  questions: [],
  score: null,
  answersObj: {},
  quizTeacher:{}
});

export default eventBus;
