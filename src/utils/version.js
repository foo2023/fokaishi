const VERSION = '3.0.0';

export function getLatestVersion () {
  return VERSION;
}

export function filterOutUndatedItems (sharedData) {
  const updatedData = sharedData.filter(item => {
    return item.dateTime !== undefined
  });
  // 更新上去 local storage
  localStorage.setItem('fokaishi', JSON.stringify(updatedData));
}

export function handleVersion (lastSeenVersion, isNeededUpdate) {
  if (!lastSeenVersion) {
    // no version means last seen in v.2.3.4 or First time come in
    localStorage.setItem('version', VERSION);
    isNeededUpdate.current = true;
  } else if (lastSeenVersion !== VERSION) {
    localStorage.setItem('version', VERSION);
    isNeededUpdate.current = true;
  }
}