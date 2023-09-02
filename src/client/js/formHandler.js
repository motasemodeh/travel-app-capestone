function handleSubmit(event) {
    event.preventDefault();

    // Check what text was put into the form field
    const cityName = document.getElementById('destination').value;

    // Updating the UI with data received from the server
    if (cityName) {
        console.log(`Form Submitted ${cityName}`);
        document.querySelector('.results').style.display = 'block';
        document.querySelector('#error').style.display = 'none';

        // Send a POST request to fetch geonames data
        postData('/api', { url: cityName })
            .then(function (geonamesRes) {
                // Extract latitude (lat) and longitude (lng) from the Geonames response
                const lat = geonamesRes.geonames[0].lat;
                const lng = geonamesRes.geonames[0].lng;
                

                // Send a POST request to fetch weather data based on lat and lng
                postData('/weatherbit', { lat, lng })
                    .then(function (weatherbitRes) {
                        // Update the HTML elements with weather data
                        document.getElementById('weather-description').textContent = `Weather: ${weatherbitRes.data[0].weather.description}`;
                        document.getElementById('temperature').textContent = `Temperature: ${weatherbitRes.data[0].temp}°C`;
                        // Add more elements for other weather data you want to display

                        // Update other elements with weather data as needed
                    })
                    .catch(function (weatherbitError) {
                        console.error('Error fetching Weatherbit data:', weatherbitError);
                    });
            })
            .catch(function (geonamesError) {
                console.error('Error fetching Geonames data:', geonamesError);
            });
    } else {
        document.querySelector('.results').style.display = 'none';
        document.querySelector('#error').style.display = 'block';
        document.getElementById('error').innerHTML =
            'Appears to be an incorrect URL. Please attempt with a valid URL.';
        console.log(cityName);
    }
}

const postData = async (url = '', data = {}) => {
    console.log('Analyzing:', data);

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
    try {
        const newData = await response.json();
        console.log('Data received:', newData);
        // Return the parsed data
        return newData;
    } catch (error) {
        console.error('Error in postData:', error);

        // Return an error object with a message
        return { error: true, message: 'An error occurred during the request.' };
    }
};

export { handleSubmit };