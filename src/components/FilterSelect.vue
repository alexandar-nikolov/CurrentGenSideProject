<script setup>
import Select from "primevue/select";

defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  placeholder: { type: String, default: "All" },
});

const model = defineModel({ default: null });
</script>

<template>
  <div class="flex items-center gap-1.5 min-w-0">
    <span class="text-sm text-(--text-muted) shrink-0 mr-1">{{ label }}</span>
    <Select
      v-model="model"
      :options="options"
      :placeholder="placeholder"
      filter
      show-clear
      size="small"
      class="w-44 min-w-0 flex-1 sm:flex-none"
      panel-class="filter-select-panel"
    />
  </div>
</template>

<style>
.filter-select-panel .p-select-filter {
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
}
.filter-select-panel .p-select-filter-container {
  padding: 0.5rem;
}
.filter-select-panel .p-select-option {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
</style>
