const form = document.querySelector('form');
const promptInput = document.querySelector('#prompt');
const answerDiv = document.querySelector('#answer');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  // Send a POST request to the server to get an answer
  const response = await fetch('/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: promptInput.value
    })
  });

  // Parse the JSON response and display the answer
  const data = await response.json();
  answerDiv.textContent
