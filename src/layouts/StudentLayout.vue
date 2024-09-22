<template>
  <q-layout view=" hHh lpR fFf" class="bg-bg-grey">
    <!-- Header -->
    <q-card class="height-365 q-ma-md br-8">
      <q-card-section class="no-padding">
        <q-img src="../../public/student/header.svg" class="br-t-8 h-250" />
      </q-card-section>

      <q-card-section class="row">
        <q-avatar class="col-auto q-pa-xs margin-t--50" size="128px" square>
          <q-img
            src="../../public/student/avatar.svg"
            class="width-120 height-120"
          />
        </q-avatar>
        <div class="col column  ">
          <div class="text-h5">aya</div>

          <div class="row justify-start items-center q-py-sm grey-text">
            <div class="text-body-1 text-weight-500">
              <q-icon name="person" size="sm" class="q-mr-xs"/> aya
            </div>
            <div class="text-body-1 text-weight-500 q-px-md">
              <q-icon name="email" size="sm" class="q-mr-xs"/>
              aya@gmail.com
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
    <q-footer borderless class=" row justify-center bg-bg-grey heigh-54px fixed-bottom ">
     <div class="absolute-center text-secondary text-body2 text-center">
      © 2024, Made with by <span class="text-primary">Digital Pages`-</span>
     </div>
      </q-footer>
  </q-layout>
</template>

