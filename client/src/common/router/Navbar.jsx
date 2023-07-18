import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { downArrow, searchIcon, createIcon, bellIcon } from "assets/assets";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    if (location.pathname.startsWith("/learn")) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  }, [location.pathname]);

  return (
    <>
      {visibility && (
        <div className="header">
          <div className="left-section">
            <Link className="logo-text" to="/">
              Quizlet
            </Link>
            <Link className="left-text" to="/">
              Home
            </Link>
            <Link className="left-text" to="/library">
              Your Library
              <img src={downArrow} className="dropdown-arrow" />
            </Link>
            <Link className="left-text">Expert Solutions</Link>
          </div>

          <div className="middle-section">
            <div className="search-container">
              <img className="search-icon" src={searchIcon} />
              <input
                className="search-bar"
                type="text"
                placeholder="Study sets, textbooks, questions"
              />
            </div>
          </div>

          <div className="right-section">
            <button
              className="create-btn"
              onClick={() => {
                navigate("/create");
              }}
            >
              <img className="create-icon" src={createIcon} />
            </button>
            <button
              className="notif-btn"
              onClick={() => {
                navigate("/notifications");
              }}
            >
              <img className="notif-icon" src={bellIcon} />
            </button>
            <button
              className="profile-btn"
              onClick={() => {
                navigate("/profile");
              }}
            >
              M
            </button>
            {!cookies.access_token ? (
              <button
                className="upgrade-btn"
                onClick={() => {
                  navigate("/auth");
                }}
              >
                Login
              </button>
            ) : (
              <button
                className="upgrade-btn"
                onClick={() => {
                  setCookies("access_token", "");
                  window.localStorage.clear();
                  navigate("/auth");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
