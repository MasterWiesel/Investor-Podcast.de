import type { Episode } from '../data/types';

interface EmailContent {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail(content: EmailContent): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });

    if (!response.ok) {
      console.error('Failed to send email:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export function createErrorEmailContent(episode: Episode, errors: string[], emailTo: string): EmailContent {
  return {
    to: emailTo,
    subject: `Fehler bei Podcast-Veröffentlichung: ${episode.title}`,
    text: `
Bei der Veröffentlichung der Podcast-Folge "${episode.title}" sind folgende Fehler aufgetreten:

${errors.join('\n')}

Episode Details:
- Titel: ${episode.title}
- Veröffentlichungsdatum: ${episode.publishDate}
- Cover URL: ${episode.imageUrl}
- Audio URL: ${episode.audioUrl}

Bitte überprüfen Sie die Verfügbarkeit der Dateien und die Konfiguration.
    `
  };
}