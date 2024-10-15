<template>
  <div class="row justify-center">
    <div class="column q-pa-sm justify-center  col-lg-10 col-xlg-10 col-md-9 col-sm-10 q-pa-none">
      <q-btn dense flat size="lg" no-caps disable  class=" row justify-end end-text " text-color="red-7" align="right">{{ timer }} min</q-btn>

      <q-stepper
        v-model="step"
        ref="stepper"
        animated
        done-color="deep-orange"
        active-color="purple"
        inactive-color="secondary"
        header-class="display-none"
      >
        <q-step
          v-for="(qes, i) in props.quiz?.questions"
          :key="i"
          :name="i"
          :title="`q-${i}`"
          icon="settings"
          :done="step > 1"
        >
          <div class="row q-pb-sm items-center justify-between">
            <div class="text-h6">
              <q-icon
                name="library_books"
                size="sm"
                class="q-pr-sm"
                color="yellow"
                
              />
              Question {{ i + 1 }}
            </div>

            <span class="text-body2 question-grey-text"
              >{{ qes.point }} point</span
            >
          </div>
          <div class="column question-grey-text text-body2">
            <span class="q-pb-md">
              {{ qes.question }}
            </span>
            <div
              v-for="(ans, index) in qes.options"
              :key="index"
              class="column q-py-xs"
            >
              <q-radio
                v-model="allAnswers[i]"
                :val="ans.text"
                :label="ans.text"
                color="primary"
                keep-color
                dense
              />
            </div>
          </div>
        </q-step>
      </q-stepper>
    </div>

    <div class="row q-pa-md full-width justify-between">
      <q-btn
        :disable="step > 0 ? false : true"
        class="br-8 bg-attempt text-primary"
        outline
        size="md"
        no-caps
        label="Back"
        @click="previousQuestion"
      />
      <q-btn
        class="br-8 text-white"
        :color="
          props.quiz?.questions && step === props.quiz?.questions.length - 1
            ? 'red'
            : 'primary'
        "
        size="md"
        no-caps
        :label="
          props.quiz?.questions && step === props.quiz?.questions.length - 1
            ? 'Submit'
            : 'Next'
        "
        @click="nextQuestion(step)"
      />
    </div>
    <q-dialog class="q-pa-md" v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Submitting the quiz !</div>
        </q-card-section>

        <q-card-section class="q-pt-none question-grey-text">
          Are you sure !, When you submit the answers you cant go back again .
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            flat
            label="Cancel"
            class="br-8 q-px-md bg-white"
            outline
            color="red"
            size="md"
            dense
            no-caps
            v-close-popup
          />

          <q-btn
            flat
            label="Submit"
            @click="handelSubmit"
            outline
            size="md"
            dense
            no-caps
            class="br-8 bg-red q-pa-lg"
            text-color="white"
          />

          <!--  -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, onBeforeUnmount, onMounted } from 'vue';
import { Quiz } from 'src/models/QuizModel';
import DataObject from 'src/models/DataObject';
import RoutesPaths from 'src/router/RoutesPaths';
// import eventBus from 'src/EventBus/EventBus';
import UserModel from '@/models/UserModel';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import UpdateQuiz from 'src/functions/UpdateQuizFun';
import { useRoute } from 'vue-router';

import { LocalStorage } from 'quasar'; // Import Quasar's date utility
import { newQuiz, infoQuiz } from 'src/models/QuizLocalModel';

/*  formattedTime===props.quiz?.end ? false : true  */
const route = useRoute();

const router = useRouter();
const currentQuiz = ref<newQuiz>();
const allAnswers = ref<DataObject>({});
const step = ref<number>(0);
const alert = ref<boolean>(false);
const score = ref<number>(0);
const quizInfoByEmail = ref<DataObject>(
  LocalStorage.getItem('quizInfoByEmail') || {}
);
const currentUser = ref<UserModel>(LocalStorage.getItem('currentUser'));

// const diffInMinutes = ref<number>(0)

const time = ref<number>(45 * 60);

const timer = ref<string>(
  `${Math.floor(time.value / 60)}:${(time.value % 60)
    .toString()
    .padStart(2, '0')}`
);

const userEmail = ref<string>(currentUser.value.email);

//variables
const userQuizzes = ref<newQuiz[]>(
  quizInfoByEmail.value[userEmail.value]?.quizzes || []
);

const quizIndexInObj = ref<number>(
  userQuizzes.value.findIndex((q) => q.quiz.name === route.query.quizName) ||
    null
);
const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
});

const updatedQuiz = ref<Quiz>(props.quiz);

onMounted(() => {
  currentQuiz.value =
    userQuizzes.value.find((q) => q.quiz.name === route.query.quizName) || null;
  allAnswers.value = currentQuiz.value?.answersObj || {};
  // Use the existing quizStartedAt or load it from local storage if needed
  let quizStartedAt: number = currentQuiz.value?.quizStartedAt;


  if (quizStartedAt) {
    quizStartedAt = currentQuiz.value.quizStartedAt;
    console.log(
      `Loaded existing quizStartedAt: ${currentQuiz.value.quizStartedAt}`
    );
  } else {
    quizStartedAt = Date.now();
    console.log(`New quizStartedAt initialized: ${quizStartedAt}`);
  }

  const now = Date.now();
  const diffInSeconds = Math.floor((now - quizStartedAt) / 1000);
  // Set the remaining time (in seconds), ensuring it doesn't go negative
  const totalQuizTime = 45 * 60; // 45 minutes in seconds
  time.value = Math.max(totalQuizTime - diffInSeconds, 0);
  console.log(time.value);

  console.log(
    `Quiz started at: ${quizStartedAt}, Now: ${now}, Diff: ${diffInSeconds} seconds`
  );


  if (time.value <= 0) {
    console.log('Quiz time is up. Redirecting to the result page.');
    handelSubmit();

    return;
  }

  // Start the timer to update every second
  startTimer();
});

// Functions
const handelScore = () => {
  score.value = 0; // Initialize score to 0

  // Loop through each question
  props.quiz?.questions?.forEach((ele, questionIndex) => {
    const selectedAnswer = allAnswers.value[questionIndex]; // Get selected answer object for this question

    if (selectedAnswer) {
      ele.options.forEach((op) => {
        // Check if the selected answer's text matches the correct option
        if (op.correct && op.text === selectedAnswer) {
          console.log(op.correct, selectedAnswer.text, 'right');
          score.value += ele.point; // Add points for correct answer
        } else {
          console.log(op.correct, selectedAnswer, 'wrong');
        }
      });
    } else {
      console.log('No answer selected for question', questionIndex);

      allAnswers.value[questionIndex] = '';
    }

    console.log(score.value, `/${props.quiz.points}`);
  });
  console.log(allAnswers.value);
};

const nextQuestion = (i: number) => {
  currentQuiz.value =
    userQuizzes.value.find((q) => q.quiz.name === route.query.quizName) || null;

  const selectedAnswer = allAnswers.value[i];

  if (!selectedAnswer || selectedAnswer.text === '') {
    console.log(`No answer selected for question ${i + 1}`);

    allAnswers.value[i] = '';
  } else {
    console.log(`Answer selected for question ${i + 1}:`, selectedAnswer.text);
  }

;
  userQuizzes.value.splice(quizIndexInObj.value, 1, currentQuiz.value);


  quizInfoByEmail.value[userEmail.value] = {
    user: currentUser.value,
    quizzes: userQuizzes.value,
  } as infoQuiz;

  LocalStorage.set('quizInfoByEmail', quizInfoByEmail.value);

  if (props.quiz.questions && step.value !== props.quiz.questions.length - 1) {
    step.value++;

  } else {

    //open submit dialog
    alert.value = true;
  }
};

const previousQuestion = () => {
  step.value--;
};

// Submit the quiz and save data
const handelSubmit = () => {
  // Calculate score
  handelScore();
  currentQuiz.value =
    userQuizzes.value.find((q) => q.quiz.name === route.query.quizName) || null;

  currentQuiz.value.score = score.value;


  userQuizzes.value.splice(quizIndexInObj.value, 1, currentQuiz.value);


  quizInfoByEmail.value[userEmail.value] = {
    user: currentUser.value,
    quizzes: userQuizzes.value,
  } as infoQuiz;

  LocalStorage.set('quizInfoByEmail', quizInfoByEmail.value);


  // Safely update the quiz status
  if (currentQuiz.value.quiz) {
    currentQuiz.value.quiz.status = 'not active';
    updatedQuiz.value = currentQuiz.value.quiz;

    router.push({
      path: RoutesPaths.RESULT_PAGE,
      query: { quizName: currentQuiz.value.quiz.name },
    });
  } else {
    console.error('Quiz object is missing!');
  }


  const updateQuizActive = new UpdateQuiz();

  updateQuizActive.executeAsync({
    quiz: updatedQuiz.value,
    i: route.query.index,
  });
};

// Timer logic
const startTimer = () => {
  const instance = setInterval(() => {
    if (time.value > 0) {
      // Update the displayed time (in minutes and seconds)
      timer.value = `${Math.floor(time.value / 60)
        .toString()
        .padStart(2, '0')}:${(time.value % 60).toString().padStart(2, '0')}`;

      time.value--;
    } else {
      // Time is up, clear the interval and submit the quiz
      clearInterval(instance);
      showNotify();
      handelSubmit();
    }
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(instance);
  });
};

const $q = useQuasar();

const showNotify = () => {
  $q.notify({
    message: 'The exam has ended.',
    caption: 'Your time is up!',
    icon: 'alarm',
    color: 'red',
    position: 'top',
    timeout: 5000, // Show for 5 seconds
  });
};


</script>
