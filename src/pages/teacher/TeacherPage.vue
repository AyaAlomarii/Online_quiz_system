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
              :i="i"
              @delete-quiz="handelDelete"
              @update-quiz="handelUpdate"
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
      <q-dialog v-model="showCreateDialog" class="row">
        <q-card class="br-12 q-pa-lg width-900 ">
          <!-- hide-scrollbar -->
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
                  v-model="dateTime"
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
                        <q-date v-model="date" mask="YYYY-MM-DD">
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
                        <q-time v-model="time" mask="hh:mmA" format12h>
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
                <!--  {{ date }}/{{time}}/{{dateTime}} -->
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
              <div v-for="(qes, i) in newQuestion" :key="i" class="q-py-sm">
                <div class="row justify-end">
                  <q-btn
                    dense
                    no-caps
                    unelevated
                    class="br-8 q-px-md bg-none"
                    @click="removeQuestion(i)"
                    icon="delete_forever"
                    text-color="red"
                  >
                  </q-btn>
                </div>

                <div class="row">
                  <q-input
                    v-model="qes.question"
                    dense
                    label="Question"
                    type="text"
                    class="q-px-sm br-8 col-9 bg-white"
                    outlined
                  />
                  <q-input
                    v-model="qes.point"
                    dense
                    mask="##"
                    label="Points"
                    class="q-px-sm br-8 col-3 bg-white"
                    outlined
                  />

                  <q-toggle
                    v-model="qes.multipleChoices"
                    label="Student can select more than one choice ?"
                    color="primary"
                    class="q-px-sm q-py-md col-12 justify-end grey-text"
                    dense
                  />
                </div>

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
                        <q-checkbox
                          v-model="option.correct"
                          dense
                          class="br-8"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <span class="q-px-sm row col-12 justify-end grey-text"
                  >tick the box of right answer</span
                >
                <div class="q-px-sm row col-12 justify-between q-py-md">
                  <q-btn
                    label="Add Question"
                    dense
                    unelevated
                    no-caps
                    class="br-8 q-px-md bg-attempt text-primary"
                    @click="addNewQuestion"
                    icon-right="add_box"
                  />
                </div>
              </div>

              <div class="q-px-sm q-ma-none" align="right">
                <q-btn
                  type="submit"
                  label="Save"
                  v-close-popup
                  dense
                  unelevated
                  no-caps
                  size="md"
                  class="br-8 q-mr-md q-px-md"
                  color="light-green-11"
                  text-color="light-green-14"
                />
                <q-btn
                  label="Cancel"
                  v-close-popup
                  type="reset"
                  size="md"
                  unelevated
                  dense
                  no-caps
                  class="br-8 q-px-md br-8 "
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
import { ref, computed, onMounted } from 'vue';
import QuizComp from 'src/components/teacher/QuizCompTeach.vue';
import ResultComp from 'src/components/teacher/ResultCompTeach.vue';
import { Question, Quiz } from '@/models/QuizModel';
import CreateNewQuiz from 'src/functions/CreateNewQuizFunc';
import DataObject from '@/models/DataObject';
// import { LocalStorage } from 'quasar';
import GetAllQuizzes from 'src/functions/GetAllQuizzesFun';
import DeleteQuizFunc from 'src/functions/DeleteQuizFunc';
import UpdateQuiz from 'src/functions/UpdateQuizFun';
 import { LocalStorage, date as quasarDate } from 'quasar'; // Import Quasar date utility
//variables
const search = ref<string>('');
const showCreateDialog = ref<boolean>(false);
const date = ref<string>('');
const time = ref<string>('');
const teacher=ref<string>(LocalStorage.getItem('currentUser') || '')

const quizName = ref<string>('');
const quizDescription = ref<string>('');
// const newQuiz = ref<Quiz>();
const quizzesLocal = ref<Quiz>();
const totalPoints = ref<number>(0);
// const updateQuiz = ref<Quiz[]>([]);
const quizzes = ref<Quiz[]>([]);
/* const props = defineProps({
  i: {
    type: Number,
    required: true,
  }
}); */

const dateTime = computed(() => {
  return `${date.value}  ${time.value}`;
});

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

onMounted(async () => {
  const quizzesTwo = new GetAllQuizzes();
  quizzes.value = (await quizzesTwo.executeAsync()) as Quiz[];
});

const newQuestion = ref<Question[]>([
  {
    question: '',
    multipleChoices: false,
    point: 0,
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
    multipleChoices: false,
    point: 0,
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
  return (
    quizzes.value && Array.isArray(quizzes.value) ? quizzes.value : []
  ).filter((element) =>
    element.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
});

const sumAllPoints = () => {
  totalPoints.value = 0;
  newQuestion.value.forEach((ele) => {
    ele.point = parseFloat(`${ele.point}`);
    totalPoints.value += parseFloat(`${ele.point}`); // Convert ele.point to a number before adding
    console.log(typeof ele.point, ele.point);
  });
  console.log(typeof totalPoints.value, totalPoints.value);
};

const calculateEndTime = (startTime: string) => {
  const fullDateTimeString = `${date.value} ${startTime}`;
  const startDateTime = quasarDate.extractDate(
    fullDateTimeString,
    'YYYY-MM-DD hh:mmA'
  );

  // Check if startDateTime is correctly parsed
  if (!startDateTime) {
    console.error('Date parsing failed for:', fullDateTimeString);
    return 'Error in parsing date';
  }

  const end = new Date(startDateTime.getTime() + 45 * 60 * 1000); // Add 45 minutes
  return end.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const handelSubmitNewQuiz = async () => {
  sumAllPoints();
  const endPoint = calculateEndTime(time.value);

  quizzesLocal.value = {
    id: 0,
    date: date.value,
    description: quizDescription.value,
    name: quizName.value,
    teacher: teacher.value?.username || '' ,
    points: totalPoints.value,
    students: 0,
    start: time.value,
    end: endPoint,
    status: 'active',
    totalQuestion: newQuestion.value.length,
    questions: newQuestion.value,
  };

  const createNewQuiz = new CreateNewQuiz();
  quizzes.value.push(quizzesLocal.value);
  console.log(12, quizzes.value);

  await createNewQuiz.executeAsync({ quizzes: quizzes.value } as DataObject);

  quizName.value = '';
  date.value = '';
  time.value = '';
  quizDescription.value = '';
  totalPoints.value = 0;
  newQuestion.value = [
    {
      question: '',
      multipleChoices: false,
      point: 0,
      options: [
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
    },
  ];
};

const resetOnCancel = () => {
  quizName.value = '';
  date.value = '';
  time.value = '';
  quizDescription.value = '';
  newQuestion.value = [
    {
      question: '',
      multipleChoices: false,
      point: 0,
      options: [
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
    },
  ];
};

const handelDelete = async (payload: { i: number }) => {
  quizzes.value.splice(payload.i, 1);
  const deleteQuizFunc = new DeleteQuizFunc();
  await deleteQuizFunc.executeAsync({ quizzes: quizzes.value });
};

const handelUpdate = async (payload: { i: number; quiz: Quiz }) => {
  quizzes.value.splice(payload.i, 1, payload.quiz);
  console.log(payload.quiz, payload.i);

  const updateQuiz = new UpdateQuiz();
  await updateQuiz.executeAsync({ quiz: payload.quiz,i:payload.i});
};

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
//card data
</script>
