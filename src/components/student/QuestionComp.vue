<template>
  <div class="row q-pa-sm justify-center height-271">
    <div class="col-lg-11 col-xlg-11 col-md-8 col-sm-10 q-pa-none">

      <div class="row justify-end text-h5 end-text">{{ timer }} min</div>
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
          v-for="(qes, i) in props.quiz.questions"
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
                :val="ans"
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

    <div class="row q-py-lg full-width justify-between">
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
          props.quiz.questions && step === props.quiz.questions.length - 1
            ? 'red'
            : 'primary'
        "
        size="md"
        no-caps
        :label="
          props.quiz.questions && step === props.quiz.questions.length - 1
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
import { ref, PropType, onBeforeUnmount  } from 'vue';
import { Quiz } from 'src/models/QuizModel';
import DataObject from 'src/models/DataObject';
import RoutesPaths from 'src/router/RoutesPaths';
// import eventBus from 'src/EventBus/EventBus';
import UserModel from '@/models/UserModel';
import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
const router = useRouter();

const allAnswers = ref<DataObject>({});
const step = ref<number>(0);
const alert = ref<boolean>(false);
const score = ref<number>(0);
// const usersInfoQuiz = ref<userQuiz[]>(
//   LocalStorage.getItem('usersQuizzes') || []
// );
// const newUsersQuiz = ref<newQuiz[]>([]);
const quizInfoByEmail = ref<DataObject>(
  LocalStorage.getItem('quizInfoByEmail') || {}
);
const currentUser = ref<UserModel>(LocalStorage.getItem('currentUser'));



const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
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
        if (op.correct && op.text === selectedAnswer.text) {
          console.log(op.correct, selectedAnswer.text, 'right');
          score.value += ele.point; // Add points for correct answer
        } else {
          console.log(op.correct, selectedAnswer.text, 'wrong');
        }
      });
    } else {
      console.log('No answer selected for question', questionIndex);

      allAnswers.value[questionIndex]={text:'',correct:false}

    }

    console.log(score.value, `/${props.quiz.points}`);

  });
  console.log(allAnswers.value);

};

const nextQuestion = (i:number) => {

  const selectedAnswer = allAnswers.value[i]; // Get the selected answer for the current question

if (!selectedAnswer || selectedAnswer.text === '') {
  console.log(`No answer selected for question ${i + 1}`);

  allAnswers.value[i]={text:'',correct:false}
} else {
  console.log(`Answer selected for question ${i + 1}:`, selectedAnswer.text);
}

  if (props.quiz.questions && step.value !== props.quiz.questions.length - 1) {
    step.value++;

    console.log(allAnswers.value);

  } else {
    console.log('last question ');
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

  // Prepare new quiz entry
  //quiz:[]
  interface newQuiz {
    quiz: Quiz;
    score: number;
    answersObj:DataObject;
  };
  interface infoQuiz{
    user:UserModel,
    quizzes:newQuiz[]
  }
  const newQuizEntry :newQuiz= {
    quiz: props.quiz,
    score: score.value,
    answersObj: allAnswers.value,
  };


  // Check if the user has already taken this quiz
  const userEmail = currentUser.value.email;
  const userQuizzes = quizInfoByEmail.value[userEmail]?.quizzes || [];

  const hasTakenQuiz = userQuizzes.some(
    (entry: any) => entry.quiz.name === props.quiz.name
  );

  if (!hasTakenQuiz) {
    userQuizzes.push(newQuizEntry); // Add new quiz entry if not taken
    quizInfoByEmail.value[userEmail] = {
      user:currentUser.value,
      quizzes:userQuizzes
    } as infoQuiz

    LocalStorage.set('quizInfoByEmail', quizInfoByEmail.value); // Save to local storage
    console.log('Quiz submitted:', quizInfoByEmail.value);
    router.push({
      path: RoutesPaths.RESULT_PAGE,
      query: { quizName: props.quiz.name },
    });
  } else {
    console.log('This quiz has already been taken by the user.');
  }
};

//timer


const time = ref<number>(Number(LocalStorage.getItem('time')) || 45 * 60);
  const timer = ref<string>(LocalStorage.getItem('timer') || `${Math.floor(time.value / 60)}:${(time.value % 60).toString().padStart(2, '0')}`);

const instance = setInterval(() => {
if(time.value>0){
  timer.value = `${Math.floor(time.value / 60).toString().padStart(2, '0')}:${(time.value % 60).toString().padStart(2, '0')}`;

  LocalStorage.set('timer',timer.value)
  LocalStorage.set('time',time.value)
  time.value = time.value - 1;
}else{
  clearInterval(instance);
  LocalStorage.removeItem('time')
  LocalStorage.removeItem('timer')
  console.log('time is up',time.value,time.value/60,time.value%60);
  showNotify()
  handelSubmit()

}

}, 1000);

onBeforeUnmount(() => {
  clearInterval(instance);
});



const $q = useQuasar()

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
// Watch the timerValue ref
/* watch(timer, (newVal, oldVal) => {
  onTimerChange();


  // console.log(`The value changed from ${oldVal} to ${newVal}`); // Run this function whenever the timer changes
}); */


</script>
