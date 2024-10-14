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

/* console.log(
  formattedTime === props.quiz?.start,
  props.quiz?.start,
  formattedTime
); */ // Example: "10:24:35.123"
//the idea is not to end in specific time
//! the idea is to end after 45 min from what he started
//! convert the 45  diff to local storage not a static value
const handelAttempt = (quizName: string) => {
  const existingQuiz = userQuizzes.value.find(
    (entry: newQuiz) => entry.quiz.name === props.quiz.name
  );

  let quizStartedAt: number;

  if (existingQuiz?.quizStartedAt) {
    quizStartedAt = existingQuiz.quizStartedAt;
  } else {
    quizStartedAt = Date.now();

    const newQuizEntry: newQuiz = {
      quiz: props.quiz,
      score: score.value,
      quizStartedAt: quizStartedAt,
      answersObj: allAnswers.value,
    };

    userQuizzes.value.push(newQuizEntry);
    quizInfoByEmail.value[currentUser.value?.email] = {
      user: currentUser.value,
      quizzes: userQuizzes.value,
    } as infoQuiz;

    LocalStorage.set('quizInfoByEmail', quizInfoByEmail.value);
  }

  const now = Date.now();
  const diffInSeconds = Math.floor((now - quizStartedAt) / 1000); // Convert to seconds

  console.log(`Quiz started at: ${quizStartedAt}, Now: ${now}, Diff: ${diffInSeconds} seconds`);

  if (diffInSeconds < 45 * 60) { // 45 minutes = 2700 seconds
    router.push({
      path: RoutesPaths.QUESTIONS,
      query: { quizName: quizName, index: props.i },
    });
  } else {
    router.push({
      path: RoutesPaths.RESULT_PAGE,
      query: { quizName: props.quiz.name },
    });

    console.log('the time is up',props.quiz.name);

  }
};





</script>
