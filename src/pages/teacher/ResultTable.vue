<template>
  <div class="q-pa-md">
    <div class="br-8 row justify-between">
      <div class="row">
        <q-icon
          name="description"
          size="sm"
          class="q-pt-md q-mr-md"
          color="red"
        />
        <div class="column text-h6">
          <span>
            {{ route.query.quizName }}
          </span>

          <span class="text-body2 text-grey"> {{ currentQuiz?.date }}</span>
        </div>
      </div>

      <div class="q-pt-sm column text-body2">
        <span class="start-text"> Start: {{ currentQuiz?.start }}</span>
        <span class="end-text"> End: {{ currentQuiz?.end }}</span>
      </div>
    </div>
    <div class="row items-center q-py-md">
      <q-icon name="search" color="accent" size="sm" class="q-mr-md" />
      <q-input v-model="search" borderless label="Search" dense />
    </div>
    <div class="">
      <q-table
        :rows="filtered"
        row-key="name"
        :columns="columns"
        bordered
        hide-bottom
        table-header-class="bg-bg-grey"
        @row-click="handleRowClick"
        v-model="selected"
    >
    <template v-slot:body-cell-grade="props">
          <td class="row items-center bordered " >
            <q-linear-progress
              :value="props.row.grade / currentQuiz?.points "
              class="q-mr-sm"
              color="primary"
              track-color="light-grey"
              size="8px"
              style="width: 100px"
            />
            <span>{{ props.row.grade }}/{{ currentQuiz?.points }}</span>
          </td>
        </template>
  </q-table>



    </div>
  </div>
</template>

<script setup lang="ts">
// import eventBus from 'src/EventBus/EventBus';
import { computed, onMounted, ref } from 'vue';
import TableColumn from 'src/models/TableColumn';
import DataObject from '@/models/DataObject';

import { useRoute } from 'vue-router';
import UserModel from '@/models/UserModel';
import { Quiz } from '@/models/QuizModel';
import { useRouter } from 'vue-router';
import RoutesPaths from 'src/router/RoutesPaths';
import GetAllStudentQuizzes from 'src/functions/GetAllStudentQuizzes'
//variables
const search = ref<string>('');
const selected = ref<any>(null);

const quizByEmail = ref<DataObject>({});
const rowsName = ref<{ name: string; grade: string }[]>([]);
const quizByNames = ref<{ user: UserModel; quiz: DataObject }[]>([]);
const currentQuiz = ref<Quiz>();

const route = useRoute();
const router = useRouter();

const columns = ref<TableColumn[]>([
  {
    name: 'name',
    label: 'NAME',
    field: 'name',
    align: 'left',
    style: 'width:250px',
  },
  { name: 'grade', label: 'GRADE', field: 'grade', align: 'left', style: '' },
]);

const filtered = computed(() => {
  return (
    rowsName.value && Array.isArray(rowsName.value) ? rowsName.value : []
  ).filter((element) =>
    element.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
});

onMounted(async() => {
  const getAllStudentQuizzes=new GetAllStudentQuizzes()
  quizByEmail.value= await getAllStudentQuizzes.executeAsync()
  console.log(getAllStudentQuizzes.executeAsync(),11);

  for (let email in quizByEmail.value) {
    if (quizByEmail.value.hasOwnProperty(email)) {
      // Loop through each quiz for this user
      quizByEmail.value[email].quizzes.forEach((quiz) => {
        if (quiz.quiz?.name === route.query.quizName) {
          currentQuiz.value = quiz.quiz;
          rowsName.value.push({
            name: quizByEmail.value[email].user.username,
            grade: quiz?.score,
          });

          quizByNames.value.push({
            user: quizByEmail.value[email].user,
            quiz: quiz,
          });
        }
      });
    }
  }
  console.log(quizByNames.value);
});
// Handle row click and assign selected row
const handleRowClick = (event, row) => {
  selected.value = row;



  router.push({
    path: RoutesPaths.RESULT_STUDENT_INFO,
    query: { quizName: route.query.quizName, username: row.name }
  });


  console.log('Selected Row:', selected.value); // Debug the selected row data
};
</script>
