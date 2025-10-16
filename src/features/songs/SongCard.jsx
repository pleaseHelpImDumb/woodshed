import { useState } from "react";

import "./SongCard.css";

function SongCard({
  song,
  markCompleted,
  actionsDisabled,
  onOpenEditModal,
  onOpenDeleteModal,
  onOpenCompleteModal,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardStyle = {
    backgroundImage: song.art
      ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0,0,0,0.3)), url(${song.art})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
              )}
            </div>
          )}
          <div>{song.notes}</div>
        </div>
        {!actionsDisabled && (
          <div className="card-actions">
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
