import SongCard from "./SongCard";
import "./SongGallery.css";

function SongGallery({
  songs,
  gridSize,
  markCompleted,
  message,
  deleteSong,
  editSong,
  actionsDisabled,
  onOpenEditModal,
  onOpenDeleteModal,
  onOpenCompleteModal,
}) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gap: "20px",
  };

  return (
    <>
      {songs.length === 0 ? (
        <p>{message}</p>
      ) : (
        <div className="songGrid" style={gridStyle}>
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              markCompleted={markCompleted}
              gridSize={gridSize}
              deleteSong={deleteSong}
              editSong={editSong}
              actionsDisabled={actionsDisabled}
              onOpenEditModal={onOpenEditModal}
              onOpenDeleteModal={onOpenDeleteModal}
              onOpenCompleteModal={onOpenCompleteModal}
            ></SongCard>
          ))}
        </div>
      )}
    </>
  );
}

export default SongGallery;
