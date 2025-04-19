import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationSchema = {
    emailValidator: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    passwordValidator: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  };

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      const user = res.data?.data;

      localStorage.setItem("user", JSON.stringify(user)); // Store entire user object

      if (user?.roleId?.name) {
        const role = user.roleId.name;
        localStorage.setItem("id", user._id);
        localStorage.setItem("role", role);

        if (role === "User") navigate("/user");
        else if (role === "Admin") navigate("/admin");
        else if (role === "Restaurant Owner") navigate("/restaurantOwner");
        else alert("Unknown role");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        "Login Failed: " + (error.response?.data?.message || "Server error")
      );
    }
  };

  const forgotPasswordHandler = async () => {
    try {
      const res = await axios.post("/user/forgotPassword?email=" + email);
      alert(res.data?.message || "Reset link sent if email exists.");
    } catch (err) {
      alert("Error sending reset link.");
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <div className="brand">
          <div className="brand-logo"></div>
          <h1>LOGIN</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              id="email"
              {...register("email", validationSchema.emailValidator)}
              placeholder="Enter email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              {...register("password", validationSchema.passwordValidator)}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="extra-options">
          <button
            onClick={() => setIsForgotPasswordClicked(true)}
            className="forgot-password-btn"
          >
            Forgot Password?
          </button>
        </div>

        {isForgotPasswordClicked && (
          <div className="forgot-password-section">
            <label>Enter your email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <button onClick={forgotPasswordHandler}>Submit</button>
          </div>
        )}

        <div className="social-login">
          <p>Or login with</p>
          <div className="social-buttons">
            <div className="social-btn">G</div>
            <div className="social-btn">F</div>
          </div>
        </div>

        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
