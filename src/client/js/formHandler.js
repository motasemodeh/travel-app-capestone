function handleSubmit(event) {
    event.preventDefault()


    // check what text was put into the form field
    const cityName = document.getElementById('destination').value;


    // updating the UI with data received from the server
    if(cityName) {
    console.log(`Form Submitted ${cityName}`)
    document.querySelector('.results').style.display = 'block';
    document.querySelector('#error').style.display = 'none';
    postData('http://localhost:9020/api', {url: cityName})

    .then(function(res) {

        document.getElementById('lan').innerHTML = `country: ${res.geonames[0].countryName}`;
        document.getElementById("lat").innerHTML = `lan:: ${res.geonames[0].lat}`;
        document.getElementById("country").innerHTML = `lant: ${res.geonames[0].lng}`;
        
    })
    } else {
        document.querySelector('.results').style.display = 'none';
        document.querySelector('#error').style.display = 'block';
        document.getElementById('error').innerHTML = 'Appears to be an incorrect URL. Please attempt with a valid URL.';
        console.log(cityName)
        
    }
}


const postData = async (url = "", data = {}) => {
    console.log('Analyzing:', data);

    // Send a POST request using fetch
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        // Return the parsed data
        return newData;
    } catch (error) {
        console.error('Error in postData:!!!', error);

        // Return an error object with a message
        return { error: true, message: 'An error occurred during the request.' };
    }
};

// API response output 
// const polarityChecker = (score) => {
//     const sentimentMap = {
//         'P+': 'strong positive',
//         'P': 'positive',
//         'NEW': 'neutral',
//         'N': 'negative',
//         'N+': 'strong negative',
//         'NONE': 'no sentiment',
//     };

//     return sentimentMap[score] ? sentimentMap[score].toUpperCase() : 'Unknown';
// };

export { handleSubmit };