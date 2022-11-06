import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import DeleteForm from "./DeleteForm";
import "./DeleteModal.css";
function DeleteModal({ item }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="review-button" onClick={() => setShowModal(true)}>
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="review-modal-exit-button-div">
            <button
              onClick={() => setShowModal(false)}
              className="review-modal-exit-button"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="review-modal-header">
            <div className="review-modal-h3-container">
              <h1 className="delete-modal-header">
                <div>Warning</div>
              </h1>
            </div>
          </div>
          <div className="review-modal-form">
            <DeleteForm item={item} setShowModal={setShowModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;
