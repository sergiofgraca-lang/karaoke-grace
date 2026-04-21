import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

function Player() {
  const navigate = useNavigate()
  const location = useLocation()

  const { musica, video } = location.state || {}

  const playerRef = useRef(null)
  const [resultado, setResultado] = useState(null)

  if (!musica) {
    return <h2>Erro: música não encontrada</h2>
  }

  function pegarVideoId(url) {
    if (!url) return null

    let match = url.match(/v=([^&]+)/)
    if (match) return match[1]

    match = url.match(/embed\/([^?]+)/)
    if (match) return match[1]

    return null
  }

  const videoId = pegarVideoId(video)

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
              playerRef.current.stopVideo()
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

    // 🔥🔥🔥 CORREÇÃO FINAL MOBILE
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (e) {}
        playerRef.current = null
      }

      // 🔥 remove QUALQUER iframe do YouTube
      document.querySelectorAll("iframe").forEach((iframe) => {
        if (iframe.src.includes("youtube.com")) {
          iframe.remove()
        }
      })
    }
  }, [videoId])

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

    const audio = new Audio("https://www.myinstants.com/media/sounds/aplausos.mp3")
    audio.play()
  }

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
    <div style={{
      textAlign: "center",
      marginTop: "30px",
      backgroundColor: "#000",
      minHeight: "100vh",
      color: "#fff"
    }}>
      
      <button onClick={() => navigate("/buscar")}>
        ⬅ Voltar
      </button>

      <h2>🎤 {musica}</h2>

      <div style={{
        position: "relative",
        width: "90%",
        maxWidth: "800px",
        margin: "20px auto",
        paddingBottom: "56.25%",
        display: resultado ? "none" : "block"
      }}>
        <div
          id="player"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        ></div>
      </div>

      {resultado && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.98)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999
        }}>
          <h1>{resultado.emoji}</h1>
          <h2>Nota: {resultado.nota}</h2>
          <h3>{resultado.mensagem}</h3>

          <button onClick={salvarNaPlaylist}>
            💾 Salvar na playlist
          </button>

          <button onClick={() => setResultado(null)}>
            ❌ Fechar
          </button>
        </div>
      )}
    </div>
  )
}

export default Player