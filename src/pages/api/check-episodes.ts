import { episodes } from '../../data/episodes';
import { checkScheduledEpisodes } from '../../utils/dateUtils';

export async function get() {
  try {
    checkScheduledEpisodes(episodes);
    return new Response(JSON.stringify({ status: 'success' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'error', message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}