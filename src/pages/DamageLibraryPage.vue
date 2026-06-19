<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";

import { usePageTabs } from "@/composables/usePageTabs";
import BrowseTab from "@/components/damage-library/BrowseTab.vue";
import DraftsTab from "@/components/damage-library/DraftsTab.vue";
import NewRecordForm from "@/components/damage-library/NewRecordForm.vue";

const { setTabs, clearTabs, activeTab } = usePageTabs();

const newRecordFormRef = ref(null);

async function onEditDraft(draft) {
  activeTab.value = "new";
  await nextTick();
  newRecordFormRef.value?.fillFromDraft(draft);
}

onMounted(() =>
  setTabs([
    { label: "Browse", value: "browse" },
    { label: "Drafts", value: "drafts" },
    { label: "New", value: "new" },
  ]),
);
onUnmounted(() => clearTabs());
</script>

<template>
  <BrowseTab v-if="activeTab === 'browse'" />
  <DraftsTab v-else-if="activeTab === 'drafts'" @edit-draft="onEditDraft" />
  <NewRecordForm v-else-if="activeTab === 'new'" ref="newRecordFormRef" />
</template>
