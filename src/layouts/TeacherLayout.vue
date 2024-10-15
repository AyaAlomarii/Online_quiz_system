<template>
  <q-layout class="bg-bg-grey">
    <div
      class="col-auto bg-transparent q-px-md q-pb-none q-pt-sm row justify-between items-center"
    >
      <span class="text-h6 text-primary">Online Quiz System</span>
      <q-btn
        flat
        ::to='Routes.LOGIN'
        @click="
          () => {
            SessionUtil.logout();
          }
        "
        icon="logout"
      />
    </div>
    <!-- Header -->
    <q-card class="q-ma-md br-8">
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
  </q-layout>
</template>

<script setup lang="ts">
import UserModel from 'src/models/UserModel';
import { LocalStorage } from 'quasar';
import { onMounted, ref } from 'vue';
import SessionUtil from 'src/util/SessionUtil';
import Routes from 'src/router/RoutesPaths';
// variables
const userInfo = ref<UserModel | null>(null); // Handle null

onMounted(() => {
  const storedUser = LocalStorage.getItem('currentUser') as UserModel | null;
  if (storedUser) {
    userInfo.value = storedUser;
  }
});
</script>
