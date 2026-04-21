import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

function Player() {
  const navigate = useNavigate()
  const location = useLocation()

  const { musica, video } = location.state || {}

  const playerRef = useRef(null)
  const [resultado, setResultado] = useState(null)

  // 🚫 segurança
  if (!musica) {
    return <h2>Erro: música não encontrada</h2>
  }

  // 🔎 extrair ID do vídeo (suporta vários formatos)
  function pegarVideoId(url) {
    if (!url) return null

    let match = url.match(/v=([^&]+)/)
    if (match) return match[1]

    match = url.match(/embed\/([^?]+)/)
    if (match) return match[1]

    return null
  }

  const videoId = pegarVideoId(video)

  // 🎥 carregar player do YouTube
  useEffect(() => {
    function criarPlayer() {
      if (!videoId) return

      playerRef.current = new window.YT.Player("player", {
        height: "100%",
        width: "100%",
        videoId: videoId,
        events: {
          onStateChange: (event) => {
            if (event.data === 0) {
              mostrarResultado()
            }
          }
        }
      })
    }

    if (window.YT && window.YT.Player) {
      criarPlayer()
    } else {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)

      window.onYouTubeIframeAPIReady = criarPlayer
    }
  }, [videoId])

  // 🎯 resultado estilo "show"
  function mostrarResultado() {
    const nota = (Math.random() * 4 + 6).toFixed(1)

    let emoji = "😬"
    let mensagem = "Pode melhorar!"

    if (nota >= 9) {
      emoji = "🔥"
      mensagem = "PERFEITO! VOCÊ É UMA LENDA!"
    } else if (nota >= 7) {
      emoji = "😎"
      mensagem = "Mandou bem demais!"
    }

    setResultado({ nota, emoji, mensagem })

    // 👏 som de aplauso
    const audio = new Audio("https://www.myinstants.com/media/sounds/aplausos.mp3")
    audio.play()
  }

  // 💾 salvar playlist
  function salvarNaPlaylist() {
    let playlist = JSON.parse(localStorage.getItem("playlist")) || []

    const musicaAtual = {
      titulo: musica,
      videoId: videoId
    }

    const existe = playlist.find(m => m.videoId === musicaAtual.videoId)

    if (!existe) {
      playlist.push(musicaAtual)
      localStorage.setItem("playlist", JSON.stringify(playlist))
      alert("Salvo na playlist!")
    } else {
      alert("Já está na playlist!")
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      
      <button onClick={() => navigate("/buscar")}>
        ⬅ Voltar
      </button>

      <h2>🎤 {musica}</h2>

      {/* 🎥 PLAYER RESPONSIVO */}
      <div style={{
        position: "relative",
        width: "90%",
        maxWidth: "800px",
        margin: "20px auto",
        paddingBottom: "56.25%" // 16:9
      }}>
        <div
          id="player"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            overflow: "hidden"
          }}
        ></div>
      </div>

      {/* 🎯 RESULTADO FULLSCREEN */}
      {resultado && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.98)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999,
          padding: "20px",
          textAlign: "center",
          overflowY: "auto"
        }}>

          {/* 🎉 EMOJI */}
          <div style={{
            fontSize: "clamp(60px, 15vw, 100px)",
            marginBottom: "10px"
          }}>
            {resultado.emoji}
          </div>

          {/* 🏆 NOTA */}
          <h2 style={{
            fontSize: "clamp(28px, 8vw, 42px)",
            margin: "10px 0"
          }}>
            Nota: {resultado.nota}
          </h2>

          {/* 💬 MENSAGEM */}
          <h3 style={{
            marginBottom: "25px",
            fontSize: "18px",
            color: "#ccc"
          }}>
            {resultado.mensagem}
          </h3>

          {/* 💾 SALVAR */}
          <button
            onClick={salvarNaPlaylist}
            style={{
              padding: "14px 30px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              marginBottom: "12px",
              background: "#00c853",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            💾 Salvar na playlist
          </button>

          {/* ❌ FECHAR */}
          <button
            onClick={() => setResultado(null)}
            style={{
              padding: "12px 25px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "#444",
              color: "#fff"
            }}
          >
            ❌ Fechar
          </button>

        </div>
      )}
    </div>
  )
}

export default Player