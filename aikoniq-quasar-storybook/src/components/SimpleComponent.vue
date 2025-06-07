<template>
  <div :class="templateClass">
    <div class="text-h5 q-mb-sm">{{ section.settings.title }}</div>
    <div v-if="section.settings.subtitle" class="text-subtitle2 q-mb-md">{{ section.settings.subtitle }}</div>

    <q-card v-if="section.settings.content" :flat="section.settings.flat" bordered>
      <q-card-section>
        {{ section.settings.content }}
        <q-btn outline class="bg-red text-bold">{{section.settings.content}}</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance } from 'vue';

export default {
  name: 'SimpleComponent', // Necessary
  tag: 'section',
  disabled_on: {
    templates: ['PasswordIndex', 'GiftCard'],
    groups: ['header', 'custom.overlay']
  },
  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    },
    parentId: {
      type: [String, Number],
      default: null
    }
  },
  setup(props) {
    const previewsettings = ref({});

    const Presets = {
      type: 'SimpleComponent',
      settings: {
        title: 'Standard Titel',
        subtitle: 'Standard Untertitel',
        content: 'Dies ist ein standardisierter Beispielinhalt',
        flat: true
      }
    };

    const section = computed(() => {
      return props.schemaData && props.schemaData.settings ? props.schemaData : Presets;
    });

    const templateClass = ref('aikoniq-section--' + getCurrentInstance()?.type.name);

    return {
      templateClass,
      section,
      previewsettings
    };
  }
};
</script>
