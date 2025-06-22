<template>
  <div :class="templateClass">
    <div class="row q-col-gutter-xl scroll-section">
      <!-- Text Content -->
      <div :class="isClient && isMobile ? 'col-12' : 'col-6'">
        <div
          v-for="(item, index) in section.stories"
          :key="index"
          class="content-block"
          :ref="(el) => isClient && el && (contentRefs[index] = el)"
          @mouseenter="isClient && isMobile ? (activeIndex = index) : null"
        >
          <!-- Subtitle with line -->
          <div class="row items-center q-mb-sm step-number">
            <div class="line q-mr-sm"></div>
            <div class="text-subtitle2 text-bold">{{ item.subtitle }}</div>
          </div>

          <!-- Title -->
          <h2 class="text-h3 text-bold q-mb-md">{{ item.title }}</h2>

          <!-- Paragraphs -->
          <p class="text-body1 q-mb-md" style="line-height: 1.6">
            {{ item.paragraph }}
          </p>

          <!-- Mobile Image -->
          <div v-if="isClient && isMobile" class="q-mt-md">
            <q-img
              :src="item.image"
              :ratio="imageRatio"
              spinner-color="primary"
              class="rounded-borders"
            />
          </div>
        </div>
      </div>

      <!-- Desktop Sticky Image -->
      <div v-if="isClient && !isMobile" class="col-6 sticky-image">
        <transition name="fade">
          <q-img
            v-if="section.stories[activeIndex]"
            :src="section.stories[activeIndex].image"
            :key="activeIndex"
            :ratio="imageRatio"
            class="rounded-borders"
            spinner-color="primary"
            style="width: 100%; height: auto"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'ScrollStorySection',
  tag: 'section',
  disabled_on: {
    templates: ['ExampleTemplate'],
    groups: ['footer'],
  },
  props: {
    schemaData: {
      type: Object,
      default: () => ({}),
    },
    parentId: {
      type: [String, Number],
      default: null,
    },
  },
  setup(props) {
    const $q = useQuasar()
    const isClient = ref(false)
    const isMobile = ref(false)
    const activeIndex = ref(0)
    const contentRefs = []
    let observer = null

    const Presets = {
      type: 'ScrollStorySection',
      stories: [
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
    }

    const section = computed(() => {
      return props.schemaData && props.schemaData.stories ? props.schemaData : Presets
    })

    const templateClass = ref('aikoniq-section--' + getCurrentInstance()?.type.name)

    const imageRatio = computed(() => {
      const width = $q.screen.width
      if (width <= 600) return 6 / 7
      if (width <= 1024) return 8 / 11
      return 688 / 563
    })

    onMounted(async () => {
      isClient.value = true

      const updateMobile = () => {
        isMobile.value = $q.screen.width < 600
      }

      updateMobile()
      window.addEventListener('resize', updateMobile)

      onBeforeUnmount(() => {
        window.removeEventListener('resize', updateMobile)
      })

      if (!$q.screen.width || isMobile.value) return

      await nextTick()

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = contentRefs.findIndex((el) => el === entry.target)
              if (index !== -1) activeIndex.value = index
            }
          })
        },
        { threshold: 0.3 },
      )

      contentRefs.forEach((el) => {
        if (el) observer.observe(el)
      })

      onBeforeUnmount(() => {
        if (observer) observer.disconnect()
      })
    })

    return {
      section,
      templateClass,
      isClient,
      isMobile,
      activeIndex,
      contentRefs,
      imageRatio,
    }
  },
}
</script>

<style scoped>
.scroll-section {
  margin-top: 50px;
  padding: 40px;
}
.sticky-image {
  position: sticky;
  top: 10px;
  height: 100%;
}
.content-block {
  margin: 100px 0;
  padding-top: 60px;
  min-height: 100vh;
}
.step-number .line {
  width: 30px;
  height: 2px;
  background-color: black;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
