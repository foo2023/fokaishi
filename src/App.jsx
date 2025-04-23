import { Route, Routes, useLocation } from "react-router-dom";
import Item from "./routes/Item"
import HomePage from "./routes/HomePage"
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import CreateForm from "./components/CreateForm";
import { useContext } from "react";
import SharedContext from "./context/SharedContext";
import React from "react";
import SettingsContext from "./context/SettingsContext";
import SettingsPanel from "./components/SettingsPanel";
import { AnimatePresence } from 'framer-motion';
import AnimatedPageWrapper from './components/AnimatedPageWrapper';

export default function App() {
  const ctx = useContext(SharedContext); 
  const settingsCtx = useContext(SettingsContext);

  return (
      <>
        <div 
          className="w-full md:w-[calc(100%-var(--settings-panel))] h-full overflow-auto">
          <Navbar />
          {ctx.displayCreateForm ? <CreateForm /> : null}
          <ToastContainer />
          <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none">
            <video src={settingsCtx.background.path} className="object-cover w-full h-full" autoPlay loop muted disablePictureInPicture playsInline={true} />
          </div>
          <main >
            <AnimatedRoutes />
          </main>
        </div>
        <SettingsPanel />
      </>
      
    
  )
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPageWrapper><HomePage /></AnimatedPageWrapper>} >
          <Route path="create"/>
        </Route>
        <Route path="/:id" element={<AnimatedPageWrapper><Item /></AnimatedPageWrapper>}/>
      </Routes>
    </AnimatePresence>
  );
}
