<script setup>
import 'src/css/StoryImage.css'

/**
 * Props for the StoryImage component
 */
const props = defineProps({
  /**
   * URL of the image to display
   * Required property - component will not function without it
   */
  imageUrl: {
    type: String,
    required: true,
  },
  /**
   * Alternative text for the image for accessibility
   * Used for screen readers and when image fails to load
   */
  altText: {
    type: String,
    default: 'Story image',
  },
  /**
   * Optional custom ID for the image element
   * If not provided, a random unique ID will be generated
   */
  imageId: {
    type: String,
    default: '',
  },
})

/**
 * Generate a unique ID for the image if one isn't provided
 * Used for accessibility connections and potential DOM manipulation
 */
const uniqueId = props.imageId || `img-${Math.random().toString(36).substring(2, 9)}`
</script>

<template>
  <section class="story-image" role="img" :aria-label="altText">
    <q-img
      :src="imageUrl"
      :ratio="16 / 9"
      class="rounded-borders"
      :alt="altText"
      :id="uniqueId"
      loading="lazy"
      aria-describedby="story-image-description"
    />
    <span id="story-image-description" class="sr-only">{{ altText }}</span>
  </section>
</template>
