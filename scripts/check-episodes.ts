import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { episodes } from '../src/data/episodes/index.js';
import { checkScheduledEpisodes } from '../src/utils/dateUtils.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });

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