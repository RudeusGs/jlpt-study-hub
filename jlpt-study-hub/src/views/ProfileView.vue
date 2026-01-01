<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
    <!-- Subtle mono background -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] grid-mask" />
    </div>

    <main class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <section class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70
                      dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            <span class="h-1.5 w-1.5 rounded-full bg-black/60 dark:bg-white/60"></span>
            Profile • JLPT Study Hub
          </div>
          <h1 class="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">Trang cá nhân</h1>
          <p class="mt-1 text-sm text-black/60 dark:text-white/60">
            Xem thông tin học tập và “heatmap” hoạt động kiểu GitHub.
          </p>
        </div>

        <div class="flex gap-3">
          <button class="btnGhost" type="button" @click="mockMoreStudy">
            + Add study (demo)
          </button>
          <button class="btnSolid" type="button" @click="toggleTheme">
            Toggle theme
          </button>
        </div>
      </section>

      <!-- Top grid -->
      <section class="mt-8 grid gap-3 lg:grid-cols-12">
        <!-- Profile card -->
        <div class="card lg:col-span-4 p-6">
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <div class="relative">
              <div class="h-16 w-16 rounded-3xl border border-black/10 bg-white/70 grid place-items-center
                          dark:border-white/10 dark:bg-white/5">
                <span class="text-xl font-semibold">{{ initials }}</span>
              </div>
              <span
                class="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-black
                       dark:border-black dark:bg-white"
                title="Online (demo)"
              ></span>
            </div>

            <div class="min-w-0">
              <p class="text-base font-semibold tracking-tight truncate">{{ profile.fullName }}</p>
              <p class="text-sm text-black/60 dark:text-white/60 truncate">@{{ profile.username }}</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="chip">Target: {{ profile.targetLevel }}</span>
                <span class="chip">Exam: {{ profile.examDate }}</span>
              </div>
            </div>
          </div>

          <div class="mt-5 space-y-3 text-sm">
            <div class="infoRow">
              <span class="infoLabel">Email</span>
              <span class="infoValue">{{ profile.email }}</span>
            </div>
            <div class="infoRow">
              <span class="infoLabel">Timezone</span>
              <span class="infoValue">{{ profile.timezone }}</span>
            </div>
            <div class="infoRow">
              <span class="infoLabel">Joined</span>
              <span class="infoValue">{{ profile.joined }}</span>
            </div>
            <div class="infoRow">
              <span class="infoLabel">Study style</span>
              <span class="infoValue">{{ profile.studyStyle }}</span>
            </div>
          </div>

          <div class="mt-5">
            <p class="text-sm font-semibold">Bio</p>
            <p class="mt-2 text-sm text-black/70 dark:text-white/70 leading-6">
              {{ profile.bio }}
            </p>
          </div>

          <div class="mt-5">
            <p class="text-sm font-semibold">Links</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <a class="pillLink" :href="profile.links.website" target="_blank" rel="noreferrer">Website</a>
              <a class="pillLink" :href="profile.links.github" target="_blank" rel="noreferrer">GitHub</a>
              <a class="pillLink" :href="profile.links.facebook" target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="lg:col-span-8 grid gap-3 sm:grid-cols-2">
          <div class="card p-6">
            <p class="text-xs text-black/60 dark:text-white/60">Current streak</p>
            <p class="mt-1 text-2xl font-semibold tabular-nums">{{ currentStreak }}</p>
            <p class="mt-2 text-sm text-black/60 dark:text-white/60">
              Ngày liên tiếp có học (tính theo heatmap).
            </p>
          </div>

          <div class="card p-6">
            <p class="text-xs text-black/60 dark:text-white/60">Best streak</p>
            <p class="mt-1 text-2xl font-semibold tabular-nums">{{ bestStreak }}</p>
            <p class="mt-2 text-sm text-black/60 dark:text-white/60">
              Chuỗi dài nhất trong 12 tháng gần đây.
            </p>
          </div>

          <div class="card p-6">
            <p class="text-xs text-black/60 dark:text-white/60">Total study time</p>
            <p class="mt-1 text-2xl font-semibold tabular-nums">{{ totalMinutes }} min</p>
            <p class="mt-2 text-sm text-black/60 dark:text-white/60">
              Tổng thời lượng học (demo data).
            </p>
          </div>

          <div class="card p-6">
            <p class="text-xs text-black/60 dark:text-white/60">Days studied</p>
            <p class="mt-1 text-2xl font-semibold tabular-nums">{{ studiedDays }}</p>
            <p class="mt-2 text-sm text-black/60 dark:text-white/60">
              Số ngày có hoạt động học.
            </p>
          </div>
        </div>
      </section>

      <!-- Activity heatmap -->
      <section class="mt-10 card p-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-lg font-semibold tracking-tight">Hoạt động học (12 tháng)</h2>
            <p class="mt-1 text-sm text-black/60 dark:text-white/60">
              Ô càng đậm = học càng nhiều. (Giống GitHub contributions)
            </p>
          </div>

          <!-- Legend -->
          <div class="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
            <span>Less</span>
            <div class="flex items-center gap-1">
              <span class="cell cell-empty"></span>
              <span class="cell cell-lv1"></span>
              <span class="cell cell-lv2"></span>
              <span class="cell cell-lv3"></span>
              <span class="cell cell-lv4"></span>
            </div>
            <span>More</span>
          </div>
        </div>

        <div class="mt-6 overflow-x-auto">
          <div class="min-w-[760px]">
            <!-- Month labels (approx) -->
            <div class="mb-2 flex gap-1 pl-[28px] text-xs text-black/50 dark:text-white/50">
              <div
                v-for="m in monthLabels"
                :key="m.key"
                class="text-left"
                :style="{ width: `${m.spanWeeks * 13}px` }"
              >
                {{ m.label }}
              </div>
            </div>

            <div class="flex gap-1">
              <!-- Weekday labels -->
              <div class="w-[24px] pr-1 text-xs text-black/50 dark:text-white/50">
                <div class="h-[12px]"></div>
                <div class="grid grid-rows-7 gap-1">
                  <div class="h-[11px] flex items-center">Sun</div>
                  <div class="h-[11px] flex items-center"></div>
                  <div class="h-[11px] flex items-center">Tue</div>
                  <div class="h-[11px] flex items-center"></div>
                  <div class="h-[11px] flex items-center">Thu</div>
                  <div class="h-[11px] flex items-center"></div>
                  <div class="h-[11px] flex items-center">Sat</div>
                </div>
              </div>

              <!-- Heatmap weeks -->
              <div class="flex gap-1">
                <div v-for="(week, wi) in weeks" :key="wi" class="grid grid-rows-7 gap-1">
                  <button
                    v-for="day in week"
                    :key="day.dateKey"
                    type="button"
                    class="cell outline-none"
                    :class="cellClass(day.level)"
                    :title="dayTooltip(day)"
                    @click="selectDay(day)"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Selected day info -->
        <div class="mt-6 grid gap-3 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <div class="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
              <p class="text-sm font-semibold">Chi tiết ngày</p>
              <p class="mt-1 text-sm text-black/70 dark:text-white/70">
                <span class="font-semibold">{{ selected.dateKey }}</span>
                — {{ selected.minutes }} phút
                <span class="text-black/50 dark:text-white/50">({{ intensityText(selected.level) }})</span>
              </p>
              <p class="mt-2 text-sm text-black/60 dark:text-white/60">
                {{ selected.note || "Chưa có ghi chú. (demo)" }}
              </p>
            </div>
          </div>

          <div class="lg:col-span-4">
            <div class="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
              <p class="text-sm font-semibold">Gợi ý nhanh</p>
              <ul class="mt-3 space-y-2 text-sm text-black/70 dark:text-white/70">
                <li class="bullet"><span class="bulletDot"></span>Giữ streak bằng 15–20 phút/ngày</li>
                <li class="bullet"><span class="bulletDot"></span>Review lỗi sai trước khi học mới</li>
                <li class="bullet"><span class="bulletDot"></span>Mock test 1–2 lần/tuần</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom: Achievements / Goals -->
      <section class="mt-10 grid gap-3 lg:grid-cols-12">
        <div class="card lg:col-span-7 p-6">
          <h3 class="text-sm font-semibold">Goals</h3>
          <div class="mt-4 space-y-2">
            <div class="task">
              <div class="taskLeft">
                <span class="dot"></span>
                <span class="taskText">Hoàn thành {{ profile.targetLevel }} roadmap ({{ profile.examDate }})</span>
              </div>
              <span class="taskTag">Primary</span>
            </div>
            <div class="task">
              <div class="taskLeft">
                <span class="dot"></span>
                <span class="taskText">SRS mỗi ngày + Kanji 10 chữ</span>
              </div>
              <span class="taskTag">Daily</span>
            </div>
            <div class="task">
              <div class="taskLeft">
                <span class="dot"></span>
                <span class="taskText">Mock test mỗi tuần + review chi tiết</span>
              </div>
              <span class="taskTag">Weekly</span>
            </div>
          </div>
        </div>

        <div class="card lg:col-span-5 p-6">
          <h3 class="text-sm font-semibold">Achievements</h3>
          <div class="mt-4 grid gap-2 sm:grid-cols-2">
            <div class="badge">
              <p class="badgeTitle">Consistency</p>
              <p class="badgeHint">7-day streak</p>
            </div>
            <div class="badge">
              <p class="badgeTitle">Focus</p>
              <p class="badgeHint">300 min/week</p>
            </div>
            <div class="badge">
              <p class="badgeTitle">Reading</p>
              <p class="badgeHint">20 passages</p>
            </div>
            <div class="badge">
              <p class="badgeTitle">Mock</p>
              <p class="badgeHint">8 tests</p>
            </div>
          </div>
          <p class="mt-4 text-xs text-black/50 dark:text-white/50">
            * Demo UI. Bạn có thể nối dữ liệu thật từ backend.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

type LevelKey = "N5" | "N4" | "N3" | "N2" | "N1";

type Profile = {
  fullName: string;
  username: string;
  email: string;
  timezone: string;
  joined: string;
  targetLevel: LevelKey;
  examDate: string;
  studyStyle: string;
  bio: string;
  links: { website: string; github: string; facebook: string };
};

type DayCell = {
  date: Date;
  dateKey: string; // YYYY-MM-DD
  minutes: number;
  level: 0 | 1 | 2 | 3 | 4;
  note?: string;
};

const profile = reactive<Profile>({
  fullName: "Ngô Trần Nguyên Quân",
  username: "jlpt-learner",
  email: "ngotrannguyenquan1908@gmail.com",
  timezone: "Asia/Ho_Chi_Minh",
  joined: "2026-01-01",
  targetLevel: "N3",
  examDate: "2026-07",
  studyStyle: "SRS + Mock weekly",
  bio: "Mục tiêu: đỗ JLPT theo chiến lược — học ít nhưng đều, ưu tiên hiểu bản chất và luyện theo dạng đề.",
  links: {
    website: "#",
    github: "#",
    facebook: "#",
  },
});

const initials = computed(() => {
  const parts = profile.fullName.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "J";
  const b = parts[parts.length - 1]?.[0] ?? "H";
  return (a + b).toUpperCase();
});

// ---------- Theme ----------
const isDark = computed(() => document.documentElement.classList.contains("dark"));
function toggleTheme() {
  const root = document.documentElement;
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
}
onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.classList.add("dark");
});

// ---------- Heatmap data ----------
const today = new Date();
const daysBack = 365;

function toKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
// Align start date to Sunday (GitHub-like grid)
const startDate = (() => {
  const raw = addDays(startOfDay(today), -daysBack);
  const dayOfWeek = raw.getDay(); // 0=Sun
  return addDays(raw, -dayOfWeek);
})();

// Demo activity map: deterministic by dateKey (đỡ random mỗi lần refresh)
function hashTo01(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}
function minutesFromKey(key: string) {
  // tạo pattern: có ngày rỗng, có ngày nhiều
  const r = hashTo01(key);
  if (r < 0.38) return 0;
  if (r < 0.62) return Math.floor(10 + r * 20); // 10-22
  if (r < 0.85) return Math.floor(25 + r * 60); // 25-76
  return Math.floor(80 + r * 120); // 80-182
}
function levelFromMinutes(min: number): 0 | 1 | 2 | 3 | 4 {
  if (min <= 0) return 0;
  if (min < 20) return 1;
  if (min < 45) return 2;
  if (min < 90) return 3;
  return 4;
}

const allDays = ref<DayCell[]>([]);
const weeks = computed(() => {
  const result: DayCell[][] = [];
  let cur: DayCell[] = [];
  for (const d of allDays.value) {
    cur.push(d);
    if (cur.length === 7) {
      result.push(cur);
      cur = [];
    }
  }
  if (cur.length) result.push(cur);
  return result;
});

// Build days list
(function buildDays() {
  const arr: DayCell[] = [];
  const end = startOfDay(today);
  for (let d = new Date(startDate); d <= end; d = addDays(d, 1)) {
    const key = toKey(d);
    const mins = minutesFromKey(key);
    arr.push({
      date: new Date(d),
      dateKey: key,
      minutes: mins,
      level: levelFromMinutes(mins),
      note: mins ? "Tập trung SRS + grammar + mini reading." : "",
    });
  }
  allDays.value = arr;
})();

// Month labels (approx spanning by weeks)
const monthLabels = computed(() => {
  const labels: { key: string; label: string; spanWeeks: number }[] = [];
  const w = weeks.value;
  if (!w.length || !w[0]?.[0]?.date) return labels;

  let currentMonth = w[0][0].date!.getMonth();
  let currentYear = w[0][0].date!.getFullYear();
  let startIndex = 0;

  const pushLabel = (from: number, to: number, m: number, y: number) => {
    const span = Math.max(1, to - from);
    const label = new Date(y, m, 1).toLocaleString("en", { month: "short" });
    labels.push({ key: `${y}-${m}`, label, spanWeeks: span });
  };

  for (let i = 0; i < w.length; i++) {
    const firstDay = w[i]?.[0];
    if (!firstDay?.date) continue;
    const weekMonth = firstDay.date.getMonth();
    const weekYear = firstDay.date.getFullYear();
    if (weekMonth !== currentMonth || weekYear !== currentYear) {
      pushLabel(startIndex, i, currentMonth, currentYear);
      currentMonth = weekMonth;
      currentYear = weekYear;
      startIndex = i;
    }
  }
  pushLabel(startIndex, w.length, currentMonth, currentYear);
  return labels;
});

// Cell class mapping (Tailwind-safe)
const CELL_CLASSES = [
  "cell-empty",
  "cell-lv1",
  "cell-lv2",
  "cell-lv3",
  "cell-lv4",
] as const;

function cellClass(level: 0 | 1 | 2 | 3 | 4) {
  return CELL_CLASSES[level];
}

function intensityText(level: 0 | 1 | 2 | 3 | 4) {
  return ["No study", "Light", "Medium", "High", "Very high"][level];
}

function dayTooltip(d: DayCell) {
  return `${d.dateKey} • ${d.minutes} min • ${intensityText(d.level)}`;
}

// Selected day
const selected = reactive<DayCell>({
  date: new Date(),
  dateKey: toKey(today),
  minutes: minutesFromKey(toKey(today)),
  level: levelFromMinutes(minutesFromKey(toKey(today))),
  note: "Hôm nay: duy trì nhịp học đều.",
});
function selectDay(d: DayCell) {
  selected.date = d.date;
  selected.dateKey = d.dateKey;
  selected.minutes = d.minutes;
  selected.level = d.level;
  selected.note = d.note;
}

// Stats
const totalMinutes = computed(() => allDays.value.reduce((s, d) => s + d.minutes, 0));
const studiedDays = computed(() => allDays.value.filter((d) => d.minutes > 0).length);

const currentStreak = computed(() => {
  // streak tính từ hôm nay lùi về trước, gặp ngày 0 thì dừng
  const map = new Map(allDays.value.map((d) => [d.dateKey, d.minutes]));
  let streak = 0;
  for (let i = 0; ; i++) {
    const key = toKey(addDays(startOfDay(today), -i));
    const mins = map.get(key) ?? 0;
    if (mins <= 0) break;
    streak++;
  }
  return streak;
});

const bestStreak = computed(() => {
  let best = 0;
  let cur = 0;
  for (const d of allDays.value) {
    if (d.minutes > 0) {
      cur++;
      best = Math.max(best, cur);
    } else {
      cur = 0;
    }
  }
  return best;
});

// Demo: add study to today to see cell become darker
function mockMoreStudy() {
  const key = toKey(today);
  const idx = allDays.value.findIndex((x) => x.dateKey === key);
  if (idx < 0) return;

  const cur = allDays.value[idx];
  if (!cur) return;
  const added = 25;
  const newMin = Math.min(240, cur.minutes + added);
  const updated: DayCell = {
    ...cur,
    date: cur.date!,
    dateKey: cur.dateKey!,
    minutes: newMin,
    level: levelFromMinutes(newMin),
    note: "Demo: thêm thời lượng học hôm nay.",
  };
  allDays.value.splice(idx, 1, updated);
  selectDay(updated);
}
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

/* Shared mono glass */
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

.chip {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  font-size: 12px;
  color: rgba(0,0,0,0.75);
}
:global(.dark) .chip {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.75);
}

.infoRow { display:flex; align-items:center; justify-content:space-between; gap:12px; }
.infoLabel { font-size: 13px; opacity: .65; }
.infoValue { font-size: 13px; font-weight: 600; opacity: .9; }

.pillLink {
  display: inline-flex;
  height: 32px;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  font-size: 12px;
  font-weight: 700;
  color: rgba(0,0,0,0.80);
  text-decoration: none;
  transition: background 160ms ease, transform 60ms ease;
}
.pillLink:hover { background: rgba(255,255,255,0.95); text-decoration: underline; text-underline-offset: 3px; }
.pillLink:active { transform: translateY(1px); }
:global(.dark) .pillLink {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.85);
}
:global(.dark) .pillLink:hover { background: rgba(255,255,255,0.10); }

.btnSolid {
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 800;
  border: 1px solid rgba(0,0,0,0.10);
  background: #000;
  color: #fff;
  transition: filter 160ms ease, transform 60ms ease;
}
.btnSolid:active { transform: translateY(1px); }
:global(.dark) .btnSolid { background: #fff; color: #000; border-color: rgba(255,255,255,0.10); }

.btnGhost {
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 800;
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

/* Heatmap cell (GitHub-like) */
.cell {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.10);
  background: transparent;
  cursor: pointer;
  transition: transform 60ms ease, opacity 120ms ease;
}
.cell:hover { opacity: 0.9; }
.cell:active { transform: translateY(1px); }

:global(.dark) .cell {
  border-color: rgba(255,255,255,0.10);
}

/* Levels: nhiều = đen thui (light), dark mode thì nhiều = trắng sáng để thấy rõ */
.cell-empty { background: transparent; }
.cell-lv1 { background: rgba(0,0,0,0.08); }
.cell-lv2 { background: rgba(0,0,0,0.18); }
.cell-lv3 { background: rgba(0,0,0,0.40); }
.cell-lv4 { background: rgba(0,0,0,0.95); }

:global(.dark) .cell-empty { background: transparent; }
:global(.dark) .cell-lv1 { background: rgba(255,255,255,0.10); }
:global(.dark) .cell-lv2 { background: rgba(255,255,255,0.20); }
:global(.dark) .cell-lv3 { background: rgba(255,255,255,0.40); }
:global(.dark) .cell-lv4 { background: rgba(255,255,255,0.95); }

/* Tasks + bullets */
.task {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  border-radius: 18px; padding: 10px 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.55);
}
:global(.dark) .task {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
.taskLeft { display:flex; align-items:center; gap:10px; min-width:0; }
.dot { width:8px; height:8px; border-radius:999px; background: rgba(0,0,0,0.55); }
:global(.dark) .dot { background: rgba(255,255,255,0.55); }
.taskText { font-size: 13px; opacity: .85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.taskTag {
  font-size: 11px; opacity: .65; padding: 4px 8px; border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
}
:global(.dark) .taskTag { border-color: rgba(255,255,255,0.10); }

.bullet { display:flex; align-items:flex-start; gap:10px; }
.bulletDot {
  width: 8px; height: 8px; border-radius: 999px; margin-top: 6px;
  background: rgba(0,0,0,0.55);
}
:global(.dark) .bulletDot { background: rgba(255,255,255,0.55); }

.badge {
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.55);
  padding: 12px;
}
:global(.dark) .badge {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
.badgeTitle { font-size: 13px; font-weight: 800; }
.badgeHint { font-size: 12px; opacity: .65; margin-top: 4px; }
</style>
