// One list (column). M4's cards go in the children slot,
// and M4's "Add a card" composer goes in the footer slot.
export default function List({ list, cardCount = 0, children, footer }) {
  return (
    <section className="list">
      <div className="list-header">
        <h2 className="list-title">{list.title}</h2>
        <span className="list-count">{cardCount}</span>
      </div>

      <div className="list-cards">{children}</div>

      <div className="list-footer">
        {footer ?? <button className="add-card-placeholder">+ Add a card</button>}
      </div>
    </section>
  );
}