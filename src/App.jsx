import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./shared/Navigation";
import Dashboard from "./pages/Dashboard";
import SongLibrary from "./pages/SongLibrary";
import Completed from "./pages/Completed";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./App.css";
function App() {
  const [songs, setSongs] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [gridSize, setGridSize] = useState(3);

  useEffect(() => {
    const savedSongs = localStorage.getItem("woodshed-songs");
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    localStorage.setItem("woodshed-songs", JSON.stringify(songs));
  }, [songs, isFirstRender]);

  const addSong = useCallback((songData) => {
    setSongs((prev) => [...prev, songData]);
  }, []);

  const deleteSong = (songIdDelete) => {
    setSongs((prevSongs) =>
      prevSongs.filter((song) => song.id !== songIdDelete)
    );
  };

  const editSong = (songId, updatedSongData) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, ...updatedSongData } : song
      )
    );
  };

  const toggleSongCompletion = useCallback((songId, completionData = {}) => {
    setSongs((prev) =>
      prev.map((song) => {
        if (song.id !== songId) {
          return song;
        }
        if (song.markedCompleted) {
          return {
            ...song,
            markedCompleted: false,
            completedDate: null,
            performanceLink: null,
          };
        }
        return {
          ...song,
          markedCompleted: true,
          completedDate: completionData.completedDate,
          performanceLink: completionData.performanceLink,
        };
      })
    );
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎸 Woodshed</h1>
        <Navigation />
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard songs={songs} />} />
          <Route
            path="/library"
            element={
              <SongLibrary
                songs={songs}
                addSong={addSong}
                markCompleted={toggleSongCompletion}
                gridSize={gridSize}
                setGridSize={setGridSize}
                deleteSong={deleteSong}
                editSong={editSong}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <Completed
                songs={songs}
                markCompleted={toggleSongCompletion}
                gridSize={gridSize}
                setGridSize={setGridSize}
                deleteSong={deleteSong}
                editSong={editSong}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
