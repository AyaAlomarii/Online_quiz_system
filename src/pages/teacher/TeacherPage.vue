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

      <div class="row justify-between no-wrap q-px-md">
        <div class="row items-center justify-start">
          <q-icon name="search" color="accent" size="sm" class="q-mr-md" />
          <q-input v-model="search" borderless label="Search" dense />
        </div>
        <div class="row justify-end">
          <q-btn
            color="primary"
            outline
            class="br-8 q-px-md q-mr-sm text-body2"
            label="Filter by date"
            no-caps
            dense
            icon="filter_alt"
          />
          <q-btn
            v-if="tab === 'quiz'"
            color="primary "
            class="br-8 q-px-md text-body2 q-py-none"
            label="Create new Quiz"
            no-caps
            @click="showCreateDialog = true"
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
            <quiz-comp
              quiz-comp
              v-for="(quiz, i) in filtered"
              :key="i"
              :quiz="quiz"
            />
          </div>
        </q-tab-panel>
        <q-tab-panel name="result" class="q-pa-none">
          <div class="row">
            <result-comp v-for="(quiz, i) in filtered" :key="i" :quiz="quiz" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <!-- Dialog -->
      <q-dialog v-model="showCreateDialog" class="row ">
        <q-card class="br-12 q-pa-lg width-900 hide-scrollbar">
          <q-card-section class="col-12 q-pa-md">
            <q-btn
              flat
              v-close-popup
              round
              dense
              icon="close "
              class="float-right"
              @click="resetOnCancel"
            />
          </q-card-section>

          <q-card-section class="q-pa-sm text-center">
            <div class="text-h5 text-center text-weight-medium">
              Add New Quiz
            </div>
          </q-card-section>

          <q-card-section class="row justify-center">
            <q-form
              @submit.prevent="handelSubmitNewQuiz"
              @reset="resetOnCancel"
              class="q-gutter-md col-12"
            >
              <div class="">
                <q-input
                  v-model="date"
                  dense
                  label="Date"
                  class="q-px-sm br-8 bg-white"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="date"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <q-input
                v-model="quizName"
                dense
                label="Quiz Name"
                type="text"
                class="q-px-sm br-8 bg-white"
                outlined
              >
              </q-input>
              <q-input
                v-model="quizDescription"
                dense
                label="Quiz Description"
                type="textarea"
                class="q-px-sm br-8 bg-white"
                outlined
              />
              <div v-for="(qes, i) in newQuestion" :key="i" class="row q-py-md">
                <q-input
                  v-model="qes.question"
                  dense
                  label="Question"
                  type="text"
                  class="q-px-sm br-8 col-12 bg-white"
                  outlined
                />
                <q-toggle
                  v-model="qes.multipleChoice"
                  label="Student can select more than one choice ?"
                  color="primary"
                  class="q-px-sm q-py-md col-12 justify-end"
                  dense
                />

                <div class="row">
                  <div
                    class="q-pa-sm col-6 q-gutter-col-md"
                    v-for="(option, index) in qes.options"
                    :key="index"
                  >
                    <q-input
                      v-model="option.text"
                      dense
                      :label="`option ${index + 1}`"
                      type="text"
                      class="br-8 bg-white"
                      outlined
                    >
                      <template v-slot:append>
                        <q-checkbox v-model="option.correct" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <span class="q-px-sm row text-grey col-12 justify-end"
                  >tick the box of right answer</span
                >
                <div class=" q-px-sm row col-12 justify-between q-py-md">
                  <q-btn
                    label="Add Question"
                    dense
                    unelevated
                    no-caps
                    class="br-8 q-px-md bg-attempt text-primary"
                    @click="addNewQuestion"
                    icon-right="add_box"
                  />
                  <q-btn
                    label="Remove"
                    dense
                    no-caps
                    unelevated
                    class="br-8 q-px-md bg-attempt text-primary"
                    @click="removeQuestion(i)"
                    icon-right="disabled_by_default
"
                  />
                </div>
              </div>

              <div class="q-px-sm q-py-md" align="right">
                <q-btn
                  type="submit"
                  label="Save"
                  dense
                  unelevated
                  no-caps
                  size="md"
                  class="br-8 q-mr-md q-px-md"
                  color="light-green-11"   text-color="light-green-14"
                />
                <q-btn
                  label="Cancel"
                  v-close-popup
                  type="reset"
                  size="md"
                  unelevated
                  dense
                  no-caps
                  class="br-8 q-px-md br-8"
                  text-color="red"
                  outlined
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import RoutesPaths from 'src/router/RoutesPaths';
import { ref, computed } from 'vue';
import QuizComp from 'src/components/teacher/QuizCompTeach.vue';
import ResultComp from 'src/components/teacher/ResultCompTeach.vue';
import { Quiz } from '@/models/QuizModel';
import DataObject from '@/models/DataObject';

//variables
const search = ref<string>('');
const showCreateDialog = ref<boolean>(false);
const date = ref<string>('');
const quizName = ref<string>('');
const quizDescription = ref<string>('');
const newQuiz = ref<DataObject>({});

// const question = ref<string>('');
// const options = ref<string[]>('');

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
    label: 'Results',
    to: RoutesPaths.TEACHER_RESULT,
    icon: 'computer',
  },
]);

const newQuestion = ref([
  {
    question: '',
    multipleChoice: false,
    options: [
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
    ],
  },
]);

const addNewQuestion = () => {
  newQuestion.value.push({
    question: '',
    multipleChoice: false,
    options: [
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
    ],
  });
};

const removeQuestion = (index) => {
  if (index !== 0) {
    newQuestion.value.splice(index, 1);
  }
};

const filtered = computed<Quiz[]>(() => {
  return quizzes.value.filter((element) =>
    element.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
});

const handelSubmitNewQuiz = () => {
  newQuiz.value = {
    title: quizName,
    date: date,
    description: quizDescription,
    questions: newQuestion,
  };

  console.log(newQuiz.value);

  newQuiz.value = {};
  quizName.value = '';
  date.value = '';
  quizDescription.value = '';
  newQuestion.value = [
    {
      question: '',
      multipleChoice: false,
      options: [
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
    },
  ];
};
const resetOnCancel =()=>{
  newQuiz.value = {};
  quizName.value = '';
  date.value = '';
  quizDescription.value = '';
  newQuestion.value = [
    {
      question: '',
      multipleChoice: false,
      options: [
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
    },
  ];
}
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
    element.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
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
//card data
const quizzes = ref<Quiz[]>([
  {
    id: 1,
    title: 'Arabic Quiz',
    start: '08:00 am',
    end: '09:00 am',
    date: '09/09/2024',
    teacher: 'Teacher A',
    points: 50,
    students: 30,
    status: 'active',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'What is the meaning of the word "Shorouq"?',
        options: ['Morning', 'Evening', 'Noon', 'Night'],
        correctAnswer: 'Morning',
      },
      {
        id: 2,
        question: 2,
        text: 'What is the plural of the word "Pen"?',
        options: ['Pens', 'My pens', 'Two pens', 'Pen knife'],
        correctAnswer: 'Pens',
      },
      {
        id: 3,
        question: 3,
        text: 'Complete the sentence: "Knowledge is light and ..."',
        options: [
          'Ignorance is darkness',
          'Wisdom is key',
          'Power is a weapon',
          'Thought is guide',
        ],
        correctAnswer: 'Ignorance is darkness',
      },
    ],
  },

  {
    id: 2,
    title: 'Math Quiz',
    start: '10:00 am',
    end: '11:00 am',
    date: '10/09/2024',
    teacher: 'Teacher B',
    points: 40,
    students: 25,
    status: 'inactive',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'What is the result of 5 × 6?',
        options: ['30', '25', '35', '40'],
        correctAnswer: '30',
      },
      {
        id: 2,
        question: 2,
        text: 'What is the result of 10 ÷ 2?',
        options: ['5', '4', '6', '8'],
        correctAnswer: '5',
      },
      {
        id: 3,
        question: 3,
        text: 'What is the value of π?',
        options: ['3.14', '2.14', '3.41', '4.13'],
        correctAnswer: '3.14',
      },
    ],
  },
  {
    id: 3,
    title: 'Science Quiz',
    start: '01:00 pm',
    end: '02:00 pm',
    date: '11/09/2024',
    teacher: 'Teacher C',
    points: 60,
    students: 20,
    status: 'active',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'What is the unit of energy?',
        options: ['Joule', 'Newton', 'Watt', 'Kilo'],
        correctAnswer: 'Joule',
      },
      {
        id: 2,
        question: 2,
        text: 'Which planet is closest to the Sun?',
        options: ['Mercury', 'Venus', 'Earth', 'Mars'],
        correctAnswer: 'Mercury',
      },
      {
        id: 3,
        question: 3,
        text: 'What is the state of matter when heated strongly?',
        options: ['Gaseous', 'Liquid', 'Solid', 'Plasma'],
        correctAnswer: 'Plasma',
      },
    ],
  },
  {
    id: 4,
    title: 'History Quiz',
    start: '03:00 pm',
    end: '04:00 pm',
    date: '12/09/2024',
    teacher: 'Teacher D',
    points: 55,
    students: 28,
    status: 'active',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'In what year did the French Revolution occur?',
        options: ['1789', '1776', '1804', '1815'],
        correctAnswer: '1789',
      },
      {
        id: 2,
        question: 2,
        text: 'Who was the first president of the United States?',
        options: [
          'George Washington',
          'Abraham Lincoln',
          'Thomas Jefferson',
          'John Kennedy',
        ],
        correctAnswer: 'George Washington',
      },
      {
        id: 3,
        question: 3,
        text: 'Which civilization built the pyramids?',
        options: ['Egyptian', 'Roman', 'Babylonian', 'Chinese'],
        correctAnswer: 'Egyptian',
      },
    ],
  },
  {
    id: 5,
    title: 'Geography Quiz',
    start: '09:00 am',
    end: '10:00 am',
    date: '13/09/2024',
    teacher: 'Teacher E',
    points: 45,
    students: 32,
    status: 'inactive',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'What is the capital of Japan?',
        options: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'],
        correctAnswer: 'Tokyo',
      },
      {
        id: 2,
        question: 2,
        text: 'What is the largest ocean in the world?',
        options: [
          'Pacific Ocean',
          'Atlantic Ocean',
          'Indian Ocean',
          'Arctic Ocean',
        ],
        correctAnswer: 'Pacific Ocean',
      },
      {
        id: 3,
        question: 3,
        text: 'What is the highest mountain peak in the world?',
        options: ['Everest', 'Kilimanjaro', 'Elbrus', 'McKinley'],
        correctAnswer: 'Everest',
      },
    ],
  },
  {
    id: 6,
    title: 'Physics Quiz',
    start: '11:00 am',
    end: '12:00 pm',
    date: '14/09/2024',
    teacher: 'Teacher F',
    points: 70,
    students: 27,
    status: 'active',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'What is the speed of light in a vacuum?',
        options: [
          '300,000 km/s',
          '150,000 km/s',
          '450,000 km/s',
          '600,000 km/s',
        ],
        correctAnswer: '300,000 km/s',
      },
      {
        id: 2,
        question: 2,
        text: 'What is Newton’s first law?',
        options: [
          'An object in motion stays in motion',
          'Force equals mass times acceleration',
          'For every action there is an equal and opposite reaction',
        ],
        correctAnswer: 'An object in motion stays in motion',
      },
      {
        id: 3,
        question: 3,
        text: 'What is the symbol for acceleration?',
        options: ['a', 'v', 't', 'm'],
        correctAnswer: 'a',
      },
    ],
  },
  {
    id: 7,
    title: 'Chemistry Quiz',
    start: '02:00 pm',
    end: '03:00 pm',
    date: '15/09/2024',
    teacher: 'Teacher G',
    points: 65,
    students: 22,
    status: 'inactive',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'What is the chemical formula of water?',
        options: ['H2O', 'O2', 'CO2', 'H2'],
        correctAnswer: 'H2O',
      },
      {
        id: 2,
        question: 2,
        text: 'What element is found in every organic compound?',
        options: ['Carbon', 'Oxygen', 'Hydrogen', 'Nitrogen'],
        correctAnswer: 'Carbon',
      },
      {
        id: 3,
        question: 3,
        text: 'What is the atomic number of hydrogen?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '1',
      },
    ],
  },
  {
    id: 8,
    title: 'Biology Quiz',
    start: '04:00 pm',
    end: '05:00 pm',
    date: '16/09/2024',
    teacher: 'Teacher H',
    points: 55,
    students: 30,
    status: 'active',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'What is the basic unit of life?',
        options: ['Cell', 'Organ', 'System', 'Tissue'],
        correctAnswer: 'Cell',
      },
      {
        id: 2,
        question: 2,
        text: 'What is the function of DNA?',
        options: [
          'Store genetic information',
          'Transmit nerve signals',
          'Absorb nutrients',
          'Filter blood',
        ],
        correctAnswer: 'Store genetic information',
      },
      {
        id: 3,
        question: 3,
        text: 'Which part of the plant is responsible for photosynthesis?',
        options: ['Leaf', 'Root', 'Stem', 'Flower'],
        correctAnswer: 'Leaf',
      },
    ],
  },
  {
    id: 8,
    title: 'Biology Quiz',
    start: '04:00 pm',
    end: '05:00 pm',
    date: '16/09/2024',
    teacher: 'Teacher H',
    points: 55,
    students: 30,
    status: 'active',
    questions: [
      {
        id: 1,
        question: 1,
        text: 'What is the basic unit of life?',
        options: ['Cell', 'Organ', 'System', 'Tissue'],
        correctAnswer: 'Cell',
      },
      {
        id: 2,
        question: 2,
        text: 'What is the function of DNA?',
        options: [
          'Store genetic information',
          'Transmit nerve signals',
          'Absorb nutrients',
          'Filter blood',
        ],
        correctAnswer: 'Store genetic information',
      },
      {
        id: 3,
        question: 3,
        text: 'Which part of the plant is responsible for photosynthesis?',
        options: ['Leaf', 'Root', 'Stem', 'Flower'],
        correctAnswer: 'Leaf',
      },
    ],
  },
]);
</script>
