<template>
  <q-layout class="bg-bg-grey">
    <!-- Header -->
    <q-card class="height-365 q-ma-md br-8">
      <q-card-section class="no-padding">
        <q-img src="/student/header.svg" class="br-t-8 h-250" />
      </q-card-section>

      <q-card-section class="row">
        <q-avatar class="col-auto q-pa-xs margin-t--50" size="128px" square>
          <q-img src="/teacher/avatar.svg" class="width-120 height-120" />
        </q-avatar>
        <div class="col column">
          <div class="text-h6">{{ userInfo?.role || 'Unknown User' }}</div>

          <div class="row justify-start items-center q-py-sm grey-text">
            <div class="text-body-1 text-weight-500">
              <q-icon name="person" size="sm" class="q-mr-xs" />
              {{ userInfo?.username || 'Unknown User' }}
            </div>
            <div class="text-body-1 text-weight-500 q-px-md">
              <q-icon name="email" size="sm" class="q-mr-xs" />
              {{ userInfo?.email || 'No email available' }}
            </div>

            <q-space />
            <q-btn icon="notifications" size="sm" round flat />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- footer -->
    <q-footer
      borderless
      class="row justify-center bg-bg-grey heigh-54px fixed-bottom"
    >
      <div class="absolute-center text-secondary text-body2 text-center">
        © 2024, Made with by <span class="text-primary">Digital Pages</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import UserModel from 'src/models/UserModel';
import { LocalStorage } from 'quasar';
import { onMounted, ref } from 'vue';

// variables
const userInfo = ref<UserModel | null>(null); // Handle null

onMounted(() => {
  const storedUser = LocalStorage.getItem('currentUser') as UserModel | null;
  if (storedUser) {
    userInfo.value = storedUser;
  }
});
</script>
