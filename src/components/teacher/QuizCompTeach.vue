<template>
  <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-sm q-mt-sm q-pa-md">
    <q-card class="q-pa-sm q-pb-lg bg-white text-black">
      <q-card-section class="br-8 row justify-between">
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
        <span>{{ quiz.teacher }}teacher</span>
        <span>{{quiz.points}} Point</span>
        <span> {{ quiz.students }} Student</span>
        <div class="row justify-end q-gutter-md">
          <q-btn
            class="br-8 bg-attempt text-primary q-px-md"
            size="md"
            text-color="red"
            color="red-2"
            no-caps
            label="Delete "
          />

          <q-btn
            class="br-8 bg-attempt text-primary q-px-lg"
            text-color="light-blue-10"
            color="light-blue-2"
            size="md"
            no-caps
            label="Edit"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
// import { useRouter } from 'vue-router';
import Quiz from '../../models/QuizModel';
// import RoutesPaths from 'src/router/RoutesPaths';
// import EventBus from 'src/EventBus/EventBus'
// const router=useRouter()
// const filteredByDate=ref<boolean>(false)
// const emit= defineEmits<{(event:'filterData', data:boolean):void}>()

defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
});
</script>
