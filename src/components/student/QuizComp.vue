<template>
  <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm q-mt-sm q-pa-md">
    {{ formattedTime }}
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
            :disable="quiz.status === 'active' ? false : true"
            @click="()=>handelAttempt(quiz.name)"
            >Attempt</q-btn
          >
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
const allAnswers = ref<DataObject>({});

const score = ref<number>(0);

const quizInfoByEmail = ref<DataObject>(
  LocalStorage.getItem('quizInfoByEmail') || {}
);
const currentUser = ref<UserModel>(LocalStorage.getItem('currentUser'));

const timeNow = new Date();
const formattedTime = quasarDate.formatDate(timeNow, 'HH:mm');

console.log(formattedTime); // Example: "10:24:35.123"

const router = useRouter();
const props=defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
  i: {
    type: Number,
    required:true
  },
});

const handelAttempt = (quizName: string ) => {
  router.push({ path: RoutesPaths.QUESTIONS, query: { quizName: quizName,index:props.i } });


  //create empty object
  interface newQuiz {
    quiz: Quiz;
    score: number;
    answersObj:DataObject;
  };
  interface infoQuiz{
    user:UserModel,
    quizzes:newQuiz[]
  }
  const newQuizEntry :newQuiz= {
    quiz: props.quiz,
    score: score.value,
    answersObj: allAnswers.value,
  };


  // Check if the user has already taken this quiz
  const userEmail = currentUser.value.email;
  const userQuizzes = quizInfoByEmail.value[userEmail]?.quizzes || [];

  const hasTakenQuiz = userQuizzes.some(
    (entry: any) => entry.quiz.name === props.quiz.name
  );

  if (!hasTakenQuiz) {
    userQuizzes.push(newQuizEntry); // Add new quiz entry if not taken
    quizInfoByEmail.value[userEmail] = {
      user:currentUser.value,
      quizzes:userQuizzes
    } as infoQuiz

    LocalStorage.set('quizInfoByEmail', quizInfoByEmail.value); // Save to local storage
    console.log('Quiz submitted:', quizInfoByEmail.value);





  } else {
    console.log('This quiz has already been taken by the user.');

  }

};
</script>
