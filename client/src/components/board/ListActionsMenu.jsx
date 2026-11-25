import { useEffect, useRef, useState } from "react";

export default function ListActionsMenu({
  onRename,
  onMoveLeft,
  onMoveRight,
  onDelete,
  canMoveLeft,
  canMoveRight,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const run = (action) => () => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="list-menu" ref={menuRef}>
      <button
        className="list-menu-trigger"
        aria-label="List actions"
        onClick={() => setIsOpen((open) => !open)}
      >
        ⋯
      </button>
      {isOpen && (
        <ul className="list-menu-dropdown">
          <li><button onClick={run(onRename)}>Rename</button></li>
          <li><button disabled={!canMoveLeft} onClick={run(onMoveLeft)}>Move left</button></li>
          <li><button disabled={!canMoveRight} onClick={run(onMoveRight)}>Move right</button></li>
          <li><button className="menu-danger" onClick={run(onDelete)}>Delete list</button></li>
        </ul>
      )}
    </div>
  );
}