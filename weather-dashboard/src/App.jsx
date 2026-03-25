import { useState } from 'react';
import './App.css';

const API_KEY = '762a301e713d45e88d773121261103';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function fetchWeather() {
    if (city.trim() === '') {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    let url = 'https://api.weatherapi.com/v1/current.json?key=' +
      API_KEY + '&q=' + encodeURIComponent(city.trim());

    fetch(url)
      .then(function (res) {
        if (res.status === 400) {
          setError('City not found. Try another name.');
          setLoading(false);
          return null;
        }
        if (res.status === 401 || res.status === 403) {
          setError('Invalid API key. Check your key.');
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then(function (data) {
        if (!data) return;

        setWeather({
          city: data.location.name,
          country: data.location.country,
          temperature: Math.round(data.current.temp_c),
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          description: data.current.condition.text,
          icon: data.current.condition.icon
        });
        setLoading(false);
      })
      .catch(function () {
        setError('Something went wrong. Check your connection.');
        setLoading(false);
      });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  }

  return (
    <div className="dashboard">
      <div className="header">
        <h1>🌤 Weather Dashboard</h1>
        <p>Enter a city to check the current weather</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={function (e) { setCity(e.target.value); }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && (
        <div className="state-box loading">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="state-box error">
          <p>⚠ {error}</p>
        </div>
      )}

      {weather && (
        <div className="result-card">
          <div className="result-top">
            <img
              src={'https:' + weather.icon}
              alt="weather icon"
            />
            <div>
              <h2>{weather.city}, {weather.country}</h2>
              <p className="desc">{weather.description}</p>
            </div>
          </div>
          <div className="result-grid">
            <div className="grid-box">
              <span className="grid-label">🌡 Temp</span>
              <span className="grid-value">{weather.temperature}°C</span>
            </div>
            <div className="grid-box">
              <span className="grid-label">💧 Humidity</span>
              <span className="grid-value">{weather.humidity}%</span>
            </div>
            <div className="grid-box">
              <span className="grid-label">💨 Wind</span>
              <span className="grid-value">{weather.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
