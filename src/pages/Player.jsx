import { useNavigate, useLocation } from "react-router-dom"

function Player() {
  const navigate = useNavigate()
  const location = useLocation()

  const { musica, video } = location.state || {}

  if (!musica) {
    return <h2>Erro: música não encontrada</h2>
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      
      <button
        onClick={() => navigate("/musica")}
        style={{ marginBottom: "20px" }}
      >
        ⬅ Voltar
      </button>

      <h2>🎤 {musica}</h2>

      <iframe
        width="300"
        height="170"
        src={video}
        title="YouTube video"
        allowFullScreen
        style={{ marginTop: "20px", borderRadius: "10px" }}
      ></iframe>
    </div>
  )
}

export default Player