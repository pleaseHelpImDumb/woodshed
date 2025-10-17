import "./GalleryFilters.css";

function GalleryFilters({
  gridSize,
  setGridSize,
  optionsVisible,
  sorting,
  setSorting,
  cardHeight,
  setCardHeight,
}) {
  return (
    <div className={`gallery-filters ${optionsVisible ? "visible" : "hidden"}`}>
      <h3 className="options-title">Options & Sorting</h3>
      <hr />
      <div className="option-div">
        <label htmlFor="sortBy" className="filter">
          Filter by...
        </label>
        <select
          name="sortBy"
          defaultValue={sorting.key}
          id="sortBy"
          onChange={(e) =>
            setSorting({ key: e.target.value, direction: sorting.direction })
          }
        >
          <option value="title">Title</option>
          <option value="progress">Progress</option>
        </select>
        <label htmlFor="sortDirection" className="filter">
          Sort Direction
        </label>
        <select
          name="sortDirection"
          id="sortDirection"
          defaultValue={sorting.direction}
          onChange={(e) =>
            setSorting({ key: sorting.key, direction: e.target.value })
          }
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <hr />
      <div className="options-div">
        <label className="options-label" htmlFor="gridSizeInput">
          Grid Size: {gridSize}
        </label>
        <input
          id="gridSizeInput"
          className="progress-input"
          value={gridSize}
          type="range"
          min="1"
          max="5"
          onChange={(e) => setGridSize(e.target.value)}
        />
      </div>
      <div className="options-div">
        <label className="options-label" htmlFor="cardHeightInput">
          Minimum Card Height: {cardHeight}
        </label>
        <input
          id="cardHeightInput"
          className="progress-input"
          value={cardHeight}
          type="range"
          min="0"
          max="1000"
          step="10"
          onChange={(e) => setCardHeight(e.target.value)}
        />
      </div>
    </div>
  );
}

export default GalleryFilters;
