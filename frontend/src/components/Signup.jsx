import React from "react";
import { useState } from "react";
import { AuthUserhook } from "../../hook/AuthUserhook";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = AuthUserhook();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Signup Response:", data);
      if (!response.ok) {
        setIsLoaded(false);
        setError(data.error);
      }
      if (response.ok) {
        setIsLoaded(false);
        setError("");
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
        dispatch({ type: "LOGIN", payload: data });
        console.log("Signup Response:", response);
      }
    } catch (error) {
      setError(error);
    }

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
      <button disabled={isLoaded}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
