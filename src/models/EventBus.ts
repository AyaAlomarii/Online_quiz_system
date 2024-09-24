// src/eventBus.ts
import Quiz from 'src/models/QuizModel'
import { reactive } from 'vue';

interface EventBus {
  quizVar: Quiz;
}

const eventBus = reactive<EventBus>({
  quizVar: {},
});

export default eventBus;
