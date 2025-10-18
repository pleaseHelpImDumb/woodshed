import SongCard from "./SongCard";

function SongGallery({
  songs,
  gridSize,
  cardHeight,
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
    alignItems: "start",
  };

  return (
    <>
      {songs.length === 0 ? (
        <p className="general-msg">{message}</p>
      ) : (
        <div className="songGrid" style={gridStyle}>
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              markCompleted={markCompleted}
              gridSize={gridSize}
              cardHeight={cardHeight}
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
