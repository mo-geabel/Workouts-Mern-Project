import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Workouts</h1>
        </Link>
        <nav>
          <div>
            <Link style={{ marginRight: "10px" }} to={"/login"}>
              Login
            </Link>
            <Link style={{ marginLeft: "10px" }} to={"/signup"}>
              Signup
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
