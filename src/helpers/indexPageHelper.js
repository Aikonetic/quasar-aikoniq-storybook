import { ref, computed } from 'vue'
import { stories } from './storiesHelper'
import { throttle, getElementVisibilityPercentage } from './scrollHelper'
import { animateValue, easings } from './animationHelper'

export { stories }

/**
 * Composable for managing story animations and scroll-based interactions
 * Provides reactive state and methods for handling story transitions and animations
 *
 * @returns {Object} Collection of reactive state, computed properties, and methods
 */
export const useStoryAnimation = () => {
  const activeIndex = ref(0)
  const previousIndex = ref(null)
  const storyRefs = ref([])
  const contentContainer = ref(null)
  const isTransitioning = ref(false)
  const transitionProgress = ref(1)
  const scrollProgress = ref(0)
  let lastScrollY = 0
  let scrollDirection = 'down'
  let currentAnimation = null
  const currentStory = computed(() => stories[activeIndex.value])

  /**
   * URL of the current image frame to display
   * Handles both single images and image sequences
   */
  const currentFrameUrl = computed(() => {
    const story = currentStory.value
    if (!story.imageSequence || story.imageSequence.length <= 1) {
      return story.imageUrl
    }
    return story.imageSequence[0]
  })

  /**
   * Computed style for image transform animations
   * Creates slide-up/slide-down effects based on scroll direction
   */
  const imageTransformStyle = computed(() => {
    if (transitionProgress.value >= 1) {
      return {
        transform: 'translateY(0)',
      }
    }
    if (scrollDirection === 'down') {
      return {
        transform: `translateY(${(1 - transitionProgress.value) * 100}%)`,
      }
    } else {
      return {
        transform: `translateY(${(transitionProgress.value - 1) * 100}%)`,
      }
    }
  })

  /**
   * Starts the slide animation for story transitions
   * Handles animation timing and easing based on scroll direction
   */
  const startSlideAnimation = () => {
    if (currentAnimation) {
      currentAnimation.stop()
    }

    isTransitioning.value = true
    transitionProgress.value = 0
    currentAnimation = animateValue(
      0,
      1,
      200,
      scrollDirection === 'down' ? easings.easeOutQuad : easings.easeInOutQuad,
      (value) => {
        transitionProgress.value = value
      },
      () => {
        isTransitioning.value = false
        currentAnimation = null
      },
    )
  }

  /**
   * Handles scroll events to determine active story and animation progress
   * Throttled to improve performance
   */
  const handleScroll = throttle(() => {
    const currentScrollY = window.scrollY
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up'
    lastScrollY = currentScrollY

    requestAnimationFrame(() => {
      const windowHeight = window.innerHeight
      const scrollPosition = currentScrollY

      let maxVisibility = 0
      let mostVisibleIndex = activeIndex.value

      storyRefs.value.forEach((storyEl, index) => {
        const visibilityPercentage = getElementVisibilityPercentage(storyEl)

        if (visibilityPercentage > maxVisibility) {
          maxVisibility = visibilityPercentage
          mostVisibleIndex = index
        }

        const rect = storyEl.getBoundingClientRect()
        if (rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2) {
          const startVisible = scrollPosition + rect.top - windowHeight
          const totalVisibleDistance = rect.height + windowHeight
          const currentProgress = (scrollPosition - startVisible) / totalVisibleDistance

          scrollProgress.value = Math.max(0, Math.min(1, currentProgress))
        }
      })

      if (activeIndex.value !== mostVisibleIndex) {
        previousIndex.value = activeIndex.value
        activeIndex.value = mostVisibleIndex

        startSlideAnimation()
      }
    })
  }, 100)

  /**
   * Sets up scroll and resize event listeners
   * Should be called on component mount
   */
  const setupScrollListeners = () => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    setTimeout(handleScroll, 100)
  }

  /**
   * Cleans up scroll and resize event listeners
   * Should be called on component unmount to prevent memory leaks
   */
  const cleanupScrollListeners = () => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)

    if (currentAnimation) {
      currentAnimation.stop()
    }
  }

  return {
    // State
    activeIndex,
    previousIndex,
    storyRefs,
    contentContainer,
    isTransitioning,
    scrollProgress,

    // Computed
    currentStory,
    currentFrameUrl,
    imageTransformStyle,

    // Methods
    handleScroll,
    setupScrollListeners,
    cleanupScrollListeners,
  }
}
