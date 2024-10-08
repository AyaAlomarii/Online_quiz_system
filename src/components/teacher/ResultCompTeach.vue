<template>
  <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm q-pa-md"  >
    <q-card class="br-8 q-pa-sm q-pb-lg bg-white text-black">
      <q-card-section class="br-8 row justify-between">
        <div class="row">
          <q-icon
            name="description"
            size="sm"
            class="q-pt-md q-mr-md"
            color="red"
          />
          <div class="column text-h6" >
            <span @click="handleResult" class="clickable" >
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
        <span> {{ quiz.points }} Point</span>
        <span> {{ quiz.students }} Student</span>
        <div class="row justify-end"></div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Quiz from '../../models/QuizModel';
import eventBus from 'src/EventBus/EventBus';
import Routes from 'src/router/RoutesPaths';
import { useRouter } from 'vue-router';
const router = useRouter();
const props=defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
});

const handleResult=()=>{
  eventBus.quizTeacher=props.quiz
  router.push({ path: Routes.RESULT_TABLE ,query:{quizName:props.quiz?.name}});
}

</script>
