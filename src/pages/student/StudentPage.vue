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

      <div class="row justify-between q-px-md">
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
            <quiz-comp v-for="(quiz, i) in filtered" :key="i" :quiz="quiz" />
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
import Quiz from '../../models/QuizModel';

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

const quizzes = ref<Quiz[]>( [{
    id: 1,
    date: '09/09/2024',
    description: 'This quiz covers Arabic language basics.',
    name: 'Arabic Quiz',
    teacher: 'Teacher A',
    points: 50,
    students: 30,
    start: '08:00 am',
    end: '09:00 am',
    status: 'active',
    totalQuestion: 3,
    questions: [
      {
        question: 'What is the meaning of "Shorouq"?',
        multipleChoices: false,
        point: 10,
        options: [
          { text: 'Morning', correct: true },
          { text: 'Evening', correct: false },
          { text: 'Noon', correct: false },
          { text: 'Night', correct: false },
        ],
      },
      {
        question: 'What is the plural of "Pen"?',
        multipleChoices: false,
        point: 15,
        options: [
          { text: 'Pens', correct: true },
          { text: 'My pens', correct: false },
          { text: 'Two pens', correct: false },
          { text: 'Pen knife', correct: false },
        ],
      },
      {
        question: 'Complete the sentence: "Knowledge is light and..."',
        multipleChoices: false,
        point: 25,
        options: [
          { text: 'Ignorance is darkness', correct: true },
          { text: 'Wisdom is key', correct: false },
          { text: 'Power is a weapon', correct: false },
          { text: 'Thought is guide', correct: false },
        ],
      },
    ],
  },
  {
    id: 2,
    date: '10/09/2024',
    description: 'This quiz tests basic math operations.',
    name: 'Math Quiz',
    teacher: 'Teacher B',
    points: 40,
    students: 25,
    start: '10:00 am',
    end: '11:00 am',
    status: 'inactive',
    totalQuestion: 3,
    questions: [
      {
        question: 'What is the result of 5 × 6?',
        multipleChoices: false,
        point: 10,
        options: [
          { text: '30', correct: true },
          { text: '25', correct: false },
          { text: '35', correct: false },
          { text: '40', correct: false },
        ],
      },
      {
        question: 'What is the result of 10 ÷ 2?',
        multipleChoices: false,
        point: 15,
        options: [
          { text: '5', correct: true },
          { text: '4', correct: false },
          { text: '6', correct: false },
          { text: '8', correct: false },
        ],
      },
      {
        question: 'What is the value of π?',
        multipleChoices: false,
        point: 15,
        options: [
          { text: '3.14', correct: true },
          { text: '2.14', correct: false },
          { text: '3.41', correct: false },
          { text: '4.13', correct: false },
        ],
      },
    ],
  },
]);

const filtered = computed<Quiz[]>(() => {
  return quizzes.value.filter((element) =>
    element.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
});

/*  const sortedByDate = computed<Quiz[]>(() => {
  return quizzes.value.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

const filterByDateBtn=()=>{
  quizzes.value=sortedByDate.value
  console.log(sortedByDate.value);

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
