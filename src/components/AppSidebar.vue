<script setup>
import { useRouter, useRoute } from "vue-router";
import Button from "primevue/button";

defineProps({ visible: { type: Boolean, default: true } });

const router = useRouter();
const route = useRoute();

const navItems = [
  { label: "Home", icon: "pi pi-home", path: "/" },
  { label: "Damage Library", icon: "pi pi-book", path: "/damage-library" },
  { label: "Damage Identifier", icon: "pi pi-camera", path: "/damage-identifier" },
  {
    label: "PDF to Instructions",
    icon: "pi pi-file",
    path: "/pdf-to-instructions",
  },
];
</script>

<template>
  <div class="sidebar-clip" :class="{ 'sidebar-collapsed': !visible }">
    <aside
      class="sidebar flex flex-col shrink-0 h-full w-(--sidebar-width) bg-(--bg-dark) border-r border-(--border-dark)"
    >
      <div class="p-5 border-b border-(--border-dark)">
        <span
          class="text-3xl font-bold text-(--accent) cursor-pointer"
          @click="router.push('/')"
        >
          CurrentGen
        </span>
      </div>
      <nav class="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        <Button
          v-for="item in navItems"
          :key="item.label"
          :label="item.label"
          :icon="item.icon"
          :text="route.path !== item.path"
          :severity="route.path === item.path ? 'primary' : 'secondary'"
          class="justify-start! w-full"
          @click="router.push(item.path)"
        />
      </nav>
    </aside>
  </div>
</template>
