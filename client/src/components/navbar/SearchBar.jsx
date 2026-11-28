import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { useDebounce } from "../../hooks/useDebounce";
import * as mockData from "../../mockData";

const boardsData = mockData.mockBoards || [];
const cardsData = mockData.mockCards || [];
const listsData = mockData.mockLists || [];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const debounced = useDebounce(query, 300);

  const boardIdOfCard = (card) =>
    card.boardId ?? listsData.find((l) => l.id === card.listId)?.boardId;

  const goToBoard = (boardId, cardId) => {
    if (boardId == null) {
      console.warn("Search result has no board id");
      return;
    }
    const path = "/boards/" + boardId + (cardId != null ? "?card=" + cardId : "");
    navigate(path); 
    setOpen(false);
    setQuery("");
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const q = debounced.trim().toLowerCase();
  const isSearching = query.trim().toLowerCase() !== q; // typing, debounce not done yet

  const boards = q ? boardsData.filter((b) => b.title.toLowerCase().includes(q)) : [];
  const cards = q ? cardsData.filter((c) => c.title.toLowerCase().includes(q)) : [];
  const noResults = q && !isSearching && boards.length === 0 && cards.length === 0;

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>

      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        placeholder="Search boards and cards..."
      />

      {open && query.trim() && (
        <div className="search-dropdown">
          {isSearching && <div className="result-empty">Searching...</div>}

          {!isSearching && boards.length > 0 && <h4>Boards</h4>}
          {!isSearching && boards.map((b) => (
            <div key={b.id} className="result-row" onClick={() => goToBoard(b.id)}>
              {b.title}
            </div>
          ))}

          {!isSearching && cards.length > 0 && <h4>Cards</h4>}
          {!isSearching && cards.map((c) => (
            <div key={c.id} className="result-row" onClick={() => goToBoard(boardIdOfCard(c), c.id)}>
              {c.title}
            </div>
          ))}

          {noResults && <div className="result-empty">No results</div>}
        </div>
      )}
    </div>
  );
}