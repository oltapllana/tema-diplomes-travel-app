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
      <div className="aa"></div>
      <div className="login-wrapper">
        <div className="login-container">
          <h1 className="login-title">{isRegister ? "Register" : "Login"}</h1>
          <span className="airplane-img">
            <Airplane />
          </span>
          {!isRegister && <Login />}
          {!isRegister && (
            <div>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsRegister(true);
                }}
              >
                Register now
              </span>
            </div>
          )}
          {isRegister && <Register />}
          {isRegister && (
            <div>
              Have an account?{" "}
              <span onClick={() => setIsRegister(false)}>login</span>
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
