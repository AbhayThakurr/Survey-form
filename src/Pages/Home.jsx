import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>Choose the Level of Form</h1>
      <button className="btn">
        <Link to="/level1">Level 1</Link>
      </button>
      <br />
      <button className="btn">
        <Link to="/level2">Level 2</Link>
      </button>
      <br />
      <button className="btn">
        <Link to="/level3">Level 3</Link>
      </button>
    </div>
  );
};

export default Home;
