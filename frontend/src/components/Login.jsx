import React, { useState } from "react";
import { AuthUserhook } from "../../hook/AuthUserhook";
import { useNavigate } from "react-router";
import { WorkoutsHook } from "../../hook/Workoutshook";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = AuthUserhook();
  const { dispatch: workoutsdispatch } = WorkoutsHook();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Login Response:", response);
      const data = await response.json();
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
        workoutsdispatch({ type: "SET_WORKOUTS" });
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
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
      <button disabled={isLoaded}>Login</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
