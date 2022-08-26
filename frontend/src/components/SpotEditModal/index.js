import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import SpotEditForm from "./SpotEditForm";
import "./SpotEditModal.css";
function SpotEditModal({ spot }) {
  const [showModal, setShowModal] = useState(false);
  const spots = useSelector((state) => state.spots);
  // useEffect(() => {
  //   setShowModal(false);
  // }, [spots]);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="edit-spot-button" onClick={() => setShowModal(true)}>
        Edit
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
                <div>Edit a Spot</div>
              </h1>
            </div>
          </div>
          <div className="spot-modal-form">
            <SpotEditForm hideModal={hideModal} spot={spot} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default SpotEditModal;
