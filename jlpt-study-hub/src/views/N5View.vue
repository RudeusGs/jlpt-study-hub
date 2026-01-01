<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
    <!-- subtle mono bg -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div class="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] grid-mask" />
    </div>

    <main class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <section class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div
            class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70
                   dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-black/60 dark:bg-white/60"></span>
            JLPT Study Hub • N5
          </div>
          <h1 class="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">N5 Study</h1>
          <p class="mt-1 text-sm text-black/60 dark:text-white/60">
            Từ vựng • Ngữ pháp • Bài tập — tối giản, rõ ràng, dễ học.
          </p>
        </div>

        <div class="flex gap-3">
          <button class="btnGhost" type="button" @click="toggleTheme">Toggle theme</button>
          <button class="btnSolid" type="button" @click="resetProgress">Reset demo</button>
        </div>
      </section>

      <!-- Quick stats -->
      <section class="mt-8 grid gap-3 sm:grid-cols-3">
        <div class="card p-6">
          <p class="text-xs text-black/60 dark:text-white/60">Vocabulary</p>
          <p class="mt-1 text-2xl font-semibold tabular-nums">{{ vocabLearned }}/{{ vocabItems.length }}</p>
          <p class="mt-2 text-sm text-black/60 dark:text-white/60">Đã “learned” (review/mastered).</p>
        </div>
        <div class="card p-6">
          <p class="text-xs text-black/60 dark:text-white/60">Grammar</p>
          <p class="mt-1 text-2xl font-semibold tabular-nums">{{ grammarItems.length }}</p>
          <p class="mt-2 text-sm text-black/60 dark:text-white/60">Mẫu câu trọng tâm (demo).</p>
        </div>
        <div class="card p-6">
          <p class="text-xs text-black/60 dark:text-white/60">Quiz best</p>
          <p class="mt-1 text-2xl font-semibold tabular-nums">{{ bestScore }}%</p>
          <p class="mt-2 text-sm text-black/60 dark:text-white/60">Điểm cao nhất (lưu máy).</p>
        </div>
      </section>

      <!-- Main layout -->
      <section class="mt-10 grid gap-3 lg:grid-cols-12">
        <!-- Left: Content -->
        <div class="lg:col-span-8 card p-6">
          <!-- Tabs -->
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="tabsWrap">
              <button
                v-for="t in tabs"
                :key="t.key"
                class="tabBtn"
                :class="activeTab === t.key ? 'tabActive' : 'tabIdle'"
                type="button"
                @click="activeTab = t.key"
              >
                {{ t.label }}
              </button>
            </div>

            <div class="flex gap-2">
              <button v-if="activeTab === 'vocab'" class="miniBtn" type="button" @click="flashMode = !flashMode">
                {{ flashMode ? "List mode" : "Flashcards" }}
              </button>
              <button v-if="activeTab === 'exercise'" class="miniBtn" type="button" @click="startQuiz">
                Restart quiz
              </button>
            </div>
          </div>

          <!-- VOCAB -->
          <div v-if="activeTab === 'vocab'" class="mt-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label class="relative block w-full sm:max-w-sm">
                <span class="sr-only">Search</span>
                <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-black/45 dark:text-white/45">
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
                  v-model.trim="vocabQuery"
                  class="h-11 w-full rounded-2xl border border-black/10 bg-white/60 px-10 text-sm outline-none
                         focus:ring-2 focus:ring-black/15 focus:border-black/20
                         dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/20 dark:focus:border-white/20"
                  placeholder="Tìm từ: たべる, 食べる, eat..."
                />
              </label>

              <div class="inline-flex rounded-2xl border border-black/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5">
                <button
                  v-for="f in vocabFilters"
                  :key="f.key"
                  class="h-9 px-3 rounded-xl text-sm font-semibold transition"
                  :class="vocabFilter === f.key ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10'"
                  type="button"
                  @click="vocabFilter = f.key"
                >
                  {{ f.label }}
                </button>
              </div>
            </div>

            <!-- Flashcards -->
            <div v-if="flashMode" class="mt-6">
              <div class="rounded-3xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs text-black/60 dark:text-white/60">Flashcard</p>
                    <p class="mt-1 text-sm font-semibold">
                      {{ flashIndex + 1 }} / {{ flashPool.length }}
                      <span class="text-black/50 dark:text-white/50">({{ currentFlashStatusLabel }})</span>
                    </p>
                  </div>

                  <div class="flex gap-2">
                    <button class="miniBtn" type="button" @click="prevFlash" :disabled="flashPool.length <= 1">Prev</button>
                    <button class="miniBtn" type="button" @click="nextFlash" :disabled="flashPool.length <= 1">Next</button>
                  </div>
                </div>

                <button
                  class="mt-5 w-full rounded-3xl border border-black/10 bg-white/70 p-8 text-left
                         hover:bg-white transition dark:border-white/10 dark:bg-black/40 dark:hover:bg-black/30"
                  type="button"
                  @click="flashFlipped = !flashFlipped"
                >
                  <div v-if="!flashFlipped">
                    <p class="text-xs text-black/55 dark:text-white/55">Front (click to reveal)</p>
                    <p class="mt-3 text-3xl font-semibold tracking-tight">{{ currentFlash.jp }}</p>
                    <p class="mt-2 text-sm text-black/60 dark:text-white/60">{{ currentFlash.kana }}</p>
                  </div>
                  <div v-else>
                    <p class="text-xs text-black/55 dark:text-white/55">Back</p>
                    <p class="mt-3 text-lg font-semibold">{{ currentFlash.meaning }}</p>
                    <p class="mt-2 text-sm text-black/60 dark:text-white/60">{{ currentFlash.example }}</p>
                  </div>
                </button>

                <div class="mt-4 grid grid-cols-3 gap-3">
                  <button class="btnGhost" type="button" @click="setVocabStatus(currentFlash.id, 'new')">Again</button>
                  <button class="btnGhost" type="button" @click="setVocabStatus(currentFlash.id, 'review')">Good</button>
                  <button class="btnSolid" type="button" @click="setVocabStatus(currentFlash.id, 'mastered')">Easy</button>
                </div>

                <p class="mt-3 text-xs text-black/50 dark:text-white/50">
                  Tip: “Again” = quay lại học, “Good” = vào review, “Easy” = mastered.
                </p>
              </div>
            </div>

            <!-- List -->
            <div v-else class="mt-6">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead class="text-xs text-black/55 dark:text-white/55">
                    <tr>
                      <th class="py-2 pr-4">JP</th>
                      <th class="py-2 pr-4">Kana</th>
                      <th class="py-2 pr-4">Meaning</th>
                      <th class="py-2 pr-4">Example</th>
                      <th class="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="v in filteredVocab"
                      :key="v.id"
                      class="border-t border-black/10 dark:border-white/10"
                    >
                      <td class="py-3 pr-4 font-semibold">{{ v.jp }}</td>
                      <td class="py-3 pr-4 text-black/70 dark:text-white/70">{{ v.kana }}</td>
                      <td class="py-3 pr-4">{{ v.meaning }}</td>
                      <td class="py-3 pr-4 text-black/70 dark:text-white/70">{{ v.example }}</td>
                      <td class="py-3">
                        <div class="flex items-center gap-2">
                          <span class="statusPill">{{ vocabStatusLabel(getVocabStatus(v.id)) }}</span>
                          <div class="flex gap-1">
                            <button class="tinyBtn" type="button" @click="setVocabStatus(v.id, 'new')">New</button>
                            <button class="tinyBtn" type="button" @click="setVocabStatus(v.id, 'review')">Review</button>
                            <button class="tinyBtn" type="button" @click="setVocabStatus(v.id, 'mastered')">Done</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredVocab.length === 0">
                      <td colspan="5" class="py-8 text-center text-black/60 dark:text-white/60">
                        Không có kết quả.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-4 text-xs text-black/50 dark:text-white/50">
                Lưu ý: status được lưu localStorage (demo).
              </div>
            </div>
          </div>

          <!-- GRAMMAR -->
          <div v-else-if="activeTab === 'grammar'" class="mt-6">
            <div class="space-y-3">
              <div
                v-for="g in grammarItems"
                :key="g.id"
                class="rounded-3xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <button class="w-full text-left" type="button" @click="toggleGrammar(g.id)">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="text-xs text-black/60 dark:text-white/60">Pattern</p>
                      <p class="mt-1 text-base font-semibold tracking-tight">{{ g.pattern }}</p>
                      <p class="mt-2 text-sm text-black/70 dark:text-white/70">{{ g.meaning }}</p>
                    </div>
                    <span class="miniTag">{{ openGrammarId === g.id ? "Hide" : "Show" }}</span>
                  </div>
                </button>

                <div v-show="openGrammarId === g.id" class="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
                  <p class="text-sm font-semibold">Cách dùng</p>
                  <p class="mt-2 text-sm text-black/70 dark:text-white/70 leading-6">{{ g.usage }}</p>

                  <p class="mt-4 text-sm font-semibold">Ví dụ</p>
                  <ul class="mt-2 space-y-2">
                    <li v-for="(ex, i) in g.examples" :key="i" class="exRow">
                      <span class="bulletDot"></span>
                      <span class="text-sm text-black/85 dark:text-white/85">{{ ex.jp }}</span>
                      <span class="text-sm text-black/60 dark:text-white/60">— {{ ex.meaning }}</span>
                    </li>
                  </ul>

                  <p v-if="g.note" class="mt-4 text-xs text-black/55 dark:text-white/55">
                    Note: {{ g.note }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- EXERCISE -->
          <div v-else-if="activeTab === 'exercise'" class="mt-6">
            <div class="rounded-3xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs text-black/60 dark:text-white/60">Quiz</p>
                  <h3 class="mt-1 text-lg font-semibold tracking-tight">Bài tập trắc nghiệm (demo)</h3>
                  <p class="mt-2 text-sm text-black/70 dark:text-white/70">
                    Chọn đáp án đúng. Cuối bài sẽ có điểm.
                  </p>
                </div>

                <div class="text-right">
                  <p class="text-xs text-black/60 dark:text-white/60">Progress</p>
                  <p class="mt-1 text-sm font-semibold tabular-nums">
                    {{ quizIndex + 1 }} / {{ quiz.length }}
                  </p>
                </div>
              </div>

              <div class="mt-5 h-2 w-full rounded-full bg-black/10 overflow-hidden dark:bg-white/10">
                <div
                  class="h-full rounded-full bg-black/80 dark:bg-white/80 transition-[width] duration-200"
                  :style="{ width: `${Math.round(((quizIndex + 1) / quiz.length) * 100)}%` }"
                />
              </div>

              <div class="mt-6">
                <p class="text-xs text-black/60 dark:text-white/60">Question</p>
                <p class="mt-2 text-base font-semibold leading-7">{{ currentQ.prompt }}</p>

                <div class="mt-4 grid gap-2">
                  <button
                    v-for="(c, i) in currentQ.choices"
                    :key="i"
                    type="button"
                    class="choiceBtn"
                    :class="choiceClass(i)"
                    @click="pickChoice(i)"
                  >
                    <span class="choiceKey">{{ String.fromCharCode(65 + i) }}</span>
                    <span class="text-sm font-semibold">{{ c }}</span>
                  </button>
                </div>

                <div class="mt-5 flex flex-col sm:flex-row gap-3">
                  <button class="btnGhost" type="button" @click="prevQ" :disabled="quizIndex === 0">
                    Previous
                  </button>
                  <button class="btnSolid" type="button" @click="nextQ">
                    {{ quizIndex === quiz.length - 1 ? "Finish" : "Next" }}
                  </button>
                </div>

                <div v-if="finished" class="mt-6 rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/40">
                  <p class="text-sm font-semibold">Kết quả</p>
                  <p class="mt-1 text-sm text-black/70 dark:text-white/70">
                    Bạn đúng <span class="font-semibold">{{ score }}</span> / {{ quiz.length }}
                    — <span class="font-semibold">{{ scorePercent }}%</span>
                  </p>
                  <p class="mt-2 text-xs text-black/55 dark:text-white/55">
                    Best lưu máy: {{ bestScore }}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- KANJI -->
          <div v-else class="mt-6">
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                v-for="k in kanjiItems"
                :key="k.kanji"
                class="rounded-3xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-xs text-black/60 dark:text-white/60">Kanji</p>
                    <p class="mt-1 text-3xl font-semibold tracking-tight">{{ k.kanji }}</p>
                    <p class="mt-2 text-sm text-black/70 dark:text-white/70">
                      On: {{ k.on }} • Kun: {{ k.kun }}
                    </p>
                  </div>
                  <span class="miniTag">{{ k.level }}</span>
                </div>

                <p class="mt-3 text-sm font-semibold">{{ k.meaning }}</p>
                <p class="mt-2 text-sm text-black/70 dark:text-white/70">{{ k.example }}</p>
              </div>
            </div>

            <p class="mt-4 text-xs text-black/50 dark:text-white/50">
              * Demo kanji list — bạn có thể thay bằng danh sách thật của bạn.
            </p>
          </div>
        </div>

        <!-- Right: Sidebar -->
        <aside class="lg:col-span-4 space-y-3">
          <div class="card p-6">
            <h3 class="text-sm font-semibold">Hôm nay học gì?</h3>
            <p class="mt-2 text-sm text-black/60 dark:text-white/60">
              Checklist tối giản để giữ nhịp.
            </p>

            <div class="mt-4 space-y-2">
              <label class="taskRow">
                <input v-model="todayTasks.vocab" type="checkbox" class="ck" />
                <span class="taskText">SRS từ vựng (15–20 từ)</span>
              </label>
              <label class="taskRow">
                <input v-model="todayTasks.kanji" type="checkbox" class="ck" />
                <span class="taskText">Kanji (8–10 chữ)</span>
              </label>
              <label class="taskRow">
                <input v-model="todayTasks.grammar" type="checkbox" class="ck" />
                <span class="taskText">Ngữ pháp (2 mẫu + ví dụ)</span>
              </label>
              <label class="taskRow">
                <input v-model="todayTasks.exercise" type="checkbox" class="ck" />
                <span class="taskText">Bài tập (5–10 câu)</span>
              </label>
            </div>

            <div class="mt-5">
              <p class="text-xs text-black/60 dark:text-white/60">Completion</p>
              <div class="mt-2 h-2 w-full rounded-full bg-black/10 overflow-hidden dark:bg-white/10">
                <div
                  class="h-full rounded-full bg-black/80 dark:bg-white/80 transition-[width] duration-200"
                  :style="{ width: `${taskCompletion}%` }"
                />
              </div>
              <p class="mt-2 text-xs text-black/50 dark:text-white/50">
                {{ taskCompletion }}% — giữ đều mỗi ngày là thắng.
              </p>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-sm font-semibold">Gợi ý học N5</h3>
            <ul class="mt-3 space-y-2 text-sm text-black/70 dark:text-white/70">
              <li class="bullet"><span class="bulletDot"></span>Học ít nhưng đều: 25–35 phút/ngày</li>
              <li class="bullet"><span class="bulletDot"></span>Ưu tiên từ/cấu trúc hay gặp trong đề</li>
              <li class="bullet"><span class="bulletDot"></span>Làm quiz ngắn để “khóa” kiến thức</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";

// ---------- Theme ----------
function toggleTheme() {
  const root = document.documentElement;
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
}
onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.classList.add("dark");
});

// ---------- Tabs ----------
type TabKey = "vocab" | "grammar" | "exercise" | "kanji";
const tabs: { key: TabKey; label: string }[] = [
  { key: "vocab", label: "Từ vựng" },
  { key: "grammar", label: "Ngữ pháp" },
  { key: "exercise", label: "Bài tập" },
  { key: "kanji", label: "Kanji" },
];
const activeTab = ref<TabKey>("vocab");

// ---------- Vocabulary ----------
type VocabStatus = "new" | "review" | "mastered";
type VocabItem = {
  id: string;
  jp: string;
  kana: string;
  meaning: string;
  example: string;
};

const vocabItems: VocabItem[] = [
  { id: "v1", jp: "食べる", kana: "たべる", meaning: "ăn", example: "パンを食べます。— Tôi ăn bánh mì." },
  { id: "v2", jp: "飲む", kana: "のむ", meaning: "uống", example: "水を飲みます。— Tôi uống nước." },
  { id: "v3", jp: "行く", kana: "いく", meaning: "đi", example: "学校へ行きます。— Tôi đi đến trường." },
  { id: "v4", jp: "来る", kana: "くる", meaning: "đến", example: "友だちが来ます。— Bạn tôi đến." },
  { id: "v5", jp: "見る", kana: "みる", meaning: "xem/nhìn", example: "映画を見ます。— Tôi xem phim." },
  { id: "v6", jp: "買う", kana: "かう", meaning: "mua", example: "本を買います。— Tôi mua sách." },
  { id: "v7", jp: "大きい", kana: "おおきい", meaning: "to, lớn", example: "大きいかばんです。— Cái cặp lớn." },
  { id: "v8", jp: "小さい", kana: "ちいさい", meaning: "nhỏ", example: "小さい犬です。— Con chó nhỏ." },
];

const LS_VOCAB = "jlpt_n5_vocab_status_v1";
const vocabStatusMap = ref<Record<string, VocabStatus>>({});

function getVocabStatus(id: string): VocabStatus {
  return vocabStatusMap.value[id] ?? "new";
}
function setVocabStatus(id: string, status: VocabStatus) {
  vocabStatusMap.value = { ...vocabStatusMap.value, [id]: status };
}
function vocabStatusLabel(s: VocabStatus) {
  return s === "new" ? "New" : s === "review" ? "Review" : "Mastered";
}

onMounted(() => {
  const raw = localStorage.getItem(LS_VOCAB);
  if (raw) {
    try {
      vocabStatusMap.value = JSON.parse(raw);
    } catch {
      vocabStatusMap.value = {};
    }
  }
});
watch(
  vocabStatusMap,
  (v) => localStorage.setItem(LS_VOCAB, JSON.stringify(v)),
  { deep: true }
);

const vocabLearned = computed(() => vocabItems.filter((x) => getVocabStatus(x.id) !== "new").length);

const vocabQuery = ref("");
const vocabFilters = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "review", label: "Review" },
  { key: "mastered", label: "Done" },
] as const;
type VocabFilterKey = (typeof vocabFilters)[number]["key"];
const vocabFilter = ref<VocabFilterKey>("all");

const filteredVocab = computed(() => {
  const q = vocabQuery.value.trim().toLowerCase();
  return vocabItems.filter((v) => {
    const status = getVocabStatus(v.id);
    const okFilter = vocabFilter.value === "all" ? true : status === vocabFilter.value;
    const okQuery =
      !q ||
      v.jp.toLowerCase().includes(q) ||
      v.kana.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q);
    return okFilter && okQuery;
  });
});

// Flashcards (type-safe)
const flashMode = ref(false);
const flashFlipped = ref(false);
const flashIndex = ref(0);

const flashPool = computed<VocabItem[]>(() => {
  const pool = vocabItems.filter((x) => getVocabStatus(x.id) !== "mastered");
  return pool.length ? pool : vocabItems; // never empty
});

const FALLBACK_VOCAB: VocabItem = {
  id: "__fallback__",
  jp: "—",
  kana: "—",
  meaning: "No data",
  example: "—",
};

const currentFlash = computed<VocabItem>(() => {
  const pool = flashPool.value;
  if (pool.length === 0) return FALLBACK_VOCAB;
  const idx = Math.min(Math.max(0, flashIndex.value), pool.length - 1);
  return pool[idx] ?? FALLBACK_VOCAB;
});


const currentFlashStatusLabel = computed(() => vocabStatusLabel(getVocabStatus(currentFlash.value.id)));

watch([flashMode, flashPool], () => {
  flashIndex.value = 0;
  flashFlipped.value = false;
});

function nextFlash() {
  const n = flashPool.value.length;
  if (n <= 1) return;
  flashIndex.value = (flashIndex.value + 1) % n;
}
function prevFlash() {
  const n = flashPool.value.length;
  if (n <= 1) return;
  flashIndex.value = (flashIndex.value - 1 + n) % n;
}

// ---------- Grammar ----------
type GrammarItem = {
  id: string;
  pattern: string;
  meaning: string;
  usage: string;
  examples: { jp: string; meaning: string }[];
  note?: string;
};

const grammarItems: GrammarItem[] = [
  {
    id: "g1",
    pattern: "〜ます / 〜ません",
    meaning: "thể lịch sự: làm / không làm",
    usage: "Dùng với động từ để nói lịch sự. 〜ません là phủ định hiện tại/tương lai.",
    examples: [
      { jp: "毎日 勉強します。", meaning: "Tôi học mỗi ngày." },
      { jp: "今日は 勉強しません。", meaning: "Hôm nay tôi không học." },
    ],
  },
  {
    id: "g2",
    pattern: "N + をください",
    meaning: "cho tôi (một) …",
    usage: "Dùng khi gọi món/nhờ mua/hỏi ở cửa hàng.",
    examples: [
      { jp: "水をください。", meaning: "Cho tôi nước." },
      { jp: "これをください。", meaning: "Cho tôi cái này." },
    ],
    note: "Kết hợp lịch sự: 〜をお願いします cũng hay dùng.",
  },
  {
    id: "g3",
    pattern: "N + があります / います",
    meaning: "có (đồ vật) / có (người, động vật)",
    usage: "あります: đồ vật; います: người/động vật. Nơi chốn + に + N + があります/います.",
    examples: [
      { jp: "部屋に 机があります。", meaning: "Trong phòng có cái bàn." },
      { jp: "公園に 子どもがいます。", meaning: "Ở công viên có trẻ em." },
    ],
  },
];

const openGrammarId = ref<string | null>(grammarItems[0]?.id ?? null);
function toggleGrammar(id: string) {
  openGrammarId.value = openGrammarId.value === id ? null : id;
}

// ---------- Kanji (added) ----------
type KanjiItem = { kanji: string; on: string; kun: string; meaning: string; example: string; level: "N5" };
const kanjiItems: KanjiItem[] = [
  { kanji: "日", on: "ニチ", kun: "ひ", meaning: "ngày / mặt trời", example: "日よう日 — Chủ nhật", level: "N5" },
  { kanji: "月", on: "ゲツ", kun: "つき", meaning: "tháng / mặt trăng", example: "月よう日 — Thứ hai", level: "N5" },
  { kanji: "人", on: "ジン", kun: "ひと", meaning: "người", example: "日本人 — người Nhật", level: "N5" },
  { kanji: "大", on: "ダイ", kun: "おお(きい)", meaning: "lớn", example: "大きい — to, lớn", level: "N5" },
];

// ---------- Exercises (Quiz) ----------
type QuizQ = { id: string; prompt: string; choices: string[]; answerIndex: number };

const quiz: QuizQ[] = [
  { id: "q1", prompt: "「食べる」 có nghĩa là gì?", choices: ["uống", "ăn", "đi", "xem"], answerIndex: 1 },
  { id: "q2", prompt: "Chọn câu đúng với mẫu 「Nをください」", choices: ["水を飲みます。", "水がいます。", "水をください。", "水へ行きます。"], answerIndex: 2 },
  { id: "q3", prompt: "「部屋に 机があります。」 nghĩa là:", choices: ["Trong phòng có cái bàn.", "Trong phòng có trẻ em.", "Tôi mua cái bàn.", "Tôi không có phòng."], answerIndex: 0 },
  { id: "q4", prompt: "Chọn phủ định lịch sự đúng của 「行きます」", choices: ["行きません", "行きない", "行くません", "行きませんでした"], answerIndex: 0 },
];

const LS_BEST = "jlpt_n5_quiz_best_v1";
const bestScore = ref<number>(Number(localStorage.getItem(LS_BEST) ?? 0));

const quizIndex = ref(0);
const picked = ref<number | null>(null);
const answers = ref<Record<string, number | null>>({});
const finished = ref(false);

const FALLBACK_Q: QuizQ = {
  id: "__fallback__",
  prompt: "No question",
  choices: ["—", "—", "—", "—"],
  answerIndex: 0,
};

const currentQ = computed<QuizQ>(() => {
  if (quiz.length === 0) return FALLBACK_Q;
  const idx = Math.min(Math.max(0, quizIndex.value), quiz.length - 1);
  return quiz[idx] ?? FALLBACK_Q;
});

function pickChoice(i: number) {
  picked.value = i;
  answers.value = { ...answers.value, [currentQ.value.id]: i };
}

function startQuiz() {
  quizIndex.value = 0;
  picked.value = null;
  finished.value = false;
  answers.value = {};
}

function prevQ() {
  if (quizIndex.value === 0) return;
  quizIndex.value--;
  picked.value = answers.value[currentQ.value.id] ?? null;
}

function nextQ() {
  if (quizIndex.value < quiz.length - 1) {
    quizIndex.value++;
    picked.value = answers.value[currentQ.value.id] ?? null;
    return;
  }
  finished.value = true;
  if (scorePercent.value > bestScore.value) {
    bestScore.value = scorePercent.value;
    localStorage.setItem(LS_BEST, String(bestScore.value));
  }
}

const score = computed(() => {
  let s = 0;
  for (const q of quiz) {
    const a = answers.value[q.id];
    if (a === q.answerIndex) s++;
  }
  return s;
});
const scorePercent = computed(() => Math.round((score.value / quiz.length) * 100));

function choiceClass(i: number) {
  const correct = currentQ.value.answerIndex === i;
  const chosen = picked.value === i;

  if (!finished.value && chosen) return "choiceChosen";
  if (finished.value && correct) return "choiceCorrect";
  if (finished.value && chosen && !correct) return "choiceWrong";
  return "choiceIdle";
}

onMounted(() => startQuiz());

// ---------- Sidebar tasks ----------
const todayTasks = reactive({
  vocab: false,
  kanji: false,
  grammar: false,
  exercise: false,
});
const taskCompletion = computed(() => {
  const vals = Object.values(todayTasks);
  const done = vals.filter(Boolean).length;
  return Math.round((done / vals.length) * 100);
});

// ---------- Reset ----------
function resetProgress() {
  localStorage.removeItem(LS_VOCAB);
  localStorage.removeItem(LS_BEST);
  vocabStatusMap.value = {};
  bestScore.value = 0;
  startQuiz();
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

/* mono glass card */
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

/* tabs */
.tabsWrap {
  display: inline-flex;
  padding: 4px;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
}
:global(.dark) .tabsWrap {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
.tabBtn {
  height: 38px;
  padding: 0 14px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 800;
  transition: background 160ms ease, color 160ms ease, transform 60ms ease;
}
.tabBtn:active { transform: translateY(1px); }
.tabActive { background: #000; color: #fff; }
:global(.dark) .tabActive { background: #fff; color: #000; }
.tabIdle { color: rgba(0,0,0,0.70); }
.tabIdle:hover { background: rgba(0,0,0,0.05); }
:global(.dark) .tabIdle { color: rgba(255,255,255,0.75); }
:global(.dark) .tabIdle:hover { background: rgba(255,255,255,0.10); }

/* buttons */
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

.miniBtn {
  height: 38px;
  border-radius: 14px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 800;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  color: rgba(0,0,0,0.85);
  transition: background 160ms ease, transform 60ms ease;
}
.miniBtn:hover { background: rgba(255,255,255,0.95); }
.miniBtn:active { transform: translateY(1px); }
:global(.dark) .miniBtn {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.85);
}
:global(.dark) .miniBtn:hover { background: rgba(255,255,255,0.10); }
.miniBtn:disabled { opacity: 0.55; cursor: not-allowed; }

.tinyBtn {
  height: 28px;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  color: rgba(0,0,0,0.80);
}
.tinyBtn:hover { background: rgba(255,255,255,0.95); }
:global(.dark) .tinyBtn {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.85);
}
:global(.dark) .tinyBtn:hover { background: rgba(255,255,255,0.10); }

/* tags / pills */
.miniTag, .statusPill {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  color: rgba(0,0,0,0.70);
}
:global(.dark) .miniTag,
:global(.dark) .statusPill {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.75);
}

/* grammar example row */
.exRow { display:flex; gap:10px; align-items:flex-start; flex-wrap: wrap; }
.bulletDot {
  width: 8px; height: 8px; border-radius: 999px; margin-top: 7px;
  background: rgba(0,0,0,0.55);
}
:global(.dark) .bulletDot { background: rgba(255,255,255,0.55); }

/* quiz */
.choiceBtn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
  text-align: left;
  transition: transform 60ms ease, background 160ms ease, opacity 160ms ease;
}
.choiceBtn:hover { background: rgba(255,255,255,0.95); }
.choiceBtn:active { transform: translateY(1px); }
:global(.dark) .choiceBtn {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
:global(.dark) .choiceBtn:hover { background: rgba(255,255,255,0.10); }

.choiceKey {
  width: 28px;
  height: 28px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 900;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.70);
}
:global(.dark) .choiceKey {
  border-color: rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.40);
}

.choiceIdle { opacity: 0.95; }
.choiceChosen { background: rgba(0,0,0,0.06); }
.choiceCorrect { background: rgba(0,0,0,0.10); }
.choiceWrong { background: rgba(0,0,0,0.03); }
:global(.dark) .choiceChosen { background: rgba(255,255,255,0.10); }
:global(.dark) .choiceCorrect { background: rgba(255,255,255,0.14); }
:global(.dark) .choiceWrong { background: rgba(255,255,255,0.06); }

/* sidebar tasks */
.taskRow {
  display:flex; align-items:center; gap:10px;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.55);
  padding: 10px 12px;
}
:global(.dark) .taskRow {
  border-color: rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
}
.taskText { font-size: 13px; font-weight: 700; opacity: .85; }
.ck {
  height: 16px; width: 16px;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.25);
  background: rgba(255,255,255,0.70);
}
:global(.dark) .ck {
  border-color: rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.10);
}

/* bullets */
.bullet { display:flex; gap:10px; align-items:flex-start; }
</style>
