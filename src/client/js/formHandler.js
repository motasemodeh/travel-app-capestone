
// Function to make a POST request to the server
async function postData(url = '', data = {}) {
  console.log('Analyzing:', data);

  try {
    // Send a POST request using fetch
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const newData = await response.json();
      console.log('Data received:', newData);
      return newData;
    } else {
      console.error('Error in postData:', response.statusText);
      return { error: true, message: 'An error occurred during the request.' };
    }
  } catch (error) {
    console.error('Error in postData:', error);
    return { error: true, message: 'An error occurred during the request.' };
  }
}

// Function to handle the form submission
async function handleSubmit(event) {
  event.preventDefault();

  // Get the destination and departure date from the form
  const destination = document.getElementById('destination').value;
  const departureDate = document.getElementById('departure-date').value;

  // Check if the destination is not empty
  if (destination) {
    try {
      // Make the API requests and calculate remaining days here
      const geonamesResponse = await fetch(`/geonames?destination=${destination}`);
      const geonamesData = await geonamesResponse.json();
      const { lat, lng } = geonamesData.geonames[0];

      const weatherbitResponse = await fetch(`/weatherbit?lat=${lat}&lon=${lng}&departureDate=${departureDate}`);
      const weatherbitData = await weatherbitResponse.json();

      const pixabayResponse = await fetch(`/pixabay?destination=${destination}`);
      const pixabayData = await pixabayResponse.json();

      // Calculate remaining days
      const currentDate = new Date();
      const departure = new Date(departureDate);
      const remainingDays = Math.ceil((departure - currentDate) / (1000 * 60 * 60 * 24));

      // Display weather information
      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = `
      <div>
        <p>Weather information for ${destination} on ${departureDate} (${remainingDays} days remaining):</p>
      </div>
      <div>
        <p>Temperature: ${weatherbitData.data[0].temp}°C</p>
      </div>
      <div>
        <p>Weather Description: ${weatherbitData.data[0].weather.description}</p>
      </div>
      <div>
        <p>Image: <img src="${pixabayData.hits[0].webformatURL}" alt="${destination}"></p>
      </div>
    `;

      // Save data to local storage
      const travelData = {
        destination,
        departureDate,
        remainingDays,
        weather: weatherbitData.data[0],
        image: pixabayData.hits[0].webformatURL,
      };

      localStorage.setItem('travelData', JSON.stringify(travelData));
    } catch (error) {
      console.error('Error:', error);
      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = 'An error occurred while fetching weather data.';
    }
  } else {
    // Handle the case where the destination is empty
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = 'Please enter a destination.';
  }
}

export { handleSubmit, postData };