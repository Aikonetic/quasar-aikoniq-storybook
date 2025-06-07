import SimpleComponent from './SimpleComponent.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof SimpleComponent> = {
  title: 'Components/SimpleComponent',
  component: SimpleComponent,
  tags: ['autodocs'],
  argTypes: {
    schemaData: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleComponent>;

// ✅ Diese Story verwendet die internen Presets
export const Default: Story = {};

// ✅ Diese Story überschreibt mit externen schemaData
export const CustomData: Story = {
  args: {
    schemaData: {
      settings: {
        title: 'Überschriebener Titel',
        subtitle: 'Manuell gesetzter Untertitel',
        content: 'Das ist ein benutzerdefinierter Text',
        flat: false
      },
    },
  },
};
