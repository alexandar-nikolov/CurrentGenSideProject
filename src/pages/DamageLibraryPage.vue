<script setup>
import { onMounted, onUnmounted } from "vue";
import { usePageTabs } from "@/composables/usePageTabs";

const { setTabs, clearTabs, activeTab } = usePageTabs();

onMounted(() =>
  setTabs([
    { label: "Browse", value: "browse" },
    { label: "Drafts", value: "drafts" },
  ]),
);
onUnmounted(() => clearTabs());
</script>

<template>
  <div v-if="activeTab === 'browse'">
    <p>Browse the damage library here.</p>
  </div>
  <div v-else-if="activeTab === 'drafts'">
    <p>Your draft damage entries here.</p>
  </div>
</template>
