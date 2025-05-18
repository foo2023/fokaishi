export function groupingByDate (data, ) {
  const now = new Date();
  let today = [], yesterday = [], twoDaysAgo = [], earlier = [];
  let dataReturn = {};
  data.map(i => {
    let labelDateTime = null;
    let is3DaysBefore = false;
    
    if (i.dateTime) {
      const dateTime = new Date(i.dateTime);
      const diffMs = now - dateTime;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffDays === 0) {
        labelDateTime = `${diffHours}小時前`;
        is3DaysBefore = true;
        today = [...today, { ...i, labelDateTime, is3DaysBefore }];
      } else if (diffDays < 4) {
        labelDateTime = `${diffDays}天前`;
        is3DaysBefore = true;
        if (diffDays === 1) {
          yesterday = [...yesterday, { ...i, labelDateTime, is3DaysBefore }];
        } else if (diffDays === 2) {
          twoDaysAgo = [...twoDaysAgo, { ...i, labelDateTime, is3DaysBefore }];
        } else {
          earlier = [...earlier, { ...i, labelDateTime, is3DaysBefore }];
        }
      } else {
        labelDateTime = dateTime.toLocaleString();
        earlier = [...earlier, { ...i, labelDateTime, is3DaysBefore }];
      }
    }
    
    
    // return { ...i, labelDateTime, is3DaysBefore };
  });
  
  
  if (today.length >= 0) {
    dataReturn.today = today;
  } else {
    dataReturn.today = [];
  }
  if (yesterday.length >= 0) {
    dataReturn.yesterday = yesterday;
  } else {
    dataReturn.yesterday = [];
  }
  if (twoDaysAgo.length >= 0) {
    dataReturn.twoDaysAgo = twoDaysAgo;
  } else {
    dataReturn.twoDaysAgo = [];
  }
  if (earlier.length >= 0) {
    dataReturn.earlier = earlier;
  } else {
    dataReturn.earlier = [];
  }
  return dataReturn;
}