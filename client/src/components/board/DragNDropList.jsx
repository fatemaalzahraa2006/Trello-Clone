import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import List from "./List";

// Wraps a List so it can be dragged and sorted horizontally.
export default function DragNDropList({ list, children, ...listProps }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `list-${list.id}`,
    data: { type: "list", listId: list.id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sortable-list${isDragging ? " is-dragging" : ""}`}
    >
      <List
        list={list}
        dragHandle={{ ref: setActivatorNodeRef, attributes, listeners }}
        {...listProps}
      >
        {children}
      </List>
    </div>
  );
}