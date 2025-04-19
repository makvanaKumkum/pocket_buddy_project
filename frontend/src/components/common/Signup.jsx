import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../assets/login.css";

export const Signup = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    try {
      const res = await axios.get("/roles");
      setRoles(res.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user", data);

      if (res.status === 201) {
        alert("User created successfully");
        navigate("/login");
      } else {
        alert("User not created");
      }
    } catch (error) {
      alert("Signup Failed");
    }
  };

  const validationSchema = {
    firstName: { required: "First name is required" },
    lastName: { required: "Last name is required" },
    age: {
      required: "Age is required",
      valueAsNumber: true,
    },
    gender: { required: "Gender is required" },
    contact: {
      required: "Contact number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Contact number must be 10 digits",
      },
    },
    emailValidator: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    passwordValidator: {
      required: { value: true, message: "Password is required" },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    roleValidator: {
      required: { value: true, message: "Role is required" },
    },
  };

  return (
    <div className="login">
      <div className="login-card">
        <div className="brand">
          <div className="brand-logo"></div>
          <h1>CREATE ACCOUNT</h1>
          <p>Sign up to get started</p>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", validationSchema.firstName)}
              placeholder="Enter first name"
            />
            <span style={{ color: "red" }}>{errors.firstName?.message}</span>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", validationSchema.lastName)}
              placeholder="Enter last name"
            />
            <span style={{ color: "red" }}>{errors.lastName?.message}</span>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              {...register("age", validationSchema.age)}
              placeholder="Enter age"
            />
            <span style={{ color: "red" }}>{errors.age?.message}</span>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              {...register("gender", validationSchema.gender)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <span style={{ color: "red" }}>{errors.gender?.message}</span>
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact No.</label>
            <input
              type="number"
              id="contact"
              {...register("contact", validationSchema.contact)}
              placeholder="Enter contact number"
            />
            <span style={{ color: "red" }}>{errors.contact?.message}</span>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", validationSchema.emailValidator)}
              placeholder="Enter email"
            />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", validationSchema.passwordValidator)}
              placeholder="Enter password"
            />
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          </div>
          <div className="form-group">
            <label htmlFor="roleId">Role</label>
            <select
              id="roleId"
              {...register("roleId", validationSchema.roleValidator)}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{errors.roleId?.message}</span>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <div className="signup-link">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};
