import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./DeleteForm.css";
import { createNewReview, deleteReviewById } from "../../store/reviews";
import { deleteSpotById } from "../../store/spots";

function DeleteForm({ item, setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (item.type === "review") {
      await dispatch(deleteReviewById(item.data.id, item.data.spotId));
    } else if (item.type === "spot") {
      await dispatch(deleteSpotById(item.data.id));
      history.push("/");
    }
    setShowModal(false);
  };

  return (
    <div className="modal-delete-warning">
      <h3 className="warning-text">
        {`You are about to remove this ${item.type}. Are you sure you wish to proceed?`}
      </h3>
      <div className="modal-warning-actions">
        <button
          className="cancel-delete"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <div className="confirm-delete" onClick={handleDelete}>
          Yes, remove {item.type}
        </div>
      </div>
    </div>
  );
}

export default DeleteForm;
