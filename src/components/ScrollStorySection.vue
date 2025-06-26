<template>
  <div :class="templateClass">
    <div class="scroll-section full-height">
      <!-- Grid container with 2 columns -->
      <div  :class="isMobile ? 'row' : 'grid two-cols q-col-gutter-xl'">
        <!-- Text grid in the left column -->
        <div
          ref="textGridRef"
          class="vertical-grid text-grid col-12 col-md-6"
        >
          <div
            v-for="(item, index) in section.settings"
            :key="index"
            class="content-block"
            :ref="el => contentRefs[index] = el"
            :style="{
              paddingTop: isClient && isMobile ? '60px' : '0',
              opacity: index === activeIndex ? 1 : isMobile ? 1 : 0,
            }"
          >
            <div class="row items-center q-mb-sm step-number">
              <div class="line q-mr-sm"></div>
              <div class="text-subtitle2 text-bold">{{ item.subtitle }}</div>
            </div>
            <h2 class="text-h3 text-bold q-mb-md">{{ item.title }}</h2>
            <p class="text-body1 q-mb-md" style="line-height: 1.6">
              {{ item.paragraph }}
            </p>
            <div v-if="isClient && isMobile" class="q-mt-md">
              <q-img
                :src="item.image"
                loading="eager"
                :ratio="imageRatio"
                no-spinner
                class="rounded-borders"
              />
            </div>
          </div>
        </div>

        <!-- Image grid in the right column -->
        <div
          v-if="isClient && !isMobile"
          ref="imageGridRef"
          class="col-12 col-md-6 relative-position"
        >
          <div
            class="image-grid sticky-image"
            :style="{ paddingTop: `${imageRatio * 100}%` }"
          >
            <transition :name="scrollDirection === 'down' ? 'slide-up' : 'slide-down'">
              <q-img
                v-if="section.settings[activeIndex]"
                :src="section.settings[activeIndex].image"
                :key="activeIndex"
                :ratio="imageRatio"
                class="rounded-borders slide-img"
                no-spinner
                no-transition
              >
                <div>{{ [activeIndex + 1] }}</div>
              </q-img>
            </transition>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
/**
 * ScrollStorySection.vue
 *
 * This Vue component displays a scrollable story section with text and images.
 * It supports both mobile and desktop layouts, and synchronizes the active story
 * block with the user's scroll position. Images and text are animated based on scroll direction.
 *
 * Props:
 * - schemaData: Object containing section settings (optional, falls back to Presets)
 * - parentId: String or Number, optional parent identifier
 *
 * Uses Quasar for responsive design and global store for scroll info.
 */
import {ref, computed, getCurrentInstance, onMounted, nextTick, watch} from 'vue'
import {useQuasar} from 'quasar'
import {useGlobalStore} from 'src/stores/globalStore.js'

export default {
  name: 'ScrollStorySection',
  tag: 'section',
  disabled_on: {
    templates: ['ExampleTemplate'],
    groups: ['footer'],
  },
  props: {
    /**
     * Section data, including settings for each story block.
     * If not provided, default Presets are used.
     */
    schemaData: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Optional parent identifier.
     */
    parentId: {
      type: [String, Number],
      default: null,
    },
  },
  setup(props) {
    const $q = useQuasar()
    const isClient = ref(false)
    const activeIndex = ref(0)
    const contentRefs = []
    const textGridRef = ref(null)
    const imageGridRef = ref(null)

    /**
     * Computed property to determine if the device is mobile.
     * Uses Quasar's screen detection.
     */
    const isMobile = computed(() => {
      if (typeof window === 'undefined') return $q.platform.is.mobile
      return $q.screen.lt.sm
    })

    const initialImageGridPosition = ref(0)

    const globalStore = useGlobalStore()
    const scrollDirection = ref('down')

    /**
     * Default section data if no schemaData is provided.
     */
    const Presets = {
      type: 'ScrollStorySection',
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
    }

    /**
     * Computed property for the section data (either from props or Presets).
     */
    const section = computed(() => (
      props.schemaData.settings ? props.schemaData : Presets
    ))

    /**
     * Computed class name for the template root element.
     */
    const templateClass = ref(
      'aikoniq-section--' + getCurrentInstance()?.type.name
    )

    /**
     * Computed property for the image aspect ratio, responsive to screen size.
     */
    const imageRatio = computed(() => {
      if ($q.screen.sizes.sm) return 6 / 7
      if ($q.screen.sizes.md) return 8 / 11
      return 688 / 563
    })

    /**
     * Synchronizes the activeIndex with the closest content block to the initial position.
     * @param {number} initialPosition - The reference position (usually the top of the image grid)
     */
    function syncActiveIndex(initialPosition) {
      if (!textGridRef.value) return
      let closest = 0
      let minDist = Infinity
      contentRefs.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect()
          console.debug('EL', idx, rect)
          let dist = Math.abs(rect.top - initialPosition)
          if (idx === contentRefs.length - 1) {
            dist *= 0.7
          }
          if (dist < minDist) {
            minDist = dist
            closest = idx
          }
        }
      })
      activeIndex.value = closest
    }

    /**
     * Lifecycle hook: onMounted
     * Initializes client state, sets up scroll direction, and watches for scroll position changes.
     */
    onMounted(async () => {
      isClient.value = true
      await nextTick()

      scrollDirection.value = globalStore.getScrollInfo.direction > 0 ? 'down' : 'up'
      initialImageGridPosition.value = imageGridRef.value.getBoundingClientRect().top
      syncActiveIndex(initialImageGridPosition.value)
      watch(
        () => globalStore.getScrollInfo.position,
        () => {
          scrollDirection.value = globalStore.getScrollInfo.direction > 0 ? 'down' : 'up'
          syncActiveIndex(initialImageGridPosition.value)
        }
      )
    })

    return {
      section,
      templateClass,
      isClient,
      isMobile,
      activeIndex,
      contentRefs,
      imageRatio,
      scrollDirection,
      textGridRef,
      imageGridRef
    }
  }
}
</script>

<style scoped>
.sticky-image {
  position: sticky;
  top: 10px;
}

.scroll-section {
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 40px;
}

.grid.two-cols {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.vertical-grid {
  display: grid;
  grid-auto-rows: auto;
  row-gap: 100px;
}

.image-grid {
  position: sticky;
  top: 10px;
  align-self: start;
}

.slide-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.step-number .line {
  width: 30px;
  height: 2px;
  background-color: black;
}

.content-block {
  padding-top: 60px;
}

/* Übergangs-Animationen bleiben erhalten */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
