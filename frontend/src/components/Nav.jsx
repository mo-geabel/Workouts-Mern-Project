import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hook/Logout";
import { AuthUserhook } from "../../hook/AuthUserhook";
const Nav = () => {
  const logout = useLogout();
  const { user } = AuthUserhook();
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Workouts</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button
                style={{
                  padding: "5px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={logout}
              >
                {" "}
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link style={{ marginRight: "10px" }} to={"/login"}>
                Login
              </Link>
              <Link style={{ marginLeft: "10px" }} to={"/signup"}>
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
