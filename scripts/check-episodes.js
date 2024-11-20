import { config } from 'dotenv';
import { episodes } from '../src/data/episodes/index.js';
import { checkScheduledEpisodes } from '../src/utils/dateUtils.js';

// Load environment variables
config();

async function main() {
  try {
    await checkScheduledEpisodes(episodes);
    console.log('Episode check completed successfully');
  } catch (error) {
    console.error('Failed to check episodes:', error);
    process.exit(1);
  }
}

main();