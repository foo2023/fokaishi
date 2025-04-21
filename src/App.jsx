import { Route, Routes } from "react-router-dom";
import Item from "./routes/Item"
import HomePage from "./routes/HomePage"
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import CreateForm from "./components/CreateForm";
import { useContext, useEffect, useState } from "react";
import SharedContext from "./context/SharedContext";
import { useRef } from "react";
import React from "react";
import SettingsContext from "./context/SettingsContext";
import SettingsPanel from "./components/SettingsPanel";

function App() {
  const ctx = useContext(SharedContext); 
  const settingsCtx = useContext(SettingsContext);   

  return (
      <>
        <div 
          // style={{ width: 'calc(100% - var(--settings-panel))',}} 
          className="w-full md:w-[calc(100% - var(--settings-panel))] h-full overflow-scroll">
          <Navbar />
          {ctx.displayCreateForm ? <CreateForm /> : null}
          <ToastContainer />
          <video src={settingsCtx.background} className='object-cover top-0 fixed h-full w-full' autoPlay loop muted disablePictureInPicture playsInline={true}>
          </video>
          <main >
            <div className='object-cover fixed top-0 left-0 '></div>
            <Routes>
              <Route path="/" element={<HomePage />} >
                <Route path="create"/>
              </Route>
              <Route path="/:id" element={<Item />}/>
            </Routes>
          </main>
        </div>
        <SettingsPanel />
      </>
      
    
  )
}

export default App
