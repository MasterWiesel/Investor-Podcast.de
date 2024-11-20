import type { Episode } from './types';

// Import all episode JSON files
const episodeModules = import.meta.glob('./episodes/episode*.json', { eager: true });

// Convert the modules object to an array of episodes and add debug logging
console.log('Loading episode files:', Object.keys(episodeModules));

// Convert the modules object to an array of episodes
export const episodes: Episode[] = Object.values(episodeModules)
  .map(module => {
    const episode = module.default || module;
    console.log('Loaded episode:', episode.title);
    return episode;
  })
  .sort((a: Episode, b: Episode) => {
    // Sort by publish date in descending order (newest first)
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

// Log the final sorted episodes
console.log('Total episodes loaded:', episodes.length);
console.log('Sorted episodes:', episodes.map(ep => ep.title));