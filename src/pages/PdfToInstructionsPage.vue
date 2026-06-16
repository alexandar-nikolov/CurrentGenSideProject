<template>
  <div class="page">
    <div class="content">

      <div class="two-col">

        <!-- Upload zone -->
        <div>
          <div class="sec-label">Upload PDF</div>
          <div
            class="upload-zone"
            :class="{ uploaded: pdfReady }"
            @click="!pdfReady && triggerUpload()"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <template v-if="!pdfReady">
              <div class="upload-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <p>Upload PDF or drag and drop</p>
              <small>PDF — max 50 MB</small>
              <input ref="fileInput" type="file" accept=".pdf" style="display:none" @change="handleFile" />
            </template>
            <template v-else>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E7D51" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <div class="upload-filename">{{ uploadedFile.name }}</div>
                <div class="upload-filesize">{{ uploadedFile.size }} · Ready to convert</div>
              </div>
              <button class="btn btn-ghost btn-sm" style="margin-left:auto" @click.stop="resetUpload">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Remove
              </button>
            </template>
          </div>
        </div>

        <!-- Settings panel -->
        <div>
          <div class="sec-label">Settings</div>
          <div class="card settings-card">
            <div class="form-group">
              <label class="form-label">Output language</label>
              <select v-model="settings.language" class="form-select">
                <option>English</option>
                <option>Dutch</option>
                <option>German</option>
                <option>French</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Instruction format</label>
              <select v-model="settings.format" class="form-select">
                <option>Step-by-step</option>
                <option>Checklist</option>
                <option>Summary only</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Detail level</label>
              <select v-model="settings.detail" class="form-select">
                <option>Standard</option>
                <option>Concise</option>
                <option>Detailed</option>
              </select>
            </div>
            <button class="btn btn-primary btn-full" :disabled="converting || converted" @click="convert">
              <svg v-if="converting" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              <svg v-else-if="converted" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              {{ converting ? 'Converting…' : converted ? 'Converted' : 'Convert to instructions' }}
            </button>
          </div>
        </div>

      </div>

      <!-- Output section -->
      <template v-if="converted">
        <div class="sec-label">Generated instructions</div>
        <div class="card output-card">

          <!-- Toolbar -->
          <div class="toolbar">
            <button class="btn btn-ghost btn-sm" @click="copyAll">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copy all
            </button>
            <button class="btn btn-ghost btn-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Export as PDF
            </button>
            <button class="btn btn-ghost btn-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Send to operator
            </button>
          </div>

          <!-- Instruction rows -->
          <div
            v-for="(instr, index) in instructions"
            :key="instr.id"
            class="instr-row"
            :class="{ editing: instr.editing }"
          >
            <div class="step-dot">{{ index + 1 }}</div>
            <input v-if="instr.editing" v-model="instr.text" class="instr-input" @keyup.enter="instr.editing = false" />
            <div v-else class="instr-text">{{ instr.text }}</div>
            <button class="btn btn-ghost btn-sm" @click="toggleEdit(instr)">
              {{ instr.editing ? 'Save' : 'Edit' }}
            </button>
          </div>

          <button class="btn btn-ghost btn-sm" style="margin-top:10px" @click="addInstruction">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add step
          </button>

        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const fileInput = ref(null)
const pdfReady = ref(false)
const uploadedFile = reactive({ name: '', size: '' })
const converting = ref(false)
const converted = ref(false)

const settings = reactive({
  language: 'English',
  format: 'Step-by-step',
  detail: 'Standard'
})

const instructions = ref([])
let nextId = 10

const exampleData = {
  'English': {
    'Step-by-step': [
      'Ensure all personal safety equipment (PPE) is in place before starting the procedure.',
      'Inspect the component visually for defects, cracks, or wear prior to installation.',
      'Align the component with the mounting bracket and insert fasteners by hand first.',
      'Torque all fasteners to the specified value of 35 Nm using a calibrated torque wrench.',
      'Perform a final functional check and document the result in the work order system.',
    ],
    'Checklist': [
      '☐ PPE checked and worn correctly',
      '☐ Component inspected for visible defects',
      '☐ Mounting bracket aligned',
      '☐ Fasteners tightened to 35 Nm',
      '☐ Final functional check completed and documented',
    ],
    'Summary only': [
      'Before installation, verify PPE and inspect the component. Align with the mounting bracket, torque fasteners to 35 Nm, and complete a final functional check. Document all results in the work order system.',
    ],
  },
  'Dutch': {
    'Step-by-step': [
      'Zorg dat alle persoonlijke beschermingsmiddelen (PBM) aanwezig zijn vóór de start.',
      'Inspecteer het onderdeel visueel op defecten, scheuren of slijtage vóór installatie.',
      'Lijn het onderdeel uit met de bevestigingsbeugel en draai de bevestigingsmiddelen eerst met de hand aan.',
      'Draai alle bevestigingsmiddelen aan op 35 Nm met een gekalibreerde momentsleutel.',
      'Voer een eindcontrole uit en documenteer het resultaat in het werkordersysteem.',
    ],
    'Checklist': [
      '☐ PBM gecontroleerd en correct gedragen',
      '☐ Onderdeel geïnspecteerd op zichtbare defecten',
      '☐ Bevestigingsbeugel uitgelijnd',
      '☐ Bevestigingsmiddelen aangedraaid op 35 Nm',
      '☐ Eindcontrole uitgevoerd en gedocumenteerd',
    ],
    'Summary only': [
      'Controleer voor installatie de PBM en inspecteer het onderdeel. Lijn uit met de bevestigingsbeugel, draai aan op 35 Nm en voer een eindcontrole uit. Documenteer alle resultaten in het werkordersysteem.',
    ],
  },
  'German': {
    'Step-by-step': [
      'Stellen Sie sicher, dass alle persönlichen Schutzausrüstungen (PSA) vorhanden sind.',
      'Überprüfen Sie das Bauteil visuell auf Defekte, Risse oder Verschleiß.',
      'Richten Sie das Bauteil an der Montagekonsole aus und setzen Sie die Befestiger zunächst von Hand ein.',
      'Ziehen Sie alle Befestiger mit einem kalibrierten Drehmomentschlüssel auf 35 Nm an.',
      'Führen Sie eine abschließende Funktionskontrolle durch und dokumentieren Sie das Ergebnis.',
    ],
    'Checklist': [
      '☐ PSA geprüft und korrekt getragen',
      '☐ Bauteil auf sichtbare Defekte geprüft',
      '☐ Montagekonsole ausgerichtet',
      '☐ Befestiger auf 35 Nm angezogen',
      '☐ Abschlusskontrolle durchgeführt und dokumentiert',
    ],
    'Summary only': [
      'Vor der Montage PSA prüfen und Bauteil inspizieren. An der Konsole ausrichten, auf 35 Nm anziehen und Abschlusskontrolle durchführen. Alle Ergebnisse im Arbeitsauftragssystem dokumentieren.',
    ],
  },
  'French': {
    'Step-by-step': [
      'Vérifiez que tous les équipements de protection individuelle (EPI) sont en place avant de commencer.',
      'Inspectez visuellement le composant pour détecter tout défaut, fissure ou usure.',
      'Alignez le composant avec le support de montage et insérez les fixations à la main en premier.',
      'Serrez toutes les fixations à la valeur spécifiée de 35 Nm avec une clé dynamométrique étalonnée.',
      'Effectuez une vérification fonctionnelle finale et documentez le résultat dans le système de bon de travail.',
    ],
    'Checklist': [
      '☐ EPI vérifiés et portés correctement',
      '☐ Composant inspecté pour défauts visibles',
      '☐ Support de montage aligné',
      '☐ Fixations serrées à 35 Nm',
      '☐ Vérification finale effectuée et documentée',
    ],
    'Summary only': [
      'Avant l\'installation, vérifiez les EPI et inspectez le composant. Alignez avec le support, serrez à 35 Nm et effectuez une vérification finale. Documentez tous les résultats dans le système de bon de travail.',
    ],
  },
}

function triggerUpload() {
  fileInput.value?.click()
}

function handleFile(e) {
  const file = e.target.files[0]
  if (file) loadFile(file)
}

function handleDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type === 'application/pdf') loadFile(file)
}

function loadFile(file) {
  uploadedFile.name = file.name
  uploadedFile.size = (file.size / (1024 * 1024)).toFixed(1) + ' MB'
  pdfReady.value = true
}

function resetUpload() {
  pdfReady.value = false
  converted.value = false
  instructions.value = []
  uploadedFile.name = ''
  uploadedFile.size = ''
}

function convert() {
  if (!pdfReady.value) return
  converting.value = true
  setTimeout(() => {
    converting.value = false
    converted.value = true
    const lang = exampleData[settings.language] ?? exampleData['English']
    const steps = lang[settings.format] ?? lang['Step-by-step']
    instructions.value = steps.map((text, i) => ({
      id: i + 1,
      text,
      editing: false
    }))
    nextId = instructions.value.length + 1
  }, 1800)
}

function toggleEdit(instr) {
  instructions.value.forEach(i => i.editing = false)
  instr.editing = true
}

function addInstruction() {
  instructions.value.push({ id: nextId++, text: '', editing: true })
}

function copyAll() {
  const text = instructions.value.map((i, idx) => `${idx + 1}. ${i.text}`).join('\n')
  navigator.clipboard.writeText(text)
}
</script>

<style scoped>
.page {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  color: #111111;
  background: #ffffff;
}

.content { max-width: 860px; }

.two-col {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
  margin-bottom: 20px;
}

.sec-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: #999999;
  margin-bottom: 10px;
}

.upload-zone {
  border: 2px dashed #E5E5E5;
  border-radius: 12px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: #F7F7F7;
  text-align: center;
  cursor: pointer;
  transition: all .15s;
}

.upload-zone:hover { border-color: #E8600A; background: #FFF0E8; }

.upload-zone.uploaded {
  border-color: #2E7D51;
  background: #D6F0E2;
  padding: 18px 20px;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  cursor: default;
}

.upload-icon { color: #999999; }
.upload-zone p { font-size: 13.5px; color: #555555; }
.upload-zone small { font-size: 12px; color: #999999; }
.upload-filename { font-size: 13.5px; font-weight: 500; }
.upload-filesize { font-size: 12px; color: #999999; margin-top: 2px; }

.card {
  background: #ffffff;
  border: 1px solid #E5E5E5;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
}

.settings-card { padding: 18px; }
.output-card { padding: 16px 20px; }
.form-group { margin-bottom: 14px; }

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #555555;
  margin-bottom: 6px;
}

.form-select {
  width: 100%;
  padding: 8px 32px 8px 12px;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13.5px;
  color: #111111;
  background: #F7F7F7;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.form-select:focus { outline: none; border-color: #E8600A; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all .15s;
  white-space: nowrap;
}

.btn-primary { background: #E8600A; color: #fff; }
.btn-primary:hover { background: #C44F08; }
.btn-primary:disabled { background: #F5B990; cursor: not-allowed; }
.btn-ghost { background: transparent; color: #555555; border: 1px solid #E5E5E5; }
.btn-ghost:hover { background: #F7F7F7; color: #111111; }
.btn-sm { padding: 5px 10px; font-size: 12px; }
.btn-full { width: 100%; justify-content: center; }

.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  margin-bottom: 14px;
  border-bottom: 1px solid #EFEFEF;
}

.instr-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  background: #F7F7F7;
  border: 1px solid #EFEFEF;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background .15s;
}

.instr-row:hover { background: #F0EFED; border-color: #E5E5E5; }
.instr-row.editing { background: #fff; border-color: #E8600A; }

.step-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #E8600A;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'JetBrains Mono', monospace;
}

.instr-text { flex: 1; font-size: 13.5px; }

.instr-input {
  flex: 1;
  font-size: 13.5px;
  font-family: inherit;
  border: none;
  background: transparent;
  outline: none;
  color: #111111;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>