<template>
  <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm q-pa-md">
    <q-card class="br-8 q-pa-sm q-pb-lg bg-white text-black">
      <q-card-section class="br-8 row justify-between">
        <div class="row">
          <q-icon
            name="library_books"
            size="sm"
            class="q-pt-md q-mr-md"
            :color="Date.now() % 2 ? 'red-5' : 'blue-4'"
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

      <q-card-section class="column text-body2 text-grey q-pt-none q-pb-md ">
        <span>{{ quiz.teacher }}</span>
        <span> {{ quiz.points }}/50 Point</span>
        <span> {{ quiz.students }} Student</span>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Quiz from 'src/models/QuizModel';

defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
});
</script>
