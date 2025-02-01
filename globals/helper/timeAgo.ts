export const timeAgo = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
  
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(secondsAgo / seconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval !== 1 ? "s" : ""} ago`;
      }
    }
  
    return "Just now";
  };
  
  export default timeAgo;
  