<template>
  <div class="fixed-center column">
    <q-card class="br-12 width-460 q-pa-lg ">
      <q-form @submit.prevent="handelLogin">
        <q-card-section class="column justify-center  w-242 text-black ">
          <div class="text-h6  q-my-md w-192 row justify-center">
            <q-icon
              name="star"
              color="primary"
              class="icon-stars w-42 text-lg text-center q-pt-xs"
            />
            <span class="q-px-sm"> Online Quiz System </span>
          </div>
          <div class="text-h5 q-mt-md q-px-sm text-left ">Welcome to Materialize! 👋</div>
          <div class="text-body1 q-px-sm q-mt-sm text-left">
            Please sign-in to your account and start the adventure
          </div>
        </q-card-section>

        <q-card-section class="column items-center ">
          <div>
            <q-input
              v-model="email"
              label="Email"
              type="email"
              dense
              outlined
              class="width-346 heigh-48px q-mt-sm "
            />
            <q-input
              v-model="password"
              label="Password"
              type="password"
              dense
              outlined
              class="width-346 heigh-48px q-mt-sm"
            >
              <template v-slot:append>
                <q-icon name="visibility" class="icon-icon" />
              </template>
            </q-input>
          </div>
          <div class="row justify-between full-width">
            <q-checkbox
              v-model="rememberMe"
              label="Remember Me"
              dense
              class="text-black q-px-sm"
            />

            <q-btn
              flat
              no-caps
              label="Forgot Password?"
              color="primary"
              class=" q-px-sm"
            />
          </div>
          <div class="full-width">
            <q-btn
              no-caps
              unelevated
              label="Login"
              color="primary"
              class="full-width q-mt-md "
              type="submit"
            />
          </div>
        </q-card-section>

        <q-card-section class="row items-center justify-between q-px-sm">
          <span class="text-black q-px-sm">New on our platform?</span>
          <q-btn
            flat
            no-caps
            label="Create an account"
            color="primary"
            @click="showDialog = true"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </div>

  <!--Dialog  -->

  <q-dialog :square="false" v-model="showDialog" class="hide-scrollbar">
    <q-card class="sizing-dialog q-pa-lg hide-scrollbar">
      <q-card-section class="q-pa-md">
        <q-btn
          flat
          v-close-popup
          round
          dense
          icon="close "
          class="absolute-right"
        />
      </q-card-section>

      <q-card-section class="q-pa-md text-center">
        <div class="dialog-create-text q-pa-sm text-center text-weight-medium">
          Create Account in
          <span class="text-primary">Online Quiz System</span>
        </div>
        <div class="dialog-create-updating-text text-accent">
          Updating user details will receive a privacy audit.
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-pa-sm">
          <q-input
            v-model="registerUsername"
            label="Username"
            type="text"
            class="bg-white q-pb-md"
            outlined
          />
          <q-input
            v-model="registerEmail"
            label="Email"
            type="email"
            class="bg-white q-pb-md"
            outlined
          />
          <q-input
            v-model="registerPassword"
            label="Password"
            type="password"
            class="bg-white q-pb-md"
            outlined
          />

          <q-input
            v-model="registerConfirmPassword"
            label="Confirm Password"
            type="password"
            class="bg-white q-pb-md"
            outlined
          />
          <q-toggle
            v-model="teacher"
            label="are you teacher ?"
            color="primary"
            class="q-pt-sm"
          />
        </q-form>
      </q-card-section>

      <q-card-actions class="q-pa-lg" align="right">
        <q-btn
          label="Create"
          v-close-popup
          class="dialog-btn bg-primary text-white q-mr-md"
        />
        <q-btn
          label="Cancel"
          v-close-popup
          class="dialog-btn bg-white text-accent"
          outlined
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref<string>();
const password = ref<string>();
const rememberMe = ref<boolean>(false);
const showDialog = ref<boolean>(false);
const teacher = ref<boolean>(false);

//register variables
const registerUsername = ref<string>();
const registerEmail = ref<string>();
const registerPassword = ref<string>();
const registerConfirmPassword = ref<string>();

import LoginFunc from '../functions/LoginFunc';
const handelLogin = () => {
  new LoginFunc()
    .executeAsync({ email: email, password: password })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
