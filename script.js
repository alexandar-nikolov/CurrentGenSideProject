/* Damage Identifier */
var damageUploadZone = document.getElementById('damage-upload-zone');
var damageFileInput = document.getElementById('damage-file-input');
var previewCard = document.getElementById('preview-card');
var previewSectionLabel = document.getElementById('preview-section-label');
var previewImg = document.getElementById('preview-img');
var previewFilename = document.getElementById('preview-filename');
var previewSize = document.getElementById('preview-size');
var resultCard = document.getElementById('result-card');
var resultSectionLabel = document.getElementById('result-section-label');

damageUploadZone.addEventListener('dragover', function (e) { e.preventDefault(); this.classList.add('drag-over'); });
damageUploadZone.addEventListener('dragleave', function () { this.classList.remove('drag-over'); });
damageUploadZone.addEventListener('drop', function (e) { e.preventDefault(); this.classList.remove('drag-over'); handleDamageFile(e.dataTransfer.files[0]); });

damageUploadZone.addEventListener('click', function (e) {
  if (e.target.tagName === 'LABEL' || e.target.closest('label')) return;
  damageFileInput.click();
});

damageFileInput.addEventListener('change', function () {
  if (this.files[0]) handleDamageFile(this.files[0]);
});

function handleDamageFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  previewFilename.textContent = file.name;
  previewSize.textContent = formatSize(file.size);
  var reader = new FileReader();
  reader.onload = function (e) { previewImg.style.backgroundImage = 'url(' + e.target.result + ')'; };
  reader.readAsDataURL(file);
  previewCard.style.display = 'flex';
  previewSectionLabel.style.display = 'block';
  resultCard.style.display = 'none';
  resultSectionLabel.style.display = 'none';
}

document.getElementById('btn-analyse').addEventListener('click', function () {
  resultCard.style.display = 'block';
  resultSectionLabel.style.display = 'block';
});

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}
