import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎤 Bem-vindo ao Karaoke Grace</h1>

      <button
        onClick={() => navigate("/musicas")}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          marginTop: "30px",
          cursor: "pointer"
        }}
      >
        Escolha sua música
      </button>
    </div>
  )
}

export default Home