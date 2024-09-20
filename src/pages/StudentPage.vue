<template>
  <q-page>
<div class="q-px-md">
  <div class="row q-py-md">

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

      />
  
  </q-tabs>
  </div>
  


  <q-tab-panels
      v-model="tab"
      animated
      transition-next="2"
      transition-prev="2"
      class="bg-transparent"
    >
  
    <q-tab-panel name="quiz" class="q-pa-none">
        <quiz-comp />
      </q-tab-panel>
      <q-tab-panel name="result" class="q-pa-none">
        <result-comp />
      </q-tab-panel>

  </q-tab-panels>

</div>

  </q-page>
</template>

<script setup lang="ts">

import RoutesPaths from 'src/router/RoutesPaths'
import { ref } from 'vue';
import QuizComp from 'src/components/student/QuizComp.vue';
import ResultComp from 'src/components/student/ResultComp.vue';


//variables
const tab = ref<string>('quiz');

const tabsHeader = ref([
  {
    name: 'quiz',
    label: 'Quiz',
    to: RoutesPaths.QUIZ,
    icon:'group'
  },
  {
    name: 'result',
    label: 'Result',
    to: RoutesPaths.RESULT,
    icon:'computer'

  },
]);
//variables
</script>
