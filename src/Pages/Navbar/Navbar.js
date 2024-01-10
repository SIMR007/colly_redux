import React from "react";

import TopImg from "../../Assets/img/top.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("userId");
// const userEmail = localStorage.getItem("useremail");

  const logOutHandler = () => {
    console.log("running");
    localStorage.removeItem("userId");
    // localStorage.removeItem("useremail");
    // Clear the entire localStorage
    localStorage.clear();
    navigate("/");
  };

  const displayCoditionalbtn = sessionId   ? (
    <Link className="nav-link" to="/FormLogin" onClick={logOutHandler}>
      Logout
    </Link>
  ) : (
    <Link className="nav-link" to="/FormLogin">LOG IN</Link>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <a className="navbar-brand" href=" #">
            <img src={TopImg} alt="" />
          </a>
          <button
            className="navbar-toggler  "
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
              >
                <path
                  d="M0 0H16V2H0V0ZM0 4H16V6H0V4ZM0 8H16V10H0V8ZM0 12H10V14H0V12Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">{props.Search}</li>
              <li className="nav-item">{props.Categories}</li>

              <li className="nav-item">{props.News}</li>
              <li className="nav-item">{displayCoditionalbtn}</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
