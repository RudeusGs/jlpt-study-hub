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
            JLPT Study Hub • N4
          </div>
          <h1 class="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">N4 Study</h1>
          <p class="mt-1 text-sm text-black/60 dark:text-white/60">
            Vocabulary • Grammar • Reading • Exercises • Kanji
          </p>
        </div>

        <div class="flex gap-3">
          <button class="btnGhost" type="button" @click="toggleTheme">Toggle theme</button>
          <button class="btnSolid" type="button" @click="resetProgress">Reset demo</button>
        </div>
      </section>

      <!-- Quick stats -->
      <section class="mt-8 grid gap-3 sm:grid-cols-4">
        <div class="card p-6">
          <p class="text-xs text-black/60 dark:text-white/60">Vocabulary learned</p>
          <p class="mt-1 text-2xl font-semibold tabular-nums">{{ vocabLearned }}/{{ vocabItems.length }}</p>
          <p class="mt-2 text-sm text-black/60 dark:text-white/60">review/mastered</p>
        </div>
        <div class="card p-6">
          <p class="text-xs text-black/60 dark:text-white/60">Grammar patterns</p>
          <p class="mt-1 text-2xl font-semibold tabular-nums">{{ grammarItems.length }}</p>
          <p class="mt-2 text-sm text-black/60 dark:text-white/60">core N4</p>
        </div>
        <div class="card p-6">
          <p class="text-xs text-black/60 dark:text-white/60">Reading correct</p>
          <p class="mt-1 text-2xl font-semibold tabular-nums">{{ readingCorrect }}/{{ reading.questions.length }}</p>
          <p class="mt-2 text-sm text-black/60 dark:text-white/60">this passage</p>
        </div>
        <div class="card p-6">
          <p class="text-xs text-black/60 dark:text-white/60">Quiz best</p>
          <p class="mt-1 text-2xl font-semibold tabular-nums">{{ bestScore }}%</p>
          <p class="mt-2 text-sm text-black/60 dark:text-white/60">saved locally</p>
        </div>
      </section>

      <!-- Main layout -->
      <section class="mt-10 grid gap-3 lg:grid-cols-12">
        <!-- Left -->
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
              <button v-if="activeTab === 'reading'" class="miniBtn" type="button" @click="resetReading">
                Reset reading
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
                  placeholder="Tìm từ: 便利, べんり, convenient..."
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
                    <div class="mt-3 flex flex-wrap gap-2">
                      <span class="miniTag">{{ currentFlash.tag }}</span>
                      <span class="miniTag">N4</span>
                    </div>
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
                      <th class="py-2 pr-4">Tag</th>
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
                      <td class="py-3 pr-4">
                        <span class="miniTag">{{ v.tag }}</span>
                      </td>
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
                      <td colspan="6" class="py-8 text-center text-black/60 dark:text-white/60">
                        Không có kết quả.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p class="mt-4 text-xs text-black/50 dark:text-white/50">
                Status lưu localStorage (demo) — bạn có thể thay bằng backend.
              </p>
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

          <!-- READING -->
          <div v-else-if="activeTab === 'reading'" class="mt-6">
            <div class="rounded-3xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs text-black/60 dark:text-white/60">Reading</p>
                  <h3 class="mt-1 text-lg font-semibold tracking-tight">{{ reading.title }}</h3>
                  <p class="mt-2 text-sm text-black/70 dark:text-white/70">Đọc đoạn văn và trả lời câu hỏi.</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-black/60 dark:text-white/60">Progress</p>
                  <p class="mt-1 text-sm font-semibold tabular-nums">
                    {{ readingAnswered }}/{{ reading.questions.length }}
                  </p>
                </div>
              </div>

              <div class="mt-5 rounded-2xl border border-black/10 bg-white/70 p-4 leading-7 text-sm text-black/80 dark:border-white/10 dark:bg-black/40 dark:text-white/80">
                {{ reading.passage }}
              </div>

              <div class="mt-6 space-y-4">
                <div
                  v-for="q in reading.questions"
                  :key="q.id"
                  class="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <p class="text-sm font-semibold">{{ q.prompt }}</p>

                  <div class="mt-3 grid gap-2">
                    <button
                      v-for="(c, i) in q.choices"
                      :key="i"
                      type="button"
                      class="choiceBtn"
                      :class="readingChoiceClass(q.id, i)"
                      @click="pickReading(q.id, i)"
                    >
                      <span class="choiceKey">{{ String.fromCharCode(65 + i) }}</span>
                      <span class="text-sm font-semibold">{{ c }}</span>
                    </button>
                  </div>

                  <div v-if="readingShowAnswer" class="mt-3 text-xs text-black/60 dark:text-white/60">
                    Đáp án: <span class="font-semibold">{{ String.fromCharCode(65 + q.answerIndex) }}</span>
                    <span v-if="q.explain">— {{ q.explain }}</span>
                  </div>
                </div>
              </div>

              <div class="mt-5 flex flex-col sm:flex-row gap-3">
                <button class="btnGhost" type="button" @click="readingShowAnswer = !readingShowAnswer">
                  {{ readingShowAnswer ? "Hide answers" : "Show answers" }}
                </button>
                <button class="btnSolid" type="button" @click="resetReading">Reset</button>
              </div>
            </div>
          </div>

          <!-- EXERCISE -->
          <div v-else-if="activeTab === 'exercise'" class="mt-6">
            <div class="rounded-3xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs text-black/60 dark:text-white/60">Quiz</p>
                  <h3 class="mt-1 text-lg font-semibold tracking-tight">Bài tập trắc nghiệm N4 (demo)</h3>
                  <p class="mt-2 text-sm text-black/70 dark:text-white/70">
                    Lẫn vocab + grammar. Finish để xem điểm.
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
                    :class="quizChoiceClass(i)"
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

                <div
                  v-if="finished"
                  class="mt-6 rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-black/40"
                >
                  <p class="text-sm font-semibold">Kết quả</p>
                  <p class="mt-1 text-sm text-black/70 dark:text-white/70">
                    Bạn đúng <span class="font-semibold">{{ score }}</span> / {{ quiz.length }}
                    — <span class="font-semibold">{{ scorePercent }}%</span>
                  </p>
                  <p class="mt-2 text-xs text-black/55 dark:text-white/55">Best: {{ bestScore }}%</p>
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
                  <span class="miniTag">N4</span>
                </div>

                <p class="mt-3 text-sm font-semibold">{{ k.meaning }}</p>
                <p class="mt-2 text-sm text-black/70 dark:text-white/70">{{ k.example }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Sidebar -->
        <aside class="lg:col-span-4 space-y-3">
          <div class="card p-6">
            <h3 class="text-sm font-semibold">N4 mini plan</h3>
            <p class="mt-2 text-sm text-black/60 dark:text-white/60">
              N4 cần “độ dày” hơn N5: đọc hiểu + ngữ pháp nhiều hơn.
            </p>

            <div class="mt-4 space-y-2">
              <label class="taskRow">
                <input v-model="todayTasks.vocab" type="checkbox" class="ck" />
                <span class="taskText">Vocab 20–30 từ (SRS)</span>
              </label>
              <label class="taskRow">
                <input v-model="todayTasks.grammar" type="checkbox" class="ck" />
                <span class="taskText">Grammar 2–3 mẫu + đặt câu</span>
              </label>
              <label class="taskRow">
                <input v-model="todayTasks.reading" type="checkbox" class="ck" />
                <span class="taskText">Reading 1 đoạn + câu hỏi</span>
              </label>
              <label class="taskRow">
                <input v-model="todayTasks.exercise" type="checkbox" class="ck" />
                <span class="taskText">Quiz 10 câu</span>
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
              <p class="mt-2 text-xs text-black/50 dark:text-white/50">{{ taskCompletion }}%</p>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-sm font-semibold">Tips</h3>
            <ul class="mt-3 space-y-2 text-sm text-black/70 dark:text-white/70">
              <li class="bullet"><span class="bulletDot"></span>Đọc nhanh ý chính trước, sau đó soi chi tiết</li>
              <li class="bullet"><span class="bulletDot"></span>Ngữ pháp: học theo cặp ví dụ đúng–sai</li>
              <li class="bullet"><span class="bulletDot"></span>Quiz ngắn mỗi ngày để giữ phản xạ</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";

/* ---------------- Theme ---------------- */
function toggleTheme() {
  const root = document.documentElement;
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
}
onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.classList.add("dark");
});

/* ---------------- Tabs ---------------- */
type TabKey = "vocab" | "grammar" | "reading" | "exercise" | "kanji";
const tabs: { key: TabKey; label: string }[] = [
  { key: "vocab", label: "Từ vựng" },
  { key: "grammar", label: "Ngữ pháp" },
  { key: "reading", label: "Reading" },
  { key: "exercise", label: "Bài tập" },
  { key: "kanji", label: "Kanji" },
];
const activeTab = ref<TabKey>("vocab");

/* ---------------- Vocabulary ---------------- */
type VocabStatus = "new" | "review" | "mastered";
type VocabItem = {
  id: string;
  jp: string;
  kana: string;
  meaning: string;
  example: string;
  tag: "daily" | "travel" | "work" | "feelings";
};

const vocabItems: VocabItem[] = [
  { id: "n4v1", jp: "便利", kana: "べんり", meaning: "tiện lợi", example: "このアプリは便利です。", tag: "daily" },
  { id: "n4v2", jp: "予定", kana: "よてい", meaning: "kế hoạch/dự định", example: "明日の予定はありますか。", tag: "daily" },
  { id: "n4v3", jp: "必要", kana: "ひつよう", meaning: "cần thiết", example: "パスポートが必要です。", tag: "travel" },
  { id: "n4v4", jp: "旅行", kana: "りょこう", meaning: "du lịch", example: "来月、旅行します。", tag: "travel" },
  { id: "n4v5", jp: "相談", kana: "そうだん", meaning: "tư vấn/bàn bạc", example: "先生に相談します。", tag: "work" },
  { id: "n4v6", jp: "連絡", kana: "れんらく", meaning: "liên lạc", example: "後で連絡します。", tag: "work" },
  { id: "n4v7", jp: "失敗", kana: "しっぱい", meaning: "thất bại/lỗi", example: "試験で失敗しました。", tag: "feelings" },
  { id: "n4v8", jp: "安心", kana: "あんしん", meaning: "yên tâm", example: "それを聞いて安心しました。", tag: "feelings" },
  { id: "n4v9", jp: "決める", kana: "きめる", meaning: "quyết định", example: "行く日を決めます。", tag: "daily" },
  { id: "n4v10", jp: "増える", kana: "ふえる", meaning: "tăng lên", example: "雨の日は客が増えます。", tag: "work" },
  { id: "n4v11", jp: "減る", kana: "へる", meaning: "giảm xuống", example: "最近、時間が減りました。", tag: "work" },
  { id: "n4v12", jp: "もちろん", kana: "もちろん", meaning: "tất nhiên", example: "もちろん、手伝います。", tag: "daily" },
];

const FALLBACK_VOCAB: VocabItem = {
  id: "__fallback__",
  jp: "—",
  kana: "—",
  meaning: "No data",
  example: "—",
  tag: "daily",
};

const LS_VOCAB = "jlpt_n4_vocab_status_v1";
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
watch(vocabStatusMap, (v) => localStorage.setItem(LS_VOCAB, JSON.stringify(v)), { deep: true });

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
      v.meaning.toLowerCase().includes(q) ||
      v.tag.toLowerCase().includes(q);
    return okFilter && okQuery;
  });
});

/* Flashcards (type-safe) */
const flashMode = ref(false);
const flashFlipped = ref(false);
const flashIndex = ref(0);

const flashPool = computed<VocabItem[]>(() => {
  const pool = vocabItems.filter((x) => getVocabStatus(x.id) !== "mastered");
  return pool.length ? pool : vocabItems;
});

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

/* ---------------- Grammar ---------------- */
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
    id: "n4g1",
    pattern: "Vながら",
    meaning: "vừa … vừa …",
    usage: "Diễn tả hai hành động đồng thời: 音楽を聞きながら勉強します。",
    examples: [
      { jp: "音楽を聞きながら勉強します。", meaning: "Vừa nghe nhạc vừa học." },
      { jp: "歩きながら電話しないでください。", meaning: "Đừng vừa đi vừa gọi điện." },
    ],
  },
  {
    id: "n4g2",
    pattern: "〜てしまう",
    meaning: "lỡ/hoàn tất (thường mang tiếc nuối)",
    usage: "Diễn tả việc đã làm xong hoặc lỡ làm: 宿題を忘れてしまいました。",
    examples: [
      { jp: "宿題を忘れてしまいました。", meaning: "Tôi lỡ quên bài tập." },
      { jp: "ケーキを全部食べてしまった。", meaning: "Tôi ăn hết sạch cái bánh rồi." },
    ],
  },
  {
    id: "n4g3",
    pattern: "〜そうだ (trông có vẻ)",
    meaning: "có vẻ… (nhìn bề ngoài)",
    usage: "Tính từ/động từ bỏ ます: 雨が降りそうです。",
    examples: [
      { jp: "雨が降りそうです。", meaning: "Trông có vẻ sắp mưa." },
      { jp: "この料理はおいしそうです。", meaning: "Món này nhìn có vẻ ngon." },
    ],
    note: "Khác với そうだ (nghe nói).",
  },
  {
    id: "n4g4",
    pattern: "Vたほうがいい",
    meaning: "nên… (lời khuyên)",
    usage: "Khuyên làm gì đó: 早く寝たほうがいいです。",
    examples: [
      { jp: "薬を飲んだほうがいいです。", meaning: "Bạn nên uống thuốc." },
      { jp: "もっと練習したほうがいい。", meaning: "Bạn nên luyện tập thêm." },
    ],
  },
  {
    id: "n4g5",
    pattern: "〜ことにする",
    meaning: "quyết định (tự mình)",
    usage: "Quyết định làm điều gì: 毎日日本語を勉強することにします。",
    examples: [
      { jp: "毎日走ることにしました。", meaning: "Tôi quyết định chạy mỗi ngày." },
      { jp: "外食しないことにします。", meaning: "Tôi quyết định không ăn ngoài." },
    ],
  },
];

const openGrammarId = ref<string | null>(grammarItems[0]?.id ?? null);
function toggleGrammar(id: string) {
  openGrammarId.value = openGrammarId.value === id ? null : id;
}

/* ---------------- Reading ---------------- */
type ReadingQ = { id: string; prompt: string; choices: string[]; answerIndex: number; explain?: string };
type ReadingPack = { title: string; passage: string; questions: ReadingQ[] };

const reading = reactive<ReadingPack>({
  title: "予定を決める (Kế hoạch)",
  passage:
    "来週、友だちと旅行する予定です。でも、仕事が忙しくて、まだ行く日を決めていません。友だちは「早く決めたほうがいい」と言いました。私は先生に相談して、休みを取ることにしました。これで安心して準備できます。",
  questions: [
    {
      id: "r1",
      prompt: "Người nói dự định làm gì?",
      choices: ["Chuyển việc", "Đi du lịch với bạn", "Học ở trường", "Mua nhà"],
      answerIndex: 1,
      explain: "「友だちと旅行する予定です」",
    },
    {
      id: "r2",
      prompt: "Vì sao vẫn chưa quyết định ngày đi?",
      choices: ["Không có tiền", "Trời xấu", "Công việc bận", "Bạn không rảnh"],
      answerIndex: 2,
      explain: "「仕事が忙しくて、まだ行く日を決めていません」",
    },
    {
      id: "r3",
      prompt: "Cuối cùng người nói làm gì để chuẩn bị?",
      choices: ["Bỏ chuyến đi", "Xin nghỉ", "Mua vé ngay", "Đổi bạn đi cùng"],
      answerIndex: 1,
      explain: "「休みを取ることにしました」",
    },
  ],
});

const readingAnswers = ref<Record<string, number | null>>({});
const readingShowAnswer = ref(false);

function pickReading(id: string, i: number) {
  readingAnswers.value = { ...readingAnswers.value, [id]: i };
}
function resetReading() {
  readingAnswers.value = {};
  readingShowAnswer.value = false;
}

const readingAnswered = computed(() => Object.values(readingAnswers.value).filter((v) => v !== null && v !== undefined).length);
const readingCorrect = computed(() => {
  let s = 0;
  for (const q of reading.questions) {
    const a = readingAnswers.value[q.id];
    if (a === q.answerIndex) s++;
  }
  return s;
});
function readingChoiceClass(qid: string, i: number) {
  const q = reading.questions.find((x) => x.id === qid);
  if (!q) return "choiceIdle";
  const chosen = readingAnswers.value[qid] === i;
  if (!readingShowAnswer.value) return chosen ? "choiceChosen" : "choiceIdle";
  const correct = q.answerIndex === i;
  if (correct) return "choiceCorrect";
  if (chosen && !correct) return "choiceWrong";
  return "choiceIdle";
}

/* ---------------- Quiz ---------------- */
type QuizQ = { id: string; prompt: string; choices: string[]; answerIndex: number };

const quiz: QuizQ[] = [
  { id: "q1", prompt: "「便利」 nghĩa là gì?", choices: ["phiền", "tiện lợi", "đắt", "chậm"], answerIndex: 1 },
  { id: "q2", prompt: "Chọn câu đúng với 〜ながら", choices: ["音楽を聞きながら勉強します。", "音楽を聞くながら勉強します。", "音楽を聞きながらに勉強します。", "音楽が聞きながら勉強します。"], answerIndex: 0 },
  { id: "q3", prompt: "「〜てしまう」 thường mang sắc thái gì?", choices: ["tiếc nuối / lỡ", "đề nghị", "so sánh", "giả định"], answerIndex: 0 },
  { id: "q4", prompt: "「雨が降りそうです」 nghĩa là:", choices: ["Đã mưa rồi", "Sắp mưa (trông có vẻ)", "Nghe nói trời mưa", "Mưa nhiều"], answerIndex: 1 },
  { id: "q5", prompt: "Chọn câu khuyên đúng: Vたほうがいい", choices: ["薬を飲むほうがいいです。", "薬を飲んだほうがいいです。", "薬を飲みほうがいいです。", "薬を飲んでほうがいいです。"], answerIndex: 1 },
  { id: "q6", prompt: "「相談」 nghĩa là:", choices: ["vội vàng", "tư vấn/bàn bạc", "hứa hẹn", "thay đổi"], answerIndex: 1 },
  { id: "q7", prompt: "「ことにする」 dùng khi:", choices: ["tự mình quyết định", "nghe nói", "trông có vẻ", "so sánh"], answerIndex: 0 },
  { id: "q8", prompt: "「連絡します」 nghĩa là:", choices: ["tôi sẽ liên lạc", "tôi sẽ đi", "tôi sẽ ăn", "tôi sẽ mua"], answerIndex: 0 },
];

const FALLBACK_Q: QuizQ = {
  id: "__fallback__",
  prompt: "No question",
  choices: ["—", "—", "—", "—"],
  answerIndex: 0,
};

const LS_BEST = "jlpt_n4_quiz_best_v1";
const bestScore = ref<number>(Number(localStorage.getItem(LS_BEST) ?? 0));

const quizIndex = ref(0);
const picked = ref<number | null>(null);
const answers = ref<Record<string, number | null>>({});
const finished = ref(false);

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
const scorePercent = computed(() => (quiz.length ? Math.round((score.value / quiz.length) * 100) : 0));

function quizChoiceClass(i: number) {
  const correct = currentQ.value.answerIndex === i;
  const chosen = picked.value === i;

  if (!finished.value && chosen) return "choiceChosen";
  if (finished.value && correct) return "choiceCorrect";
  if (finished.value && chosen && !correct) return "choiceWrong";
  return "choiceIdle";
}

onMounted(() => startQuiz());

/* ---------------- Kanji ---------------- */
type KanjiItem = { kanji: string; on: string; kun: string; meaning: string; example: string };
const kanjiItems: KanjiItem[] = [
  { kanji: "旅", on: "リョ", kun: "たび", meaning: "du lịch", example: "旅行(りょこう) — du lịch" },
  { kanji: "相", on: "ソウ", kun: "あい-", meaning: "tương/hỗ", example: "相談(そうだん) — bàn bạc" },
  { kanji: "要", on: "ヨウ", kun: "い(る)", meaning: "cần", example: "必要(ひつよう) — cần thiết" },
  { kanji: "決", on: "ケツ", kun: "き(める)", meaning: "quyết", example: "決める(きめる) — quyết định" },
];

/* ---------------- Sidebar tasks ---------------- */
const todayTasks = reactive({
  vocab: false,
  grammar: false,
  reading: false,
  exercise: false,
});
const taskCompletion = computed(() => {
  const vals = Object.values(todayTasks);
  const done = vals.filter(Boolean).length;
  return Math.round((done / vals.length) * 100);
});

/* ---------------- Reset ---------------- */
function resetProgress() {
  localStorage.removeItem(LS_VOCAB);
  localStorage.removeItem(LS_BEST);
  vocabStatusMap.value = {};
  bestScore.value = 0;
  startQuiz();
  resetReading();
}
</script>

<style scoped>
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

.exRow { display:flex; gap:10px; align-items:flex-start; flex-wrap: wrap; }
.bulletDot {
  width: 8px; height: 8px; border-radius: 999px; margin-top: 7px;
  background: rgba(0,0,0,0.55);
}
:global(.dark) .bulletDot { background: rgba(255,255,255,0.55); }

/* choices */
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

.bullet { display:flex; gap:10px; align-items:flex-start; }
</style>
