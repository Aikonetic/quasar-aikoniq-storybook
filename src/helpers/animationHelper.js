/**
 * Easing functions for animations
 */
export const easings = {
  linear: (t) => t,

  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),

  easeInElastic: (t) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
  },
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
}

/**
 * Animate a value from start to end
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Duration in milliseconds
 * @param {Function} easing - Easing function
 * @param {Function} onUpdate - Callback with current value
 * @param {Function} onComplete - Callback when animation completes
 * @returns {Object} - Animation controller with stop method
 */
export const animateValue = (
  start,
  end,
  duration,
  easing = easings.easeInOutQuad,
  onUpdate,
  onComplete,
) => {
  const startTime = performance.now()
  let animationFrameId = null

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easing(progress)
    const currentValue = start + (end - start) * easedProgress

    if (onUpdate) onUpdate(currentValue, easedProgress)

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      if (onComplete) onComplete()
    }
  }

  animationFrameId = requestAnimationFrame(animate)

  return {
    stop: () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    },
  }
}

/**
 * Creates a transition animation between two states
 * @param {Function} onUpdate - Callback with progress value (0 to 1)
 * @param {number} duration - Duration in milliseconds
 * @param {Function} easing - Easing function
 * @returns {Function} - Function to start transition
 */
export const createTransition = (onUpdate, duration = 300, easing = easings.easeInOutQuad) => {
  let currentAnimation = null

  return () => {
    if (currentAnimation) {
      currentAnimation.stop()
    }

    currentAnimation = animateValue(0, 1, duration, easing, onUpdate)

    return currentAnimation
  }
}

/**
 * Creates a slide animation for an element
 * @param {HTMLElement} element - Element to animate
 * @param {string} direction - Direction: 'up', 'down', 'left', 'right'
 * @param {number} duration - Duration in milliseconds
 * @param {Function} easing - Easing function
 * @returns {Function} - Function to start animation
 */
export const createSlideAnimation = (
  element,
  direction = 'up',
  duration = 300,
  easing = easings.easeOutQuad,
) => {
  if (!element) return () => {}

  const isVertical = direction === 'up' || direction === 'down'
  const property = isVertical ? 'transform' : 'transform'
  const from = direction === 'up' || direction === 'left' ? 100 : -100

  return () => {
    const transformValue = isVertical
      ? (progress) => `translateY(${from * (1 - progress)}%)`
      : (progress) => `translateX(${from * (1 - progress)}%)`

    return animateValue(0, 1, duration, easing, (_, progress) => {
      element.style[property] = transformValue(progress)
    })
  }
}

/**
 * Creates a fade animation for an element
 * @param {HTMLElement} element - Element to animate
 * @param {string} type - Type: 'in' or 'out'
 * @param {number} duration - Duration in milliseconds
 * @param {Function} easing - Easing function
 * @returns {Function} - Function to start animation
 */
export const createFadeAnimation = (
  element,
  type = 'in',
  duration = 300,
  easing = easings.easeInOutQuad,
) => {
  if (!element) return () => {}

  const from = type === 'in' ? 0 : 1
  const to = type === 'in' ? 1 : 0

  return () => {
    return animateValue(from, to, duration, easing, (value) => {
      element.style.opacity = value
    })
  }
}
