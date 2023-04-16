import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./CreateImageForm.css";
import { createImageForSpot, getSpotById } from "../../store/spots";

const imageURLRegex = /\.(jpeg|jpg|png)$/;

function CreateImageForm({ hideModal }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { spotId } = useParams();

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file.size);
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length) return;
    else {
      setErrors([]);
      const imgData = new FormData();
      imgData.append("image", image);
      const res = await dispatch(createImageForSpot(imgData, spotId));
      if (res && res.errors) {
        setErrors(res.errors);
      } else {
        await dispatch(getSpotById(spotId));
        await hideModal();
      }
    }
  };

  useEffect(() => {
    const errors = [];
    if (!image) errors.push("Please upload an image");
    if (image && image.size > 5 * 1024 * 1024) {
      errors.push("Image must be less than 5MB");
    }
    setErrors(errors);
  }, [image]);

  return (
    <form onSubmit={handleSubmit} enctype="multipart/form-data">
      {isSubmitted && Object.values(errors).length > 0 && (
        <ul className="spot_error">
          {Object.values(errors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <div className="spot-input-item">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          placeholder=" "
          onChange={handleImage}
          required
        />
        <label>Upload Image</label>
      </div>
      <button className="spot-modal-submit" type="submit">
        Create Image
      </button>
    </form>
  );
}

export default CreateImageForm;
