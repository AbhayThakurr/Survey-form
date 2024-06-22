import React from "react";
import Level2 from "./Pages/Level2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.module.css";
import Home from "./Pages/Home";
import Level3 from "./Pages/Level3";
import Level1 from "./Pages/Level1";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/level1" element={<Level1 />} />
          <Route path="/level2" element={<Level2 />} />
          <Route path="/level3" element={<Level3 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
