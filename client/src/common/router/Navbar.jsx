import "./styles.css";
import { Link } from "react-router-dom";
import { downArrow, searchIcon, createIcon, bellIcon } from "assets/assets";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  let navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

  return (
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
  );
};
