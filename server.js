// server.js
const express = require('express');
const path = require('path');
const app = express();

const static_path = path.join(__dirname, 'build');

// Serve static files
app.use(express.static(static_path));

// Catch-all handler: send index.html for any route
app.get('/*', (req, res) => {
  res.sendFile(path.join(static_path, 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening at http://localhost:${port}`);
  }
});
