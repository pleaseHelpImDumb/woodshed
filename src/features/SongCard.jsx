import "./SongCard.css";
function SongCard({ song }) {
  return (
    <>
      <div className="cardWrapper">
        <span>
          {song.title} --- {song.artist}
        </span>
        <hr />
        <div>Bottom Info</div>
      </div>
    </>
  );
}

export default SongCard;
