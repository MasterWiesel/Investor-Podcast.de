import { episodes } from '../../data/episodes';
import { isPublished } from '../../utils/dateUtils';

export async function get() {
  try {
    const publishedEpisodes = episodes.filter(episode => isPublished(episode.publishDate));
    
    return new Response(JSON.stringify({ 
      status: 'success',
      total: episodes.length,
      published: publishedEpisodes.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      status: 'error', 
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
