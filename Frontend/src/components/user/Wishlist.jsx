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
      <MainHeader />{" "}
      <div className='wishlist'>
        <ul>
          {travelPlans.map((plan) => (
            <li key={plan._id}>
              <h2>{plan.city}</h2>
              <ul>
                {plan.placePlan.map((place) => (
                  <li key={place.id}>
                    <p>{place.text}</p>
                    <p>{place.place}</p>
                    <img
                      src={require(`../../../../Backend/uploads/${place.image}`)}
                      alt={place.place}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Wishlist;
