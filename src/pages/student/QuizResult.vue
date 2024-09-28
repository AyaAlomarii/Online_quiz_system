<template>
  <div v-if="resultVariables.score" class="justify-center q-ma-md q-px-none">
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
              {{ resultVariables?.quiz.title }}
            </span>

            <span class="text-body2 text-grey">
              {{ resultVariables?.quiz.date }}</span
            >
            <div>
              <span class="text-red">{{ resultVariables?.score }}</span
              >/50
            </div>
          </div>
        </div>

        <div class="q-pt-sm q-py-none column text-body2">
          <span class="start-text"
            >Start: {{ resultVariables?.quiz.start }}</span
          >
          <span class="end-text"> End: {{ resultVariables?.quiz.end }}</span>
        </div>
      </q-card-section>

      <q-card-section class="">

        <q-card
          v-for="(qes, i) in resultVariables?.questions"
          :key="i"
          flat
          bordered
          :class=" resultVariables?.answersObj[qes.question] === qes.correctAnswer?'q-ma-md br-correct':'q-ma-md br-error'"
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
                Question {{ qes.question }}
              </div>

              <span class="text-body2 question-grey-text">5 points</span>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-py-none column question-grey-text text-body2">
              <div class="q-pb-xs">
                {{ qes.text }}
              </div>

              <div
                v-for="(ans, index) in qes?.options"
                :key="index"
                class="column q-py-xs"
              >
                <q-radio
                  v-model="resultVariables.answersObj[qes.question]"
                  :val="ans"
                  :label="ans"
                  color="primary"
                  keep-color
                  disable
                  dense
                  :class="answerTextColor(qes, qes.correctAnswer, ans)"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <div class="row justify-end q-my-sm">
      <q-btn no-caps dense color="error" label="Close"  class="q-px-md" :to="Routes.QUIZ" />

    </div>
  </div>
</template>

<script setup lang="ts">
//! remember that i used qes.question not the index
import DataObject from 'src/models/DataObject';
import eventBus from 'src/EventBus/EventBus';
import { computed } from 'vue';
import Routes from 'src/router/RoutesPaths'
//variables
const resultVariables = computed(() => {
  return {
    quiz: eventBus.quiz,
    questions: eventBus.questions,
    score: eventBus.score,
    answersObj: eventBus.answersObj,
  };
});
const answerTextColor = (
  qes: DataObject,
  correctAnswer: string | number,
  ans: string | number
) => {

  if (
    resultVariables.value?.answersObj[qes.question] === ans &&
    resultVariables.value?.answersObj[qes.question] !== correctAnswer
  ) {
    return 'text-red ';
  }
   if (resultVariables.value?.answersObj[qes.question] === ans &&
    resultVariables.value?.answersObj[qes.question] === correctAnswer
  ) {
    return 'text-green';
  }

  if (
   correctAnswer === ans
  ) {
    return 'text-green';
  }
  return ''
};
</script>
