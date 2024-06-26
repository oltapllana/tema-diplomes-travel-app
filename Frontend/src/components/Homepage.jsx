import React, { useState } from "react";
import MainHeader from "./MainHeader";
import SearchDestinationInput from "./SearchDestinationInput";
import PopularPlaces from "./PopularPlaces";
import LoginRegister from "./login/LoginRegister";

const Homepage = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      {!isShown && (
        <>
          <div className="travel-wrapper">
            <MainHeader setIsShown={setIsShown} />

            <div className="travel-description">
              <h1>Shihni vende dhe përvoja të mahnitshme</h1>
              <SearchDestinationInput />
            </div>
          </div>
        </>
      )}
      {isShown && <LoginRegister />}
    </>
  );
};

export default Homepage;
