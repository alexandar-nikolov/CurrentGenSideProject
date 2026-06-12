<script setup>
import Button from "primevue/button";

defineProps({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
});
const emit = defineEmits(["toggleSidebar"]);
</script>

<template>
  <header
    class="flex items-center gap-4 py-6 px-4 shrink-0 bg-(--bg) border-b border-(--border) text-(--text) shadow-sm"
  >
    <Button
      icon="pi pi-bars"
      text
      rounded
      severity="secondary"
      aria-label="Toggle sidebar"
      @click="emit('toggleSidebar')"
    />
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <p class="text-sm text-(--text-muted)">{{ description }}</p>
    </div>
  </header>
</template>
