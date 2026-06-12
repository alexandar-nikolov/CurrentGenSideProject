<script setup>
import { ref } from "vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";

const sidebarVisible = ref(true);
const activeItem = ref({
  label: "Home",
  icon: "pi pi-home",
  description: "Overview and quick access",
});
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppSidebar :visible="sidebarVisible" v-model:activeItem="activeItem" />

    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <AppHeader
        :title="activeItem.label"
        :description="activeItem.description"
        @toggle-sidebar="sidebarVisible = !sidebarVisible"
      />
      <main class="flex-1 overflow-auto p-6">
        <!-- page content -->
      </main>
    </div>
  </div>
</template>
