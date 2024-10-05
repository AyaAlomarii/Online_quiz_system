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
            label="Delete"
            unelevated
            @click="handelDelete"
          />

          <q-btn
            class="br-8 bg-attempt text-primary q-px-lg"
            text-color="light-blue-10"
            color="light-blue-2"
            size="md"
            no-caps
            label="Edit"
            unelevated
            @click="showEditDialog=true"
          />
        </div>
      </q-card-section>
    </q-card>


    <!-- dialog -->
    <q-dialog v-model="showEditDialog" class="row">
        <q-card class="br-12 q-pa-lg width-900 hide-scrollbar">
          <q-card-section class="col-12 q-pa-md">
            <q-btn
              flat
              v-close-popup
              round
              dense
              icon="close "
              class="float-right"

            />
          </q-card-section>

          <q-card-section class="q-pa-sm text-center">
            <div class="text-h5 text-center text-weight-medium">
              Edit Quiz
            </div>
          </q-card-section>

          <q-card-section class="row justify-center">
            <q-form
              @submit.prevent="handelSubmitUpdatedQuiz"
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
                        <q-time v-model="time" mask="HH:mm" format24h>
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
                  dense
                  v-close-popup
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

</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { Question, Quiz } from '@/models/QuizModel';
// import CreateNewQuiz from 'src/functions/CreateNewQuizFunc';
// import DataObject from '@/models/DataObject';


//variables
const showEditDialog =ref<boolean>(false)

  const emit = defineEmits<{
  (event: 'delete-quiz', payload: { i: number }): void;
  (event: 'update-quiz', payload: { i: number; quiz: Quiz }): void;
}>();


const props=defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
  i:{
    type:  Number ,
    required:true
  }
});

const handelDelete=()=>{
  emit('delete-quiz',{i:props.i})
}

const date = ref<string>(props.quiz.date);
const time = ref<string>(props.quiz.start);


const quizName = ref<string>(props.quiz.name);
const quizDescription = ref<string>(props.quiz.description);
const updatedQuiz= ref<Quiz>();

const totalPoints = ref<number>(props.quiz.points);


const dateTime = computed(() => {
  return `${date.value}  ${time.value}`;
});


const newQuestion = ref<Question[]>(props.quiz.questions);

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


const sumAllPoints = () => {
  totalPoints.value = 0;
  newQuestion.value.forEach((ele) => {
    ele.point = parseFloat(`${ele.point}`);
    totalPoints.value += parseFloat(`${ele.point}`); // Convert ele.point to a number before adding
    console.log(typeof ele.point, ele.point);
  });
  console.log(typeof totalPoints.value, totalPoints.value);
};

const handelSubmitUpdatedQuiz = async () => {
  sumAllPoints();

  updatedQuiz.value = {
    id: props.quiz.id,
    date: date.value,
    description: quizDescription.value,
    name: quizName.value,
    teacher: props.quiz.teacher,
    points: totalPoints.value,
    students: props.quiz.points,
    start: time.value,
    end: time.value,
    status: props.quiz.status,
    totalQuestion: newQuestion.value.length,
    questions: newQuestion.value,
  };

  emit('update-quiz',{i:props.i,quiz:updatedQuiz.value})


  quizName.value =props.quiz.name;
  date.value =props.quiz.date ;
  time.value = props.quiz.start;
  quizDescription.value = props.quiz.description;
  totalPoints.value = props.quiz.points;
  newQuestion.value = props.quiz.questions
};

const resetOnCancel = () => {


  quizName.value =props.quiz.name;
  date.value =props.quiz.date ;
  time.value = props.quiz.start;
  quizDescription.value = props.quiz.description;
  totalPoints.value = props.quiz.points;
  newQuestion.value = props.quiz.questions
};


//for edit first create dialog  here
//create the function
//edit the inputs send the quiz as an emit also the index
//then use splice to replace it and then set it in the localStorage



</script>
