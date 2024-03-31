export const getPlaces = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/data");
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addNewPlace = async () => {
  try {
    const response = await fetch('http://localhost:3000/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify({
        title: 'Bosphorus Cruise and Historical Tour',
        description: 'Sail between continents, marvel at iconic landmarks, indulge in Turkish cuisine, and more.',
        image: 'https://i0.wp.com/rodinistanbul.com/wp-content/uploads/2023/04/copycop…',
        city: 'Istanbul',
        thingsToDo: [
          'Visit Hagia Sophia',
          'Explore the Grand Bazaar',
          'Take a Bosphorus Cruise',
          // Add other things to do as needed
        ]
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add new place');
    }

    const data = await response.json();
    console.log('New place added successfully:', data.place);
  } catch (error) {
    console.error('Error adding new place:', error.message);
  }
}

export const getCountryData = async (countryName) => {
  try {
    const response = await fetch(`http://localhost:3000/country/${countryName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
