import "./Form.css";
import React, { useState, useEffect } from "react";
import { db } from "../../db";

function AddSongForm({ onFormSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");
  const [art, setArt] = useState(null);
  const [artPreviewURL, setArtPreviewURL] = useState(null);

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

  /*
   * This function handles image changing, including setting the preview in the form, and updating the DB accordingly
   */
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const newPreviewUrl = URL.createObjectURL(file);
    setArtPreviewURL(newPreviewUrl);

    if (file) {
      const imageId = `art-${file.name}-${file.size}`;
      try {
        const existingImage = await db.images.get(imageId);
        if (existingImage) {
          await db.images.update(imageId, {
            refCount: existingImage.refCount + 1,
          });
          console.log(`Incremented refCount for ${imageId}`);
        } else {
          await db.images.put({ id: imageId, file: file, refCount: 1 });
          console.log(`Added new image ${imageId} with refCount of 1`);
        }
        setArt(imageId);
      } catch (err) {
        console.error("Could not save image to Dexie:", err);
      }
    }
  };

  /*
   * Cleanup Function for artPreviewURL
   */
  useEffect(() => {
    return () => {
      if (artPreviewURL) {
        URL.revokeObjectURL(artPreviewURL);
      }
    };
  }, [artPreviewURL]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Add New Song</h3>

        <label htmlFor="artInput">Change Art</label>
        <input
          id="artInput"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        {art && (
          <img src={artPreviewURL} width={"50%"} alt="Album art preview"></img>
        )}
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
