const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const getPlaces = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/data`);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getCountryData = async (countryName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/country/${countryName}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
