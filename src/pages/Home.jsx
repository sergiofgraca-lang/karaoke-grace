import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"

function Home() {
  const navigate = useNavigate()
  const audioRef = useRef(null)

  // 🔊 tocar música automática
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2 // volume baixo
      audioRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <div style={estiloContainer}>
      
      {/* 🎶 ÁUDIO */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      </audio>

      <h1 style={titulo}>🎤 Karaoke Grace</h1>

      <p style={subtitulo}>
        Escolha sua música e brilhe no palco!
      </p>

      <button
        onClick={() => navigate("/buscar")}
        style={botao}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)"
          e.target.style.backgroundColor = "#ff1a1a"
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)"
          e.target.style.backgroundColor = "#ff0000"
        }}
      >
        🎵 Escolher Música
      </button>

      

    </div>
  )
}

const estiloContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "#fff",
  textAlign: "center",

  // 🎤 FUNDO DE PALCO
  backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819')",
  backgroundSize: "cover",
  backgroundPosition: "center"
}

const titulo = {
  fontSize: "50px",
  marginBottom: "10px",
  textShadow: "0 0 15px rgba(0,0,0,0.8)"
}

const subtitulo = {
  fontSize: "18px",
  marginBottom: "30px",
  color: "#eee",
  textShadow: "0 0 10px rgba(0,0,0,0.7)"
}

const botao = {
  padding: "15px 30px",
  fontSize: "18px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#ff0000",
  color: "#fff",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 0 15px rgba(255,0,0,0.6)"
}
export default Home