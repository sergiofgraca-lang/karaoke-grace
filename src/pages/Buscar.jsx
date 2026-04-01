import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Buscar() {
  const [busca, setBusca] = useState("")
  const [videos, setVideos] = useState([])
  const [videoSelecionado, setVideoSelecionado] = useState(null)

  const navigate = useNavigate()

  const API_KEY = import.meta.env.VITE_YOUTUBE_KEY

  const buscarMusica = async () => {
    if (!busca) return

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${busca}+karaoke&type=video&maxResults=10&key=${API_KEY}`

    const res = await fetch(url)
    const data = await res.json()

    setVideos(data.items)
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      
      {/* 🔙 VOLTAR */}
      <button onClick={() => navigate("/")}>
        ⬅ Voltar
      </button>

      <h1>🔎 Buscar Música</h1>

      <input
  value={busca}
  onChange={(e) => setBusca(e.target.value)}
  placeholder="Digite a música"
  style={{
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    marginRight: "10px"
  }}
/>

<button
  onClick={buscarMusica}
  style={{
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff0000",
    color: "#fff",
    cursor: "pointer"
  }}
>
  Buscar
</button>
      {/* 🎥 PLAYER */}
      {videoSelecionado && (
  <div style={{ marginTop: "20px" }}>
    <iframe
      width="350"
      height="220"
      src={`https://www.youtube.com/embed/${videoSelecionado}`}
      allowFullScreen
      style={{
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
      }}
    />
  </div>
)}

      {/* 📺 LISTA DE RESULTADOS */}
      <div style={{ marginTop: "20px" }}>
  {videos.map((item) => (
    <div
      key={item.id.videoId}
      onClick={() => setVideoSelecionado(item.id.videoId)}
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px auto",
        cursor: "pointer",
        borderRadius: "10px",
        padding: "10px",
        width: "320px",
        backgroundColor: "#1c1c1c",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"
        e.currentTarget.style.backgroundColor = "#2a2a2a"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"
        e.currentTarget.style.backgroundColor = "#1c1c1c"
      }}
    >
      <img
        src={item.snippet.thumbnails.medium.url}
        alt=""
        style={{
          borderRadius: "8px",
          width: "120px"
        }}
      />

      <p style={{ marginLeft: "10px", fontSize: "14px" }}>
        {item.snippet.title}
      </p>
    </div>
  ))}
</div>
    </div>
  )
}

export default Buscar