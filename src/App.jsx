import { Route, Routes, useLocation } from "react-router";
import React from "react";
// import Item from "./routes/Item"
// const delayImport = (factory, delay = 9999999999990) =>
//   new Promise(resolve => {
//     setTimeout(() => resolve(factory()), delay);
//   });

// const HomePage = React.lazy(() => delayImport(() => import('./routes/HomePage')));
// const Item = React.lazy(() => delayImport(() => import('./routes/Item')));

const HomePage = React.lazy(() => import('./routes/HomePage'));
const Item = React.lazy(() => import('./routes/Item'));

import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
// import CreateForm from "./components/page/CreateForm";
const CreateForm = React.lazy(() => import("./components/page/CreateForm"));
import { Suspense, useContext } from "react";
import SharedContext from "./context/SharedContext";
import SettingsContext from "./context/SettingsContext";
import SettingsPanel from "./components/SettingsPanel";
import { AnimatePresence } from 'framer-motion';
import AnimatedPageWrapper from './components/page/AnimatedPageWrapper';
import NotFound from "./routes/NotFound";
import HomePageLoad from "./components/loading-element/HomePageLoad";
import ItemPageLoad from "./components/loading-element/ItemPageLoad";
import DefaultPageLoad from "./components/loading-element/DefaultPageLoad";

export default function App() {
  const ctx = useContext(SharedContext); 
  const settingsCtx = useContext(SettingsContext);

  return (
      <>
        <div 
          className="w-full md:w-[calc(100%-var(--settings-panel))] h-full overflow-auto"
        >
          <Navbar />
          <Suspense fallback={<DefaultPageLoad />}>
            {ctx.displayCreateForm ? <CreateForm /> : null}
          </Suspense>
          <ToastContainer />
          <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none">
            <video src={`/${settingsCtx.background.path}`} className="object-cover w-full h-full" autoPlay loop muted disablePictureInPicture playsInline={true} />
          </div>
          <main className="w-full h-full top-0 fixed">
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
    <Suspense fallback={location.pathname === "/" ? <HomePageLoad /> : <ItemPageLoad />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPageWrapper><HomePage /></AnimatedPageWrapper>} />
            <Route path="/:id" element={<AnimatedPageWrapper><Item /></AnimatedPageWrapper>}/>
            <Route path="*" element={<AnimatedPageWrapper><NotFound/></AnimatedPageWrapper>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
