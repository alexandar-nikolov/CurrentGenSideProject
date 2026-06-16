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

        <!-- Settings placeholder -->
        <div>
          <div class="sec-label">Settings</div>
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
</style>
