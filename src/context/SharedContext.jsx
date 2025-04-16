import { createContext, useContext, useState } from "react";
import toastify from "../components/Toast";

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

  /* 獲取上一個和下一個item 的 ID */
  function getNavItemHandler(id) {
    const index = sharedData.findIndex(item => item.id === Math.round(id));
  
    if (index === -1) {
      return { prev: null, next: null }; // 找不到該 id
    }
  
    const prevId = index > 0 ? sharedData[index - 1].id : null;
    const nextId = index < sharedData.length - 1 ? sharedData[index + 1].id : null;
  
    return { prev: prevId, next: nextId };
  }

  function addDataHandler(newData) {
    setSharedData((prev) => {
      return prev.concat(newData);
    });
    toastify("創建成功", "success");
  }

  function removeDataHandler(dataId) {
    setSharedData((prev) => {
      return prev.filter(item => {
        return item.id !== dataId
      });
    });
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