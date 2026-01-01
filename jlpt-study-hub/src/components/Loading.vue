<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[999] grid place-items-center bg-black/30 backdrop-blur-xl"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="w-[92vw] max-w-sm rounded-3xl border border-black/10 bg-white/70 backdrop-blur-xl p-6 shadow-2xl dark:border-white/10 dark:bg-black/50">
        <div class="flex items-center gap-4">
          <!-- Spinner đơn giản -->
          <div class="relative h-12 w-12 rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-black grid place-items-center">
            <div class="h-6 w-6 rounded-full border-2 border-black/20 border-t-black/80 dark:border-white/25 dark:border-t-white/80 animate-spin"></div>
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-black/90 dark:text-white/90 text-sm font-semibold">Loading…</p>
            <p class="text-black/60 dark:text-white/60 text-xs truncate">Please wait a moment</p>

            <!-- Progress bar -->
            <div class="mt-3 h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div
                class="h-full rounded-full bg-black/80 dark:bg-white/80 transition-[width] duration-200 ease-out"
                :style="{ width: progress + '%' }"
              />
            </div>

            <div class="mt-2 flex items-center justify-between text-xs text-black/50 dark:text-white/50 tabular-nums">
              <span>{{ progress }}%</span>
              <span>{{ progress < 100 ? "Working…" : "Done" }}</span>
            </div>
          </div>
        </div>

        <!-- Hint nhỏ -->
        <p class="mt-4 text-center text-[11px] text-white/45">
          Tip: keep it minimal, keep it fast.
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const isLoading = ref(true);
const progress = ref(0);

let tickTimer: number | null = null;
let finishTimer: number | null = null;

function start() {
  isLoading.value = true;
  progress.value = 0;

  // progress giả lập nhẹ
  tickTimer = window.setInterval(() => {
    if (progress.value < 92) progress.value += Math.floor(Math.random() * 6) + 2; // +2..+7
    progress.value = Math.min(progress.value, 92);
  }, 160);

  // tắt sau tối thiểu 900ms
  finishTimer = window.setTimeout(() => {
    progress.value = 100;
    window.setTimeout(() => {
      isLoading.value = false;
      cleanup();
    }, 200);
  }, 900);
}

function cleanup() {
  if (tickTimer) window.clearInterval(tickTimer);
  if (finishTimer) window.clearTimeout(finishTimer);
  tickTimer = finishTimer = null;
}

// Fix removeEventListener: giữ reference function
const onBeforeUnload = () => start();

onMounted(() => {
  start();
  window.addEventListener("beforeunload", onBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", onBeforeUnload);
  cleanup();
});

defineExpose({ isLoading, progress, start });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 220ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
