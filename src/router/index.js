import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import DamageLibraryPage from "@/pages/DamageLibraryPage.vue";
import PdfToInstructionsPage from "@/pages/PdfToInstructionsPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
      meta: {
        label: "Home",
        icon: "pi pi-home",
        description: "Overview and quick access",
      },
    },
    {
      path: "/damage-library",
      component: DamageLibraryPage,
      meta: {
        label: "Damage Library",
        icon: "pi pi-book",
        description: "Browse and search the damage library for references",
      },
    },
    {
      path: "/pdf-to-instructions",
      component: PdfToInstructionsPage,
      meta: {
        label: "PDF to Instructions",
        icon: "pi pi-file",
        description: "Convert PDFs into step-by-step instructions",
      },
    },
  ],
});
