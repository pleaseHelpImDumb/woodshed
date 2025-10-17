import { useState, useEffect, useCallback, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { db } from "./db";
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
  const [cardHeight, setCardHeight] = useState(300);
  const [sorting, setSorting] = useState({
    key: "title",
    direction: "asc",
  });

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

  const deleteSong = async (songIdToDelete) => {
    const songToDelete = songs.find((song) => song.id === songIdToDelete);

    if (songToDelete && songToDelete.art) {
      try {
        const image = await db.images.get(songToDelete.art);
        if (image) {
          if (image.refCount > 1) {
            await db.images.update(songToDelete.art, {
              refCount: image.refCount - 1,
            });
            console.log(`Decremented refCount for ${songToDelete.art}`);
          } else {
            await db.images.delete(songToDelete.art);
            console.log(
              `Deleted image ${songToDelete.art} as refCount reached 0`
            );
          }
        }
      } catch (err) {
        console.error("Failed to update/delete art from IndexedDB:", err);
      }
    }

    setSongs((prevSongs) =>
      prevSongs.filter((song) => song.id !== songIdToDelete)
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

  const sortSongs = useMemo(() => {
    const sorted = [...songs].sort((a, b) => {
      if (sorting.key === "title") {
        return sorting.direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sorting.key === "progress") {
        return sorting.direction === "asc"
          ? a.progress > b.progress
          : b.progress > a.progress;
      }
    });
    return sorted;
  }, [songs, sorting]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎹 Woodshed 🎸 </h1>
        <hr />
        <Navigation />
        <hr />
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard songs={songs} />} />
          <Route
            path="/library"
            element={
              <SongLibrary
                songs={sortSongs}
                addSong={addSong}
                markCompleted={toggleSongCompletion}
                gridSize={gridSize}
                setGridSize={setGridSize}
                cardHeight={cardHeight}
                setCardHeight={setCardHeight}
                deleteSong={deleteSong}
                editSong={editSong}
                sorting={sorting}
                setSorting={setSorting}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <Completed
                songs={sortSongs}
                markCompleted={toggleSongCompletion}
                gridSize={gridSize}
                setGridSize={setGridSize}
                cardHeight={cardHeight}
                setCardHeight={setCardHeight}
                deleteSong={deleteSong}
                editSong={editSong}
                sorting={sorting}
                setSorting={setSorting}
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
