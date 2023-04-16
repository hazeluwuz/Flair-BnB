import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import ReviewEdit from "./ReviewEdit";
import "./ReviewEditModal.css";
function ReviewEditModal({ curReview }) {
  const reviews = useSelector((state) => state.reviews);
  useEffect(() => {
    setShowModal(false);
  }, [reviews]);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="review-button" onClick={() => setShowModal(true)}>
        Edit Review
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
              <h1 className="review-modal-header-text">
                <div>Edit a Review</div>
              </h1>
            </div>
          </div>
          <div className="review-modal-form">
            <ReviewEdit curReview={curReview} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ReviewEditModal;
