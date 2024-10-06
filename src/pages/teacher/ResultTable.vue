<template>
  <div class="q-pa-md ">
    <div class="br-8 row justify-between ">
        <div class="row">
          <q-icon
            name="description"
            size="sm"
            class="q-pt-md q-mr-md"
            color="red"
          />
          <div class="column text-h6" >
            <span   >
              {{ resultVariable.quizTeacher.name }}
            </span>

            <span class="text-body2 text-grey"> {{ resultVariable.quizTeacher.date }}</span>
          </div>
        </div>

        <div class="q-pt-sm column text-body2">
          <span class="start-text"> Start: {{ resultVariable.quizTeacher.start }}</span>
          <span class="end-text"> End: {{ resultVariable.quizTeacher.end }}</span>
        </div>
      </div>
      <div class="row items-center q-py-md" >
          <q-icon name="search" color="accent" size="sm" class="q-mr-md" />
          <q-input v-model="search" borderless label="Search" dense  />
        </div>
        <div class="">
    <q-table
      :rows="filtered"
      row-key="name"
      :columns="columns"
       bordered
      hide-bottom
      table-header-class="bg-bg-grey"
    />
  </div>
  </div>
</template>

<script setup lang="ts">
import eventBus from 'src/EventBus/EventBus';
import { computed, ref } from 'vue';
import TableColumn from 'src/models/TableColumn';
//variables
const search =ref<string>('')
const resultVariable= computed(() => {
  return {
    quizTeacher: eventBus.quizTeacher,
  };
});

const columns = ref<TableColumn[]>([
  {
    name: 'name',
    label: 'NAME',
    field: 'name',
    align: 'left',
    style: 'width:250px',
  },
  { name: 'grade', label: 'GRADE', field: 'grade', align: 'left',style: '', },
]);
const rows = ref([
  { name: 'Laila Ali Al-Ali', grade: '30/50' },
  { name: 'Saif Mohammad', grade: '40/50' },
  { name: 'Reema Khaled', grade: '20/50' },
  { name: 'Ahmed Hassan', grade: '48/50' },
  { name: 'Sara Ahmed', grade: '35/50' },
]);


const filtered = computed(() => {
  return (
    rows.value && Array.isArray(rows.value) ? rows.value : []
  ).filter((element) =>
    element.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
});
</script>
