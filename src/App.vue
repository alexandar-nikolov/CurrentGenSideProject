<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";

const sidebarVisible = ref(true);
const route = useRoute();
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppSidebar :visible="sidebarVisible" />

    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <AppHeader
        :title="route.meta.label"
        :description="route.meta.description"
        @toggle-sidebar="sidebarVisible = !sidebarVisible"
      />
      <main class="flex-1 overflow-auto p-6 bg-(--bg-light)">
        <RouterView />
      </main>
    </div>
  </div>
</template>
