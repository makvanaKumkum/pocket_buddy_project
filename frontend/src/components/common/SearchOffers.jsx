import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchOffers = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    try {
      const res = await axios.get("/states");
      setStates(res.data.data);
    } catch (err) {
      console.log("Failed to fetch states", err);
    }
  };

  const getCityByStateId = async (id) => {
    setSelectedState(id);
    setSelectedCity("");
    setSelectedArea("");
    try {
      const res = await axios.get(`/city/state/${id}`);
      setCities(res.data.data);
      setAreas([]);
    } catch (err) {
      console.log("Failed to fetch cities", err);
    }
  };

  const getAreaByCityId = async (id) => {
    setSelectedCity(id);
    setSelectedArea("");
    try {
      const res = await axios.get(`/area/city/${id}`);
      setAreas(res.data.data);
    } catch (err) {
      console.log("Failed to fetch areas", err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `/offers/location?state=${selectedState}&city=${selectedCity}&area=${selectedArea}`
      );
      setOffers(res.data.data);
      alert("Offers fetched successfully!");
    } catch (err) {
      console.log("Error fetching offers:", err);
      alert("Failed to fetch offers. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">Search Offers by Location</h3>
        </div>
        <div className="card-body">
          <div className="row">
            {/* State Dropdown */}
            <div className="form-group col-md-4">
              <label>Select State</label>
              <select
                className="form-control"
                value={selectedState}
                onChange={(e) => getCityByStateId(e.target.value)}
              >
                <option value="">-- Select State --</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="form-group col-md-4">
              <label>Select City</label>
              <select
                className="form-control"
                value={selectedCity}
                onChange={(e) => getAreaByCityId(e.target.value)}
                disabled={!cities.length}
              >
                <option value="">-- Select City --</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Area Dropdown */}
            <div className="form-group col-md-4">
              <label>Select Area</label>
              <select
                className="form-control"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                disabled={!areas.length}
              >
                <option value="">-- Select Area --</option>
                {areas.map((area) => (
                  <option key={area._id} value={area._id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <button
              className="btn btn-primary btn-block"
              onClick={handleSearch}
            >
              Search Offers
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4"></div>
      {offers.length > 0 ? (
        offers.map((offer, index) => (
          <div key={index} className="card card-outline card-success mb-3">
            <div className="card-header">
              <h5 className="card-title mb-0">{offer.title}</h5>
            </div>
            <div className="card-body">
              {/*  Add Image Display */}
              {offer.image && (
                <img
                  src={`http://localhost:5000/uploads/${offer.image}`}
                  alt={offer.title}
                  className="card-img-top mb-2"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <p className="card-text">{offer.description}</p>
              <p className="text-muted">
                Valid from{" "}
                <strong>
                  {new Date(offer.startDate).toLocaleDateString()}
                </strong>{" "}
                to{" "}
                <strong>{new Date(offer.endDate).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">
          No offers found for this location.
        </div>
      )}
    </div>
  );
};

export default SearchOffers;
