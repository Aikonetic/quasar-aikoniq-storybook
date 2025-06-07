import SimpleComponentWithBlocks from './SimpleComponentWithBlocks.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof SimpleComponentWithBlocks> = {
  title: 'Components/SimpleComponentWithBlocks',
  component: SimpleComponentWithBlocks,
  tags: ['autodocs'],
  argTypes: {
    schemaData: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleComponentWithBlocks>;

// ✅ Diese Story verwendet die internen Presets
export const Default: Story = {};

// ✅ Diese Story überschreibt mit externen schemaData
export const CustomData: Story = {
  args: {
    schemaData: {
      settings: {
        title: 'Unsere Leistungen'
      },
      blocks: {
        'block--1__default': {
          type: 'CardBlock',
          settings: {
            title: 'Beratung',
            description: 'Professionelle Unterstützung bei Ihren Projekten.',
            image: 'https://placehold.co/600x400',
            buttonText: 'Mehr erfahren'
          }
        },
        'block--2__default': {
          type: 'CardBlock',
          settings: {
            title: 'Entwicklung',
            description: 'Maßgeschneiderte Softwarelösungen.',
            image: 'https://placehold.co/600x400',
            buttonText: 'Jetzt starten'
          }
        },
        'block--3__default': {
          type: 'CardBlock',
          settings: {
            title: 'Support',
            description: 'Wir sind für Sie da – rund um die Uhr.',
            image: 'https://placehold.co/600x400',
            buttonText: 'Kontaktieren Sie uns'
          }
        }
      },
      blocks_order: [
        'block--1__default',
        'block--2__default',
        'block--3__default'
      ]
    }
  },
};
