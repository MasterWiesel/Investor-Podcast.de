import type { Episode } from '../data/types';
import { sendEmail, createErrorEmailContent } from './emailUtils';

export function isPublished(publishDate: string): boolean {
  // Get current date in UTC
  const now = new Date();
  const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  
  // Parse publish date and convert to UTC
  const publishDateTime = new Date(publishDate);
  const utcPublishDate = Date.UTC(publishDateTime.getUTCFullYear(), publishDateTime.getUTCMonth(), publishDateTime.getUTCDate());
  
  return utcNow >= utcPublishDate;
}

export async function checkScheduledEpisodes(episodes: Episode[], emailTo: string = 'pl@p-fm.de'): Promise<void> {
  try {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    // Filter episodes that should be published today
    const todaysEpisodes = episodes.filter(episode => {
      const publishDate = new Date(episode.publishDate);
      return publishDate.toISOString().split('T')[0] === todayStr;
    });

    if (todaysEpisodes.length === 0) {
      console.log('No episodes scheduled for today');
      return;
    }

    // Check each episode's resources
    for (const episode of todaysEpisodes) {
      try {
        const [imageRes, audioRes] = await Promise.all([
          fetch(episode.imageUrl),
          fetch(episode.audioUrl)
        ]);

        const errors: string[] = [];

        if (!imageRes.ok) {
          errors.push(`Cover Image not accessible (${imageRes.status}): ${episode.imageUrl}`);
        }
        if (!audioRes.ok) {
          errors.push(`Audio File not accessible (${audioRes.status}): ${episode.audioUrl}`);
        }

        if (errors.length > 0) {
          const emailContent = createErrorEmailContent(episode, errors, emailTo);
          await sendEmail(emailContent);
          console.error(`Errors found for episode "${episode.title}":\n${errors.join('\n')}`);
        } else {
          console.log(`Successfully verified episode "${episode.title}"`);
        }
      } catch (error) {
        const errors = [`Network error checking episode resources: ${error.message}`];
        const emailContent = createErrorEmailContent(episode, errors, emailTo);
        await sendEmail(emailContent);
        console.error(`Failed to check episode "${episode.title}":`, error);
      }
    }
  } catch (error) {
    console.error('Error in checkScheduledEpisodes:', error);
    const emailContent = {
      to: emailTo,
      subject: 'Kritischer Fehler bei der Podcast-Überprüfung',
      text: `Ein kritischer Fehler ist bei der Überprüfung der Podcast-Episoden aufgetreten:\n\n${error.message}`
    };
    await sendEmail(emailContent);
  }
}