import React, { useState } from "react";
import Airplane from "../../assets/loginImg/Airplane";
import PlacesImages from "../../assets/loginImg/PlacesImages";
import Places from "../../assets/loginImg/Places";
import Login from "./Login";
import Register from "./Register";

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="wrapper">
      <div className="bb"></div>
      <div className="login-wrapper">
        <div className="login-container">
          <h1 className="login-title">{isRegister ? "Regjistrohu" : "Kycu"}</h1>
          <span className="airplane-img">
            <Airplane />
          </span>
          {!isRegister && <Login />}
          {!isRegister && (
            <div>
              Nuk keni një llogari?{" "}
              <span
                onClick={() => {
                  setIsRegister(true);
                }}
              >
                Regjistrohu tani
              </span>
            </div>
          )}
          {isRegister && <Register />}
          {isRegister && (
            <div>
              Keni një llogari?{" "}
              <span onClick={() => setIsRegister(false)}>Kycu</span>
            </div>
          )}
        </div>
        <div className="login-images">
          <Places />
          <PlacesImages />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
