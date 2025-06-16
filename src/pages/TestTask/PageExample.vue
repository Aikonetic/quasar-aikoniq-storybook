<script setup>
import StoryBlock from 'src/components/Featured/StoryBlock.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import 'src/css/IndexPage.css'
import { stories } from 'src/helpers/storiesHelper'
import { useStoryAnimation } from 'src/helpers/indexPageHelper'

/**
 * Story animation composable that handles scroll-based animations and story transitions
 * Provides reactive state and methods for managing the story viewing experience
 */
const {
  activeIndex,
  previousIndex,
  storyRefs,
  contentContainer,
  isTransitioning,
  currentFrameUrl,
  imageTransformStyle,
  setupScrollListeners,
  cleanupScrollListeners,
} = useStoryAnimation()

/**
 * Reactive state for tracking mobile viewport
 * Used for responsive layout adjustments
 */
const isMobile = ref(false)

/**
 * Page title for accessibility and document title
 */
const pageTitle = ref('AikoniQ Essentials Story')

/**
 * Check if the current viewport is mobile size
 * Updates the isMobile reactive reference and disables animations
 */
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768

  // Disable animations on mobile
  if (isMobile.value) {
    // Force all images to be visible immediately without animations
    document.querySelectorAll('.story-block__image').forEach((img) => {
      img.style.opacity = '1'
      img.style.transform = 'none'
      img.style.transition = 'none'
    })
  }
}

/**
 * Set up event listeners and initialize the page on component mount
 */
onMounted(() => {
  setupScrollListeners()
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('keydown', handleKeyDown)
})

/**
 * Clean up event listeners when component is unmounted
 * Prevents memory leaks and continued execution after component is removed
 */
onUnmounted(() => {
  cleanupScrollListeners()
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('keydown', handleKeyDown)
})

/**
 * Handle keyboard navigation through stories
 * Allows users to navigate with arrow keys and page up/down
 * @param {KeyboardEvent} event - The keyboard event
 */
const handleKeyDown = (event) => {
  if (event.key === 'ArrowDown' || event.key === 'PageDown') {
    navigateToStory(Math.min(activeIndex.value + 1, stories.length - 1))
    event.preventDefault()
  } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    navigateToStory(Math.max(activeIndex.value - 1, 0))
    event.preventDefault()
  }
}

/**
 * Navigate to a specific story by index
 * Scrolls the story into view with smooth animation
 * @param {number} index - The index of the story to navigate to
 */
const navigateToStory = (index) => {
  if (storyRefs.value[index]) {
    storyRefs.value[index].scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <main role="main" aria-labelledby="page-title">
    <h1 id="page-title" class="sr-only">{{ pageTitle }}</h1>

    <!-- Skip to main content link -->
    <a href="#content" class="sr-only sr-only-focusable">Skip to main content</a>

    <!-- Fixed Image Container - only visible on desktop -->
    <div
      class="fixed-image-container"
      :class="{ 'story-image-mobile': isMobile }"
      aria-hidden="true"
    >
      <div class="image-wrapper">
        <div class="preload-container" aria-hidden="true">
          <img
            v-for="(story, idx) in stories"
            :key="`preload-${idx}`"
            :src="story.imageSequence?.[0] || story.imageUrl"
            class="preload-image"
            alt=""
          />
        </div>

        <!-- Previous image (behind) - always show during transition (desktop only) -->
        <div
          v-if="previousIndex !== null && isTransitioning && !isMobile"
          class="image-container previous"
        >
          <div
            class="story-image"
            :style="{
              backgroundImage: `url(${stories[previousIndex]?.imageSequence?.[0]})`,
            }"
            role="presentation"
          ></div>
        </div>

        <!-- Current image (sliding up for desktop, static for mobile) -->
        <div class="image-container current">
          <div
            class="story-image"
            :style="{
              backgroundImage: `url(${currentFrameUrl})`,
              ...(isMobile ? {} : imageTransformStyle),
            }"
            role="presentation"
          ></div>
        </div>
      </div>
    </div>

    <!-- Scrollable Content Container -->
    <div id="content" class="content-container" ref="contentContainer">
      <article class="story-navigation" aria-label="Story navigation">
        <div class="story-nav-list sr-only">
          <section v-for="(story, index) in stories" :key="`nav-${index}`">
            <a
              href="#"
              @click.prevent="navigateToStory(index)"
              :aria-current="activeIndex === index ? 'page' : false"
            >
              {{ story.title }}
            </a>
          </section>
        </div>
      </article>

      <div
        v-for="(story, index) in stories"
        :key="index"
        class="story-section"
        :id="`story-${index}`"
        ref="storyRefs"
        :aria-current="activeIndex === index ? 'true' : 'false'"
      >
        <StoryBlock
          :storyData="story"
          :isActive="activeIndex === index || isMobile"
          :imageHidden="!isMobile"
        />
      </div>
    </div>
  </main>
</template>
