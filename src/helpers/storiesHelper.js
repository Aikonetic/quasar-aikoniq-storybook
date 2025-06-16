import { createStories } from './storyBlockHelper'
import storiesData from '../data/stories.json'

/**
 * Creates an array of story objects from the stories data
 * @param {Array} storiesArray - The array of stories data
 * @returns {Array} - The array of story objects
 */
export const stories = createStories(storiesData.stories)
export const processStories = (storiesArray) => {
  return createStories(storiesArray)
}
