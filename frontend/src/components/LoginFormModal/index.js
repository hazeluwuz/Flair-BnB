import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>
        Log In
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="login-modal-exit-button-div">
            <button
              onClick={() => setShowModal(false)}
              className="login-modal-exit-button"
            >
              <i class="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="login-modal-header">
            <div />
            <div className="login-modal-h3-container">
              <h1 className="login-modal-header-text">
                <div>Log in</div>
              </h1>
            </div>
            <div />
          </div>
          <div className="login-modal-form">
            <div className="login-modal-greeting">
              <h3>Welcome to Flairebnb</h3>
            </div>
            <LoginForm />
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
