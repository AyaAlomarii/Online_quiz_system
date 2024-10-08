<template>
  <div>
    <!-- {{ newData }} -->
    <div
      class="text-h4 q-pt-md row justify-center question-grey-text"
      v-if="quiz"
    >
      {{ quiz.name }}
    </div>

    <QuestionComp :quiz="quiz" />
  </div>
</template>
<script setup lang="ts">
import QuestionComp from 'components/student/QuestionComp.vue';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import Quiz from 'src/models/QuizModel';
import GetAllQuizzes from 'src/functions/GetAllQuizzesFun';

// import eventBus from 'src/EventBus/EventBus'

const route = useRoute();
const quiz = ref<Quiz>();
const quizzes = ref<Quiz[]>([]);

//  const newData=computed(()=>{
//   return eventBus.quizVar
// })
onMounted(async() => {
  const quizzesTwo = new GetAllQuizzes();
  quizzes.value = (await quizzesTwo.executeAsync()) as Quiz[];
  const quizIndex = parseInt(route.query.i as string);
  quiz.value = quizzes.value.find((q,i) => i === quizIndex) || null;
});

//timer
const time = ref<number>(45 * 60);
const timer = ref<string>(`${time.value / 60}:${Math.ceil(time.value % 60)}`);

const instance = setInterval(() => {
  timer.value = `${Math.ceil(time.value / 60) < 10 ? '0' : ''}${Math.ceil(
    time.value / 60
  )}:${Math.ceil(time.value % 60) < 10 ? '0' : ''}${Math.ceil(
    time.value % 60
  )}`;

  time.value = time.value - 1;
}, 1000);

onBeforeUnmount(() => {
  clearInterval(instance);
});

//variables

</script>
