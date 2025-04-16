import { useContext } from "react";
import SharedContext from "../context/SharedContext";

function Modal({ children }) {
  const ctx = useContext(SharedContext);
  function closeHandler() {
    ctx.toggleDisplayCreateForm();
  }

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-full h-screen z-50">
    <div className="top-0 left-0 w-full h-screen bg-gray-950/25 backdrop-blur-xs" onClick={closeHandler} />
      
      <dialog open className={`rounded-lg shadow-lg max-w-[700px] w-5/6 overflow-auto p-4 m-auto bg-white`}>
        {children}
      </dialog> 
      
    </div>
  );
}

export default Modal;