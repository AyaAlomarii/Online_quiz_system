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
          />
        </q-tabs>
      </div>

      <div class="row justify-between q-px-md q-pb-sm">
        <div class="row items-center">
          <q-icon name="search" color="accent" size="sm" class="q-mr-md" />
          <q-input v-model="search" borderless label="Search" dense  />
        </div>
        <q-btn
          color="primary"
          outline
          class="br-8 q-px-md"
          label="Filter by date"
          no-caps
          dense
          size="md"
          icon="filter_alt"
        />
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
            <quiz-comp v-for="(quiz, i) in filtered" :key="i" :quiz="quiz" :i="i" />
          </div>
        </q-tab-panel>
        <q-tab-panel name="result" class="q-pa-none">
          <div class="row">
            <result-comp v-for="(quiz, i) in filtered" :key="i" :quiz="quiz" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import RoutesPaths from 'src/router/RoutesPaths';
import { computed, ref } from 'vue';
import QuizComp from 'src/components/student/QuizComp.vue';
import ResultComp from 'src/components/student/ResultComp.vue';
import Quiz from 'src/models/QuizModel';
import GetAllQuizzes from 'src/functions/GetAllQuizzesFun';
import { onMounted } from 'vue';

const quizzes = ref<Quiz[]>([]);

//variables
const tab = ref<string>('quiz');
const search = ref<string>('');
const tabsHeader = ref([
  {
    name: 'quiz',
    label: 'Quiz',
    to: RoutesPaths.QUIZ,
    icon: 'group',
  },
  {
    name: 'result',
    label: 'Results',
    to: RoutesPaths.RESULT,
    icon: 'computer',
  },
]);
//variables
onMounted(async () => {

  const quizzesTwo = new GetAllQuizzes();
  quizzes.value = (await quizzesTwo.executeAsync()) as Quiz[];
});


const filtered = computed<Quiz[]>(() => {
  return quizzes.value.filter((element) =>
    element.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
});

//notes for me

/*  const sortedByDate = computed<Quiz[]>(() => {
  return quizzes.value.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

const filterByDateBtn=()=>{
  quizzes.value=sortedByDate.value
 

}


 !
 const filtered = computed<Quiz[]>(() => {
  const arr = quizzes.value.filter((element: Quiz) =>
    element.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
  // if (sort) {
    // arr.sort?
  // }
  return arr;
});

const sortedByDate = computed<Quiz[]>(() => {
  return (quizzes.value || []).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
});


 */
</script>
