<template>
  <router-view />
  <!-- <q-footer
      borderless
      class="row justify-center bg-bg-grey heigh-54px fixed-bottom"
    >
      <div class="absolute-center text-secondary text-body2 text-center">
        © 2024, Made with by <span class="text-primary">Digital Pages</span>
      </div>
    </q-footer> -->
  <div
      v-if="!$route.path.includes('access')"
      class="row justify-center bg-bg-grey items-center"
    >
      <span class="text-grey-8">
        © {{ new Date().getFullYear() }}, Made by
      </span>
      <q-btn
        flat
        no-caps
        class="q-ml-none q-px-sm text-caption text-primary"
        @click="()=>{
          $router.push({
        path: 'https://www.digitalpages.com'
      } as RouteLocationRaw)
    }"
        label="Digital Pages"
      />
    </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
</script>
