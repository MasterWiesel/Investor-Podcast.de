import { episodes } from '../src/data/episodes/index.js';
import { isPublished } from '../src/utils/dateUtils.js';

const publishedEpisodes = episodes.filter(episode => isPublished(episode.publishDate));
console.log(`Total episodes: ${episodes.length}`);
console.log(`Published episodes: ${publishedEpisodes.length}`);
