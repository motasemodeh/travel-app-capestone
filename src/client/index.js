import { handleSubmit } from './js/formHandler'; // Import your form handler function

// Import SCSS Files
import './styles/base.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/body.scss'




// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const destination = document.getElementById('destination').value;
  const departureDate = document.getElementById('departure-date').value;

  // Call your form handler function
  handleSubmit(destination, departureDate);
}

// Add a submit event listener to the form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('travel-form');
  form.addEventListener('submit', handleFormSubmit);
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


export { handleSubmit }