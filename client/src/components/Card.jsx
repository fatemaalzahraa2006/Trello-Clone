import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock, MessageSquare, Pencil, Trash2 } from "lucide-react";
import "./Card.css";
function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
function getDueState(dueDate, completed) {
  if (completed) return "complete";
  const diff = new Date(dueDate) - new Date();
  if (diff < 0) return "overdue";
  if (diff < 24 * 60 * 60 * 1000) return "soon";
  return "upcoming";
}
export default function Card({ card, onClick, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, disabled: isEditing });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function save() {
    const trimmed = title.trim();
    if (trimmed) onUpdate(card.id, { title: trimmed });
    else setTitle(card.title);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div ref={setNodeRef} style={style} className="card editing">
        <textarea
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              save();
            }
            if (e.key === "Escape") {
              setTitle(card.title);
              setIsEditing(false);
            }
          }}
        />
        <div className="card-edit-actions">
          <button className="card-save" onClick={save}>Save</button>
          <button className="card-delete" onClick={() => onDelete(card.id)}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={"card" + (isDragging ? " card-placeholder" : "")}
      onClick={() => onClick?.(card.id)}
    >
      <button
        className="card-edit-btn"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          setTitle(card.title);
          setIsEditing(true);
        }}
      >
        <Pencil size={14} />
      </button>
      <div className="card-labels">
        {card.labels.map((l) => (
          <span key={l.id} className="label" style={{ background: l.color }} />
        ))}
      </div>
      <p className="card-title">{card.title}</p>
           {(card.dueDate || card.commentCount > 0 || card.assignees.length > 0) && (
        <div className="card-footer">
          {card.dueDate && (
           <span className={"badge due-" + getDueState(card.dueDate, card.completed)}>
            <Clock size={12} /> {card.dueDate}
            </span>
        )}
          {card.commentCount > 0 && (
            <span className="badge"><MessageSquare size={12} /> {card.commentCount}</span>
          )}
          {card.assignees.length > 0 && (
            <div className="card-assignees">
              {card.assignees.map((a) => (
                <span key={a.id} className="avatar" title={a.name}>
                  {getInitials(a.name)}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}