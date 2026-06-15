import { ref } from "vue";

// Module-level state so all components share the same tabs
const tabs = ref([]); // [{ label: String, value: String }]
const activeTab = ref(null);

export function usePageTabs() {
  function setTabs(newTabs) {
    tabs.value = newTabs;
    activeTab.value = newTabs.length > 0 ? newTabs[0].value : null;
  }

  function clearTabs() {
    tabs.value = [];
    activeTab.value = null;
  }

  return { tabs, activeTab, setTabs, clearTabs };
}
