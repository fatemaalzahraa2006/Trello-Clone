// Grey placeholder list shown while a board's lists are loading.
export default function ListSkeleton({ cards = 2 }) {
  return (
    <div className="list list-skeleton" aria-hidden="true">
      <div className="skeleton-bar skeleton-title" />
      {Array.from({ length: cards }, (_, index) => (
        <div key={index} className="skeleton-bar skeleton-card" />
      ))}
    </div>
  );
}
