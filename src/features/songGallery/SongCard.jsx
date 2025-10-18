import React, { useState, useEffect } from "react";
import { db } from "../../db";
import "./SongCard.css";

function SongCard({
  song,
  markCompleted,
  actionsDisabled,
  onOpenEditModal,
  onOpenDeleteModal,
  onOpenCompleteModal,
  gridSize,
  cardHeight,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [textColor, setTextColor] = useState("black");

  const sizeMap = {
    1: 40,
    2: 24,
    3: 24,
    4: 22,
    5: 20,
  };
  const notesSizeMap = {
    1: 34,
    2: 18,
    3: 18,
    4: 16,
    5: 14,
  };
  const outlineColor = textColor === "white" ? "black" : "white";
  textColor === "white" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.5)";
  const cardStyle = {
    backgroundImage: imageUrl
      ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0,0,0,0.3)), url(${imageUrl})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontSize: `${sizeMap[gridSize]}px`,
    color: textColor,

    WebkitTextStroke: `3px ${outlineColor}`,
    paintOrder: "stroke fill",

    minHeight: `${cardHeight}px`,
  };

  const buttonStyle = {
    WebkitTextStroke: `0px ${outlineColor}`,
    paintOrder: "stroke fill",
  };
  const notesStyle = {
    fontSize: `${notesSizeMap[gridSize]}px`,
  };
  const notesParagraphStyle = {
    overflowWrap: "break-word",
    wordWrap: "break-word",
  };
  const progressBar = (progress) => {
    let t = "";
    for (let i = 0; i < 5; i++) {
      if (i < progress) {
        t = t.concat("★");
      } else if (i >= progress) {
        t = t.concat("☆");
      }
    }
    return t;
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("/embed/")) return url;
    const videoId = url.split("v=")[1]?.split("&")[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  };

  /*
   * This useEffect does two things:
   * 1: Analyzes the song card backgroundimage using canvas to
   *    determine color to help set font color for contrast (AI helped with this!)
   * 2: Loads the image from the DB
   */
  useEffect(() => {
    let objectUrl = null;

    const analyzeAndSetColor = (url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r = 0,
          g = 0,
          b = 0;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        const pixelCount = data.length / 4;
        const avgBrightness =
          (r / pixelCount) * 0.299 +
          (g / pixelCount) * 0.587 +
          (b / pixelCount) * 0.114;

        if (avgBrightness > 128) {
          setTextColor("black");
        } else {
          setTextColor("white");
        }
      };
      img.onerror = () => {
        console.error("Image failed to load for color analysis.");
        setTextColor("white");
      };
    };

    const loadImage = async () => {
      if (song.art) {
        try {
          const imageRecord = await db.images.get(song.art);
          if (imageRecord && imageRecord.file) {
            objectUrl = URL.createObjectURL(imageRecord.file);
            setImageUrl(objectUrl);
            analyzeAndSetColor(objectUrl);
          }
        } catch (err) {
          console.error("Could not load image from Dexie", err);
        }
      } else {
        setImageUrl(null);
        setTextColor("black");
      }
    };

    loadImage();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [song.art]);

  return (
    <>
      <div
        className="song-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={cardStyle}
      >
        <div className="card-content">
          <span>{song.title}</span>
          <hr />
          {song.artist && (
            <div>
              <p>{song.artist}</p>
              <hr />
            </div>
          )}

          <div>{progressBar(song.progress)}</div>
          {song.markedCompleted && (
            <div>
              <p>Completed: {song.completedDate}</p>
              {song.performanceLink && (
                <div>
                  <hr />
                  <iframe
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      border: "solid",
                      borderRadius: "8px",
                    }}
                    src={getEmbedUrl(song.performanceLink)}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
            </div>
          )}
          {song.notes && (
            <div style={notesStyle}>
              <hr />
              <p>Notes:</p>
              <p style={notesParagraphStyle}>{song.notes}</p>
            </div>
          )}
        </div>
        {!actionsDisabled && (
          <div className="card-actions" style={buttonStyle}>
            {song.progress == 5 && !song.markedCompleted && isHovered && (
              <button type="button" onClick={() => onOpenCompleteModal(song)}>
                Move to Completed?
              </button>
            )}
            {song.markedCompleted && isHovered && (
              <button type="button" onClick={() => markCompleted(song.id)}>
                Move back to Library
              </button>
            )}
            {isHovered && (
              <button type="button" onClick={() => onOpenEditModal(song)}>
                Edit
              </button>
            )}
            {isHovered && (
              <button type="button" onClick={() => onOpenDeleteModal(song)}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SongCard;
