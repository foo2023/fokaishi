import { createContext, useContext, useEffect, useRef, useState } from "react";
import toastify from "../components/Toast";
import { decodeHTMLEntities } from "../utils/decodeHTMLEntities";
import { handleVersion, filterOutUndatedItems } from "../utils/version";

// initial value
const SharedContext = createContext({
  data: [],
  getNavItemId: (id) => {}, // 用於獲取上一個和下一個的item ID (get navigation item ID)
  addData: (newData) => {}, // this empty function is just only for auto completion in IDE
  removeData: (dataId) => {},
  displayCreateForm: false,
  toggleDisplayCreateForm: () => {},
});

export function SharedProvider({ children }) {
  const [sharedData, setSharedData] = useState([]);
  const [ displayCreateForm, setDisplayCreateForm ] = useState(false);

  const isNeededUpdate = useRef(false);
  
  if (sharedData.length > 0 && isNeededUpdate.current) {
    filterOutUndatedItems(sharedData);
  }
  
  useEffect(() => {
    const stored = localStorage.getItem('fokaishi');
    if (stored) {
      const parsed = JSON.parse(stored);
      
      const sorted = parsed.sort((a, b) => {
        const aTime = a.dateTime ? new Date(a.dateTime).getTime() : null;
        const bTime = b.dateTime ? new Date(b.dateTime).getTime() : null;
        
        if (aTime && bTime) {
          // 都有時間：越接近現在（越新）排后面
          return aTime - bTime;
        } else if (aTime && !bTime) {
          // a 有時間，b 沒有：a 在前
          return -1;
        } else if (!aTime && bTime) {
          // b 有時間，a 沒有：b 在前
          return 1;
        } else {
          // 都沒時間：維持原順序或進一步定義
          return 0;
        }
      });
      
      setSharedData(sorted);
    }

    // 获取最后一次上线的版本号码，方便处理一些版本更新的设定
    const lastSeenVersion = localStorage.getItem('version');
    console.log("version: ", lastSeenVersion);
    handleVersion(lastSeenVersion, isNeededUpdate);
  }, []);

  /* 獲取上一個和下一個item 的 ID */
  function getNavItemHandler(id) {
    const index = sharedData.findIndex(item => item.id === Math.round(id));
  
    if (index === -1) {
      return { prev: null, next: null }; // 找不到該 id
    }
  
    const prevId = index > 0 ? sharedData[index - 1].id : null;
    let prev = null;
    if (prevId) {
      let prevTitle = index > 0 ? sharedData[index - 1].title : null;
      prevTitle = decodeHTMLEntities(
        prevTitle.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ')
      )
      prev = {id: prevId, title: prevTitle};
    }
    const nextId = index < sharedData.length - 1 ? sharedData[index + 1].id : null;
    let next = null;
    if (nextId) {
      let nextTitle = index < sharedData.length - 1 ? sharedData[index + 1].title : null;
      nextTitle = decodeHTMLEntities(
        nextTitle.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ')
      )
      next = {id: nextId, title: nextTitle};
    }
  
    return { prev, next };
  }

  function addDataHandler(newData) {
    setSharedData((prev) => {
      return prev.concat(newData);
    });

    /* local storage */
    // 先從 local storage 取出現有資料
    const stored = localStorage.getItem('fokaishi');
    let arr = stored ? JSON.parse(stored) : [];

    // 插入新資料
    arr.push(newData);

    // 存回去 local storage
    localStorage.setItem('fokaishi', JSON.stringify(arr));

    toastify("創建成功", "success");
  }

  function removeDataHandler(dataId) {
    setSharedData((prev) => {
      return prev.filter(item => {
        return item.id !== dataId
      });
    });

    /*local storage */
    // 取出現有的 local storage 數據
    const stored = localStorage.getItem('fokaishi');
    let arr = stored ? JSON.parse(stored) : [];

    // 過濾掉要刪除的項目
    const filt = arr.filter(item => item.id !== dataId);

    //更新 local storage
    localStorage.setItem('fokaishi', JSON.stringify(filt));
    toastify("刪除成功", "success");
  }

  function toogleCrtFormHandler() {
    setDisplayCreateForm(prev => !prev);
  }

  const context = {
    data: sharedData,
    getNavItemId: getNavItemHandler,
    addData: addDataHandler,
    removeData: removeDataHandler,
    displayCreateForm: displayCreateForm,
    toggleDisplayCreateForm: toogleCrtFormHandler, 
  };
  
  return (
    <SharedContext.Provider value={context}>
      {children}
    </SharedContext.Provider>
  );
}

export default SharedContext;