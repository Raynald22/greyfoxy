import React, { useEffect, useRef } from "react";

function MusicPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // Attempt to play the music
      audio.play().catch((err) => {
        console.error("Music autoplay blocked:", err);
      });
    }

    // Cleanup function with null check
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset to the beginning
      }
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/bg-music.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default MusicPlayer;
