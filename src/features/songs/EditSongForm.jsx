import React, { useState, useEffect } from "react";
import { db } from "../../db";
import "./Form.css";

function EditSongForm({ songToEdit, onFormSubmit, onCancel }) {
  const [title, setTitle] = useState(songToEdit.title);
  const [artist, setArtist] = useState(songToEdit.artist);
  const [progress, setProgress] = useState(songToEdit.progress);
  const [notes, setNotes] = useState(songToEdit.notes);
  const [performanceLink, setPerformanceLink] = useState(
    songToEdit.performanceLink
  );
  const [art, setArt] = useState(songToEdit.art);
  const [artPreviewURL, setArtPreviewURL] = useState(null);

  useEffect(() => {
    const loadInitialPreview = async () => {
      if (songToEdit.art) {
        try {
          const imageRecord = await db.images.get(songToEdit.art);
          if (imageRecord && imageRecord.file) {
            const objectUrl = URL.createObjectURL(imageRecord.file);
            setArtPreviewURL(objectUrl);
          }
        } catch (err) {
          console.error("Could not load initial preview image:", err);
        }
      }
    };
    loadInitialPreview();
  }, [songToEdit.art]);

  useEffect(() => {
    return () => {
      if (artPreviewURL) {
        URL.revokeObjectURL(artPreviewURL);
      }
    };
  }, [artPreviewURL]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (songToEdit.art && art !== songToEdit.art) {
      console.log(`Deleting old image: ${songToEdit.art}`);
      try {
        await db.images.delete(songToEdit.art);
      } catch (err) {
        console.error("Failed to delete old image:", err);
      }
    }

    onFormSubmit({
      ...songToEdit,
      title,
      artist,
      progress,
      notes,
      performanceLink,
      art,
    });
  };

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
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Edit Song</h3>
        <label htmlFor="artInput">Change Art</label>
        {art && (
          <img src={artPreviewURL} width={"50%"} alt="Album art preview"></img>
        )}
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
        <button
          type="button"
          className="cancel-button"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default EditSongForm;
