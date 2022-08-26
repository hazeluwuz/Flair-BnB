import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import "./SignupFormModal.css";
function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="signup-button" onClick={() => setShowModal(true)}>
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="signup-modal-exit-button-div">
            <button
              onClick={() => setShowModal(false)}
              className="signup-modal-exit-button"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="signup-modal-header">
            <div className="signup-modal-h3-container">
              <h1 className="signup-modal-header-text">
                <div>Sign Up</div>
              </h1>
            </div>
          </div>
          <div className="signup-modal-form">
            <div className="signup-modal-greeting">
              <h3>Welcome to FlairBnB</h3>
            </div>
            <SignupForm />
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
