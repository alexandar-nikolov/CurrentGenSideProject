<script setup>
import Card from "primevue/card";
import Chip from "primevue/chip";

defineProps({
  image: { type: String, default: null },
  date: { type: String, default: "" },
  author: { type: String, default: "" },
  component: { type: String, default: null },
  part: { type: String, default: null },
  status: { type: String, default: null }, // pass / fail
});
</script>

<template>
  <Card
    class="overflow-hidden cursor-pointer"
    :pt="{
      body: { class: 'py-3! px-4!' },
      title: { class: 'text-sm! mb-0!' },
      subtitle: { class: 'hidden!' },
    }"
  >
    <template v-if="image" #header>
      <div class="relative">
        <img :alt="title" :src="image" class="w-full h-48 object-cover" />
        <span
          v-if="status"
          class="absolute top-2 right-2 w-6 h-6 rounded-full ring-2 ring-white"
          :class="status === 'pass' ? 'bg-green-400' : 'bg-red-400'"
        />
      </div>
    </template>

    <template #content>
      <div class="flex flex-wrap items-center gap-1.5 mb-2">
        <Chip
          v-if="component"
          :label="component"
          icon="pi pi-box"
          class="text-sm! [&_.p-chip-icon]:text-xs!"
        />
        <Chip
          v-if="part"
          :label="part"
          icon="pi pi-cog"
          class="text-sm! [&_.p-chip-icon]:text-xs!"
        />
      </div>
      <span class="text-xs text-(--text-muted)">
        {{ [date, author].filter(Boolean).join(" • ") }}
      </span>
    </template>
  </Card>
</template>

<style scoped>
.p-chip {
  padding: 4px 12px;
}
</style>
