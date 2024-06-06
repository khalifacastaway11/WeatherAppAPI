function getWeather() {
    const country = document.getElementById('country').value;
    fetch(`http://localhost:3000/weather?country=${country}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('weatherIcon').className = `fa ${data.weatherIcon}`;
        document.getElementById('citytemperature').textContent = data.temperature;
        document.getElementById('cityname').textContent = data.city;
        document.getElementById('mycard').style.display = 'flex';
      })
      .catch(error => console.error('Error:', error));
  }