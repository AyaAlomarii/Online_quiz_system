<template>
  <div>

    <div
      class="text-h4 q-pt-md row justify-center question-grey-text"
      v-if="quiz"
    >
      {{ quiz.name }}
    </div>

    <QuestionComp :quiz="quiz"  />
  </div>
</template>
<script setup lang="ts">
import QuestionComp from 'components/student/QuestionComp.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Quiz from 'src/models/QuizModel';
import GetAllQuizzes from 'src/functions/GetAllQuizzesFun';


const route = useRoute();
const quiz = ref<Quiz>();

const quizzes = ref<Quiz[]>([]);

onMounted(async() => {
  const quizzesTwo = new GetAllQuizzes();
  quizzes.value = (await quizzesTwo.executeAsync()) as Quiz[];
  const quizName= route.query.quizName as string;
  quiz.value = quizzes.value.find((q) => quizName === q?.name) || null;
});



</script>
