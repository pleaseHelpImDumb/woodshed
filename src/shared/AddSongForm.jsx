import "./AddSongForm.css";
import React, { useState } from "react";

function AddSongForm({ formVisible, setFormVisible, addSong }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      title: title,
      album: album,
      progress: progress * 0.2,
      notes: notes,
    });

    const newSong = {
      id: crypto.randomUUID(),
      title: title,
      artist: artist,
      album: album,
      progress: progress * 0.2,
      notes: notes,
    };

    addSong(newSong);
    handleCancel();
  };

  const handleCancel = () => {
    setFormVisible(false);
    setTitle("");
    setArtist("");
    setAlbum("");
    setProgress(0);
    setNotes("");
  };

  return (
    <>
      {formVisible && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <button type="button">Change Album Art</button>
            <br />

            <label htmlFor="titleInput">Title</label>
            <input
              required
              type="text"
              id="titleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />

            <label htmlFor="artistInput">Artist</label>
            <input
              type="text"
              id="artistInput"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <br />

            <label htmlFor="album-input">Album</label>
            <input
              type="text"
              id="album-input"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
            <br />

            <label htmlFor="progress-input">Progress</label>
            <input
              type="range"
              id="progress-input"
              min="0"
              max="5"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            />
            <br />

            <label htmlFor="notes">Notes</label>
            <textarea
              value={notes}
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
            />
            <br />

            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>

          <button
            type="button"
            className="cancelButton"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
export default AddSongForm;
