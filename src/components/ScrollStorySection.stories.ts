import ScrollStorySection from './ScrollStorySection.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { useGlobalStore } from 'src/stores/globalStore.js'

const meta: Meta<typeof ScrollStorySection> = {
  title: 'Components/ScrollStorySection',
  component: ScrollStorySection,
  tags: ['autodocs'],
  argTypes: {
    schemaData: {
      control: 'object',
    },
  },
  decorators: [
    (Story, context) => ({
      components: { Story },
      setup() {
        // Store wird für jede Story einmalig initialisiert
        const globalStore = useGlobalStore()
        // optional: Default-Werte im Store setzen
        // globalStore.someFlag = true
        return { args: context.args }
      },
      template: `<story />`,
    }),
  ],
}

export default meta
type Story = StoryObj<typeof ScrollStorySection>

export const Default: Story = {}

// CustomData-Story, die zusätzlich Props über args liefert und den Store nutzt
export const CustomData: Story = {
  ...Default,
  args: {
    ...Default.args,
    schemaData: {
      settings: [
        {
          title: 'AikoniQ Essentials',
          subtitle: '01',
          paragraph:
            'Willkommen bei AikoniQ Essentials, dem innovativen Online-Shop für IT-Liebhaber und Technikbegeisterte! Wir bieten eine breite Palette an hochwertigen Technikprodukten für IT-Profis und Enthusiasten. Unsere Produkte sind sorgfältig ausgewählt, um qualitativ hochwertige Leistung und Performance für unsere Kunden zu gewährleisten.',
          image: 'https://shop.aikonetic.com/cdn/shop/files/6.png?v=1680767125&width=1000',
          alt: 'AikoniQ Essentials',
        },
        {
          title: 'Unsere Vision',
          subtitle: '02',
          paragraph:
            'Wir von AikoniQ Essentials sind davon überzeugt, dass ein moderner Online-Shop nicht nur ein Ort zum Einkaufen sein sollte, sondern auch eine inspirierende Plattform, die die Möglichkeiten der digitalen Welt voll ausschöpft. Mit unserem Shop möchten wir zeigen, welche innovativen Funktionen in der heutigen Technologie stecken und wie diese dazu beitragen können, das Einkaufserlebnis für unsere Kunden zu verbessern.',
          image: 'https://shop.aikonetic.com/cdn/shop/files/5.png?v=1680767124&width=1000',
          alt: 'AikoniQ Products',
        },
        {
          title: 'Unsere Produkte',
          subtitle: '03',
          paragraph:
            'Bei AikoniQ Essentials finden Sie eine sorgfältig ausgewählte Auswahl an Produkten, die für IT-Experten und Technikbegeisterte relevant sind. Unser Sortiment reicht von leistungsstarken Computern und Laptops über Smartphones, Tablets und Wearables bis hin zu nützlichem Zubehör und Gadgets, die Ihren Alltag erleichtern. Wir legen großen Wert darauf, Ihnen nur die besten und innovativsten Produkte anzubieten, die von renommierten Herstellern stammen und höchsten Qualitätsstandards entsprechen.',
          image: 'https://shop.aikonetic.com/cdn/shop/files/2.png?v=1680767125&width=1000',
          alt: 'AikoniQ Services',
        },
        {
          title: 'Unsere Kompetenz',
          subtitle: '04',
          paragraph:
            'Als Teil der Aikonetic GmbH profitieren wir von einem Team aus erfahrenen Entwicklern und Designern, die ihr Fachwissen in die Gestaltung und Umsetzung unseres Online-Shops einbringen. Bei AikoniQ Essentials können Sie sich darauf verlassen, dass wir stets auf dem neuesten Stand der Technik sind und Ihnen ein sicheres, benutzerfreundliches und ansprechendes Einkaufserlebnis bieten.',
          image:
            'https://shop.aikonetic.com/cdn/shop/files/Aikonetic.ai_1200_x_1600_px.png?v=1682359991&width=1000',
          alt: 'AikoniQ Services',
        },
        {
          title: 'Unsere Präsentation',
          subtitle: '05',
          paragraph:
            'Wir bei AikoniQ Essentials möchten Ihnen nicht nur die besten Produkte anbieten, sondern auch, wie ein moderner Online-Shop aussehen und funktionieren kann. Unser Shop ist ein Paradebeispiel dafür, wie die Zukunft des digitalen Einkaufens aussieht. Mit ansprechendem Design, intuitiver Navigation und innovativen Funktionen setzen wir neue Maßstäbe in der Online-Shopping-Welt.\n\nEntdecken Sie jetzt AikoniQ Essentials und erleben Sie ein einzigartiges Einkaufserlebnis, das Technikliebhaber begeistern wird. Viel Spaß beim Stöbern und Einkaufen!',
          image: 'https://shop.aikonetic.com/cdn/shop/files/4.png?v=1680767124&width=1000',
          alt: 'AikoniQ Services',
        },
      ],
    },
  }
}
