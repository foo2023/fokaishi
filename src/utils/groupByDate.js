export function groupByDate (data, ) {
  const now = new Date();
  let result = {
    today: [],
    yesterday: [],
    twoDaysAgo: [],
    earlier: [],
  }
  data.forEach(i => {
    if (!i.dateTime) return;

    const dateTime = new Date(i.dateTime);
    const diffMs = now - dateTime;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    let labelDateTime = null;
    let is3DaysBefore = false;
    let targetGroup;
    if (diffDays === 0) {
      labelDateTime = `${diffHours}小時前`;
      is3DaysBefore = true;
      targetGroup = 'today';
    } else if (diffDays === 1) {
      labelDateTime = `1天前`;
      is3DaysBefore = true;
      targetGroup = 'yesterday';
    } else if (diffDays === 2) {
      labelDateTime = `2天前`;
      is3DaysBefore = true;
      targetGroup = 'twoDaysAgo';
    } else if (diffDays < 4) {
      labelDateTime = `3天前`;
      is3DaysBefore = true;
      targetGroup = 'earlier';
    } else {
      labelDateTime = dateTime.toLocaleString();
      targetGroup = 'earlier';
    }

    result[targetGroup].push({...i, labelDateTime, is3DaysBefore})
  });
  
  return result;
}