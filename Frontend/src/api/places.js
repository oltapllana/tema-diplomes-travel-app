export const getPlaces = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/data");
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addNewPlace = async (formData) => {
  console.log("data", formData);
  try {
    const response = await fetch("http://localhost:3000/places", {
      method: "POST",
      body: formData,
    });

    console.log("response", response);

    if (!response.ok) {
      throw new Error("Failed to add new place");
    }

    const data = await response.json();
    console.log("New place added successfully:");
  } catch (error) {
    console.error("Error adding new place:", error.message);
  }
};

export const getCountryData = async (countryName) => {
  try {
    const response = await fetch(
      `http://localhost:3000/country/${countryName}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
