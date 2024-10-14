<template>
  <div class="fixed-center column">
    <q-card class="br-12 width-460 q-pa-lg">
      <q-form @submit.prevent="handelLogin">
        <q-card-section
          class="column justify-center w-242 text-black q-pb-none"
        >
          <div class="text-h6 q-my-md w-192 row justify-center">
            <q-icon
              name="star"
              color="primary"
              class="icon-stars w-42 text-lg text-center q-pt-xs"
            />
            <span class="q-px-sm"> Online Quiz System </span>
          </div>
          <div class="text-h5 q-mt-md text-left">
            Welcome to Materialize! 👋
          </div>
          <div class="text-body1 full-width q-mt-sm text-left grey-text">
            Please sign-in to your account and start the adventure
          </div>
        </q-card-section>

        <q-card-section class="column">
          <div>
            <div v-if="errorMessage ==='Invalid email or password.'" class="text-red text-caption q-pb-md">{{
              errorMessage
            }}</div>
            <q-input
              v-model="email"
              label="Email"
              type="email"
              dense
              outlined
              class="br-8 q-mt-sm"
            />
            <q-input
              v-model="password"
              label="Password"
              type="password"
              dense
              outlined
              class="br-8 q-mt-md"
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
              class="text-black q-py-md br-8"
              size="sm"
            />

            <q-btn
              flat
              no-caps
              label="Forgot Password?"
              color="primary"
              class="q-py-md"
              dense
            />
          </div>
          <div class="full-width">
            <q-btn
              no-caps
              unelevated
              label="Login"
              color="primary"
              class="full-width q-mt-md br-8"
              type="submit"
            />
          </div>
        </q-card-section>

        <q-card-section class="row items-center justify-between q-px-sm">
          <span class="q-px-sm grey-text">New on our platform?</span>
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

  <q-dialog v-model="showDialog" class="br-12 hide-scrollbar">
    <q-card class="br-12 width-900 q-pa-lg hide-scrollbar">
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
        <div class="text-h5 q-pa-sm text-center text-weight-medium">
          Create Account in
          <span class="text-primary">Online Quiz System</span>
        </div>

        <div class="text-body2 grey-text">
          Updating user details will receive a privacy audit.
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handelRegister" class="q-pa-sm">
          <q-input
            v-model="registerUsername"
            dense
            label="Username"
            type="text"
            class="bg-white q-pb-md"
            outlined
          />
          <q-input
            v-model="registerEmail"
            dense
            label="Email"
            type="email"
            class="bg-white q-pb-md"
            outlined
          />
          <div v-if="errorMessage ==='An account with this email already exists'" class="text-red text-caption q-pb-md">{{
              errorMessage
            }}</div>
          <q-input
            v-model="registerPassword"
            dense
            label="Password"
            type="password"
            class="bg-white q-pb-md"
            outlined
          />

          <q-input
            v-model="registerConfirmPassword"
            dense
            label="Confirm Password"
            type="password"
            class="bg-white q-pb-md"
            outlined
          />
          <div v-if="errorMessage ==='Passwords do not match,please try again'" class="text-red text-caption q-pb-md">{{
              errorMessage
            }}</div>
          <q-toggle
            v-model="teacher"
            label="are you teacher ?"
            color="primary"
            class="q-pt-sm"
            dense
          />

          <div class="q-py-md" align="right">

            <q-btn
              type="submit"
              label="Create"
              dense
              class=" br-8 bg-primary text-white q-mr-md q-py-xs q-px-md "

            />
            <q-btn
              label="Cancel"
              v-close-popup
              type="reset"
              dense
              class="br-8 bg-white text-accent  q-py-xs q-px-md"
              outlined
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import UserModel from 'src/models/UserModel';
import Routes from 'src/router/RoutesPaths';
import { LocalStorage } from 'quasar';
import LoginFun from 'src/functions/LoginFunc';
const email = ref<string>();
const password = ref<string>();
const rememberMe = ref<boolean>(false);
const showDialog = ref<boolean>(false);
const teacher = ref<boolean>(false);
const allUsers = ref<UserModel[]>([]);
const currentUsers = ref<UserModel>();
const errorMessage = ref<string>('');
//register variables
const registerUsername = ref<string>();
const registerEmail = ref<string>();
const registerPassword = ref<string>();
const registerConfirmPassword = ref<string>();
const userInfoReg = ref<UserModel[]>(LocalStorage.getItem('users') || []);

import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(async()=>{
    const loginFunc = new LoginFun();
  allUsers.value = (await loginFunc.executeAsync()) as UserModel[];
  console.log(toRaw(allUsers.value));
})

const handelLogin =  () => {

  // Find the user based on email and password
  currentUsers.value =
    allUsers.value.find(
      (q) => q.email === email.value.toLocaleLowerCase() && q.password === password.value
    ) || null;

  console.log(currentUsers.value);

  if (currentUsers.value !== null) {
    LocalStorage.set('currentUser', currentUsers.value);
    if (currentUsers.value.role === 'student') {
      router.push({ path: Routes.QUIZ });
    } else if (currentUsers.value.role === 'teacher') {
      router.push({ path: Routes.TEACHER_QUIZ });
    }
  } else {
    errorMessage.value = 'Invalid email or password.';
    console.log('Invalid email or password.');
  }
};

const handelRegister = () => {

  const uniqueEmail= allUsers.value.some(
      (q) => q.email === registerEmail.value
    ) || null;

    if(uniqueEmail){
      errorMessage.value = 'An account with this email already exists';

      console.log('An account with this email already exists');
}else{

  if (registerPassword.value === registerConfirmPassword.value) {
    userInfoReg.value.push({
      username: registerUsername.value,
      email: registerEmail.value.toLocaleLowerCase(),
      password: registerPassword.value,
      role: teacher.value ? 'teacher' : 'student',
    });

    LocalStorage.set('users', userInfoReg.value);

  } else {
errorMessage.value='Passwords do not match,please try again'
    console.log('there is an error');

  }

}
registerUsername.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    teacher.value = false;
    registerConfirmPassword.value = '';

};
</script>
