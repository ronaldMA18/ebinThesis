import React, { useEffect, useRef, useState } from "react";
import { Button, Form, message, Input } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";

function Home() {
  const [user, setUser] = useState();
  const loggedInUser = localStorage.getItem("accessToken");
  const [authenticated, setauthenticated] = useState(loggedInUser);

  const [lng, setLng] = useState(122.064845);
  const [lat, setLat] = useState(6.919168);
  // 6.9192622241711526, 122.06487489487877;
  let nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("lName");
    localStorage.removeItem("fName");
    return nav("/");
  };

  // console.log(213, process.env.REACT_APP_MAPBOX_TOKEN);
  if (!authenticated) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="homeContainer">
        <div className="headerContainer">
          <div>Welcome user {user}</div>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="bodyContainer">
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
                zoom: 12,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker
                longitude={122.0614}
                latitude={6.9136}
                color="white"
                style={{
                  color: "green",
                }}
              >
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,200"
                />
                BIN1
                <span class="material-symbols-outlined">delete</span>
              </Marker>

              <Marker
                longitude={122.0615}
                latitude={6.9137}
                color="white"
                style={{
                  color: "green",
                }}
              >
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,200"
                />
                BIN2
                <span class="material-symbols-outlined">delete</span>
              </Marker>

              <Marker
                longitude={122.0616}
                latitude={6.9138}
                color="white"
                style={{
                  color: "green",
                }}
              >
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,200"
                />
                BIN3
                <span class="material-symbols-outlined">delete</span>
              </Marker>

              <Marker
                longitude={122.0616}
                latitude={6.9139}
                color="white"
                style={{
                  color: "green",
                }}
              >
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,200"
                />
                BIN4
                <span class="material-symbols-outlined">delete</span>
              </Marker>

              <Marker
                longitude={122.0614}
                latitude={6.9137}
                color="white"
                style={{
                  color: "green",
                }}
              >
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,200"
                />
                BIN5
                <span class="material-symbols-outlined">delete</span>
              </Marker>

              <NavigationControl />
              <GeolocateControl />
            </Map>
          </div>

          <div className="statistics">
            <p>User: {user}</p>
            <p>STATISTICS</p>
            <p>Number of bin: 1</p>
            <p>Full bin: 0</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
