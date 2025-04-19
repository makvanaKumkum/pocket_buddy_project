import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddOffer = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/states");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get(`/city/state/${id}`);
    setCities(res.data.data);
  };
  const getAreaByCityId = async (id) => {
    const res = await axios.get(`/area/city/${id}`);
    setAreas(res.data.data);
  };

  // const submitHandler = async (data) => {
  //   data.userId = localStorage.getItem("id");
  //   console.log(data);
  //   console.log(data.image[0]); //array -->0th index access..

  // const formData = new FormData();
  // formData.append("title", data.title);
  // formData.append("description", data.description);
  // formData.append("active", data.active);
  // formData.append("latitude", data.latitude);
  // formData.append("longitude", data.longitude);
  // formData.append("stateId", data.stateId);
  // formData.append("cityId", data.cityId);
  // formData.append("areaId", data.areaId);
  // formData.append("image", data.image[0]);
  // formData.append("userId", data.userId);

  const submitHandler = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    const res = await axios.post("/offer/addWithFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res); //
    if (res.status === 201) {
      alert("Offer Added!");
      navigate("/restaurantOwner/addOffer");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Add Offer</h2>
            <form
              onSubmit={handleSubmit(submitHandler)}
              encType="multipart/form-data"
            >
              <div className="mb-3">
                <label className="form-label"> Title </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("title")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label"> Description </label>
                <select className="form-select" {...register("description")}>
                  <option value="Breakfast">Breakfast </option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label"> Active </label>
                <select className="form-select" {...register("active")}>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("startDate", { required: true })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("endDate", { required: true })}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Latitude</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("latitude")}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Longitude</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("longitude")}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Select State</label>
                <select
                  className="form-select"
                  {...register("stateId", { required: true })}
                  onChange={(e) => {
                    const stateId = e.target.value;
                    getCityByStateId(stateId);
                  }}
                >
                  <option value="">-- Select State --</option>
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Select City</label>
                <select
                  className="form-select"
                  {...register("cityId", { required: true })}
                  onChange={(e) => {
                    const cityId = e.target.value;
                    getAreaByCityId(cityId);
                  }}
                >
                  <option value="">-- Select City --</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Select Area</label>
                <select
                  className="form-select"
                  {...register("areaId", { required: true })}
                >
                  <option value="">-- Select Area --</option>
                  {areas.map((area) => (
                    <option key={area._id} value={area._id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Select file</label>
                <input type="file" {...register("image")}></input>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
