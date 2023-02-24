const express = require('express');
const openai = require('openai');
const bodyParser = require('body-parser');
const app = express();

// Initialize the OpenAI API client
const client = new openai.OpenAI(process.env.OPENAI_API_KEY);

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Serve the static files in the "public" directory
app.use(express.static('public'));

// Handle POST requests to the /ask endpoint
app.post('/ask', async function(req, res) {
  const prompt = req.body.prompt;

  // Send a request to the OpenAI API to get an answer
  const response = await client.complete({
    engine: 'davinci',
    prompt: prompt,
    temperature: 0.5,
    maxTokens: 150,
    stop: '\n',
  });

  // Parse the response and get the answer
  const answer = response.choices[0].text.trim();

  // Return the answer as a JSON response
  res.json({ answer: answer });
});

// Start the server
app.listen(process.env.PORT || 3000, function() {
  console.log('Server started on port 3000');
});
