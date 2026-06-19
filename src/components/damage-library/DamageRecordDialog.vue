<script setup>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Tag from "primevue/tag";
import Image from "primevue/image";

const props = defineProps({
  record: { type: Object, default: null },
});

const visible = defineModel("visible", { default: false });

const emit = defineEmits(["edit"]);
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="
      [record?.component, record?.part].filter(Boolean).join(' ') ||
      'Damage Record'
    "
    modal
    :dismissable-mask="true"
    :style="{ width: '36rem' }"
    :breakpoints="{ '640px': '95vw' }"
    :draggable="false"
  >
    <template v-if="record">
      <Image
        v-if="record.image"
        :src="record.image"
        alt="damage"
        preview
        class="w-full mb-4"
        :pt="{ image: { class: 'w-full max-h-72 object-cover rounded-lg' } }"
      >
        <template #previewicon>
          <i class="pi pi-search"></i>
        </template>
      </Image>

      <div class="flex flex-wrap gap-2 mb-4">
        <Tag
          v-if="record.status"
          :value="record.status"
          :icon="record.status === 'pass' ? 'pi pi-check' : 'pi pi-times'"
          :severity="record.status === 'pass' ? 'success' : 'danger'"
          class="capitalize"
        />
        <Tag
          v-if="record.component"
          :value="record.component"
          icon="pi pi-box"
          severity="secondary"
        />
        <Tag
          v-if="record.part"
          :value="record.part"
          icon="pi pi-cog"
          severity="secondary"
        />
        <Tag
          v-if="record.type"
          :value="record.type"
          icon="pi pi-exclamation-triangle"
          severity="secondary"
          class="capitalize"
        />
      </div>

      <div class="grid grid-cols-2 gap-x-8 gap-y-3">
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-(--text-muted) uppercase tracking-wide"
            >Author</span
          >
          <span class="text-sm font-medium">{{ record.author }}</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-(--text-muted) uppercase tracking-wide"
            >Date</span
          >
          <span class="text-sm font-medium">{{ record.date }}</span>
        </div>
      </div>
    </template>

    <template #footer>
      <Button
        label="Close"
        severity="secondary"
        text
        @click="visible = false"
      />
      <Button
        label="Edit"
        icon="pi pi-pencil"
        @click="
          emit('edit', record);
          visible = false;
        "
      />
    </template>
  </Dialog>
</template>
