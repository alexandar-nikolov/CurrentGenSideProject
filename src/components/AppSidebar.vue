<script setup>
import Button from "primevue/button";

const props = defineProps({ visible: { type: Boolean, default: true } });
const activeItem = defineModel("activeItem", {
  default: () => ({
    label: "Home",
    icon: "pi pi-home",
    description: "Select a tool to get started",
  }),
});

const navItems = [
  {
    label: "Home",
    icon: "pi pi-home",
    description: "Select a tool to get started",
  },
  {
    label: "Damage Library",
    icon: "pi pi-book",
    description: "Browse and search the damage library for references",
  },
  {
    label: "PDF to Instructions",
    icon: "pi pi-file",
    description: "Convert PDFs into step-by-step instructions",
  },
];
</script>

<template>
  <div class="sidebar-clip" :class="{ 'sidebar-collapsed': !visible }">
    <aside
      class="sidebar flex flex-col shrink-0 h-full w-(--sidebar-width) bg-(--bg-dark) border-r border-(--border-dark)"
    >
      <div class="px-5 pt-6 pb-4 border-b border-(--border-dark)">
        <span class="text-3xl font-bold text-(--accent)">CurrentGen</span>
      </div>
      <nav class="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        <Button
          v-for="item in navItems"
          :key="item.label"
          :label="item.label"
          :icon="item.icon"
          :text="activeItem.label !== item.label"
          :severity="activeItem.label === item.label ? 'primary' : 'secondary'"
          class="justify-start! w-full"
          @click="activeItem = item"
        />
      </nav>
    </aside>
  </div>
</template>
