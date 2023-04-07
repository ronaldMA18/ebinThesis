import React, { useEffect, useRef, useState } from "react";
import { Button, Form, message, Input } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import axios from "axios";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

const axiosInstance1 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const axiosInstance2 = axios.create({
  baseURL: process.env.REACT_APP_USR_URL,
});

function Home() {
  const loggedInUser = localStorage.getItem("accessToken");
  const [authenticated, setauthenticated] = useState(loggedInUser);

  const [lng, setLng] = useState(122.0614);
  const [lat, setLat] = useState(6.9136);
  // 6.9192622241711526, 122.06487489487877;
  let nav = useNavigate();

  const [bins, setBins] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axiosInstance1.get(`/bins`).then((response) => {
      setBins(response.data);
      console.log("bin:", response.data);
    });
  }, []);

  useEffect(() => {
    axiosInstance1.get(`/logs`).then((response) => {
      setLogs(response.data);
      console.log("logs:", response.data);
    });
  }, []);

  const logout = () => {
    let values = {
      id: localStorage.getItem("id"),
      username: localStorage.getItem("username"),
    };
    axiosInstance2.post(`/logout`, values).then((response) => {
      setLogs(response.data);
      console.log("logs:", response.data);
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("lName");
    localStorage.removeItem("fName");
    localStorage.removeItem("id");
    return nav("/");
  };

  if (!authenticated) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="homeContainer">
        <div className="headerContainer">
          <div>E-Bin Online: WASTE BIN MANAGEMENT SYSTEM</div>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="bodyContainer">
          <div className="dashboard">
            <h3>miniDashboard</h3>
            <div className="person">
              <span class="material-symbols-outlined">person</span>
              {localStorage.getItem("username")}
            </div>
            <div className="trash">
              <span class="material-symbols-outlined">delete</span>
              {bins.length}
            </div>
            <div className="full">
              <span class="material-symbols-outlined">
                <span class="material-symbols-outlined">water_full</span>
              </span>
              {bins.filter((x) => x.status === 1).length}
            </div>
          </div>

          <div className="mapContainer">
            <div className="mapStyles">
              <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                style={{
                  width: "60vw",
                  height: "90vh",
                  border: "2px solid #4e8156",
                }}
                initialViewState={{
                  longitude: lng,
                  latitude: lat,
                  zoom: 16,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                {/* <MapboxDirections
                  accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  unit="metric"
                  profile="mapbox/walking"
                /> */}

                {bins.map((b) => {
                  return (
                    <Marker
                      longitude={parseFloat(b.long)}
                      latitude={parseFloat(b.lat)}
                      color="white"
                      style={{
                        color: b.id === 1 ? "green" : "blue",
                      }}
                    >
                      <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,200"
                      />
                      {b.locationName}
                      <span class="material-symbols-outlined">delete</span>
                    </Marker>
                  );
                })}

                <NavigationControl />
                {/* <GeolocateControl /> */}
              </Map>
            </div>
          </div>

          <div className="logs">
            <div>
              <h2>Activity Log</h2>
              <table>
                <thead>
                  <tr class>
                    <th></th>
                    <th>Activity</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={log.id}>
                      <>
                        <td>{i === 0 ? "latest:" : ""}</td>
                        <td>{log.activity}</td>
                        <td>| {new Date(log.dateCreated).toLocaleString()}</td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
