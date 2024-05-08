export const getPlaces = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/data");
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
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
