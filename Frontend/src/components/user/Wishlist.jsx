import React, { useEffect, useState } from "react";
import MainHeader from "./../MainHeader";

const Wishlist = () => {
  const [travelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const response = await fetch("http://localhost:3000/travel-plans");
        if (!response.ok) {
          throw new Error("Failed to fetch travel plans");
        }
        const data = await response.json();
        setTravelPlans(data);
      } catch (error) {
        console.error("Error fetching travel plans:", error);
      }
    };

    fetchTravelPlans();
  }, []);
  return (
    <>
      <MainHeader />
      <div className="container">
        {travelPlans.map((plan) => (
          <div className="wishlist-item-wrapper">
            <h2>{plan.city.toUpperCase()}</h2>
            {plan.placePlan.map((place) => {
              return (
                <div className="wishlist-item margin-bottom-20">
                  <h1>{place.place}</h1>
                  <div className="flex gap-20">
                    <div>
                      <img
                        src={require(`../../../../Backend/uploads/${place.image}`)}
                        alt={place.place}
                      />
                    </div>
                    <div className="flex column-direction full-width">
                      <p>{place.text}</p>
                      <span className="flex flex-end align-end full-height">
                        {place.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
