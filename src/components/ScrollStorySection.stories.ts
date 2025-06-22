import ScrollStorySection from './ScrollStorySection.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ScrollStorySection> = {
  title: 'Components/ScrollStorySection',
  component: ScrollStorySection,
  tags: ['autodocs'],
  argTypes: {
    schemaData: {
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrollStorySection>

export const Default: Story = {}

export const CustomData: Story = {
  args: {
    schemaData: {
      stories: [
        {
          title: 'Benutzerdefinierter Titel 1',
          subtitle: '01',
          paragraph: 'Dies ist ein benutzerdefinierter Textabschnitt für Story 1.',
          image: 'https://via.placeholder.com/600x400',
          alt: 'Bildbeschreibung 1',
        },
        {
          title: 'Benutzerdefinierter Titel 2',
          subtitle: '02',
          paragraph: 'Dies ist ein weiterer Abschnitt mit Beispielinhalt.',
          image: 'https://via.placeholder.com/600x400',
          alt: 'Bildbeschreibung 2',
        },
      ],
    },
  },
}
