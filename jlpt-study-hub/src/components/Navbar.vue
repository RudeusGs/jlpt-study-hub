<template>
  <header class="sticky top-0 z-50">
    <nav class="w-full px-4 sm:px-6 lg:px-8" aria-label="Primary">
      <div class="mx-auto max-w-7xl">
        <div
          class="mt-3 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-xl
                 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)]
                 dark:border-white/10 dark:bg-black/60"
        >
        <div class="flex h-16 items-center justify-between px-3 sm:px-4">
          <!-- Brand -->
          <a href="/" @click.prevent="goHome" class="flex items-center gap-2 cursor-pointer">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              class="h-9 w-9 rounded-xl"
            />
            <span class="text-sm font-semibold tracking-tight">
              JLPT<span class="text-black/50 dark:text-white/50"> Study Hub</span>
            </span>
          </a>

          <!-- Desktop links -->
          <div class="hidden md:flex items-center gap-1">
            <a
              v-for="item in navItems"
              :key="item.key"
              :href="item.href"
              class="group relative rounded-xl px-3 py-2 text-sm font-medium
                     text-black/70 hover:text-black
                     dark:text-white/80 dark:hover:text-white
                     hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition"
              :class="activeKey === item.key ? 'text-black dark:text-white bg-black/[0.04] dark:bg-white/[0.06]' : ''"
              @click.prevent="setActive(item.key, item.href)"
            >
              {{ item.label }}
              <span
                class="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full
                       bg-black/80 dark:bg-white/80 transition-transform duration-300"
                :class="activeKey === item.key ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
              ></span>
            </a>
          </div>

          <!-- Right actions -->
          <div class="flex items-center gap-2">
            <!-- Search (desktop) -->
            <div class="hidden lg:flex">
              <label class="relative block">
                <span class="sr-only">Search</span>
                <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-black/50 dark:text-white/50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 21l-4.3-4.3m1.3-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <input
                  v-model="q"
                  class="h-10 w-64 rounded-xl border border-black/10 bg-white/60 px-10 text-sm outline-none
                         focus:ring-2 focus:ring-black/20
                         dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/20"
                  placeholder="Search…"
                />
              </label>
            </div>

            <!-- CTA -->
            <a
              href="#"
              class="hidden sm:inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold
                     border border-black/10 bg-white/70 text-black
                     hover:bg-white transition
                     dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              @click.prevent="goToLogin"
            >
              Get Started
            </a>

            <!-- Mobile menu button -->
            <button
              class="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white/60
                     hover:bg-white/80 transition
                     dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              type="button"
              aria-label="Open menu"
              :aria-expanded="menuOpen"
              aria-controls="mobilePanel"
              @click="menuOpen = !menuOpen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile panel -->
        <transition name="drawer">
          <div
            v-show="menuOpen"
            id="mobilePanel"
            class="md:hidden border-t border-black/10 dark:border-white/10"
          >
            <div class="p-3 space-y-1">
              <a
                v-for="item in navItems"
                :key="item.key"
                :href="item.href"
                class="block rounded-xl px-3 py-2 text-sm font-medium
                       text-black/70 hover:text-black hover:bg-black/[0.04] transition
                       dark:text-white/80 dark:hover:text-white dark:hover:bg-white/[0.06]"
                :class="activeKey === item.key ? 'text-black dark:text-white bg-black/[0.04] dark:bg-white/[0.06]' : ''"
                @click.prevent="setActive(item.key, item.href); menuOpen = false"
              >
                {{ item.label }}
              </a>

              <div class="pt-2">
                <a
                  class="inline-flex h-10 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold
                         border border-black/10 bg-white/70 text-black
                         hover:bg-white transition
                         dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  href="#"
                  @click.prevent="goToLogin; menuOpen = false"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </transition>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: max-height 260ms ease, opacity 220ms ease, transform 260ms ease;
}
.drawer-enter-from,
.drawer-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}
.drawer-enter-to,
.drawer-leave-from {
  max-height: 360px;
  opacity: 1;
  transform: translateY(0);
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

type NavItem = { key: string; label: string; href: string };

const navItems = ref<NavItem[]>([
  { key: "home", label: "Home", href: "/" },
  { key: "n5", label: "N5", href: "/n5" },
  { key: "n4", label: "N4", href: "/n4" },
  { key: "practice", label: "Practice", href: "#" },
  { key: "social", label: "Forum", href: "/social" },
]);

const q = ref("");
const menuOpen = ref(false);
const activeKey = ref<NavItem["key"]>("home");
const router = useRouter();

function setActive(key: NavItem["key"], href: string) {
  activeKey.value = key;
  router.push(href);
}

function goHome() {
  router.push('/');
}

function goToLogin() {
  router.push('/login');
}

onMounted(() => {
  const onResize = () => {
    if (window.innerWidth >= 768) menuOpen.value = false;
  };
  window.addEventListener("resize", onResize, { passive: true });
});
</script>
