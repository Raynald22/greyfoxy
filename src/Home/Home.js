import React, { useEffect, useState , useRef} from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./Home.css";

function Home() {
  const [loading, setLoading] = useState(true); // Initial load state
  const [buttonLoading, setButtonLoading] = useState(false); // Play button loading state
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto play music after loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading screen regardless of music
  
      // Try to auto-play music
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true); // Music starts playing
            })
            .catch((err) => {
              console.error("Autoplay failed. User interaction needed:", err);
            });
        }
      }
    }, 3000); // 3-second loading time
  
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);  

  const handlePlay = () => {
    setButtonLoading(true); // Start loading when play button is clicked
    setTimeout(() => {
      navigate("../Game/Game"); // Navigate after 2 seconds
    }, 2000);
  };

  // Handle manual play/pause
  const handlePlayMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container">
      {/* Audio Button and Music */}
        <button className="audio-button" onClick={handlePlayMusic}>
          {isPlaying ? (
            <img src="/mute.png" alt="Pause Audio" />
          ) : (
            <img src="/audio.png" alt="Play Audio" />
          )}
        </button>
        <audio ref={audioRef} loop>
          <source src="/bg-music.mp3" type="audio/mp3" />
        </audio>

        {/* Loading Animation */}
        {loading || buttonLoading ? (
          <div className="loader">
            <div className="pac-man"></div>
          </div>
        ) : (
        <>
          {/* Background Layers */}
          <div
            className="background"
            style={{ backgroundImage: "url('/background.jpg')" }}
          ></div>
          <div className="foreground"></div>

          {/* Main Content */}
          <div className="content">
            <div className="logo-container">
              <img src="/kookie.png" alt="Kookie Logo" className="logo" />
            </div>
            <button className="button play-button" onClick={handlePlay}>
              PLAY
            </button>
          </div>

          {/* Footer or Social Links */}
          <div className="social-icons">
            <a href="https://www.instagram.com/chikiseribuan/" target="_blank" rel="noreferrer">
              <img src="/twitter.png" alt="Twitter" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer">
              <img src="/discord.png" alt="Discord" />
            </a>
            <a href="https://github.com/Raynald22" target="_blank" rel="noreferrer">
              <img src="/github.png" alt="GitHub" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
