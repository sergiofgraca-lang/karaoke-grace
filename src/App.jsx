import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Musicas from "./pages/Musicas"
import Player from "./pages/Player"
import Buscar from "./pages/Buscar"

const estiloApp = {
  backgroundColor: "#0f0f0f",
  minHeight: "100vh",
  color: "#fff",
  fontFamily: "Arial"
}

function App() {
  return (
    <div style={estiloApp}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/musicas" element={<Musicas />} />
        <Route path="/player" element={<Player />} />
        <Route path="/buscar" element={<Buscar />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App