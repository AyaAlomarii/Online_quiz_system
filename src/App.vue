<template >
  <router-view />

  <div
      v-if="!$route.path.includes('access')"
      class="row justify-center bg-bg-grey items-center q-ma-none"
    >
      <span class="text-grey-8">
        © {{ new Date().getFullYear() }}, Made by
      </span>
      <q-btn
        flat
        no-caps
        class="q-ml-none q-px-sm text-body2 text-primary"
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
