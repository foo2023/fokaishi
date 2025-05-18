const VERSION = '3.0.0';

export function getLatestVersion () {
  return VERSION;
}

export function resetLocalStorageNoDate (sharedData) {
  const updatedData = sharedData.filter(item => {
    console.log(item.id, "DateTime", item.dateTime === undefined);
    return !(item.dateTime === undefined)
  });
  console.log("index!", updatedData);
  // 更新上去 local storage
  localStorage.setItem('fokaishi', JSON.stringify(updatedData));
  // setSharedData(prev => prev.filter(item => {
  //   console.log(item.id, "DateTime", item.dateTime === undefined);
  //   return !(item.dateTime === undefined)
  // }));
}

export function handleVersionActions (lastSeenVersion, isNeededUpdate) {
  if (lastSeenVersion) {
    if (!lastSeenVersion === VERSION) {
      console.log("version is different!");
      // calling this time update
      isNeededUpdate.current = true;
      localStorage.setItem('version', '3.0.0');
    }
  } else {
    // no version means in v.2.3.4 of first time come in
    console.log("no version!");
    // calling this time update
    isNeededUpdate.current = true;
    localStorage.setItem('version', '3.0.0');
  }
}