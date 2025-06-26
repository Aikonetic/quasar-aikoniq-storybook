<template>
  <q-layout view="lHh Lpr lFf" @scroll="scrollHandler">
    <q-page-container>
      <router-view />
    </q-page-container>
    <div style="height: 800px; width: 100%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
      Test
    </div>
    <q-banner class="bg-red">Test</q-banner>
  </q-layout>
</template>

<script setup>
import {useGlobalStore} from "stores/globalStore.js";

const globalStore = useGlobalStore();

const scrollHandler = (info) => {
  globalStore.setScrollInfo(info);
  globalStore.setImmediateScrollInfo(info);
}
</script>
