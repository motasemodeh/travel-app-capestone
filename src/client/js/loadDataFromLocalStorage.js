// Function to load data from local storage and populate HTML elements
function loadDataFromLocalStorage() {
    const travelData = JSON.parse(localStorage.getItem('travelData'));
    if (travelData) {
      // Populate HTML elements with data
      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = `
      <div class="title-recently">Recently viewed and upcoming</div>
      <div class="saved-trips"> 
      
      <div>
      <p><img src="${travelData.image}" alt="${travelData.destination}"></p>
      </div>
        <div>
          <p>Trip to <b>${travelData.destination}</b> on ${travelData.departureDate}<br>(${travelData.remainingDays} days remaining):</p>
        </div>
        <div>
          <p>Temperature: ${travelData.weather.temp}°C</p>
        </div>
        <div>
          <p>Weather Description: ${travelData.weather.description}</p>
        </div>
        </div>

      `;
    }
  }
  
  export { loadDataFromLocalStorage };