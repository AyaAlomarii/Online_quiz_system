<template>
  <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm q-mt-sm q-pa-md">
    <!-- {{ formattedTime }} -->
    <q-card class="br-8 q-pa-sm q-pb-lg bg-white text-black">
      <q-card-section class="row justify-between">
        <div class="row">
          <q-icon
            name="description"
            size="sm"
            class="q-pt-md q-mr-md"
            color="black"
          />
          <div class="column text-h6">
            <span>
              {{ quiz.name }}
            </span>

            <span class="text-body2 text-grey"> {{ quiz.date }}</span>
          </div>
        </div>

        <div class="q-pt-sm column text-body2">
          <span class="start-text"> Start: {{ quiz.start }}</span>
          <span class="end-text"> End: {{ quiz.end }}</span>
        </div>
      </q-card-section>

      <q-card-section class="column text-body2 text-grey q-py-none">
        <span>{{ quiz.teacher }}</span>
        <span>50 Point</span>
        <span> {{ quiz.students }} Student</span>
        <div class="row justify-end">
          <q-btn
            class="br-8 bg-attempt text-primary"
            size="md"
            no-caps
            :disable="quiz?.status === 'active' ? false : true"
            @click="() => handelAttempt(quiz.name)"
            >Attempt</q-btn
          >
          <!-- formattedTime===props.quiz?.start ? false : true -->
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useRouter } from 'vue-router';
import Quiz from '../../models/QuizModel';
import RoutesPaths from 'src/router/RoutesPaths';
import { LocalStorage, date as quasarDate } from 'quasar'; // Import Quasar's date utility
import DataObject from '@/models/DataObject';
import { ref } from 'vue';
import UserModel from '@/models/UserModel';
import { newQuiz, infoQuiz } from 'src/models/QuizLocalModel';
const currentQuiz = ref<newQuiz>();

const allAnswers = ref<DataObject>({});

const score = ref<number>(0);

const quizInfoByEmail = ref<DataObject>(
  LocalStorage.getItem('quizInfoByEmail') || {}
);

const currentUser = ref<UserModel>(LocalStorage.getItem('currentUser'));

const userQuizzes = ref<newQuiz[]>(
  quizInfoByEmail.value[currentUser.value?.email]?.quizzes || []
);
const timeNow = new Date();
const formattedTime = quasarDate.formatDate(timeNow, 'hh:mmA');

const router = useRouter();
const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
  i: {
    type: Number,
    required: true,
  },
});

console.log(
  formattedTime === props.quiz?.start,
  props.quiz?.start,
  formattedTime
); // Example: "10:24:35.123"
//the idea is not to end in specific time
//! the idea is to end after 45 min from what he started
//! convert the 45  diff to local storage not a static value

const handelAttempt = (quizName: string) => {
  // Find the quiz in the user's taken quizzes if it exists
  currentQuiz.value = userQuizzes.value.find(
    (entry: newQuiz) => entry.quiz.name === props.quiz.name
  ) || null;

  let quizStartedAt = currentQuiz.value?.quizStartedAt || Date.now(); // Use existing start time or set a new one

  const diffInMinutes = (Date.now() - quizStartedAt) / 1000 / 60; // Calculate the time difference
console.log(Date.now()/ 1000 / 60 , quizStartedAt/ 1000 / 60,diffInMinutes);

  if (diffInMinutes < 45) {
    // If within 45 minutes, allow the user to attempt the quiz
    if (!currentQuiz.value) {
      const newQuizEntry: newQuiz = {
        quiz: props.quiz,
        score: score.value,
        quizStartedAt: quizStartedAt,
        answersObj: allAnswers.value,
      };

      userQuizzes.value.push(newQuizEntry); // Add new quiz entry to the user's quizzes

      quizInfoByEmail.value[currentUser.value?.email] = {
        user: currentUser.value,
        quizzes: userQuizzes.value,
      } as infoQuiz;

      LocalStorage.set('quizInfoByEmail', quizInfoByEmail.value); // Save to local storage
    }

    router.push({
      path: RoutesPaths.QUESTIONS,
      query: { quizName: quizName, index: props.i },
    });
  } else {
    // If more than 45 minutes have passed, redirect to results
    router.push({
      path: RoutesPaths.RESULT_PAGE,
      query: { quizName: props.quiz.name },
    });
  }

  console.log('Quiz Info:', quizInfoByEmail.value);
};




/* const handelAttempt = (quizName: string) => {
  // Check if the user has already taken this quiz
  // const userEmail = currentUser.value.email;
  // const userQuizzes = quizInfoByEmail.value[userEmail]?.quizzes || [];

  const hasTakenQuiz = userQuizzes.value.some(
    (entry: any) => entry.quiz.name === props.quiz.name
  );

  if (!hasTakenQuiz) {
    currentQuiz.value =
      userQuizzes.value.find((q) => q.quiz.name === props.quiz.quizName) ||
      null;

    let quizStartedAt = currentQuiz.value?.quizStartedAt as number;

    if (quizStartedAt) {
      let diff = Date.now() - quizStartedAt;
      if (diff) {
        diff = diff / 1000 / 60;
      }
      diff = 45 - diff;
      if (diff > 0) {

        router.push({
      path: RoutesPaths.QUESTIONS,
      query: { quizName: quizName, index: props.i },
    });

      } else {

        router.push({
    path: RoutesPaths.RESULT_PAGE,
    query: { quizName: props.quiz.name },
  });

      }
    } else {
      quizStartedAt = Date.now();

      router.push({
      path: RoutesPaths.QUESTIONS,
      query: { quizName: quizName, index: props.i },
    });
      /*  LocalStorage.setItem('quizStartedAt', Date.now());
    router.push({
      path: `/student/quiz/${index}`,
      query: { name: quizName },
    });
    }

    const newQuizEntry: newQuiz = {
      quiz: props.quiz,
      score: score.value,
      quizStartedAt: quizStartedAt,
      answersObj: allAnswers.value,
    };

    userQuizzes.value.push(newQuizEntry); // Add new quiz entry if not taken
    quizInfoByEmail.value[currentUser.value?.email] = {
      user: currentUser.value,
      quizzes: userQuizzes.value,
    } as infoQuiz;



    // Parse the start time and current time as Date objects
    // const startTime = quasarDate.extractDate(props.quiz?.start, 'hh:mmA');
    // const currentTime = quasarDate.extractDate(formattedTime, 'hh:mmA');

    LocalStorage.set('quizInfoByEmail', quizInfoByEmail.value); // Save to local storage
    console.log('Quiz submitted:', quizInfoByEmail.value);
  } else {
    console.log('This quiz has already been taken by the user.');
  }
}; */
</script>
