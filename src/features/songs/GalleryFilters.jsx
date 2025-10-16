import "./GalleryFilters.css";

function GalleryFilters({
  gridSize,
  setGridSize,
  optionsVisible,
  sorting,
  setSorting,
}) {
  return (
    <div className={`gallery-filters ${optionsVisible ? "visible" : "hidden"}`}>
      <h3 className="options-title">Options & Sorting</h3>
      <hr />
      <div className="option-div">
        <span className="filter">Filter by...</span>
        <select
          name=""
          defaultValue={sorting}
          id=""
          onChange={(e) =>
            setSorting({ key: e.target.value, direction: sorting.direction })
          }
        >
          <option value="title">Title</option>
          <option value="progress">Progress</option>
        </select>
        <select
          name=""
          id=""
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
          Grid Size - {gridSize}
        </label>
        <input
          className="progress-input"
          value={gridSize}
          type="range"
          min="1"
          max="5"
          onChange={(e) => setGridSize(e.target.value)}
        />
      </div>
    </div>
  );
}

export default GalleryFilters;
