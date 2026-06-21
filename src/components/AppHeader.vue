<script setup>
import Button from "primevue/button";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import { usePageTabs } from "@/composables/usePageTabs";

defineProps({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
});
const emit = defineEmits(["toggleSidebar"]);

const { tabs, activeTab } = usePageTabs();
</script>

<template>
  <header
    class="flex items-center gap-4 py-4 px-4 shrink-0 bg-(--bg) border-b border-(--border) text-(--text)"
  >
    <Button
      icon="pi pi-bars"
      text
      rounded
      severity="secondary"
      aria-label="Toggle sidebar"
      @click="emit('toggleSidebar')"
    />
    <div class="flex flex-col min-w-0">
      <h1 class="text-xl sm:text-2xl font-bold truncate">{{ title }}</h1>
      <p class="text-sm text-(--text-muted) truncate">{{ description }}</p>
    </div>
  </header>
  <div v-if="tabs.length > 0" class="overflow-x-auto shrink-0">
    <Tabs v-model:value="activeTab" class="px-4 shadow-sm">
      <TabList>
        <Tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.label }}
        </Tab>
      </TabList>
    </Tabs>
  </div>
</template>
