import { useState } from "react";

function CompletionForm({ onSubmit, onCancel }) {
  const [completedDate, setCompletedDate] = useState("");
  const [performanceLink, setPerformanceLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ completedDate, performanceLink });
    setCompletedDate("");
    setPerformanceLink("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="form-title">Mark as Completed</h3>
      <hr className="form-separator" />
      <div className="form-field">
        <label htmlFor="completedDate">Completion Date:</label>
        <input
          type="date"
          id="completedDate"
          value={completedDate}
          onChange={(e) => setCompletedDate(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="performanceLink">Performance Video Link:</label>
        <input
          type="url"
          id="performanceLink"
          value={performanceLink}
          onChange={(e) => setPerformanceLink(e.target.value)}
          placeholder="https://youtube.com/..."
        />
      </div>
      <hr className="form-separator" />

      <button
        className="cancel-button"
        type="button"
        onClick={() => onCancel()}
      >
        Cancel
      </button>
      <button type="submit" className="submit-button">
        Complete Song
      </button>
    </form>
  );
}

export default CompletionForm;
