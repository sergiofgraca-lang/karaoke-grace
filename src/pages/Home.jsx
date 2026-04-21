import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Home() {
  const navigate = useNavigate()
  const [quantidade, setQuantidade] = useState(0)

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("playlist")) || []
    setQuantidade(dados.length)
  }, [])

  return (
    <div style={{
      textAlign: "center",
      padding: "30px",
      minHeight: "100vh"
    }}>

      <h1>🎤 Karaoke Grace</h1>
      <p style={{ color: "#bbb" }}>
        Escolha sua música e solte a voz 🎶
      </p>

      <button style={btn} onClick={() => navigate("/buscar")}>
        🔎 Buscar Música
      </button>

      <button style={btn} onClick={() => navigate("/playlist")}>
        🎶 Minha Playlist ({quantidade})
      </button>

      <button
        style={{ ...btn, background: "#444" }}
        onClick={() => {
          localStorage.removeItem("logado")
          navigate("/login")
        }}
      >
        🚪 Sair
      </button>
    </div>
  )
}

const btn = {
  display: "block",
  margin: "15px auto",
  padding: "15px",
  width: "260px",
  borderRadius: "10px",
  border: "none",
  background: "#ff0000",
  color: "#fff",
  fontSize: "16px"
}

export default Home