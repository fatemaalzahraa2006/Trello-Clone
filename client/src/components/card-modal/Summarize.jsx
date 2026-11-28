import { useState } from "react";
import "./Summarize.css";

export default function Summarize() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [summary, setSummary] = useState("");

  const handleSummarize = () => {
    setStatus("loading");

    // FAKE API call: replace with a real request later
    setTimeout(() => {
      if (Math.random() < 0.3) {
        setStatus("error");
      } else {
        setSummary("The team agreed to finish the search UI by Thursday. Sam will review the schema diagram.");
        setStatus("success");
      }
    }, 1500);
  };

  return (
    <div className="summarize-section">
      {status === "idle" && (
        <button onClick={handleSummarize}>✨ Summarize comments</button>
      )}

      {status === "loading" && <p className="summary-loading">Summarizing...</p>}

      {status === "success" && (
        <div className="summary-panel">
          <h4>AI summary</h4>
          <p>{summary}</p>
          <button onClick={handleSummarize}>Regenerate</button>
        </div>
      )}

      {status === "error" && (
        <div className="summary-error">
          <p>Couldn't generate a summary.</p>
          <button onClick={handleSummarize}>Try again</button>
        </div>
      )}
    </div>
  );
}