<template>
  <q-page>
    <div class="">
      <div class="row q-pa-md">
        <q-tabs
          v-model="tab"
          inline-label
          active-color="white"
          active-bg-color="primary"
          no-caps
          dense
        >
          <q-route-tab
            v-for="ele in tabsHeader"
            :key="ele.name"
            :name="ele.name"
            :label="ele.label"
            :to="ele.to"
            class="br-8 q-py-xs"
            :icon="ele.icon"
            style="font-family: Inter"
          />
        </q-tabs>
      </div>

      <div class="row  justify-between no-wrap q-px-md">
        <div class="row items-center justify-start">
          <q-icon name="search" color="accent" size="sm" class="q-mr-md" />
          <q-input v-model="search" borderless label="Search" dense />
        </div>
        <div class="row justify-end">
          <q-btn
            color="primary"
            outline
            class="br-8 q-px-md q-mr-sm text-body2 "
            label="Filter by date"
            no-caps
            dense
            icon="filter_alt"
          />
          <q-btn
            color="primary "
            class="br-8 q-px-md text-body2 q-py-none"
            label="Create new Quiz"
            no-caps
            dense
            size="md"
            icon="edit_square"
          />
        </div>
      </div>

      <q-tab-panels
        v-model="tab"
        animated
        transition-next="2"
        transition-prev="2"
        class="bg-transparent"
      >
        <q-tab-panel name="quiz" class="q-pa-none">
          <div class="row">
            <quiz-comp />
          </div>
        </q-tab-panel>
        <q-tab-panel name="result" class="q-pa-none">
          <div class="row">
            <result-comp />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import RoutesPaths from 'src/router/RoutesPaths';
import { ref } from 'vue';
import QuizComp from 'src/components/teacher/QuizCompTeach.vue';
import ResultComp from 'src/components/teacher/ResultCompTeach.vue';

//variables
const search = ref<string>('');

const tab = ref<string>('quiz');

const tabsHeader = ref([
  {
    name: 'quiz',
    label: 'Quiz',
    to: RoutesPaths.TEACHER_QUIZ,
    icon: 'group',
  },
  {
    name: 'result',
    label: 'Result',
    to: RoutesPaths.TEACHER_Result,
    icon: 'computer',
  },
]);
</script>
