import "./Modal.css";

function Modal({ children, formVisible, onClose }) {
  return (
    formVisible && (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  );
}
export default Modal;
