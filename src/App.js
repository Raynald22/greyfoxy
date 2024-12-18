import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Game from "./Game/Game";
import MusicPlayer from "./Home/Music"; // Import the MusicPlayer

function App() {
  return (
    <Router>
      <MusicPlayer /> {/* Background music plays globally */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Game/Game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
