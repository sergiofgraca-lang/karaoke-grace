import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Playlist() {
  const [playlist, setPlaylist] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("playlist")) || []
    setPlaylist(dados)
  }, [])

  function tocar(m) {
    navigate("/player", {
      state: {
        musica: m.titulo,
        video: `https://www.youtube.com/watch?v=${m.videoId}`
      }
    })
  }

  function remover(id) {
    const nova = playlist.filter(m => m.videoId !== id)
    setPlaylist(nova)
    localStorage.setItem("playlist", JSON.stringify(nova))
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>

      <button onClick={() => navigate("/")}>⬅ Voltar</button>

      <h1>🎶 Minha Playlist</h1>

      {playlist.length === 0 && <p>Playlist vazia</p>}

      {playlist.map((m, i) => (
        <div key={i} style={{
          background: "#1e1e1e",
          margin: "10px auto",
          padding: "15px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "350px"
        }}>
          <p>{m.titulo}</p>

          <button onClick={() => tocar(m)}>▶️ Tocar</button>
          <button onClick={() => remover(m.videoId)}>❌ Remover</button>
        </div>
      ))}

    </div>
  )
}

export default Playlist