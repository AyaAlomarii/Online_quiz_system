<template>
  <div v-if="quiz" class="justify-center q-pa-md q-pa-none">
    <q-card flat bordered class="br-8 q-pa-none">
      <q-card-section class="br-8 row justify-between">
        <div class="row">
          <q-icon
            name="library_books"
            color="red"
            size="sm"
            class="q-pt-md q-mr-md"
          />
          <div class="column text-h6">
            <span>
              {{ quiz.quiz?.name }}
            </span>

            <span class="text-body2 text-grey"> {{ quiz.quiz?.date }}</span>
            <div>
              <span class="text-red">{{ quiz?.score }}</span
              >/{{ quiz.quiz?.points }}
            </div>
          </div>
        </div>

        <div class="q-pt-sm q-py-none column text-body2">
          <span class="start-text">Start: {{ quiz.quiz?.start }}</span>
          <span class="end-text"> End: {{ quiz.quiz?.end }}</span>
        </div>
      </q-card-section>

      <q-card-section class="">
        <q-card
          v-for="(qes, i) in quiz.quiz?.questions"
          :key="i"
          flat
          bordered
          :class="
            quiz?.answersObj[i]?.correct
              ? 'q-ma-md br-correct'
              : 'q-ma-md br-error'
          "
        >
          <q-card-section class="q-pb-none">
            <div class="row justify-between items-center">
              <div class="text-h6">
                <q-icon
                  name="library_books"
                  size="sm"
                  class="q-pr-sm"
                  color="yellow"
                />
                Question {{ i + 1 }}
              </div>

              <span class="text-body2 question-grey-text"
                >{{ qes.point }} Points</span
              >
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-py-none column question-grey-text text-body2">
              <div class="q-pb-xs">
                {{ qes.question }}
              </div>

              <div
                v-for="(ans, index) in qes?.options"
                :key="index"
                class="column q-py-xs"
              >
                <q-radio
                  v-model="quiz.answersObj[i].text"
                  :val="ans.text"
                  :label="ans.text"
                  color="primary"
                  keep-color
                  disable
                  dense
                  :class="{
                    'text-green': ans.correct,

                    'text-red':
                      quiz?.answersObj[i]?.text === ans?.text && !ans?.correct,
                  }"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <div class="row justify-end q-my-sm">
      <q-btn
        no-caps
        dense
        label="Close"
        class="q-px-md"
        :to="Routes.QUIZ"
        text-color="red"
        color="red-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//! remember that i used qes.question not the index
// import eventBus from 'src/EventBus/EventBus';
import { onMounted, ref } from 'vue';
import Routes from 'src/router/RoutesPaths';
import { Quiz } from '@/models/QuizModel';
import DataObject from '@/models/DataObject';
import { LocalStorage } from 'quasar';
import UserModel from '@/models/UserModel';
// import { route } from 'quasar/wrappers';
import { useRoute } from 'vue-router';
const route = useRoute();
import { newQuiz } from 'src/models/QuizLocalModel';


//variables
const userQuizzes = ref<newQuiz[]>([]);
const userQuizzesObj = ref<DataObject>(
  LocalStorage.getItem('quizInfoByEmail') || {}
);

const user = ref<UserModel>(LocalStorage.getItem('currentUser'));
const quiz = ref<DataObject>({});

/* const resultVariables = computed(() => {
  return {
    quiz: eventBus.quiz,
    questions: eventBus.questions,
    score: eventBus.score,
    // answersObj: eventBus.answersObj,
  };
}); */
onMounted(() => {
  userQuizzes.value = userQuizzesObj.value[`${user.value.email}`].quizzes;
  console.log(userQuizzes.value, 123);
  const quizName = route.query.quizName as string;

  quiz.value = userQuizzes.value.find((q) => q.quiz.name === quizName) || null;
  console.log(quiz.value, 1);
});
</script>
