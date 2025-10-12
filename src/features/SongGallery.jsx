import SongCard from "./SongCard";
import "./SongGallery.css";

function SongGallery({ songs, gridSize }) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gap: "20px",
  };

  return (
    <>
      <div className="songGrid" style={gridStyle}>
        {songs.map((song) => (
          <SongCard key={song.id} song={song}></SongCard>
        ))}
      </div>
    </>
  );
}

export default SongGallery;
