<template>
  <div :class="templateClass">
    <div v-if="section.settings.title" class="text-h5 q-mb-md">
      {{ section.settings.title }}
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="blockId in section.blocks_order"
        :key="blockId"
        :class="`${blockId} col-12 col-md-4`"
      >
        <q-card flat bordered v-if="section.blocks[blockId].type === 'CardBlock'">
          <q-img
            v-if="section.blocks[blockId].settings.image"
            :src="section.blocks[blockId].settings.image"
            :ratio="16/9"
          />
          <q-card-section>
            <div class="text-subtitle1">
              {{ section.blocks[blockId].settings.title }}
            </div>
            <div class="text-body2">
              {{ section.blocks[blockId].settings.description }}
            </div>
          </q-card-section>
          <q-card-actions v-if="section.blocks[blockId].settings.buttonText">
            <q-btn
              :label="section.blocks[blockId].settings.buttonText"
              color="primary"
              flat
            />
          </q-card-actions>
        </q-card>

        <div v-if="section.blocks[blockId].type === 'BlockCard'">
          Another Type of Block
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref } from 'vue';

export default {
  name: 'SimpleComponentWithBlocks',
  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const Presets = {
      type: 'SimpleComponentWithBlocks',
      settings: {
        title: 'Unsere Leistungen'
      },
      blocks: {
        'block--1__default': {
          type: 'CardBlock',
          settings: {
            title: 'Beratung',
            description: 'Professionelle Unterstützung bei Ihren Projekten.',
            image: 'https://picsum.photos/600/400',
            buttonText: 'Mehr erfahren'
          }
        },
        'block--2__default': {
          type: 'CardBlock',
          settings: {
            title: 'Entwicklung',
            description: 'Maßgeschneiderte Softwarelösungen.',
            image: 'https://picsum.photos/600/400',
            buttonText: 'Jetzt starten'
          }
        },
        'block--3__default': {
          type: 'BlockCard',
          settings: {
            title: 'Support',
            description: 'Wir sind für Sie da – rund um die Uhr.',
            image: 'https://picsum.photos/600/400',
            buttonText: 'Kontaktieren Sie uns'
          }
        }
      },
      blocks_order: [
        'block--1__default',
        'block--2__default',
        'block--3__default'
      ]
    };

    const section = computed(() =>
      props.schemaData && Object.keys(props.schemaData).length
        ? props.schemaData
        : Presets
    );

    const templateClass = ref(
      'aikoniq-section--' + getCurrentInstance()?.type.name
    );

    return {
      section,
      templateClass
    };
  }
};
</script>
