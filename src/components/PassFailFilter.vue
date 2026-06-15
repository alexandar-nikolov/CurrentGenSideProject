<script setup>
const model = defineModel({ default: null });

const options = [
  { label: "Pass", value: "pass" },
  { label: "Fail", value: "fail" },
];
</script>

<template>
  <div class="flex items-center gap-1.5">
    <span class="text-sm text-(--text-muted) mr-1">Status</span>
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium transition-all cursor-pointer shadow-xs"
      :class="
        model === option.value
          ? option.value === 'pass'
            ? 'bg-green-500/15 text-green-400 border border-green-500/40'
            : 'bg-red-500/15 text-red-400 border border-red-500/40'
          : 'bg-(--bg) border border-(--border) text-(--text-muted) hover:text-(--text)'
      "
      @click="model = model === option.value ? null : option.value"
    >
      <span
        class="w-1.5 h-1.5 rounded-full"
        :class="option.value === 'pass' ? 'bg-green-400' : 'bg-red-400'"
      />
      {{ option.label }}
      <i
        v-if="model === option.value"
        class="pi pi-times opacity-60"
        style="font-size: 0.7rem"
      />
    </button>
  </div>
</template>
