import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import Musicas from "./pages/Musicas"
import Player from "./pages/Player"
import Buscar from "./pages/Buscar"
import Login from "./pages/Login"
import Playlist from "./pages/Playlist"

const estiloApp = {
  backgroundColor: "#0f0f0f",
  minHeight: "100vh",
  color: "#fff",
  fontFamily: "Arial",
  position: "relative",
  zIndex: 0,
  overflow: "hidden"
}

// 🔒 ROTA PRIVADA
function RotaPrivada({ children }) {
  const logado = localStorage.getItem("logado")
  return logado === "true" ? children : <Navigate to="/login" />
}

function App() {
  return (
    <div style={estiloApp}>
      {/* 🔥 CAMADA GLOBAL FORÇADA */}
      <div style={{
        position: "relative",
        zIndex: 1,
        transform: "translateZ(0)"
      }}>
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={<Login />} />

            <Route path="/" element={
              <RotaPrivada>
                <Home />
              </RotaPrivada>
            } />

            <Route path="/musicas" element={
              <RotaPrivada>
                <Musicas />
              </RotaPrivada>
            } />

            <Route path="/player" element={
              <RotaPrivada>
                <Player />
              </RotaPrivada>
            } />

            <Route path="/buscar" element={
              <RotaPrivada>
                <Buscar />
              </RotaPrivada>
            } />

            <Route path="/playlist" element={
              <RotaPrivada>
                <Playlist />
              </RotaPrivada>
            } />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App