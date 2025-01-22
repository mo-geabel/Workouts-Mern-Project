import React, { useState } from "react";
import { AuthUserhook } from "../../hook/AuthUserhook";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = AuthUserhook();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });
    console.log("Signup Response:", response);
    const data = await response.json();
    console.log(data);
    dispatch({ type: "LOGIN", payload: data });
    setEmail("");
    setPassword("");
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Sign up</button>
    </form>
  );
};

export default Signup;
