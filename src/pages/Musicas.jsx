import { useNavigate } from "react-router-dom"

function Musicas() {
  const navigate = useNavigate()

  const lista = [
  {
    nome: "Evidências - Karaokê",
    video: "https://www.youtube.com/embed/6wSxV6d7zWw"
  },
  {
    nome: "Boate Azul - Karaokê",
    video: "https://www.youtube.com/embed/0Jz6XKZtKpY"
  },
  {
    nome: "Garçom - Karaokê",
    video: "https://www.youtube.com/embed/5m8b2x6vQ9E"
  },
  {
    nome: "Infiel - Karaokê",
    video: "https://www.youtube.com/embed/FYw8G0K7G9Q"
  },
  {
    nome: "Propaganda - Karaokê",
    video: "https://www.youtube.com/embed/6zqKX0sKx5k"
  }
]
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        ⬅ Voltar
      </button>

      <h1>🎵 Músicas</h1>

      {lista.map((musica, index) => (
        <div
          key={index}
          onClick={() =>
            navigate("/player", {
              state: {
                musica: musica.nome,
                video: musica.video
              }
            })
          }
          style={{
            margin: "10px auto",
            padding: "15px",
            border: "1px solid #ccc",
            width: "250px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {musica.nome}
        </div>
      ))}
    </div>
  )
}

export default Musicas