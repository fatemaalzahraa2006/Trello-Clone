import { useRef, useState } from "react";
import ListActionsMenu from "./ListActionsMenu";

export default function ListHeader({
  list,
  cardCount,
  onRename,
  onDeleteRequest,
  onMoveLeft,
  onMoveRight,
  canMoveLeft,
  canMoveRight,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const cancelled = useRef(false);

  const startEditing = () => {
    cancelled.current = false;
    setTitle(list.title);
    setIsEditing(true);
  };

  const save = () => {
    // An empty title is rejected by renameList, so the old title stays.
    if (!cancelled.current) onRename(list.id, title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.currentTarget.blur();
    if (e.key === "Escape") {
      cancelled.current = true;
      setIsEditing(false);
    }
  };

  return (
    <div className="list-header">
      {isEditing ? (
        <input
          className="list-title-input"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={(e) => e.target.select()}
          onBlur={save}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h2 className="list-title" onClick={startEditing}>
          {list.title}
        </h2>
      )}
      <span className="list-count">{cardCount}</span>
      <ListActionsMenu
        onRename={startEditing}
        onMoveLeft={onMoveLeft}
        onMoveRight={onMoveRight}
        onDelete={onDeleteRequest}
        canMoveLeft={canMoveLeft}
        canMoveRight={canMoveRight}
      />
    </div>
  );
}