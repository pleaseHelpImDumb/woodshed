import "./Form.css";
import React, { useState } from "react";

function AddSongForm({ onFormSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");
  const [art, setArt] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newSong = {
      id: crypto.randomUUID(),
      title: title,
      artist: artist,
      progress: progress,
      notes: notes,
      markedCompleted: false,
      art: art,
    };

    onFormSubmit(newSong);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When the reader is done, the result is the Base64 string
        setArt(reader.result);
      };
      reader.readAsDataURL(file); // This starts the reading process
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Add New Song</h3>

        <label htmlFor="artInput">Change Art</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        {art && <img src={art} width={"50%"}></img>}
        <br />

        <label htmlFor="titleInput">Title *</label>
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

        <label htmlFor="progress-input">Progress *</label>
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

        <button
          type="button"
          className="cancel-button"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
}
export default AddSongForm;
