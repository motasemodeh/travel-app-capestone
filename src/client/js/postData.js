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

export { postData };