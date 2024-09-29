<template>
  <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm q-mt-sm q-pa-md ">
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
              {{ quiz.title }}
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
              :disable="quiz.status === 'active' ? true : false"
             @click="handelAttempt(quiz.id,quiz)"
              >Attempt</q-btn
            >

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue'
import { useRouter } from 'vue-router';
import Quiz from '../../models/QuizModel';
import RoutesPaths from 'src/router/RoutesPaths';
import EventBus from 'src/EventBus/EventBus'
const router=useRouter()
defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
});


const handelAttempt =(id:number |null ,quiz:Quiz)=>{
  router.push({ path:RoutesPaths.QUESTIONS, query: { id: id } })
  EventBus.quizVar=quiz
}
</script>
