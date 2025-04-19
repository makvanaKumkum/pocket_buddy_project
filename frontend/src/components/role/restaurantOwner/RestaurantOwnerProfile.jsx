import React, { useState, useEffect } from "react";

const RestaurantOwnerProfile = () => {
  // State to hold the profile data
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    restaurantName: "",
    restaurantLocation: "",
    restaurantType: "",
    image: null,
  });

  // Load the profile data from localStorage on component mount
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (storedProfile) {
      setProfile(storedProfile); // Set the profile from localStorage if available
    }
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      const updatedProfile = { ...prev, [name]: value };
      localStorage.setItem("profile", JSON.stringify(updatedProfile)); // Save to localStorage
      return updatedProfile;
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => {
        const updatedProfile = {
          ...prev,
          imageFile: file,
          image: URL.createObjectURL(file),
        };
        localStorage.setItem("profile", JSON.stringify(updatedProfile)); // Save to localStorage
        return updatedProfile;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("restaurantName", profile.restaurantName);
    formData.append("restaurantLocation", profile.restaurantLocation);
    formData.append("restaurantType", profile.restaurantType);
    if (profile.imageFile) {
      formData.append("image", profile.imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response:", data);
      alert("Profile saved successfully!");
    } catch (err) {
      console.log("Error submitting profile:", err);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="content-wrapper p-3">
      <section className="content-header">
        <h1>Restaurant Owner Profile</h1>
      </section>

      <section className="content">
        <div className="card card-primary">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <img
                  src={profile.image || "/dist/img/avatar5.png"}
                  alt="Profile"
                  className="profile-user-img img-fluid img-circle"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control-file"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Restaurant Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="restaurantName"
                  value={profile.restaurantName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Restaurant Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="restaurantLocation"
                  value={profile.restaurantLocation}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Restaurant Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="restaurantType"
                  value={profile.restaurantType}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantOwnerProfile;
