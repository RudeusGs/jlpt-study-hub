<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
    <!-- subtle mono bg -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] grid-mask" />
    </div>

    <main class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <section class="mx-auto max-w-md">
        <!-- Header -->
        <div class="text-center">
          <div
            class="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70
                   dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-black/60 dark:bg-white/60"></span>
            JLPT Study Hub
          </div>
          <h1 class="mt-4 text-2xl font-semibold tracking-tight">Create your account</h1>
          <p class="mt-1 text-sm text-black/60 dark:text-white/60">
            Đăng ký nhanh để lưu tiến độ học.
          </p>
        </div>

        <!-- Card -->
        <div class="mt-8 card p-6 sm:p-7">
          <form class="space-y-4" @submit.prevent="onSubmit">
            <!-- Name -->
            <div>
              <label class="label">Họ tên</label>
              <input
                v-model.trim="form.name"
                class="input"
                type="text"
                placeholder="Nguyễn Văn A"
                autocomplete="name"
              />
              <p v-if="touched.name && errors.name" class="err">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="label">Email</label>
              <input
                v-model.trim="form.email"
                class="input"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
              <p v-if="touched.email && errors.email" class="err">{{ errors.email }}</p>
            </div>

            <!-- Password -->
            <div>
              <label class="label">Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  class="input pr-12"
                  :type="showPass ? 'text' : 'password'"
                  placeholder="••••••••"
                  autocomplete="new-password"
                />
                <button
                  class="eyeBtn"
                  type="button"
                  @click="showPass = !showPass"
                  :aria-label="showPass ? 'Hide password' : 'Show password'"
                >
                  <svg v-if="!showPass" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    />
                    <path
                      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    />
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l18 18"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    />
                    <path
                      d="M10.58 10.58a2 2 0 0 0 2.83 2.83"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    />
                    <path
                      d="M9.88 5.08A10.5 10.5 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.23 4.38"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    />
                    <path
                      d="M6.11 6.11C3.73 7.8 2 12 2 12s3.5 7 10 7c1.14 0 2.2-.2 3.17-.52"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p v-if="touched.password && errors.password" class="err">{{ errors.password }}</p>
              <p class="hint">Ít nhất 8 ký tự. Nên có chữ + số.</p>
            </div>

            <!-- Confirm -->
            <div>
              <label class="label">Confirm password</label>
              <div class="relative">
                <input
                  v-model="form.confirm"
                  class="input pr-12"
                  :type="showConfirm ? 'text' : 'password'"
                  placeholder="••••••••"
                  autocomplete="new-password"
                />
                <button
                  class="eyeBtn"
                  type="button"
                  @click="showConfirm = !showConfirm"
                  :aria-label="showConfirm ? 'Hide confirm password' : 'Show confirm password'"
                >
                  <svg v-if="!showConfirm" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    />
                    <path
                      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    />
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l18 18"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    />
                    <path
                      d="M10.58 10.58a2 2 0 0 0 2.83 2.83"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    />
                    <path
                      d="M9.88 5.08A10.5 10.5 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.23 4.38"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    />
                    <path
                      d="M6.11 6.11C3.73 7.8 2 12 2 12s3.5 7 10 7c1.14 0 2.2-.2 3.17-.52"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p v-if="touched.confirm && errors.confirm" class="err">{{ errors.confirm }}</p>
            </div>

            <!-- Terms -->
            <label class="checkRow">
              <input v-model="form.agree" type="checkbox" class="ck" />
              <span class="text-sm text-black/75 dark:text-white/75">
                Tôi đồng ý với <span class="font-semibold">Terms</span> & <span class="font-semibold">Privacy</span>
              </span>
            </label>
            <p v-if="touched.agree && errors.agree" class="err">{{ errors.agree }}</p>

            <!-- Submit -->
            <button class="btnSolid w-full" type="submit" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Create account</span>
              <span v-else>Creating…</span>
            </button>

            <!-- Footer links -->
            <div class="pt-2 text-center">
              <p class="text-sm text-black/60 dark:text-white/60">
                Đã có tài khoản?
                <RouterLink class="link" to="/login">Đăng nhập</RouterLink>
              </p>
            </div>
          </form>
        </div>

        <!-- Small note -->
        <p class="mt-4 text-center text-xs text-black/45 dark:text-white/45">
          * Demo UI. Khi nối backend, bạn chỉ cần thay hàm onSubmit.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
};

const form = reactive<FormState>({
  name: "",
  email: "",
  password: "",
  confirm: "",
  agree: false,
});

const touched = reactive({
  name: false,
  email: false,
  password: false,
  confirm: false,
  agree: false,
});

const showPass = ref(false);
const showConfirm = ref(false);
const isSubmitting = ref(false);

function isEmail(s: string) {
  // simple, đủ dùng cho demo
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

const errors = computed(() => {
  const e: Record<keyof FormState, string> = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: "",
  };

  if (!form.name.trim()) e.name = "Vui lòng nhập họ tên.";
  else if (form.name.trim().length < 2) e.name = "Họ tên quá ngắn.";

  if (!form.email.trim()) e.email = "Vui lòng nhập email.";
  else if (!isEmail(form.email)) e.email = "Email không hợp lệ.";

  if (!form.password) e.password = "Vui lòng nhập password.";
  else if (form.password.length < 8) e.password = "Password phải ≥ 8 ký tự.";

  if (!form.confirm) e.confirm = "Vui lòng nhập lại password.";
  else if (form.confirm !== form.password) e.confirm = "Password không khớp.";

  if (!form.agree) e.agree = "Bạn cần đồng ý Terms & Privacy.";

  return e;
});

const isValid = computed(() => {
  const e = errors.value;
  return !e.name && !e.email && !e.password && !e.confirm && !e.agree;
});

function touchAll() {
  touched.name = true;
  touched.email = true;
  touched.password = true;
  touched.confirm = true;
  touched.agree = true;
}

async function onSubmit() {
  touchAll();
  if (!isValid.value) return;

  isSubmitting.value = true;
  try {
    // Demo: giả lập gọi API
    await new Promise((r) => setTimeout(r, 650));

    // TODO: gọi backend create user ở đây
    // Sau khi đăng ký xong -> điều hướng sang login (hoặc home)
    router.push("/login");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* grid mask */
.grid-mask {
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px);
  background-size: 48px 48px;
}
:global(.dark) .grid-mask {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px);
}

/* card */
.card {
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  backdrop-filter: blur(14px);
}
:global(.dark) .card {
  border-color: rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.50);
}

/* form */
.label {
  display: block;
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.70);
}
:global(.dark) .label { color: rgba(255,255,255,0.75); }

.input {
  margin-top: 8px;
  height: 44px;
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.60);
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  transition: box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
}
.input:focus {
  border-color: rgba(0,0,0,0.20);
  box-shadow: 0 0 0 4px rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.90);
}
:global(.dark) .input {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.92);
}
:global(.dark) .input:focus {
  border-color: rgba(255,255,255,0.20);
  box-shadow: 0 0 0 4px rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.10);
}

.eyeBtn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 34px;
  width: 34px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  display: grid;
  place-items: center;
  color: rgba(0,0,0,0.75);
}
.eyeBtn:hover { background: rgba(255,255,255,0.95); }
:global(.dark) .eyeBtn {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.80);
}
:global(.dark) .eyeBtn:hover { background: rgba(255,255,255,0.10); }

.err {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(0,0,0,0.65);
}
:global(.dark) .err { color: rgba(255,255,255,0.75); }

.hint {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(0,0,0,0.45);
}
:global(.dark) .hint { color: rgba(255,255,255,0.45); }

.checkRow {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.55);
  padding: 10px 12px;
}
:global(.dark) .checkRow {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}

.ck {
  height: 16px;
  width: 16px;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.25);
  background: rgba(255,255,255,0.70);
}
:global(.dark) .ck {
  border-color: rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.10);
}

/* buttons */
.btnSolid {
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 900;
  border: 1px solid rgba(0,0,0,0.10);
  background: #000;
  color: #fff;
  transition: transform 60ms ease, opacity 160ms ease;
}
.btnSolid:active { transform: translateY(1px); }
.btnSolid:disabled { opacity: 0.55; cursor: not-allowed; }
:global(.dark) .btnSolid { background: #fff; color: #000; border-color: rgba(255,255,255,0.10); }

.btnGhost {
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 900;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  color: rgba(0,0,0,0.85);
  transition: background 160ms ease, transform 60ms ease;
}
.btnGhost:hover { background: rgba(255,255,255,0.95); }
.btnGhost:active { transform: translateY(1px); }
:global(.dark) .btnGhost {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.85);
}
:global(.dark) .btnGhost:hover { background: rgba(255,255,255,0.10); }

/* link */
.link {
  font-weight: 900;
  color: rgba(0,0,0,0.85);
  text-decoration: underline;
  text-underline-offset: 3px;
}
:global(.dark) .link { color: rgba(255,255,255,0.85); }
</style>
