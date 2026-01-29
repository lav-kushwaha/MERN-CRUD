import {BrowserRouter,Routes,Route} from "react-router-dom"
import Clientlayout from "./layout/clientlayout"
import Home from "./Pages/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Clientlayout/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
