import { useNavigate } from "react-router-dom"

function Musicas() {
  const navigate = useNavigate()

  const lista = [
    "Evidências - Chitãozinho & Xororó",
    "Boate Azul - Bruno & Marrone",
    "Sinônimos - Zé Ramalho",
    "Fio de Cabelo - Chitãozinho & Xororó"
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
          style={{
            margin: "10px auto",
            padding: "15px",
            border: "1px solid #ccc",
            width: "250px",
            borderRadius: "8px"
          }}
        >
          {musica}
        </div>
      ))}
    </div>
  )
}


export default Musicas