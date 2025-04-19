import { Route, Routes } from "react-router-dom";
import Item from "./routes/Item"
import HomePage from "./routes/HomePage"
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import CreateForm from "./components/CreateForm";
import { useContext } from "react";
import SharedContext from "./context/SharedContext";

function App() {
  const ctx = useContext(SharedContext);
  return (
      <>
        <Navbar />
        {ctx.displayCreateForm ? <CreateForm /> : null}
        <ToastContainer />
        <main >
        <div className='object-cover w-[100vw] h-[100vh] fixed top-0 left-0 '/>
        <video src="sunflower_bg_vid.mp4" className='object-cover w-[100vw] h-[100vh] fixed top-0 left-0 ' autoPlay loop muted>
          <source src="sunflower_bg_vid.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
          <Routes>
            <Route path="/" element={<HomePage />} >
              <Route path="create"/>
            </Route>
            <Route path="/:id" element={<Item />}/>
          </Routes>
        </main>
          
      </>
      
    
  )
}

export default App
