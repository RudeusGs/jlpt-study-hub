<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Loading from './components/Loading.vue';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
    <!-- Background gradient accent -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
    </div>
    
    <Loading />
    <Navbar v-if="route.name !== 'login'" />
    <main class="flex-grow relative">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
