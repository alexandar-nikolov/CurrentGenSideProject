<script setup>
import { ref } from "vue";

import { usePageTabs } from "@/composables/usePageTabs";
import FilterSelect from "@/components/FilterSelect.vue";

import Button from "primevue/button";
import Card from "primevue/card";
import Select from "primevue/select";
import Textarea from "primevue/textarea";

import {
  componentOptions,
  partOptions,
  damageTypeOptions,
} from "@/data/damageLibraryData.js";

const { activeTab } = usePageTabs();

function nowDateString() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

function nowTimeString() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const newRecord = ref({
  component: null,
  part: null,
  image: null,
  damageType: null,
  assessment: null,
  notes: "",
  author: "John D.",
  date: nowDateString(),
  time: nowTimeString(),
});

const imageFileInput = ref(null);
const imagePreview = ref(null);

function fillFromDraft(draft) {
  newRecord.value = {
    component: draft.component ?? null,
    part: draft.part ?? null,
    image: null,
    damageType: draft.type
      ? draft.type.charAt(0).toUpperCase() + draft.type.slice(1)
      : null,
    assessment: draft.assessment ?? null,
    notes: draft.notes ?? "",
    author: draft.author ?? "John D.",
    date: draft.date ?? nowDateString(),
    time: draft.time ?? nowTimeString(),
  };
  imagePreview.value = draft.image ?? null;
}

defineExpose({ fillFromDraft });

function onImagePicked(event) {
  const file = event.target.files[0];
  if (!file) return;
  newRecord.value.image = file;
  imagePreview.value = URL.createObjectURL(file);
}

function onImageDrop(event) {
  const file = event.dataTransfer.files[0];
  if (!file || !file.type.startsWith("image/")) return;
  newRecord.value.image = file;
  imagePreview.value = URL.createObjectURL(file);
}

function clearImageFile() {
  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
  newRecord.value.image = null;
  imagePreview.value = null;
  if (imageFileInput.value) imageFileInput.value.value = "";
}
</script>

<template>
  <div class="flex flex-col gap-6 max-w-3xl">
    <div>
      <h1 class="text-2xl">New Damage Record</h1>
      <p class="text-(--text-muted) mt-1 text-sm">
        Fill in all fields to complete the record
      </p>
    </div>

    <!-- Component & Part -->
    <Card>
      <template #title>
        <span class="flex items-center gap-2 text-base">
          <i class="pi pi-box text-(--text-muted)" /> Component &amp; Part
        </span>
      </template>
      <template #content>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm text-(--text-muted)">Component</label>
            <FilterSelect
              v-model="newRecord.component"
              :options="componentOptions"
              placeholder="Select component"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm text-(--text-muted)">Part</label>
            <FilterSelect
              v-model="newRecord.part"
              :options="partOptions"
              placeholder="Select part"
            />
          </div>
        </div>
      </template>
    </Card>

    <!-- Image -->
    <Card>
      <template #title>
        <span class="flex items-center gap-2 text-base">
          <i class="pi pi-image text-(--text-muted)" /> Image
        </span>
      </template>
      <template #content>
        <input
          ref="imageFileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onImagePicked"
        />
        <div
          v-if="!imagePreview"
          class="border-2 border-dashed border-(--text-muted) rounded-xl flex flex-col items-center justify-center gap-4 py-14 cursor-pointer hover:bg-(--surface-50) transition-colors select-none"
          @click="imageFileInput.click()"
          @dragover.prevent
          @drop.prevent="onImageDrop"
        >
          <div
            class="w-16 h-16 rounded-full ring-1 ring-(--border) flex items-center justify-center"
          >
            <i class="pi pi-image text-2xl text-(--text-muted)" />
          </div>
          <div class="flex flex-col items-center gap-1 text-(--text-muted)">
            <span class="text-sm"
              >Drag and drop an image here, or click to browse</span
            >
            <span class="text-xs">PNG, JPG, WEBP</span>
          </div>
        </div>
        <div
          v-else
          class="relative rounded-xl overflow-hidden bg-(--surface-50)"
        >
          <img
            :src="imagePreview"
            :alt="newRecord.image?.name"
            class="w-full max-h-96 object-contain"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2 flex items-center justify-between gap-2"
          >
            <span class="text-sm text-white truncate">{{
              newRecord.image?.name
            }}</span>
            <Button
              icon="pi pi-times"
              text
              rounded
              size="small"
              class="text-white! shrink-0"
              aria-label="Remove image"
              @click.stop="clearImageFile"
            />
          </div>
        </div>
      </template>
    </Card>

    <!-- Damage Assessment -->
    <Card>
      <template #title>
        <span class="flex items-center gap-2 text-base">
          <i class="pi pi-exclamation-triangle text-(--text-muted)" /> Damage
          Assessment
        </span>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm text-(--text-muted)">Damage Type</label>
            <Select
              v-model="newRecord.damageType"
              :options="damageTypeOptions"
              placeholder="Select damage type"
              class="w-full"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm text-(--text-muted)">Assessment</label>
            <div class="flex gap-2">
              <Button
                label="Pass"
                icon="pi pi-check"
                severity="success"
                :outlined="newRecord.assessment !== 'pass'"
                class="flex-1"
                @click="
                  newRecord.assessment =
                    newRecord.assessment === 'pass' ? null : 'pass'
                "
              />
              <Button
                label="Fail"
                icon="pi pi-times"
                severity="danger"
                :outlined="newRecord.assessment !== 'fail'"
                class="flex-1"
                @click="
                  newRecord.assessment =
                    newRecord.assessment === 'fail' ? null : 'fail'
                "
              />
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm text-(--text-muted)">Notes</label>
            <Textarea
              v-model="newRecord.notes"
              placeholder="Add any additional observations..."
              rows="3"
              class="w-full resize-none"
            />
          </div>
        </div>
      </template>
    </Card>

    <!-- Details (auto-filled) -->
    <div class="flex items-center justify-between flex-wrap gap-4 px-1 w-full">
      <div class="flex flex-col gap-0.5">
        <span class="text-xs text-(--text-muted) uppercase tracking-wide"
          >Creator</span
        >
        <span class="text-sm font-medium flex items-center gap-1">
          <i class="pi pi-user text-xs" />{{ newRecord.author }}
        </span>
      </div>
      <div class="w-px h-8 bg-(--surface-200)" />
      <div class="flex flex-col gap-0.5">
        <span class="text-xs text-(--text-muted) uppercase tracking-wide"
          >Date</span
        >
        <span class="text-sm font-medium flex items-center gap-1">
          <i class="pi pi-calendar text-xs" />{{ newRecord.date }}
        </span>
      </div>
      <div class="w-px h-8 bg-(--surface-200)" />
      <div class="flex flex-col gap-0.5">
        <span class="text-xs text-(--text-muted) uppercase tracking-wide"
          >Time</span
        >
        <span class="text-sm font-medium flex items-center gap-1">
          <i class="pi pi-clock text-xs" />{{ newRecord.time }}
        </span>
      </div>
      <div class="w-px h-8 bg-(--surface-200)" />
      <div class="flex flex-col gap-0.5">
        <span class="text-xs text-(--text-muted) uppercase tracking-wide"
          >Creation Method</span
        >
        <span class="text-sm font-medium flex items-center gap-1">
          <i class="pi pi-cog text-xs" />{{
            newRecord.creationMethod || "Manual"
          }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3">
      <Button
        label="Cancel"
        severity="secondary"
        text
        @click="activeTab = 'browse'"
      />
      <Button label="Complete Record" icon="pi pi-check" />
    </div>
  </div>
</template>
