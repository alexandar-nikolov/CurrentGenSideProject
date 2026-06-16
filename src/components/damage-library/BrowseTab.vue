<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { usePageTabs } from "@/composables/usePageTabs";
import PassFailFilter from "@/components/damage-library/PassFailFilter.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import DamageRecordCard from "@/components/damage-library/DamageRecordCard.vue";

import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import {
  browseRecords as initialRecords,
  componentOptions,
  partOptions,
  damageTypeOptions,
} from "@/data/damageLibraryData.js";

const { activeTab } = usePageTabs();
const route = useRoute();
const router = useRouter();

const browseRecords = ref(initialRecords);
const searchQuery = ref(route.query.search ?? "");
const statusFilter = ref(route.query.status ?? null);
const componentFilter = ref(route.query.component ?? null);
const partFilter = ref(route.query.part ?? null);
const damageTypeFilter = ref(route.query.damageType ?? null);

watch(
  [searchQuery, statusFilter, componentFilter, partFilter, damageTypeFilter],
  () => {
    const query = {};
    if (searchQuery.value) query.search = searchQuery.value;
    if (statusFilter.value) query.status = statusFilter.value;
    if (componentFilter.value) query.component = componentFilter.value;
    if (partFilter.value) query.part = partFilter.value;
    if (damageTypeFilter.value) query.damageType = damageTypeFilter.value;
    router.replace({ query });
  },
);

const filteredRecords = computed(() =>
  browseRecords.value.filter((r) => {
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      const haystack = [r.component, r.part, r.type, r.author, r.date]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (statusFilter.value && r.status !== statusFilter.value) return false;
    if (componentFilter.value && r.component !== componentFilter.value)
      return false;
    if (partFilter.value && r.part !== partFilter.value) return false;
    if (
      damageTypeFilter.value &&
      r.type.toLowerCase() !== damageTypeFilter.value.toLowerCase()
    )
      return false;
    return true;
  }),
);
</script>

<template>
  <div class="flex flex-col gap-6">
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
          size="small"
        />
        <FilterSelect
          v-model="partFilter"
          label="Part"
          :options="partOptions"
          placeholder="All parts"
          size="small"
        />
        <FilterSelect
          v-model="damageTypeFilter"
          label="Damage Type"
          :options="damageTypeOptions"
          placeholder="All types"
          size="small"
        />
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <DamageRecordCard
        v-for="record in filteredRecords"
        :key="record.id"
        :image="record.image"
        :date="record.date"
        :author="record.author"
        :component="record.component"
        :part="record.part"
        :status="record.status"
        :type="record.type"
      />
      <p
        v-if="filteredRecords.length === 0"
        class="col-span-full text-(--text-muted) text-sm"
      >
        No records match the current filters.
      </p>
    </div>
  </div>
</template>
