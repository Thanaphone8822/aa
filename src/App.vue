<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainView from './views/MainView.vue';
import UserView from './views/UserView.vue';
import P_mainView from './views/P_mainView.vue';
import Licence_card from './components/Licence_card.vue';
import Payment from './components/Payment.vue';
import Confirm from './components/Confirm.vue';

</script>

<template>
  <div class="bg-white">
    <!-- <Payment/> -->
    <!-- <Licence_card/>  -->
    <!-- <P_mainView /> -->
    <!-- <Licence_card/> -->
    <MainView />
    <!-- <Confirm/> -->
  </div>
</template>

<style scoped>
</style>
