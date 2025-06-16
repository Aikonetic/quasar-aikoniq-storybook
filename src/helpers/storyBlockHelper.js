/**
 * Default story data if none provided
 * @type {Object}
 */
export const defaultStory = {
  title: 'Our Story',
  subtitle: 'How we started and where we are going',
  paragraphs: [
    'AikoniQ Essentials started with a vision to create high-quality tech products for IT professionals and enthusiasts.',
    'Our team of experienced developers and designers work together to bring innovative solutions to the market.',
    'We believe in combining cutting-edge technology with user-friendly design to create products that make a difference.',
  ],
  imageUrl: 'https://picsum.photos/600/400',
  imageAlt: 'AikoniQ Essentials team',
  buttonText: 'Learn More',
  buttonLink: '/about',
}

/**
 * Validates a story object to ensure it has all required fields
 * @param {Object} story - The story object to validate
 * @returns {Object} - The validated story object with defaults applied where needed
 * @type {Object}
 */
export const validateStory = (story = {}) => {
  if (!story || typeof story !== 'object') {
    return { ...defaultStory }
  }

  return {
    title: story.title || defaultStory.title,
    subtitle: story.subtitle || defaultStory.subtitle,
    paragraphs:
      Array.isArray(story.paragraphs) && story.paragraphs.length > 0
        ? story.paragraphs
        : defaultStory.paragraphs,
    imageUrl: story.imageUrl || story.imageSequence?.[0] || defaultStory.imageUrl,
    imageAlt: story.imageAlt || story.title || defaultStory.imageAlt,
    buttonText: story.buttonText || defaultStory.buttonText,
    buttonLink: story.buttonLink || defaultStory.buttonLink,
    imageSequence: Array.isArray(story.imageSequence)
      ? story.imageSequence
      : [story.imageUrl || defaultStory.imageUrl],
  }
}

/**
 * Formats a story for display
 * @param {Object} story - The story object to format
 * @returns {Object} - The formatted story object
 * @type {Object}
 */
export const formatStory = (story) => {
  const validatedStory = validateStory(story)

  const formattedParagraphs = validatedStory.paragraphs
    .map((p) => (typeof p === 'string' ? p.trim() : ''))
    .filter((p) => p.length > 0)

  return {
    ...validatedStory,
    paragraphs: formattedParagraphs,
    title: validatedStory.title.charAt(0).toUpperCase() + validatedStory.title.slice(1),
  }
}

/**
 * Creates a story object with the given properties
 * @param {Object} storyData - The story data to use
 * @returns {Object} - The created story object
 * @type {Object}
 */
export const createStory = (storyData = {}) => {
  return formatStory(storyData)
}

/**
 * Utility function to create a batch of stories
 * @param {Array} storiesData - Array of story data objects
 * @returns {Array} - Array of formatted story objects
 * @type {Array}
 */
export const createStories = (storiesData = []) => {
  if (!Array.isArray(storiesData)) {
    return [createStory()]
  }

  return storiesData.map((storyData) => createStory(storyData))
}
