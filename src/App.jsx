import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PetDetailsPage from './pages/PetDetailsPage';
import './App.css'; // Import your global styles here
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets/:id" element={<PetDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
