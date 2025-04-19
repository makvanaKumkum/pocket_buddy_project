import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/profile");

        setUserData(res.data); // Load user info into state
      } catch (err) {
        console.log("Failed to fetch user profile", err);
      }
    };

    fetchProfile();
  }, []);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      const updatedProfile = { ...prev, [name]: value };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      return updatedProfile;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => {
        const updatedProfile = {
          ...prev,
          imageFile: file,
          image: URL.createObjectURL(file),
        };
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        return updatedProfile;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);

    if (profile.imageFile) {
      formData.append("image", profile.imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/userProfile", {
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
        <h1>User Profile</h1>
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

export default UserProfile;
