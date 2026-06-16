<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { ref } from "vue";

import { usePageTabs } from "@/composables/usePageTabs";

import PassFailFilter from "@/components/PassFailFilter.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import DamageRecordCard from "@/components/DamageRecordCard.vue";

import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Chip from "primevue/chip";
import Tag from "primevue/tag";
import ProgressBar from "primevue/progressbar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const { setTabs, clearTabs, activeTab } = usePageTabs();

const searchQuery = ref("");
const statusFilter = ref(null);
const componentOptions = ["T-8", "T-28"];
const partOptions = ["SA", "TA", "CA", "Tool", "Sticker", "HPL-layer", "Other"];
const componentFilter = ref(null);
const partFilter = ref(null);

// Draft records mock data
const drafts = ref([
  {
    id: 1,
    image: "/src/assets/tool.jpg",
    component: "T-8",
    part: "SA",
    type: "crack",
    date: "15-06-2026",
    time: "14:32",
    author: "John D.",
  },
  {
    id: 2,
    image: null,
    component: "T-28",
    part: null,
    type: "dent",
    date: "14-06-2026",
    time: "09:10",
    author: "Anna K.",
  },
  {
    id: 3,
    image: "/src/assets/tool.jpg",
    component: null,
    part: "CA",
    type: null,
    date: "13-06-2026",
    time: "16:45",
    author: "Mike R.",
  },
  {
    id: 4,
    image: null,
    component: null,
    part: null,
    type: null,
    date: "12-06-2026",
    time: "11:00",
    author: "Sara L.",
  },
]);

const DATA_FIELDS = ["image", "component", "part", "type"];

function completionPercent(row) {
  const filled = DATA_FIELDS.filter(
    (f) => row[f] !== null && row[f] !== "",
  ).length;
  return Math.round((filled / DATA_FIELDS.length) * 100);
}

onMounted(() =>
  setTabs([
    { label: "Browse", value: "browse" },
    { label: "Drafts", value: "drafts" },
    { label: "New", value: "new" },
  ]),
);
onUnmounted(() => clearTabs());
</script>

<template>
  <div v-if="activeTab === 'browse'" class="flex flex-col gap-6">
    <div class="flex items-center justify-between gap-4">
      <h1 class="text-2xl">Browse Damage Library</h1>
      <Button
        icon="pi pi-plus"
        label="New Damage Record"
        size="small"
        @click="activeTab = 'new'"
      />
    </div>
    <div>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchQuery"
          placeholder="Search damage records"
          class="w-full"
        />
      </IconField>
      <div class="mt-4 flex flex-wrap items-center gap-6">
        <PassFailFilter v-model="statusFilter" />
        <FilterSelect
          v-model="componentFilter"
          label="Component"
          :options="componentOptions"
          placeholder="All components"
        />
        <FilterSelect
          v-model="partFilter"
          label="Part"
          :options="partOptions"
          placeholder="All parts"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <DamageRecordCard
        image="/src/assets/tool.jpg"
        date="15-06-2026"
        author="John D."
        component="T-8"
        part="SA"
        status="fail"
        v-for="i in 8"
        :key="i"
      />
    </div>
  </div>
  <div v-else-if="activeTab === 'drafts'" class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl">Drafts</h1>
      <p class="text-(--text-muted) mt-1 text-sm">
        Damage records captured from Azamuta that need completion
      </p>
    </div>

    <div class="rounded-lg overflow-hidden shadow-sm">
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
                :severity="data[field] ? 'success' : 'secondary'"
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
          <template #body>
            <div class="flex gap-2">
              <Button
                icon="pi pi-pencil"
                label="Edit"
                size="small"
                severity="secondary"
                rounded
                aria-label="Edit"
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
  <div v-else-if="activeTab === 'new'" class="flex flex-col gap-6"></div>
</template>

<style scoped>
.p-chip {
  padding: 4px 12px;
}
</style>
