import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./SpotCreateForm.css";
import { createImageForSpot, createNewSpot } from "../../store/spots";

const imageURLRegex = /\.(jpeg|jpg|png)$/;

function SpotCreateForm({ hideModal }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const inputErrors = [];
    if (!name.length) inputErrors.push("Name is required");
    if (!price) inputErrors.push("Price is required");
    if (!lat) inputErrors.push("Latitude is required");
    if (!lng) inputErrors.push("Longitude is required");
    if (!description.length) inputErrors.push("Description is required");
    if (!address.length) inputErrors.push("Address is required");
    if (!city.length) inputErrors.push("City is required");
    if (!state.length) inputErrors.push("State is required");
    if (!country.length) inputErrors.push("Country is required");
    if (!image) inputErrors.push("Image is required");
    if (image && image.size > 5 * 1024 * 1024) {
      inputErrors.push("Image must be less than 5MB");
    }
    setErrors(inputErrors);
  }, [
    name,
    price,
    lat,
    lng,
    description,
    address,
    city,
    state,
    country,
    image,
    // imageUrl,
  ]);

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
      const data = {
        name,
        price,
        lat,
        lng,
        description,
        address,
        city,
        state,
        country,
      };
      setErrors([]);
      const imgData = new FormData();
      imgData.append("image", image);
      imgData.append("previewImage", true);
      const newSpot = await dispatch(createNewSpot(data)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      const res = await dispatch(createImageForSpot(imgData, newSpot.id));
      if (res && res.errors) {
        setErrors(res.errors);
        setIsSubmitted(false);
      } else if (newSpot) {
        hideModal();
        history.push(`/spots/${newSpot.id}`);
      }
    }
  };

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
          type="text"
          placeholder=" "
          value={name}
          maxlength="50"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Spot Name</label>
      </div>
      <div className="spot-input-item">
        <input
          className="number-input"
          type="number"
          placeholder=" "
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Price</label>
      </div>
      <div className="spot-input-item">
        <input
          maxlength="255"
          type="text"
          placeholder=" "
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>Address</label>
      </div>
      <div className="spot-input-item">
        <input
          maxlength="255"
          type="text"
          placeholder=" "
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label>City</label>
      </div>
      <div className="spot-input-item">
        <input
          maxlength="255"
          placeholder=" "
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label>State</label>
      </div>
      <div className="spot-input-item">
        <input
          maxlength="255"
          placeholder=" "
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <label>Country</label>
      </div>
      <div className="spot-input-item">
        <input
          type="number"
          placeholder=" "
          className="number-input"
          value={lat}
          min="-90"
          max="90"
          step="any"
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <label>Latitude</label>
      </div>
      <div className="spot-input-item">
        <input
          type="number"
          placeholder=" "
          className="number-input"
          value={lng}
          min="-180"
          max="180"
          step="any"
          onChange={(e) => setLng(e.target.value)}
          required
        />
        <label>Longitude</label>
      </div>
      <div className="spot-input-item">
        <input
          name="image"
          accept="image/*"
          type="file"
          id="file-input"
          placeholder=" "
          // value={image}
          onChange={handleImage}
          required
        />
        <label id="file-input-label" for="file-input">
          Preview Image
        </label>
      </div>
      <div className="spot-input-item">
        <input
          className="spot-description-input hide-scroll"
          type="text"
          placeholder=" "
          maxlength="255"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Description</label>
      </div>
      <button className="spot-modal-submit" type="submit">
        Create Spot
      </button>
    </form>
  );
}

export default SpotCreateForm;
