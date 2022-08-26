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
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();

  // useEffect(() => {
  //   const inputErrors = [];
  //   if (!name.length) inputErrors.push("Name is required");
  //   if (!price) inputErrors.push("Price is required");
  //   if (!lat) inputErrors.push("Latitude is required");
  //   if (!lng) inputErrors.push("Longitude is required");
  //   if (!description.length) inputErrors.push("Description is required");
  //   if (!address.length) inputErrors.push("Address is required");
  //   if (!city.length) inputErrors.push("City is required");
  //   if (!state.length) inputErrors.push("State is required");
  //   if (!country.length) inputErrors.push("Country is required");
  //   setErrors(inputErrors);
  // }, [name, price, lat, lng, description, address, city, state, country]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length) return;
    if (!imageUrl.split("?")[0].match(imageURLRegex)) {
      setErrors([
        "Preview url must end in valid img extension! [png/jpg/jpeg]",
      ]);
    } else {
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
      const imgData = {
        previewImage: true,
        url: imageUrl,
      };
      setErrors([]);
      const newSpot = await dispatch(createNewSpot(data)).catch(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });
      if (imageUrl !== "" && newSpot) {
        await dispatch(createImageForSpot(imgData, newSpot.id));
      }
      hideModal();
      history.push(`/spots/${newSpot.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isSubmitted && errors.length > 0 && (
        <ul className="spot_error">
          {Object.values(errors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <div className="spot-input-item">
        <input
          placeholder="Spot Name"
          type="text"
          value={name}
          maxlength="50"
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
      <div className="spot-input-item">
        <input
          placeholder="Preview Image URL ex: png/jpg/jpeg"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      <button className="spot-modal-submit" type="submit">
        Create Spot
      </button>
    </form>
  );
}

export default SpotCreateForm;
