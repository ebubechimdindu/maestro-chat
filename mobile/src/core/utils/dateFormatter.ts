/**
 * Formats a date object to a readable date string
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Dec 10, 2025")
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Formats a date object to a readable time string
 * @param date - The date to format
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};


export const formatDuration = ({ duration, createdAt, endedAt }: { duration: number | null, createdAt: string | null, endedAt: string | null }): string => {

  if (createdAt && endedAt) {
    const start = new Date(createdAt);
    const end = new Date(endedAt);
    const durationSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    return formatDurationFromSeconds(durationSeconds);
  }

  if (duration !== null) {
    return formatDurationFromSeconds(duration);
  }


  return '';
};


/**
 * Formats duration from seconds to HH:MM:SS or MM:SS format
 * @param durationSeconds - Duration in seconds
 * @returns Formatted duration string (e.g., "15:19:31" or "45:30")
 */
export const formatDurationFromSeconds = (durationSeconds: number): string => {
  const durationMinutes = Math.floor(durationSeconds / 60);
  const durationHours = Math.floor(durationMinutes / 60);
  const remainingMinutes = durationMinutes % 60;
  const remainingSeconds = durationSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return durationHours > 0
    ? `${durationHours}:${pad(remainingMinutes)}:${pad(remainingSeconds)}`
    : `${durationMinutes}:${pad(remainingSeconds)}`;
};
