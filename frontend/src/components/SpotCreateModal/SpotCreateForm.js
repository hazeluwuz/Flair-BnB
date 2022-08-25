import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./SpotCreateForm.css";
import { createNewSpot } from "../../store/spots";

function SpotCreateForm() {
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
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    const newSpot = await dispatch(createNewSpot(data)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    history.push(`/spots/${newSpot.id}`);
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
          placeholder="Spot Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="State"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Latitude"
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Longitude"
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </div>
      {/* <div className="spot-input-item">
        <input
          placeholder="Spot Image"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div> */}
      <button className="spot-modal-submit" type="submit">
        Create Spot
      </button>
    </form>
  );
}

export default SpotCreateForm;
