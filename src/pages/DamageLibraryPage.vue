<script setup>
import { onMounted, onUnmounted } from "vue";
import { ref } from "vue";

import { usePageTabs } from "@/composables/usePageTabs";

import PassFailFilter from "@/components/PassFailFilter.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import DamageRecordCard from "@/components/DamageRecordCard.vue";

import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";

const { setTabs, clearTabs, activeTab } = usePageTabs();

const searchQuery = ref("");
const statusFilter = ref(null);
const componentOptions = ["T-8", "T-28"];
const partOptions = ["SA", "TA", "CA", "Tool", "Sticker", "HPL-layer", "Other"];
const componentFilter = ref(null);
const partFilter = ref(null);
onMounted(() =>
  setTabs([
    { label: "Browse", value: "browse" },
    { label: "Drafts", value: "drafts" },
  ]),
);
onUnmounted(() => clearTabs());
</script>

<template>
  <div v-if="activeTab === 'browse'" class="flex flex-col gap-6">
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
        v-for="i in 6"
        :key="i"
      />
    </div>
  </div>
  <div v-else-if="activeTab === 'drafts'">
    <p>Your draft damage entries here.</p>
  </div>
</template>
