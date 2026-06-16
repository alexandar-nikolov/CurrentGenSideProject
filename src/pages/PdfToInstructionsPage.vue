<template>
  <div class="page">
    <div class="content">

      <div class="two-col">

        <!-- Upload zone -->
        <div>
          <div class="sec-label">Upload PDF</div>
          <div class="upload-zone">
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
          </div>
        </div>

        <!-- Settings panel -->
        <div>
          <div class="sec-label">Settings</div>
          <div class="card settings-card">
            <div class="form-group">
              <label class="form-label">Output language</label>
              <select class="form-select">
                <option>English</option>
                <option>Dutch</option>
                <option>German</option>
                <option>French</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Instruction format</label>
              <select class="form-select">
                <option>Step-by-step</option>
                <option>Checklist</option>
                <option>Summary only</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Detail level</label>
              <select class="form-select">
                <option>Standard</option>
                <option>Concise</option>
                <option>Detailed</option>
              </select>
            </div>
            <button class="btn btn-primary btn-full">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Convert to instructions
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
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

.upload-zone:hover {
  border-color: #E8600A;
  background: #FFF0E8;
}

.upload-icon { color: #999999; }
.upload-zone p { font-size: 13.5px; color: #555555; }
.upload-zone small { font-size: 12px; color: #999999; }

.card {
  background: #ffffff;
  border: 1px solid #E5E5E5;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
}

.settings-card { padding: 18px; }

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
.btn-full { width: 100%; justify-content: center; }
</style>