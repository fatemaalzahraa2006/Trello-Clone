import { useEffect } from "react";
import { X } from "lucide-react";
import { useBoard } from "../context/BoardContext";
import "./CardModal.css";

export default function CardModal({ cardId, onClose }) {
  const { cards } = useBoard();
  const card = cards.find((c) => c.id === cardId);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!card) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <h2>{card.title}</h2>
        <p className="modal-note">
          Placeholder modal. M5 will replace this with the real card details.
        </p>
      </div>
    </div>
  );
}