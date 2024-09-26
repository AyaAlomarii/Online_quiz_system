// src/eventBus.ts
import DataObject from '@/models/DataObject';
// import {Quiz,Question} from 'src/models/QuizModel'
import { reactive } from 'vue';

const eventBus = reactive<DataObject>({
  quizTitle:'',
  questions: [],
  score: null,
  answersObj: {},
});

export default eventBus;
