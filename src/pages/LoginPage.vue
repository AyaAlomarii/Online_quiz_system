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
          <div class="logo-text text-left text-primary">Online Quiz System</div>
        </div>

        <q-form
          class="text-well q-gutter-sm items-start"
          @submit.prevent="handelLogin"
        >
          <div class="welcome text-left text-primary text-weight-500">
            Welcome to Materialize! 👋🏻
            <div class="text-adv text-left text-primary text-weight-600px">
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
          />
          <q-card-section class="row justify-between text-center">
            <q-checkbox
              v-model="rememberMe"
              label="Remember Me"
              class="text-primary"
              color="secondary"
            />
            <q-btn flat class="text-primary ripple" label="Forget Password ?" />
          </q-card-section>
          <q-btn
            color="secondary"
            text-color="white"
            label="Login"
            class="login-btn"
          />
        </q-form>
        <q-card-section class="row justify-between">
          <!-- <q-btn flat  class="text-primary " label="New to our platform ?"/> -->
          <div class="text-primary text-center items-center text-weight-medium">
            New to our platform
          </div>
          <q-btn flat class="text-secondary" label="Create an account" />
        </q-card-section>
      </q-card>
    </q-img>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref<string>();
const password = ref<string>();
const rememberMe = ref<boolean>();
import LoginFunc from '../functions/LoginFunc'
const handelLogin = () => {
  new LoginFunc()
.executeAsync({email:email,password:password})
.then((response)=>{
  console.log(response.data);

})
.catch((error)=>{
  console.log(error)

})
};
</script>
