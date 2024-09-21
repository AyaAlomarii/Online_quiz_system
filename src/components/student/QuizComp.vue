<template>
  <div class="q-py-md q-px-none  row justify-around full-width"
  style="width: 1,392px;" >
     <q-card v-for="(quiz,i) in quizzes" :key="i"
       class="q-my-md q-mr-md  q-pa-sm width-408 height-190 bg-white text-black"
      
    >
      <q-card-section class="br-8 row justify-between">
        <div class="row ">
          <q-icon name="description" size="sm" class="q-pt-md q-mr-md" color="black"/>
        <div class="column text-h6">

          <span> 
            {{ quiz.title }}
          </span>
        
         <span class="text-body2 text-grey"> {{ quiz.date }}</span>
        
        </div>
      </div>
        

        <div class="q-pt-sm column text-body2 ">
         <span class="start-text" > Start: {{ quiz.start }}</span>
         <span class="end-text"> End: {{ quiz.end }}</span>
        
        </div>
      </q-card-section>

      <q-card-section class=" column text-body2 text-grey q-py-none">
        <span >{{ quiz.teacher }}</span>
         <span> {{ quiz.points }}  Point</span>
         <span> {{ quiz.students }}  Student</span>

      </q-card-section>
      <q-card-section class=" row justify-end ">
        <q-btn  class=" bg-attempt no-caps  text-primary "  outline size="md">Attempt</q-btn>
      </q-card-section>

    </q-card>

  </div>


</template>


<script setup lang="ts">
import { ref } from 'vue';
import Quiz from '../../models/QuizModel'


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
  },
]); 


</script>