import SongGallery from "../features/songs/SongGallery";
import { useState } from "react";

function Dashboard({ songs }) {
  const [randomSongs, setRandomSongs] = useState([]);
  const [numSongs, setNumSongs] = useState([0]);

  const randomSongsPicker = (allSongs, num) => {
    console.log(num);
    const incompleteSongs = allSongs.filter((song) => !song.markedCompleted);
    if (num >= incompleteSongs.length) {
      return incompleteSongs;
    }

    const songsCopy = [...incompleteSongs];
    const randomSongs = [];

    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * songsCopy.length);
      randomSongs.push(songsCopy[randomIndex]);
      songsCopy.splice(randomIndex, 1);
    }

    return randomSongs;
  };
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="general-msg">
        Welcome to Woodshed! Your musical practice tracking starts here.
      </p>
      <p className="general-msg">Maybe it's time to practice some songs?...</p>
      <div className="randomSongs">
        <span className="general-msg">Give me </span>
        <select name="" id="" onChange={(e) => setNumSongs(e.target.value)}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <span className="general-msg"> random songs to practice!</span>
        <button
          onClick={() => setRandomSongs(randomSongsPicker(songs, numSongs))}
        >
          Go!
        </button>
        <SongGallery
          songs={randomSongs}
          gridSize={numSongs}
          actionsDisabled={true}
        />
        {numSongs > songs.length && (
          <p>There are less than {numSongs} songs in the library!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
