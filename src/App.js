import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './pages/Weather';
import CityWeather from './pages/CityWeather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Weather />} />
        <Route path='/view-weather/:id' element = {<CityWeather />} />
      </Routes>
    </Router>
  );
}

export default App;
