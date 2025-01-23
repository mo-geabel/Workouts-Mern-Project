import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthUserhook } from "../hook/AuthUserhook";
function App() {
  const [count, setCount] = useState(0);
  const { user } = AuthUserhook();

  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to={"/login"} />}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to={"/"} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
