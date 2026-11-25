import Modal from "../common/modal";
import Button from "../common/button";

export default function DeleteListModal({ list, isOpen, onCancel, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete list?">
      <p>"{list?.title}" and all its cards will be deleted. This can't be undone.</p>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete list</Button>
      </div>
    </Modal>
  );
}
