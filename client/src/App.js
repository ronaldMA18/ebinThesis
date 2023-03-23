import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";

import "./App.css";
import Home from "./pages/Home";

import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState, useRef } from "react";
import axios from "axios";





function App() {
  const [authState, setAuthState] = useState(false);

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
