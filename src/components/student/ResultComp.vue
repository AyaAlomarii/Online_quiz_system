<template>
  <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12  q-py-md q-pr-md "
 >
     <q-card class="  q-pa-sm height-190 bg-white text-black"
       
      
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
         <span> {{ quiz.points }}/50 Point</span>
         <span> {{ quiz.students }}  Student</span>
         <div class=" row justify-end ">
        
      </div>
      </q-card-section>
      

    </q-card>

  </div>


</template>


<script setup lang="ts">

import Quiz from '../../models/QuizModel'

defineProps({
  quiz:{
    type: Object as PropType<Quiz>,
      default:{} as Quiz
  }
})
 


</script>