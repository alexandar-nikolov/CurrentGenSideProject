<script setup>
import { ref } from "vue";

import Chip from "primevue/chip";
import Tag from "primevue/tag";
import ProgressBar from "primevue/progressbar";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { draftRecords } from "@/data/damageLibraryData.js";

const emit = defineEmits(["edit-draft"]);

const drafts = ref([...draftRecords]);

const DATA_FIELDS = ["image", "component", "part", "type"];

function completionPercent(row) {
  const filled = DATA_FIELDS.filter(
    (f) => row[f] !== null && row[f] !== "",
  ).length;
  return Math.round((filled / DATA_FIELDS.length) * 100);
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl">Drafts</h1>
      <p class="text-(--text-muted) mt-1 text-sm">
        Damage records captured from Azamuta that need completion
      </p>
    </div>

    <div class="rounded-lg overflow-hidden shadow-sm overflow-x-auto">
      <DataTable :value="drafts" tableStyle="min-width: 50rem" striped-rows>
        <!-- Image -->
        <Column header="Image" style="width: 80px">
          <template #body="{ data }">
            <img
              v-if="data.image"
              :src="data.image"
              class="w-14 h-14 object-cover rounded-md"
              alt="damage"
            />
            <div
              v-else
              class="w-14 h-14 rounded-md bg-(--surface-100) flex items-center justify-center"
            >
              <i class="pi pi-image text-(--text-muted) text-xl" />
            </div>
          </template>
        </Column>

        <!-- Component -->
        <Column header="Component" style="min-width: 110px">
          <template #body="{ data }">
            <Chip
              v-if="data.component"
              :label="data.component"
              icon="pi pi-box"
              class="text-sm! [&_.p-chip-icon]:text-xs!"
            />
            <span
              v-else
              class="text-xs text-(--text-muted) flex items-center px-2"
            >
              Missing
            </span>
          </template>
        </Column>

        <!-- Data chips -->
        <Column header="Data" style="min-width: 210px">
          <template #body="{ data }">
            <div class="flex flex-wrap gap-1.5">
              <Tag
                v-for="field in ['image', 'component', 'part', 'type']"
                :key="field"
                :value="field === 'type' ? 'damage type' : field"
                :severity="data[field] ? 'info' : 'warning'"
                :icon="data[field] ? 'pi pi-check' : 'pi pi-times'"
                class="capitalize text-xs!"
              />
            </div>
          </template>
        </Column>

        <!-- Completion progress -->
        <Column header="Completion" style="min-width: 140px">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <ProgressBar
                :value="completionPercent(data)"
                :show-value="false"
                style="height: 12px; flex: 1"
                :pt="{
                  value: {
                    class:
                      completionPercent(data) === 100
                        ? 'bg-green-500!'
                        : completionPercent(data) >= 50
                          ? 'bg-yellow-400!'
                          : 'bg-red-400!',
                  },
                }"
              />
              <span class="text-xs text-(--text-muted) shrink-0">
                {{ completionPercent(data) }}%
              </span>
            </div>
          </template>
        </Column>

        <!-- Date + time -->
        <Column header="Date" style="min-width: 120px">
          <template #body="{ data }">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium">{{ data.date }}</span>
              <span class="text-xs text-(--text-muted) flex items-center">
                <i class="pi pi-clock mr-1" />{{ data.time }}
              </span>
            </div>
          </template>
        </Column>

        <!-- Author -->
        <Column header="Author" style="min-width: 100px">
          <template #body="{ data }">
            <span class="text-sm">{{ data.author }}</span>
          </template>
        </Column>

        <!-- Actions -->
        <Column header="Actions" style="width: 110px">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                icon="pi pi-eye"
                label="Review"
                size="small"
                severity="secondary"
                rounded
                aria-label="Review"
                @click="emit('edit-draft', data)"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                aria-label="Delete"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.p-chip {
  padding: 4px 12px;
}
</style>
