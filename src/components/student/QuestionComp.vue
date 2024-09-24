<template>
  <div class="row q-pa-md justify-center height-271">
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      done-color="deep-orange"
      active-color="purple"
      inactive-color="secondary"
      header-class="display-none"
      class="col-11"
    >
      <q-step
        v-for="(qes, i) in props.quiz.questions"
        :key="i"
        :name="i"
        :title="`q-${qes.question}`"
        icon="settings"
        :done="step > 1"
      >
        <div class="text-h5">Question {{ qes.question }}</div>
        <div class="column">
          {{ qes.text }}

          <div v-for="(ans, index) in qes.options" :key="index" class="column">
            <q-radio
              v-model="allAnswers[qes.question]"
              :val="ans"
              :label="ans"
              @click="handelAnswer()"
            />
          </div>
        </div>
      </q-step>
   
    </q-stepper>

    <div class="row q-pa-lg full-width justify-between">
      <q-btn
        v-if="step > 0"
        class="br-8 bg-attempt text-primary"
        outline
        size="md"
        no-caps
        label="Back"
        @click="previousQuestion"
      />
      <q-btn
        class="br-8 bg-primary text-white"
        outline
        size="md"
        no-caps
        :label="props.quiz.questions && step === props.quiz.questions.length - 1 ? 'Finish' : 'Continue'"
        @click="nextQuestion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import { Quiz } from 'src/models/QuizModel';
import DataObject from 'src/models/DataObject';
const allAnswers = ref<DataObject>({});
const step = ref<number>(0);

const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    default: {} as Quiz,
  },
});


//functions
const handelAnswer = () => {
  console.log(allAnswers.value);
};

const nextQuestion = () => {
  if (props.quiz.questions && step.value !== props.quiz.questions.length - 1) {
    step.value++;

    console.log(step.value);
  } else {
    console.log('last question ');
    //open submit dialog 

  }
};

const previousQuestion = () => {
  step.value--;
};
</script>
