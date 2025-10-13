import React, { useState } from "react";

function EditSongForm({ songToEdit, onFormSubmit, onCancel }) {
  const [title, setTitle] = useState(songToEdit.title);
  const [artist, setArtist] = useState(songToEdit.artist);
  const [progress, setProgress] = useState(songToEdit.progress);
  const [notes, setNotes] = useState(songToEdit.notes);
  const [performanceLink, setPerformanceLink] = useState(
    songToEdit.performanceLink
  );
  const [art, setArt] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit({ title, artist, progress, notes, performanceLink, art });
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
        <h3>Edit Song</h3>
        {art && <img src={art} width={"100%"}></img>}
        <label htmlFor="artInput">Change Art</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
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
        {songToEdit.markedCompleted && (
          <div>
            <label htmlFor="yt-link">Performance Link:</label>
            <input
              type="url"
              placeholder="youtube.com/..."
              value={performanceLink}
              onChange={(e) => setPerformanceLink(e.target.value)}
            />
          </div>
        )}
        <br />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
      <button type="button" className="cancelButton" onClick={() => onCancel()}>
        Cancel
      </button>
    </>
  );
}

export default EditSongForm;
