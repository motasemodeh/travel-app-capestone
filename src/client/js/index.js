import { handleSubmit } from './formHandler';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('travel-form');
  const weatherInfo = document.getElementById('weather-info');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departure-date').value;
    console.log('Form submitted with destination:', destination);
    console.log('Departure date:', departureDate);
    // Call the handleSubmit function from formHandler
    handleSubmit(destination, departureDate, weatherInfo);
  });
});

// Optional: Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registered with scope:', registration.scope);
    }).catch((error) => {
      console.error('ServiceWorker registration failed:', error);
    });
  });
}