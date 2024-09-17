<template>
  <q-page class="q-pa-md">
    <q-img class="fullscreen" src="../assets/images//loginBackground.png">
      <q-card
        class="card q-gutter-sm column items-center fixed-center bg-white justify-center"
        flat
      >
        <div class="logo q-pb-lg row items-center">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.9998 26.8334L14.1421 31.0217L16.0065 23.205L9.90479 17.9784L17.914 17.3367L20.9998 9.91669L24.0856 17.3367L32.096 17.9784L25.9931 23.205L27.8575 31.0217L20.9998 26.8334Z"
              fill="#666CFF"
            />
          </svg>
          <div class="logo-text text-left text-secondary">Online Quiz System</div>
        </div>

        <q-form
          class="text-well q-gutter-sm items-start"
          @submit.prevent="handelLogin"
        >
          <div class="welcome text-left text-secondary text-weight-500">
            Welcome to Materialize! 👋🏻
            <div class="text-adv text-left text-secondary text-weight-600px text-accent">
              Please sign-in to your account and start the adventure
            </div>
          </div>
          <q-input
            v-model="email"
            label="Email"
            class="login-input bg-white rounded q-pb-sm"
            :dense="dense"
            outlined=""
          />
          <q-input
            v-model="password"
            label="Password"
            class="login-input outline"
            :dense="dense"
            outlined=""
          >
          <template v-slot:append>
                <q-btn round dense flat icon="add" />
              </template>
        </q-input>
          <q-card-section class="row justify-between text-center">
            <q-checkbox
              v-model="rememberMe"
              label="Remember Me"
              class="text-secondary"
              color="primary"
            />
            <q-btn flat class="text-primary ripple" label="Forget Password ?" />
          </q-card-section>
          <q-btn
            color="primary"
            text-color="white"
            label="Login"
            class="login-btn"
          />
        </q-form>
        <q-card-section class="row justify-between">
          <q-btn flat  class="text-accent no-pointer-events" label="New to our platform ?"  />
          <!-- <q-btn flat  class="text-primary " label="New to our platform ?"/>
           
          try no-pointer-events 
          cursor-none
          -->
       <!--    <div class="text-secondary text-center items-center text-weight-medium">
            New to our platform
          </div> -->
          <q-btn
            flat
            class="text-primary"
            label="Create an account"
            @click="large = true"
          />
        </q-card-section>
      </q-card>

      <!--Dialog  -->

      <q-dialog :square="false" v-model="large" class="hide-scrollbar" >
        <q-card class="sizing-dialog q-pa-lg   hide-scrollbar ">
          <q-card-section class="q-pa-md">
            <q-btn flat v-close-popup round dense icon="close " class=" absolute-right"/>
          </q-card-section>
         
          <q-card-section class=" q-pa-md text-center">
           <div class="dialog-create-text q-pa-sm text-center text-weight-medium"> Create Account in <span class="text-primary">Online Quiz System</span></div>
           <div class="dialog-create-updating-text text-accent">Updating user details will receive a privacy audit.</div>
          </q-card-section>
         
         
          <q-card-section>
            <q-form class="q-pa-sm">
              <q-input
                v-model="registerUsername"
                label="Username"
                type="text"
                class="bg-white q-pb-md"
                outlined=""
              />
              <q-input
                v-model="registerEmail"
                label="Email"
                type="email"
                class="bg-white q-pb-md"
                outlined=""
              />
              <q-input
                v-model="registerPassword"
                label="Password"
                type="password"
                class="outline bg-white q-pb-md"
                outlined=""
              />

              <q-input
                v-model="registerConfirmPassword"
                label="Confirm Password"
                type="password"
                class="outline bg-white q-pb-md"
               
                outlined=""
              />
              <q-toggle v-model="teacher" label="are you teacher ?" color="primary" class="q-pt-sm"/>
            </q-form>
          </q-card-section>

          <q-card-actions class=" q-pa-lg" align="right">
            <q-btn
              
              label="Create"
              v-close-popup
              class="dialog-btn bg-primary text-white q-mr-md"
              
            />
            <q-btn  label="Cancel" v-close-popup class=" dialog-btn bg-white text-accent "  outlined />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-img>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref<string>();
const password = ref<string>();
const rememberMe = ref<boolean>(false);
const large = ref<boolean>(false);
const teacher=ref<boolean>(false)

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
