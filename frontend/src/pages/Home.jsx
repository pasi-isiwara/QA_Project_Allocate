import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("allocate-home-active");
    return () => {
      document.body.classList.remove("allocate-home-active");
    };
  }, []);

  return (
    <div className="allocate-home-container">
      <div className="allocate-home-background">
        <div className="allocate-gradient-overlay"></div>
      </div>

      <div className="allocate-content-wrapper">
        <div className="allocate-main-content">
          <h1 className="allocate-title allocate-animate-element">
            Welcome to Allocate
          </h1>
          <div className="allocate-subtitle allocate-animate-element">
            Hall allocation & Event Management System of
          </div>
          <div className="allocate-subtitle allocate-animate-element">
            The Faculty of Engineering, University of Ruhuna
          </div>
          <div className="allocate-description allocate-animate-element">
            <p>
              This is the home page of the Allocate system, where you can manage
              hall allocations and events efficiently.
            </p>
          </div>

          <div className="allocate-button-group allocate-animate-element">
            <button
              className="allocate-secondary-button"
              onClick={() => navigate("/admin/login")}
            >
              <span className="allocate-button-text">Get Start</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
