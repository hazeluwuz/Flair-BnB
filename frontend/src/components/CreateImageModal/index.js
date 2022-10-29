import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import CreateImageForm from "./CreateImageForm";
import "./CreateImageModal.css";
function CreateImageModal() {
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="edit-spot-button" onClick={() => setShowModal(true)}>
        Add Image
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="spot-modal-exit-button-div">
            <button
              onClick={() => setShowModal(false)}
              className="spot-modal-exit-button"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="spot-modal-header">
            <div className="spot-modal-h3-container">
              <h1 className="spot-modal-header-text">
                <div>Create an Image</div>
              </h1>
            </div>
          </div>
          <div className="spot-modal-form">
            <CreateImageForm hideModal={hideModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CreateImageModal;
