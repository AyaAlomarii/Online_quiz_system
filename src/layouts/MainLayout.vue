<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-white">
      <q-header elevated>
        <q-toolbar class="full-width row justify-start items-center bg-teal-1 text-black">
          <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-space class="col" />
        <div
          class="q-px-sm col-3"
          v-for="(menuItem, index) in menu"
          :key="index"
        >
          <q-btn
            :label="menuItem.label"
            no-caps
            color="primary"
            text-color="black"
            class="bg-white fit shadow-2"
            :to="menuItem.to"
            :icon="menuItem.icon || 'contact_support'"
          />
        </div>
        </q-toolbar>
      </q-header>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RoutesPaths from '../router/RoutesPaths'

interface MenuItem {
  label: string;
  to: string;
  icon?: string;
}
const menu = ref<Array<MenuItem>>([
  {
    label: 'Home',
    to: RoutesPaths.HOME,
    icon: 'home',
  },

]);

</script>
