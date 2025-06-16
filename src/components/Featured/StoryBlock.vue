<script setup>
import StoryImage from './StoryImage.vue'
import { computed } from 'vue'
import { formatStory } from 'src/helpers/storyBlockHelper'
import 'src/css/StoryBlock.css'

/**
 * Props for the StoryBlock component
 */
const props = defineProps({
  /**
   * The story data object containing title, subtitle, paragraphs, and image information
   * @type {Object}
   * @property {string} title - The story title
   * @property {string} subtitle - Optional subtitle for the story
   * @property {Array<string>} paragraphs - Array of text paragraphs
   * @property {string} imageUrl - URL for the story image
   * @property {string} imageAlt - Alt text for the image
   * @property {Array<string>} imageSequence - Optional array of image URLs for animation
   */
  storyData: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Whether this story block is currently active/visible
   * Controls animations and accessibility attributes
   */
  isActive: {
    type: Boolean,
    default: false,
  },
  /**
   * Whether to hide the image in this block
   * Used for responsive layouts where images are handled separately
   */
  imageHidden: {
    type: Boolean,
    default: false,
  },
})

/**
 * Computed property that formats the story data using the helper function
 * Ensures consistent formatting and provides fallbacks for missing data
 */
const story = computed(() => formatStory(props.storyData))
</script>

<template>
  <section
    class="story-block"
    :class="{ active: isActive }"
    :aria-hidden="!isActive"
    :tabindex="isActive ? 0 : -1"
  >
    <div class="story-block__container">
      <article class="story-block__main">
        <div class="story-block__content">
          <section class="story-block__header">
            <p v-if="story.subtitle" class="story-block__subtitle" aria-label="Story subtitle">
              {{ story.subtitle }}
            </p>
            <h2 class="story-block__title" :id="`story-title-${story.subtitle || 'main'}`">
              {{ story.title }}
            </h2>
          </section>

          <article
            class="story-block__body"
            :aria-labelledby="`story-title-${story.subtitle || 'main'}`"
          >
            <div class="story-block__text">
              <p
                v-for="(paragraph, index) in story.paragraphs"
                :key="index"
                class="story-block__paragraph"
              >
                {{ paragraph }}
              </p>
            </div>
          </article>
        </div>
      </article>

      <div
        v-if="!imageHidden"
        class="story-block__image-container"
        ref="imageContainer"
        role="img"
        :aria-label="`Illustration for ${story.title}`"
      >
        <StoryImage
          v-if="story.imageUrl"
          :imageUrl="story.imageUrl"
          :altText="story.imageAlt || story.title"
          class="story-block__image"
          :class="{ 'slide-up-animation': isActive || window?.innerWidth <= 768 }"
        />
      </div>
    </div>
  </section>
</template>
