<script setup>
import { ref, nextTick, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


const fileInputRef = ref(null);
const isDragOver = ref(false);
const previewUrl = ref(null);
const previewFilename = ref("");
const previewFileSize = ref("");
const showPreview = ref(false);
const fileError = ref("");


const isAnalysing = ref(false);
const showResult = ref(false);
const confidenceWidth = ref(0);
const notes = ref("");
const actionTaken = ref(null);  null


const toast = ref(null);
let toastTimer = null;


const historyItems = ref([
  { id: 1, name: "Analyse 1", damage: "Surface scratch", severity: "low", time: "1 min ago" },
  { id: 2, name: "Analyse 2", damage: "Visible crack left side", severity: "medium", time: "14 min ago" },
  { id: 3, name: "Analyse 3", damage: "Deep structural fracture", severity: "high", time: "1 hr ago" },
]);

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function handleFile(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    fileError.value = "Only image files are supported (JPG, PNG, WEBP)";
    return;
  }
  fileError.value = "";
  previewFilename.value = file.name;
  previewFileSize.value = formatSize(file.size);
  const reader = new FileReader();
  reader.onload = (e) => { previewUrl.value = e.target.result; };
  reader.readAsDataURL(file);
  showPreview.value = true;
  showResult.value = false;
  isAnalysing.value = false;
  actionTaken.value = null;
  confidenceWidth.value = 0;
  notes.value = "";
}

function onDragOver(e) {
  e.preventDefault();
  isDragOver.value = true;
}
function onDragLeave(e) {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isDragOver.value = false;
  }
}
function onDrop(e) {
  e.preventDefault();
  isDragOver.value = false;
  handleFile(e.dataTransfer.files[0]);
}
function onFileChange(e) {
  if (e.target.files[0]) handleFile(e.target.files[0]);
}
function triggerUpload(e) {
  if (e.target.tagName === "LABEL" || e.target.closest("label")) return;
  fileInputRef.value.click();
}

async function runAnalysis() {
  isAnalysing.value = true;
  showResult.value = false;
  confidenceWidth.value = 0;
  await new Promise((r) => setTimeout(r, 1800));
  isAnalysing.value = false;
  showResult.value = true;
  await nextTick();
  setTimeout(() => { confidenceWidth.value = 88; }, 80);
}

function resetUpload() {
  showPreview.value = false;
  showResult.value = false;
  isAnalysing.value = false;
  previewUrl.value = null;
  previewFilename.value = "";
  previewFileSize.value = "";
  notes.value = "";
  confidenceWidth.value = 0;
  actionTaken.value = null;
  fileError.value = "";
  if (fileInputRef.value) fileInputRef.value.value = "";
}

function showToastMsg(message, type = "success") {
  if (toastTimer) clearTimeout(toastTimer);
  toast.value = { message, type };
  toastTimer = setTimeout(() => { toast.value = null; }, 3200);
}

function takeAction(type) {
  if (actionTaken.value) return;
  actionTaken.value = type;
  if (type === "approved") {
    historyItems.value.unshift({
      id: Date.now(),
      name: `Analyse ${historyItems.value.length + 1}`,
      damage: "Visible crack left side",
      severity: "medium",
      time: "Just now",
    });
    showToastMsg("Analysis approved and saved to history", "success");
  } else {
    showToastMsg("Sent for review by a supervisor", "warning");
  }
}

onUnmounted(() => { if (toastTimer) clearTimeout(toastTimer); });
</script>

<template>
  
  <Transition name="toast">
    <div
      v-if="toast"
      class="toast"
      :class="toast.type === 'success' ? 'toast-success' : 'toast-warning'"
    >
      <span v-if="toast.type === 'success'">✓</span>
      <span v-else>⚠</span>
      {{ toast.message }}
    </div>
  </Transition>

  <div class="flex flex-col gap-4">
    <!-- Reference Library action -->
    <div class="flex justify-end">
      <button class="ref-btn" @click="router.push('/damage-library')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 7v14"/>
          <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
        </svg>
        <span>Reference Library</span>
      </button>
    </div>

    <!-- Centered content column -->
    <div class="max-w-[70%] mx-auto w-full flex flex-col gap-2">

      <!-- Upload zone -->
      <p class="sec-label">Upload zone</p>
      <div
        class="upload-zone"
        :class="{ 'drag-over': isDragOver }"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        @click="triggerUpload"
      >
        <div class="icon-circle" :class="{ 'icon-bounce': isDragOver }">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <p class="font-medium text-slate-700 text-[0.9375rem]">Upload photo or drag and drop</p>
        <p class="text-sm text-slate-500">JPG, PNG, WEBP supported</p>
        <label class="browse-btn" for="file-input" @click.stop>Browse file</label>
        <input
          ref="fileInputRef"
          id="file-input"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />
      </div>

      <!-- File error -->
      <Transition name="fade-slide">
        <p v-if="fileError" class="file-error">⚠ {{ fileError }}</p>
      </Transition>

      <!-- Preview card -->
      <Transition name="fade-slide">
        <div v-if="showPreview">
          <p class="sec-label mt-4">Preview card</p>
          <div class="di-card flex items-center gap-5">
            <div
              class="preview-thumb"
              :style="{ backgroundImage: `url(${previewUrl})` }"
            ></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-700">{{ previewFilename }}</p>
              <p class="text-xs text-slate-500 mt-0.5">{{ previewFileSize }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button class="reset-btn" title="Clear and start over" @click="resetUpload">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
              </button>
              <button
                class="analyse-btn"
                :disabled="isAnalysing"
                @click="runAnalysis"
              >
                <span v-if="!isAnalysing">Analyse</span>
                <span v-else class="flex items-center gap-2">
                  <span class="spinner"></span>
                  Analysing…
                </span>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Result card -->
      <Transition name="fade-slide">
        <div v-if="showResult">
          <p class="sec-label mt-4">Result card</p>
          <div class="di-card relative shadow-lg">
            <span class="badge badge-medium absolute top-4 right-4">Medium</span>

            <div class="flex flex-col gap-1 mb-4">
              <span class="text-sm font-medium text-slate-500">Damage type</span>
              <span class="text-[0.9375rem] font-semibold text-slate-900">Visible crack left side</span>
            </div>

            <div class="flex items-center gap-3 mb-4">
              <span class="text-sm font-medium text-slate-500">Confidence</span>
              <div class="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden max-w-[300px]">
                <div
                  class="confidence-bar h-full rounded-full bg-(--accent)"
                  :style="{ width: confidenceWidth + '%' }"
                ></div>
              </div>
              <span class="text-sm font-semibold text-slate-700">{{ confidenceWidth }}%</span>
            </div>

            <div class="flex flex-col gap-1 mb-4">
              <span class="text-sm font-medium text-slate-500">Description</span>
              <textarea
                v-model="notes"
                class="notes-textarea"
                rows="3"
                placeholder="Add notes or observations..."
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <button
                class="approved-btn"
                :class="{ 'action-taken': actionTaken === 'approved', 'action-disabled': actionTaken && actionTaken !== 'approved' }"
                :disabled="!!actionTaken"
                @click="takeAction('approved')"
              >
                <span>✓</span>
                <span>{{ actionTaken === 'approved' ? 'Approved!' : 'Approved' }}</span>
              </button>
              <button
                class="review-btn"
                :class="{ 'action-taken-review': actionTaken === 'review', 'action-disabled': actionTaken && actionTaken !== 'review' }"
                :disabled="!!actionTaken"
                @click="takeAction('review')"
              >
                <span>⚠</span>
                <span>{{ actionTaken === 'review' ? 'Sent for review!' : 'Send for review' }}</span>
              </button>
            </div>

            <!-- New analysis button shown after action -->
            <Transition name="fade-slide">
              <div v-if="actionTaken" class="mt-4 flex justify-center">
                <button class="new-analysis-btn" @click="resetUpload">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                  </svg>
                  New analysis
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>

      <!-- History -->
      <p class="sec-label mt-4">Recent history</p>
      <div class="di-card">
        <div class="flex justify-between items-center mb-4">
          <span class="text-base font-semibold text-slate-900">Recent history</span>
          <a href="#" class="text-[0.8125rem] font-medium text-(--accent)">View all ›</a>
        </div>
        <TransitionGroup name="history" tag="div" class="flex flex-col">
          <div
            v-for="(item, i) in historyItems"
            :key="item.id"
            class="flex items-center gap-3.5 py-3.5 border-b border-slate-100 last:border-b-0"
            :style="{ '--delay': i * 40 + 'ms' }"
          >
            <div class="history-thumb">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-700">{{ item.name }}</p>
              <p class="text-xs text-slate-500 mt-px">{{ item.damage }}</p>
            </div>
            <span
              class="badge"
              :class="{
                'badge-low': item.severity === 'low',
                'badge-medium': item.severity === 'medium',
                'badge-high': item.severity === 'high',
              }"
            >{{ item.severity.charAt(0).toUpperCase() + item.severity.slice(1) }}</span>
            <span class="text-xs text-slate-500 whitespace-nowrap">🕐 {{ item.time }}</span>
          </div>
        </TransitionGroup>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Transitions ─────────────────────────────────────── */
.fade-slide-enter-active {
  transition: opacity 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from { opacity: 0; transform: translateY(14px); }
.fade-slide-leave-to   { opacity: 0; transform: translateY(-8px); }

.history-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--delay, 0ms);
}
.history-leave-active  { transition: opacity 0.2s ease, transform 0.2s ease; }
.history-move          { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.history-enter-from { opacity: 0; transform: translateX(-18px); }
.history-leave-to   { opacity: 0; transform: translateX(18px); }

.toast-enter-active { transition: opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.toast-enter-from { opacity: 0; transform: translateX(110%); }
.toast-leave-to   { opacity: 0; transform: translateX(110%); }

/* ── Toast ───────────────────────────────────────────── */
.toast {
  position: fixed;
  bottom: 1.75em;
  right: 1.75em;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.625em;
  padding: 0.75em 1.25em;
  border-radius: 0.75em;
  font-size: 0.875em;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.toast-success { background: #15803d; color: #fff; }
.toast-warning { background: #b45309; color: #fff; }

/* ── Layout helpers ──────────────────────────────────── */
.ref-btn {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 1em;
  border: 1px solid #cbd5e1;
  border-radius: 0.5em;
  font-size: 0.875em;
  font-weight: 500;
  color: #334155;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.ref-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: #fff5f0;
}

.sec-label {
  font-size: 0.75em;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5em;
  margin-top: 1.25em;
}

.file-error {
  font-size: 0.8125em;
  font-weight: 500;
  color: #b91c1c;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 0.5em;
  padding: 0.5em 0.875em;
  margin-top: 0.5em;
}

/* ── Upload zone ─────────────────────────────────────── */
.upload-zone {
  border: 2px dashed #cbd5e1;
  border-radius: 0.875em;
  min-height: 12.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 2.5em 1.25em;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
}
.upload-zone:hover {
  border-color: #94a3b8;
  background: #f8fafc;
}
.upload-zone:hover .icon-circle {
  transform: scale(1.08);
}
.upload-zone.drag-over {
  border-color: var(--accent);
  background: #fff5f0;
  transform: scale(1.015);
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12);
}

.icon-circle {
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25em;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.18); }
}
.icon-bounce { animation: bounce 0.6s ease infinite; }

.browse-btn {
  display: inline-block;
  padding: 0.625em 1.5em;
  background: var(--accent);
  color: #fff;
  border-radius: 0.625em;
  font-size: 0.875em;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s, transform 0.15s;
}
.browse-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.browse-btn:active { transform: translateY(0); }

/* ── Cards ───────────────────────────────────────────── */
.di-card {
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 1em;
  padding: 1.5em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.preview-thumb {
  width: 4em;
  height: 4em;
  min-width: 4em;
  border-radius: 0.625em;
  background: #f1f5f9;
  background-size: cover;
  background-position: center;
  border: 1px solid #cbd5e1;
}

/* ── Buttons ─────────────────────────────────────────── */
.reset-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25em;
  height: 2.25em;
  border-radius: 0.5em;
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.reset-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: #fff5f0;
  transform: rotate(-30deg);
}

.analyse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 0.625em 1.75em;
  background: var(--accent);
  color: #fff;
  border-radius: 0.625em;
  font-size: 0.875em;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s, transform 0.15s;
  font-family: inherit;
  min-width: 8em;
}
.analyse-btn:not(:disabled):hover { opacity: 0.9; transform: translateY(-1px); }
.analyse-btn:not(:disabled):active { transform: translateY(0); }
.analyse-btn:disabled { opacity: 0.75; cursor: not-allowed; }

@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  width: 0.875em;
  height: 0.875em;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
  flex-shrink: 0;
}

.confidence-bar {
  transition: width 0.9s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.notes-textarea {
  width: 100%;
  padding: 0.625em 0.875em;
  border: 1px solid #cbd5e1;
  border-radius: 0.625em;
  resize: vertical;
  font-size: 0.875em;
  color: #334155;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}
.notes-textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(250, 115, 21, 0.15);
}
.notes-textarea::placeholder { color: #94a3b8; }

.approved-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375em;
  padding: 0.625em 1.25em;
  background: #15803d;
  color: #fff;
  border: none;
  border-radius: 0.625em;
  font-size: 0.875em;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s, transform 0.15s;
  width: 100%;
  font-family: inherit;
}
.approved-btn:not(:disabled):hover { opacity: 0.9; transform: translateY(-1px); }
.approved-btn:not(:disabled):active { transform: translateY(0); }
.approved-btn.action-taken { background: #166534; box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.25); }
.approved-btn.action-disabled { opacity: 0.35; cursor: not-allowed; }

.review-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375em;
  padding: 0.625em 1.25em;
  background: #fff;
  color: #334155;
  border: 1px solid #cbd5e1;
  border-radius: 0.625em;
  font-size: 0.875em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.15s;
  width: 100%;
  font-family: inherit;
}
.review-btn:not(:disabled):hover { background: #fef3c7; border-color: #fcd34d; transform: translateY(-1px); }
.review-btn:not(:disabled):active { transform: translateY(0); }
.review-btn.action-taken-review { background: #fef3c7; border-color: #fcd34d; color: #b45309; }
.review-btn.action-disabled { opacity: 0.35; cursor: not-allowed; }

.new-analysis-btn {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 1.25em;
  background: none;
  border: 1px solid #cbd5e1;
  border-radius: 0.5em;
  font-size: 0.8125em;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.new-analysis-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: #fff5f0;
}

/* ── History ─────────────────────────────────────────── */
.history-thumb {
  width: 2.5em;
  height: 2.5em;
  min-width: 2.5em;
  border-radius: 0.5em;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}
.history-thumb:hover { transform: scale(1.08); }

/* ── Badges ──────────────────────────────────────────── */
.badge {
  display: inline-block;
  padding: 0.1875em 0.75em;
  border-radius: 9999px;
  font-size: 0.75em;
  font-weight: 600;
  border: 1px solid;
}
.badge-low    { background: #dcfce7; color: #15803d; border-color: #4ade80; }
.badge-medium { background: #fef3c7; color: #b45309; border-color: #fcd34d; }
.badge-high   { background: #fee2e2; color: #b91c1c; border-color: #fca5a5; }
</style>
