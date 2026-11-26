// Shown when a board has no lists. The add-list form stays next to it.
export default function EmptyBoard() {
  return (
    <div className="empty-board">
      <h2>This board has no lists yet</h2>
      <p>Add your first list to start organizing cards.</p>
    </div>
  );
}