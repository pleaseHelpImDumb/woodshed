import { useState } from "react";

import "./CompletionForm.css";

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
      <h3>Mark as Completed</h3>

      <label htmlFor="completedDate">Completion Date:</label>
      <input
        type="date"
        id="completedDate"
        value={completedDate}
        onChange={(e) => setCompletedDate(e.target.value)}
        required
      />

      <label htmlFor="performanceLink">Performance Video (YouTube):</label>
      <input
        type="url"
        id="performanceLink"
        value={performanceLink}
        onChange={(e) => setPerformanceLink(e.target.value)}
        placeholder="https://youtube.com/..."
      />
      <button type="button" onClick={() => onCancel()}>
        Cancel
      </button>
      <button type="submit">Complete Song</button>
    </form>
  );
}

export default CompletionForm;
