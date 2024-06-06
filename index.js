const express = require('express');
const requests = require('requests');
const path = require('path');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', (req, res) => {
  const country = req.query.country;

  if (!country) {
    res.status(400).send('Country name is required');
    return;
  }

  requests(
    `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=ffdf0969efd5c5602d45c2bce76d970a`
  )
    .on('data', (chunk) => {
      const objdata = JSON.parse(chunk);
      const arrData = [objdata];
      res.send({
        temperature: (arrData[0]?.main?.temp - 273.15).toFixed(1) + '°C',
        city: arrData[0]?.name,
        weatherIcon: 'fa-cloud' // This can be dynamic based on the weather condition
      });
    })
    .on('end', (err) => {
      if (err) console.log('Error:', err);
    });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});