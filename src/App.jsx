import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Musicas from "./pages/Musicas"
import Player from "./pages/Player"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/musicas" element={<Musicas />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App