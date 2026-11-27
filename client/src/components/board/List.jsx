import ListHeader from "./ListHeader";

// One list (column). M4's cards go in the children slot,
// and M4's "Add a card" composer goes in the footer slot.
export default function List({ list, cardCount = 0, actions,dragHandle, children, footer }) {
  return (
    <section className="list">
      <ListHeader list={list} cardCount={cardCount} dragHandle={dragHandle} {...actions} />

      <div className="list-cards">{children}</div>

      <div className="list-footer">
        {footer ?? <button className="add-card-placeholder">+ Add a card</button>}
      </div>
    </section>
  );
}
