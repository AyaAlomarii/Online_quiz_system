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
          :title="`q-${qes.question}`"
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
              Question {{ qes.question }}
            </div>

            <span class="text-body2 question-grey-text">5 points</span>
          </div>
          <div class="column question-grey-text text-body2">
            <span class="q-pb-md">
              {{ qes.text }}
            </span>
            <div
              v-for="(ans, index) in qes.options"
              :key="index"
              class="column q-py-xs"
            >
              <q-radio
                v-model="allAnswers[qes.question]"
                :val="ans"
                :label="ans"
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
        @click="nextQuestion"
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
            :to="RoutesPaths.RESULT_PAGE"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, onBeforeUnmount } from 'vue';
import { Quiz } from 'src/models/QuizModel';
import DataObject from 'src/models/DataObject';
import RoutesPaths from 'src/router/RoutesPaths';
import eventBus from 'src/EventBus/EventBus';
const allAnswers = ref<DataObject>({});
const step = ref<number>(0);
const alert = ref<boolean>(false);
const score = ref<number>(0);

const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
});

//functions
const handelScore = () => {
  //for loop
  props.quiz?.questions?.forEach((ele) => {
    if (ele.correctAnswer === allAnswers.value[ele.question]) {
      console.log(ele.correctAnswer, allAnswers.value[ele.question], 'right');

      score.value += 10;
    } else {
      console.log(ele.correctAnswer, allAnswers.value[ele.question], 'wrong');
    }
    console.log(score.value, '/30');
  });
};

const nextQuestion = () => {
  if (props.quiz.questions && step.value !== props.quiz.questions.length - 1) {
    step.value++;

    console.log(step.value);
  } else {
    console.log('last question ');
    //open submit dialog
    alert.value = true;
  }
};

const previousQuestion = () => {
  step.value--;
};

const handelSubmit = () => {
  //calculate score
  handelScore();
  //event bus variables
  eventBus.quiz = props.quiz;
  eventBus.questions = props.quiz.questions;
  eventBus.score = score.value;
  eventBus.answersObj = allAnswers.value;
};

//timer
const time = ref<number>(45 * 60);
const timer = ref<string>(`${time.value / 60}:${Math.ceil(time.value % 60)}`);

const instance = setInterval(() => {
  timer.value = `${Math.ceil(time.value / 60) < 10 ? '0' : ''}${Math.ceil(
    time.value / 60
  )}:${Math.ceil(time.value % 60) < 10 ? '0' : ''}${Math.ceil(
    time.value % 60
  )}`;

  time.value = time.value - 1;
}, 1000);

onBeforeUnmount(() => {
  clearInterval(instance);
});
</script>
