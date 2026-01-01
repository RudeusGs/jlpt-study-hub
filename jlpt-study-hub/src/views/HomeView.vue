<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
    <!-- Subtle monochrome background (đồng bộ glass/mono) -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] grid-mask" />
    </div>

    <!-- Nếu bạn đã có Navbar component, đặt ở đây -->
    <!-- <MonoNavbar /> -->

    <main class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- HERO -->
      <section class="pt-16 sm:pt-20 pb-10">
        <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70
                     dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-black/60 dark:bg-white/60"></span>
              JLPT Study Hub • Learn smarter, not harder
            </div>

            <h1 class="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight">
              JLPT Study Hub
              <span class="block text-black/60 dark:text-white/60">
                Nền tảng ôn thi JLPT tối giản, hiện đại, tập trung vào hiệu quả.
              </span>
            </h1>

            <p class="mt-4 text-base leading-7 text-black/70 dark:text-white/70">
              Học theo lộ trình rõ ràng, luyện đề có chiến lược và theo dõi tiến độ trực quan.
              N5 và N4 — mọi thứ gói gọn trong một "hub" duy nhất.
            </p>

            <div class="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href="#levels"
                class="inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold
                       border border-black/10 bg-black text-white hover:bg-black/90 active:bg-black/80 transition
                       dark:border-white/10 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Bắt đầu chọn trình độ
              </a>
              <a
                href="#features"
                class="inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold
                       border border-black/10 bg-white/70 text-black hover:bg-white transition
                       dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Xem tính năng
              </a>
            </div>

            <div class="mt-6 flex flex-wrap gap-2 text-xs text-black/60 dark:text-white/60">
              <span class="chip">SRS từ vựng</span>
              <span class="chip">Kanji & Grammar</span>
              <span class="chip">Mock test</span>
              <span class="chip">Theo dõi tiến độ</span>
              <span class="chip">Lộ trình theo tuần</span>
            </div>
          </div>

          <!-- Right preview card -->
          <div
            class="rounded-3xl border border-black/10 bg-white/70 backdrop-blur-xl p-6 shadow-2xl
                   dark:border-white/10 dark:bg-black/50"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold">Dashboard preview</p>
                <p class="text-xs text-black/60 dark:text-white/60">Một cái nhìn nhanh về hành trình học</p>
              </div>
              <div class="inline-flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-black/50 dark:bg-white/50"></span>
                <span class="text-xs text-black/60 dark:text-white/60">Live</span>
              </div>
            </div>

            <!-- Nếu đã đăng nhập -->
            <template v-if="isLoggedIn">
              <div class="mt-5 grid grid-cols-3 gap-3">
                <div class="stat">
                  <p class="statLabel">Streak</p>
                  <p class="statValue">12</p>
                  <p class="statHint">days</p>
                </div>
                <div class="stat">
                  <p class="statLabel">Accuracy</p>
                  <p class="statValue">86%</p>
                  <p class="statHint">avg</p>
                </div>
                <div class="stat">
                  <p class="statLabel">Time</p>
                  <p class="statValue">24</p>
                  <p class="statHint">hrs</p>
                </div>
              </div>

              <div class="mt-5">
                <p class="text-xs text-black/60 dark:text-white/60">Hôm nay</p>
                <div class="mt-2 space-y-2">
                  <div class="task">
                    <div class="taskLeft">
                      <span class="dot"></span>
                      <span class="taskText">Từ vựng SRS (20 từ)</span>
                    </div>
                    <span class="taskTag">8 phút</span>
                  </div>
                  <div class="task">
                    <div class="taskLeft">
                      <span class="dot"></span>
                      <span class="taskText">Ngữ pháp: 〜てしまう</span>
                    </div>
                    <span class="taskTag">10 phút</span>
                  </div>
                  <div class="task">
                    <div class="taskLeft">
                      <span class="dot"></span>
                      <span class="taskText">Mini mock: Reading</span>
                    </div>
                    <span class="taskTag">12 phút</span>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex gap-3">
                <a href="#roadmap" class="btnGhost flex-1">Xem lộ trình</a>
                <a href="#cta" class="btnSolid flex-1">Học ngay</a>
              </div>
            </template>

            <!-- Nếu chưa đăng nhập -->
            <template v-else>
              <div class="mt-5">
                <p class="text-sm text-black/70 dark:text-white/70">
                  Đăng nhập để xem tiến độ học tập và nhận lộ trình cá nhân hóa.
                </p>
              </div>

              <div class="mt-5 grid grid-cols-3 gap-3">
                <div class="stat opacity-50">
                  <p class="statLabel">Streak</p>
                  <p class="statValue">—</p>
                  <p class="statHint">days</p>
                </div>
                <div class="stat opacity-50">
                  <p class="statLabel">Accuracy</p>
                  <p class="statValue">—</p>
                  <p class="statHint">avg</p>
                </div>
                <div class="stat opacity-50">
                  <p class="statLabel">Time</p>
                  <p class="statValue">—</p>
                  <p class="statHint">hrs</p>
                </div>
              </div>

              <div class="mt-6 flex gap-3">
                <a href="#levels" class="btnGhost flex-1">Chọn level</a>
                <a href="/login" class="btnSolid flex-1">Đăng nhập</a>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- FEATURES -->
      <section id="features" class="py-10">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-xl sm:text-2xl font-semibold tracking-tight">Tính năng cốt lõi</h2>
            <p class="mt-1 text-sm text-black/60 dark:text-white/60">
              Gói đúng thứ bạn cần cho JLPT — không rườm rà.
            </p>
          </div>
          <a href="#cta" class="hidden sm:inline-flex btnGhost">Đăng ký nhận cập nhật</a>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="f in features" :key="f.title" class="card">
            <div class="iconBox" v-html="f.icon"></div>
            <h3 class="mt-3 text-sm font-semibold">{{ f.title }}</h3>
            <p class="mt-1 text-sm text-black/60 dark:text-white/60">{{ f.desc }}</p>
          </div>
        </div>
      </section>

      <!-- LEVELS -->
      <section id="levels" class="py-10">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 class="text-xl sm:text-2xl font-semibold tracking-tight">Chọn trình độ JLPT</h2>
            <p class="mt-1 text-sm text-black/60 dark:text-white/60">
              Mỗi level có lộ trình, mục tiêu và đề luyện phù hợp.
            </p>
          </div>

          <div class="inline-flex rounded-2xl border border-black/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5">
            <button
              v-for="lv in levels"
              :key="lv.key"
              class="h-9 px-4 rounded-xl text-sm font-semibold transition"
              :class="selectedLevel === lv.key ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10'"
              type="button"
              @click="selectedLevel = lv.key"
            >
              {{ lv.key }}
            </button>
          </div>
        </div>

        <div class="mt-6 grid gap-3 lg:grid-cols-3">
          <!-- Level detail -->
          <div class="lg:col-span-2 card p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs text-black/60 dark:text-white/60">Đang chọn</p>
                <h3 class="mt-1 text-lg font-semibold tracking-tight">
                  {{ levelDetail.title }}
                </h3>
                <p class="mt-2 text-sm text-black/70 dark:text-white/70">
                  {{ levelDetail.desc }}
                </p>
              </div>
              <div class="hidden sm:block text-right">
                <p class="text-xs text-black/60 dark:text-white/60">Mục tiêu</p>
                <p class="mt-1 text-sm font-semibold">{{ levelDetail.goal }}</p>
              </div>
            </div>

            <div class="mt-5 grid gap-3 sm:grid-cols-3">
              <div class="stat">
                <p class="statLabel">Thời lượng</p>
                <p class="statValue">{{ levelDetail.weeks }}</p>
                <p class="statHint">tuần</p>
              </div>
              <div class="stat">
                <p class="statLabel">Mỗi ngày</p>
                <p class="statValue">{{ levelDetail.daily }}</p>
                <p class="statHint">phút</p>
              </div>
              <div class="stat">
                <p class="statLabel">Trọng tâm</p>
                <p class="statValue">{{ levelDetail.focus }}</p>
                <p class="statHint">key</p>
              </div>
            </div>

            <div class="mt-5">
              <p class="text-sm font-semibold">Gợi ý “tuần đầu”</p>
              <ul class="mt-2 space-y-2">
                <li v-for="(it, i) in levelDetail.week1" :key="i" class="task">
                  <div class="taskLeft">
                    <span class="dot"></span>
                    <span class="taskText">{{ it }}</span>
                  </div>
                  <span class="taskTag">Recommended</span>
                </li>
              </ul>
            </div>

            <div class="mt-6 flex flex-col sm:flex-row gap-3">
              <button class="btnSolid" type="button" @click="scrollTo('#cta')">Tạo lộ trình cho tôi</button>
              <button class="btnGhost" type="button" @click="scrollTo('#roadmap')">Xem cách học đề xuất</button>
            </div>
          </div>

          <!-- Quick compare -->
          <div class="card p-6">
            <h3 class="text-sm font-semibold">So sánh nhanh</h3>
            <p class="mt-1 text-sm text-black/60 dark:text-white/60">
              Chọn level phù hợp để tránh “học sai trọng tâm”.
            </p>

            <div class="mt-4 space-y-2">
              <div v-for="lv in levels" :key="lv.key" class="compareRow" @click="selectedLevel = lv.key">
                <div class="flex items-center gap-3">
                  <span
                    class="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-black/10 bg-white/60 text-sm font-semibold
                           dark:border-white/10 dark:bg-white/5"
                  >
                    {{ lv.key }}
                  </span>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold truncate">{{ lv.shortTitle }}</p>
                    <p class="text-xs text-black/60 dark:text-white/60 truncate">{{ lv.shortDesc }}</p>
                  </div>
                </div>
                <span
                  class="text-xs"
                  :class="selectedLevel === lv.key ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/50'"
                >
                  {{ selectedLevel === lv.key ? "Selected" : "Pick" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ROADMAP -->
      <section id="roadmap" class="py-10">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-xl sm:text-2xl font-semibold tracking-tight">Cách học được đề xuất</h2>
            <p class="mt-1 text-sm text-black/60 dark:text-white/60">
              Chu trình 4 bước: nhớ — hiểu — luyện — kiểm tra.
            </p>
          </div>
        </div>

        <div class="mt-6 grid gap-3 lg:grid-cols-4">
          <div v-for="(s, i) in roadmap" :key="s.title" class="card p-6">
            <p class="text-xs text-black/60 dark:text-white/60">Step {{ i + 1 }}</p>
            <h3 class="mt-1 text-sm font-semibold">{{ s.title }}</h3>
            <p class="mt-2 text-sm text-black/60 dark:text-white/60">{{ s.desc }}</p>
            <div class="mt-4 space-y-2">
              <div v-for="(b, j) in s.bullets" :key="j" class="bullet">
                <span class="bulletDot"></span>
                <span class="text-sm text-black/70 dark:text-white/70">{{ b }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section id="cta" class="py-12">
        <div
          class="rounded-3xl border border-black/10 bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl
                 dark:border-white/10 dark:bg-black/50"
        >
          <div class="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 class="text-xl sm:text-2xl font-semibold tracking-tight">Sẵn sàng bắt đầu?</h2>
              <p class="mt-2 text-sm text-black/60 dark:text-white/60">
                Nhận lộ trình học theo level + checklist tuần đầu tiên.
              </p>
              <div class="mt-4 flex flex-wrap gap-2 text-xs text-black/60 dark:text-white/60">
                <span class="chip">Kế hoạch theo tuần</span>
                <span class="chip">Đề luyện theo dạng</span>
                <span class="chip">Theo dõi tiến độ</span>
              </div>
            </div>

            <form class="flex flex-col sm:flex-row gap-3" @submit.prevent="onSubscribe">
              <input
                v-model.trim="subscribeEmail"
                type="email"
                placeholder="Email của bạn"
                class="h-11 flex-1 rounded-2xl border border-black/10 bg-white/60 px-4 text-sm outline-none
                       focus:ring-2 focus:ring-black/15 focus:border-black/20
                       dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/20 dark:focus:border-white/20"
              />
              <button
                type="submit"
                class="h-11 rounded-2xl px-5 text-sm font-semibold
                       border border-black/10 bg-black text-white hover:bg-black/90 active:bg-black/80 transition
                       dark:border-white/10 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Nhận lộ trình
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

type Feature = { title: string; desc: string; icon: string };
type LevelKey = "N5" | "N4";

const isLoggedIn = ref(false);

const features: Feature[] = [
  {
    title: "SRS từ vựng & Kanji",
    desc: "Ôn theo nhịp nhớ quên, tập trung vào từ hay sai, tiết kiệm thời gian.",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 7h10M7 11h10M7 15h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
  },
  {
    title: "Ngữ pháp có ví dụ chuẩn",
    desc: "Giải thích ngắn, ví dụ đủ dùng, bài luyện theo dạng đề JLPT.",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6 17l3-10h6l3 10" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    title: "Luyện đọc theo chiến lược",
    desc: "Skim/scan, tìm keyword, phân bổ thời gian theo dạng bài.",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 10l2 2-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    title: "Mock test theo module",
    desc: "Đề mini theo từng kỹ năng + full test để kiểm tra định kỳ.",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M8 6h8M8 10h8M8 14h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
  },
  {
    title: "Theo dõi tiến độ",
    desc: "Streak, độ chính xác, thời lượng học và checklist theo tuần.",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 19V5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 17V9M12 17V7M16 17v-5M20 17v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    title: "Lộ trình gọn, có mục tiêu",
    desc: "Biết hôm nay học gì, tuần này luyện gì, đến ngày thi tự tin.",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v3M12 19v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M2 12h3M19 12h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6.3 17.7l-2.1 2.1M19.8 4.2l-2.1 2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
  },
];

const levels = [
  { key: "N5", shortTitle: "Nhập môn", shortDesc: "Từ vựng cơ bản, mẫu câu nền tảng." },
  { key: "N4", shortTitle: "Cơ bản", shortDesc: "Tăng grammar, đọc ngắn, nghe rõ ý." },
] as const;

const selectedLevel = ref<LevelKey>("N5");

const levelDetail = computed(() => {
  const map: Record<LevelKey, any> = {
    N5: {
      title: "N5 • Nền tảng vững, học đúng trọng tâm",
      desc: "Tập trung từ vựng thường gặp, kanji cơ bản và mẫu câu quan trọng. Mục tiêu là hiểu đề và làm chắc phần dễ.",
      goal: "Pass vững chắc",
      weeks: 6,
      daily: 25,
      focus: "Basics",
      week1: ["Thiết lập SRS 15–20 từ/ngày", "Kanji nền: 8–10 chữ/ngày", "Grammar: 2 mẫu/ngày + bài luyện"],
    },
    N4: {
      title: "N4 • Mở rộng grammar & luyện đọc ngắn",
      desc: "Nâng vốn từ, grammar phổ biến và luyện nghe theo chủ đề. Bắt đầu làm mini test theo module.",
      goal: "Ổn định kỹ năng",
      weeks: 8,
      daily: 30,
      focus: "Grammar",
      week1: ["SRS 20–25 từ/ngày", "Ngữ pháp: nhóm liên kết câu", "Mini reading: 10–12 phút/ngày"],
    },
  };
  return map[selectedLevel.value];
});

const roadmap = [
  {
    title: "Nhớ (SRS)",
    desc: "Từ vựng/kanji theo nhịp ôn thông minh.",
    bullets: ["Ôn ít nhưng đều", "Ưu tiên từ hay sai", "Review đúng lịch"],
  },
  {
    title: "Hiểu (Grammar)",
    desc: "Mẫu câu trọng tâm + ví dụ vừa đủ.",
    bullets: ["Chia nhóm theo chức năng", "So sánh mẫu dễ nhầm", "Bài luyện theo dạng"],
  },
  {
    title: "Luyện (Skills)",
    desc: "Reading/Listening theo chiến lược.",
    bullets: ["Skim/scan + keyword", "Time boxing", "Nhận diện bẫy"],
  },
  {
    title: "Kiểm tra (Mock)",
    desc: "Mini test & full test có review.",
    bullets: ["Chấm + ghi lỗi", "Lặp lại phần yếu", "Theo dõi tiến độ"],
  },
];

const subscribeEmail = ref("");

function scrollTo(hash: string) {
  const el = document.querySelector(hash);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function onSubscribe() {
  // demo
  if (!subscribeEmail.value || !/^\S+@\S+\.\S+$/.test(subscribeEmail.value)) {
    alert("Vui lòng nhập email hợp lệ.");
    return;
  }
  alert(`Đã nhận email: ${subscribeEmail.value} — (demo UI)`);
  subscribeEmail.value = "";
}

onMounted(() => {
  // Kiểm tra nếu có token hoặc user info trong localStorage
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("currentUser");
  isLoggedIn.value = !!(token || user);
});
</script>

<style scoped>
/* Subtle grid mask */
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

/* Reusable styles (mono/glass) */
.chip {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
}
:global(.dark) .chip {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
}

.card {
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  backdrop-filter: blur(14px);
  padding: 16px;
}
:global(.dark) .card {
  border-color: rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.50);
}

.iconBox {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.60);
  color: rgba(0,0,0,0.75);
}
:global(.dark) .iconBox {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.75);
}

.stat {
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.55);
  padding: 12px;
}
:global(.dark) .stat {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
.statLabel { font-size: 11px; opacity: 0.7; }
.statValue { font-size: 18px; font-weight: 700; margin-top: 4px; }
.statHint  { font-size: 11px; opacity: 0.55; }

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 18px;
  padding: 10px 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.55);
}
:global(.dark) .task {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
.taskLeft { display: inline-flex; align-items: center; gap: 10px; min-width: 0; }
.dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: rgba(0,0,0,0.55);
}
:global(.dark) .dot { background: rgba(255,255,255,0.55); }
.taskText { font-size: 13px; opacity: 0.85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.taskTag {
  font-size: 11px;
  opacity: 0.65;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
}
:global(.dark) .taskTag { border-color: rgba(255,255,255,0.10); }

.btnSolid {
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid rgba(0,0,0,0.10);
  background: #000;
  color: #fff;
  transition: filter 160ms ease, transform 60ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnSolid:active { transform: translateY(1px); }
:global(.dark) .btnSolid { background: #fff; color: #000; border-color: rgba(255,255,255,0.10); }

.btnGhost {
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  color: rgba(0,0,0,0.85);
  transition: background 160ms ease, transform 60ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnGhost:hover { background: rgba(255,255,255,0.95); }
.btnGhost:active { transform: translateY(1px); }
:global(.dark) .btnGhost {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.85);
}
:global(.dark) .btnGhost:hover { background: rgba(255,255,255,0.10); }

.compareRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 20px;
  padding: 10px 12px;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.55);
  transition: transform 60ms ease, background 160ms ease;
}
.compareRow:hover { background: rgba(255,255,255,0.85); }
.compareRow:active { transform: translateY(1px); }
:global(.dark) .compareRow {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
:global(.dark) .compareRow:hover { background: rgba(255,255,255,0.10); }

.bullet { display: flex; align-items: flex-start; gap: 10px; }
.bulletDot {
  width: 8px; height: 8px; border-radius: 999px;
  margin-top: 6px;
  background: rgba(0,0,0,0.55);
}
:global(.dark) .bulletDot { background: rgba(255,255,255,0.55); }
</style>
