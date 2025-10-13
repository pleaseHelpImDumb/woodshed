import "./GalleryFilters.css";

function GalleryFilters({ gridSize, setGridSize }) {
  return (
    <div className="filterWrapper">
      <p>filters</p>
      <label htmlFor="gridSizeInput">Grid Size</label>
      <input
        value={gridSize}
        type="range"
        min="1"
        max="5"
        onChange={(e) => setGridSize(e.target.value)}
      />
      <p>{gridSize}</p>
    </div>
  );
}

export default GalleryFilters;
