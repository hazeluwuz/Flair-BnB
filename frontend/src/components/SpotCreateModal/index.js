import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import SpotCreateForm from "./SpotCreateForm";
import "./SpotCreateModal.css";
function SpotCreateModal() {
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
      <div className="create-spot-button" onClick={() => setShowModal(true)}>
        Host Your Home
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="spot-modal-exit-button-div">
            <button
              onClick={() => setShowModal(false)}
              className="spot-modal-exit-button"
            >
              <i class="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="spot-modal-header">
            <div className="spot-modal-h3-container">
              <h1 className="spot-modal-header-text">
                <div>Create a Spot</div>
              </h1>
            </div>
          </div>
          <div className="spot-modal-form">
            <SpotCreateForm hideModal={hideModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default SpotCreateModal;
