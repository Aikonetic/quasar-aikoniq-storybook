/**
 * Debounces a function call to improve performance
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 100) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttles a function call to improve performance
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Determines if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Offset from the viewport edge
 * @returns {boolean} - Whether the element is in the viewport
 */
export const isElementInViewport = (element, offset = 0) => {
  if (!element) return false

  const rect = element.getBoundingClientRect()

  return (
    rect.top + offset < window.innerHeight &&
    rect.bottom - offset > 0 &&
    rect.left + offset < window.innerWidth &&
    rect.right - offset > 0
  )
}

/**
 * Calculates how much of an element is visible in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {number} - Value between 0 and 1 representing visibility percentage
 */
export const getElementVisibilityPercentage = (element) => {
  if (!element) return 0

  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight

  if (rect.bottom < 0 || rect.top > windowHeight) {
    return 0
  }

  if (rect.top >= 0 && rect.bottom <= windowHeight) {
    return 1
  }

  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
  return Math.max(0, Math.min(1, visibleHeight / rect.height))
}

/**
 * Smooth scroll to an element
 * @param {string|HTMLElement} target - The element or selector to scroll to
 * @param {number} duration - Duration of scroll animation in milliseconds
 * @param {number} offset - Offset from the top in pixels
 */
export const scrollToElement = (target, duration = 300, offset = 0) => {
  const targetElement = typeof target === 'string' ? document.querySelector(target) : target

  if (!targetElement) return

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    const easing = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    window.scrollTo(0, startPosition + distance * easing(progress))

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}
