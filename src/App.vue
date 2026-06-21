<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";

// Start closed on mobile, open on desktop
const sidebarVisible = ref(window.innerWidth >= 768);
const route = useRoute();
const router = useRouter();

// Close sidebar on navigation on mobile
router.afterEach(() => {
  if (window.innerWidth < 768) sidebarVisible.value = false;
});
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Mobile backdrop -->
    <Transition name="fade">
      <div
        v-if="sidebarVisible"
        class="md:hidden fixed inset-0 bg-black/50 z-40"
        @click="sidebarVisible = false"
      />
    </Transition>

    <AppSidebar :visible="sidebarVisible" />

    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <AppHeader
        :title="route.meta.label"
        :description="route.meta.description"
        @toggle-sidebar="sidebarVisible = !sidebarVisible"
      />
      <main class="flex-1 overflow-auto p-4 sm:p-6 md:p-8 bg-(--bg-light)">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
