<template>
  <div class="justify-center  q-pa-md">
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
              {{ route.query.quizName }}
            </span>
            <span class="text-body2 text-grey">
              {{ quizInfo?.quiz.date }}</span
            >
            <span class="text-body2 text-grey"> </span>
            <div>
              {{ route.query.username }}
              <span class="text-red">{{ quizInfo?.score }}</span>/{{ quizInfo?.quiz?.points }}
            </div>
          </div>
        </div>

        <div class="q-pt-sm q-py-none column text-body2">
          <span class="start-text">Start: {{ quizInfo?.quiz.start }}</span>
          <span class="end-text"> End: {{ quizInfo?.quiz.end }}</span>
        </div>
      </q-card-section>

      <q-card-section class="">
        <q-card
          v-for="(qes, i) in quizInfo?.quiz?.questions"
          :key="i"
          flat
          bordered
          :class="
           qes.options.some(
              (option) => option.text === quizInfo.answersObj[i] && option.correct
            )
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
                Question {{ i+1 }}
              </div>

              <span class="text-body2 question-grey-text">{{ qes.point }} Points</span>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-py-none column question-grey-text text-body2">
              <div class="q-pb-xs">
                {{ qes.question }}
              </div>

              <div   v-for="(ans, index) in qes?.options"
                :key="index"
                class="column q-py-xs" >
                <q-radio
                  v-model="quizInfo.answersObj[i]"
                  :val="ans.text"
                  :label="ans.text"
                  color="primary"
                  keep-color
                  disable
                  dense
                  :class="{
                    'text-green':ans.correct,
                    'text-red': quizInfo.answersObj[i] === ans.text && !ans.correct,
                  }"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <div class="row justify-end q-pt-md ">
      <q-btn
        no-caps
        dense
        label="Close"
        class="q-px-md"
        text-color="red"
        color="red-2"
        :to="Routes.TEACHER_RESULT"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DataObject from '@/models/DataObject';
import { Quiz } from '@/models/QuizModel';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import GetAllStudentQuizzes from 'src/functions/GetAllStudentQuizzes';
import Routes from 'src/router/RoutesPaths';
import { newQuiz } from '@/models/QuizLocalModel';

//variables
const quizByEmail = ref<DataObject>({});

const quizInfo = ref<newQuiz>();

const route = useRoute();



onMounted(async () => {
  const getAllStudentQuizzes = new GetAllStudentQuizzes();
  quizByEmail.value = await getAllStudentQuizzes.executeAsync();
  console.log(quizByEmail.value);
  for (let email in quizByEmail.value) {
    if (quizByEmail.value.hasOwnProperty(email)) {
      // Loop through each quiz for this user
      console.log(
        quizByEmail.value[email]?.user.username === route.query.username
      );

      quizByEmail.value[email].quizzes.forEach(
        (quiz) => {
          if (
            quiz.quiz?.name === route.query.quizName &&
            quizByEmail.value[email]?.user.username === route.query.username
          ) {
            quizInfo.value = quiz as newQuiz
            console.log(quizInfo.value);
          }else{
            console.log('no data')
          }
        }
      ) || null;
    }
  }
});
</script>
