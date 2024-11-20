export function isPublished(publishDate) {
  // Get current date in UTC
  const now = new Date();
  const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  
  // Parse publish date and convert to UTC
  const publishDateTime = new Date(publishDate);
  const utcPublishDate = Date.UTC(publishDateTime.getUTCFullYear(), publishDateTime.getUTCMonth(), publishDateTime.getUTCDate());
  
  return utcNow >= utcPublishDate;
}