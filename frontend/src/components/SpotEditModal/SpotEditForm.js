import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SpotEditForm.css";
import { editSpot, editSpotById } from "../../store/spots";

function SpotEditForm({ spot, hideModal }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [description, setDescription] = useState(spot?.description);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [errors, setErrors] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    if (name) data.name = name;
    if (price) data.price = price;
    if (lat) data.lat = lat;
    if (lng) data.lng = lng;
    if (description) data.description = description;
    if (address) data.address = address;
    if (city) data.city = city;
    if (state) data.state = state;
    if (country) data.country = country;

    setErrors([]);
    await dispatch(editSpotById(data, spot.id)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="spot_error">
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="spot-input-item">
        <input
          placeholder=" "
          type="text"
          maxlength="255"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label>Name</label>
      </div>
      <div className="spot-input-item">
        <input
          placeholder=" "
          className="number-input"
          type="number"
          min={0}
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Price</label>
      </div>
      <div className="spot-input-item">
        <input
          placeholder=" "
          type="text"
          maxlength="255"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Address</label>
      </div>
      <div className="spot-input-item">
        <input
          placeholder=" "
          type="text"
          maxlength="255"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
        <label>City</label>
      </div>
      <div className="spot-input-item">
        <input
          placeholder=" "
          type="text"
          maxlength="255"
          value={state}
          required
          onChange={(e) => setState(e.target.value)}
        />
        <label>State</label>
      </div>
      <div className="spot-input-item">
        <input
          placeholder=" "
          type="text"
          maxlength="255"
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Country</label>
      </div>
      <div className="spot-input-item">
        <input
          placeholder=" "
          type="number"
          className="number-input"
          required
          step="any"
          min="-90"
          max="90"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <label>Latitude</label>
      </div>
      <div className="spot-input-item">
        <input
          placeholder=" "
          type="number"
          className="number-input"
          required
          min="-180"
          max="180"
          step="any"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <label>Longitude</label>
      </div>{" "}
      <div className="spot-input-item">
        <input
          placeholder=" "
          type="text"
          maxlength="255"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Description</label>
      </div>
      <button className="spot-modal-submit" type="submit">
        Edit Spot
      </button>
    </form>
  );
}

export default SpotEditForm;
