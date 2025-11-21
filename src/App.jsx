import { Routes,Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";
import Header from "./components/Header"
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <div className="w-screen min-h-screen flex flex-col gap-8 items-center bg-gray-400">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/code/:code" element={<StatsPage />}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
