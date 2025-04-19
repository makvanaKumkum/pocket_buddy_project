import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export const ResetPassword = () => {
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const obj = {
        password: data.password,
      };

      const res = await axios.post("/resetpassword", obj);
      console.log(res.data);
    } catch (err) {
      console.log("Reset password error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>RESET PASSWORD</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Password</label>
          <input type="text" {...register("password")} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
