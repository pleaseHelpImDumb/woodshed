import AddSongForm from "../shared/AddSongForm";
import SongGallery from "../features/SongGallery";
import GalleryFilters from "../features/GalleryFilters";

import { useState } from "react";

function SongLibrary() {
  const [songs, setSongs] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const [gridSize, setGridSize] = useState(3);

  const addSong = (newSong) => {
    setSongs([...songs, newSong]);
  };

  return (
    <>
      <h2>Song Library</h2>
      <button onClick={() => setFormVisible(!formVisible)}>+ Add Song</button>
      <AddSongForm
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        addSong={addSong}
      ></AddSongForm>
      <SongGallery songs={songs} gridSize={gridSize} />
      <GalleryFilters
        gridSize={gridSize}
        setGridSize={setGridSize}
      ></GalleryFilters>
    </>
  );
}
export default SongLibrary;
