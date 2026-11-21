import { useState } from "react";
import { Plus, X } from "lucide-react";
import "./AddCard.css";

export default function AddCard({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  function submit() {
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  }

  function cancel() {
    setTitle("");
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <button className="add-card-btn" onClick={() => setIsOpen(true)}>
        <Plus size={16} /> Add a card
      </button>
    );
  }

  return (
    <div className="add-card-form">
      <textarea
        autoFocus
        placeholder="Enter a title for this card..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
          if (e.key === "Escape") cancel();
        }}
      />
      <div className="add-card-actions">
        <button className="add-card-submit" onClick={submit}>Add card</button>
        <button className="add-card-cancel" onClick={cancel}><X size={18} /></button>
      </div>
    </div>
  );
}