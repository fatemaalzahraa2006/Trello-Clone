import { useState } from "react";
import Button from "../common/button";

export default function AddListForm({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const close = () => {
    setIsOpen(false);
    setTitle("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Stay open after adding, like Trello, so several lists can be added in a row.
    if (onAdd(title)) setTitle("");
  };

  if (!isOpen) {
    return (
      <button className="add-list-trigger" onClick={() => setIsOpen(true)}>
        + Add another list
      </button>
    );
  }

  return (
    <form className="add-list-form" onSubmit={handleSubmit}>
      <input
        autoFocus
        value={title}
        placeholder="Enter list title..."
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && close()}
      />
      <div className="add-list-actions">
        <Button type="submit">Add list</Button>
        <button
          type="button"
          className="add-list-cancel"
          onClick={close}
          aria-label="Cancel"
        >
          ×
        </button>
      </div>
    </form>
  );
}