/* eslint-env es6 */
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve only static files from dist directory
app.use(express.static('./dist/letto_market/'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/letto_market/' });
});

// Start app by listerning on default Heroku port
app.listen(PORT);
