import type { Episode } from '../types';

// Import all episode JSON files
const episodeModules = import.meta.glob('./episode*.json', { eager: true });

// Convert the modules object to an array of episodes
export const episodes: Episode[] = Object.values(episodeModules)
  .map(module => module.default || module)
  .sort((a: Episode, b: Episode) => {
    // Sort by publish date in descending order (newest first)
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
