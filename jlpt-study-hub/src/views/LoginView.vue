<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
    <!-- Background subtle -->
    <div class="pointer-events-none fixed inset-0">
      <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
    </div>

    <!-- Back button -->
    <button
      @click="goHome"
      class="fixed top-6 left-6 inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-black/10 bg-white/60
             hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-sm"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Back
    </button>

    <!-- Content -->
    <main class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="min-h-screen grid place-items-center py-14">
        <section class="w-full max-w-md">
          <!-- Card -->
          <div
            class="rounded-3xl border border-black/10 bg-white/70 backdrop-blur-xl p-6 shadow-2xl
                   dark:border-white/10 dark:bg-black/50"
          >
            <!-- Header -->
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <img 
                    src="/logo.jpg" 
                    alt="Logo" 
                    class="h-10 w-10 rounded-2xl"
                  />
                  <div>
                    <h1 class="text-lg font-semibold tracking-tight">Welcome back</h1>
                    <p class="text-sm text-black/60 dark:text-white/60">Sign in to continue</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form -->
            <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
              <!-- Email -->
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-black/80 dark:text-white/80">Email</label>
                <div class="relative">
                  <input
                    v-model.trim="email"
                    type="email"
                    autocomplete="email"
                    placeholder="name@company.com"
                    class="h-11 w-full rounded-2xl border border-black/10 bg-white/60 px-4 text-sm outline-none
                           focus:ring-2 focus:ring-black/15 focus:border-black/20
                           dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/20 dark:focus:border-white/20"
                    :class="emailError ? 'border-black/30 dark:border-white/25' : ''"
                  />
                </div>
                <p v-if="emailError" class="text-xs text-black/60 dark:text-white/60">{{ emailError }}</p>
              </div>

              <!-- Password -->
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-black/80 dark:text-white/80">Password</label>
                <div class="relative">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    placeholder="••••••••"
                    class="h-11 w-full rounded-2xl border border-black/10 bg-white/60 px-4 pr-12 text-sm outline-none
                           focus:ring-2 focus:ring-black/15 focus:border-black/20
                           dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/20 dark:focus:border-white/20"
                    :class="passwordError ? 'border-black/30 dark:border-white/25' : ''"
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-2 my-auto grid h-9 w-9 place-items-center rounded-xl
                           hover:bg-black/5 dark:hover:bg-white/10"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    @click="showPassword = !showPassword"
                  >
                    <!-- eye -->
                    <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" class="text-black/70 dark:text-white/70">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <!-- eye off -->
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" class="text-black/70 dark:text-white/70">
                      <path d="M3 3l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <path d="M10.6 10.6a2.5 2.5 0 003.54 3.54" stroke="currentColor" stroke-width="2"/>
                      <path
                        d="M6.4 6.4C3.8 8.4 2 12 2 12s3.5 7 10 7c2 0 3.7-.5 5.1-1.3M9.5 5.2C10.3 5 11.1 5 12 5c6.5 0 10 7 10 7s-1 2-3 4"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <p v-if="passwordError" class="text-xs text-black/60 dark:text-white/60">{{ passwordError }}</p>
              </div>

              <!-- Options -->
              <div class="flex items-center justify-between gap-3">
                <label class="inline-flex items-center gap-2 text-sm text-black/70 dark:text-white/70 select-none">
                  <input
                    v-model="remember"
                    type="checkbox"
                    class="h-4 w-4 rounded border-black/20 bg-white/70
                           dark:border-white/20 dark:bg-white/10"
                  />
                  Remember me
                </label>

                <a href="#" class="text-sm text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white">
                  Forgot password?
                </a>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="submitting"
                class="group inline-flex h-11 w-full items-center justify-center rounded-2xl
                       border border-black/10 bg-black text-white text-sm font-semibold
                       hover:bg-black/90 active:bg-black/80 transition
                       disabled:opacity-60 disabled:cursor-not-allowed
                       dark:border-white/10 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <span v-if="!submitting">Sign in</span>
                <span v-else class="inline-flex items-center gap-2">
                  <span class="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin dark:border-black/30 dark:border-t-black"></span>
                  Signing in…
                </span>
              </button>

              <!-- Divider -->
              <div class="flex items-center gap-3 py-1">
                <div class="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
                <span class="text-xs text-black/50 dark:text-white/50">OR</span>
                <div class="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
              </div>

              <!-- Social buttons (monochrome) -->
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  class="h-11 rounded-2xl border border-black/10 bg-white/60 text-sm font-medium
                         hover:bg-white transition
                         dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  Google
                </button>
                <button
                  type="button"
                  class="h-11 rounded-2xl border border-black/10 bg-white/60 text-sm font-medium
                         hover:bg-white transition
                         dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  GitHub
                </button>
              </div>

              <p class="pt-2 text-center text-sm text-black/60 dark:text-white/60">
                New here?
                <a href="/register" class="text-black hover:underline dark:text-white">Create an account</a>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const remember = ref(true);
const showPassword = ref(false);

const submitting = ref(false);
const emailError = ref("");
const passwordError = ref("");

const isDark = computed(() => document.documentElement.classList.contains("dark"));

function goHome() {
  router.push('/');
}

onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.classList.add("dark");
});

function validate() {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value) emailError.value = "Please enter your email.";
  else if (!/^\S+@\S+\.\S+$/.test(email.value)) emailError.value = "Email format looks wrong.";

  if (!password.value) passwordError.value = "Please enter your password.";
  else if (password.value.length < 6) passwordError.value = "Password must be at least 6 characters.";

  return !emailError.value && !passwordError.value;
}

async function onSubmit() {
  if (!validate()) return;

  submitting.value = true;

  // Demo: giả lập gọi API
  await new Promise((r) => setTimeout(r, 900));

  submitting.value = false;

  // TODO: thay bằng login thật
  alert(`Logged in as: ${email.value} (remember: ${remember.value})`);
}
</script>

<style scoped>
/* optional: focus ring mượt hơn trên một số trình duyệt */
:deep(input:focus) {
  outline: none;
}
</style>
