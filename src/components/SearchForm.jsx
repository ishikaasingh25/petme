import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ onSearch }) => {
  const [animal, setAnimal] = useState('');
  const [location, setLocation] = useState('');
  const [breed, setBreed] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const searchResult = await onSearch({ animal, location, breed });
      if (searchResult && searchResult.length > 0) {
        navigate(`/pets/${searchResult[0].id}`); // Navigate to the first pet's detail
      } else {
        // alert('No pets found');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search pets. Please try again later.');
    }
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
          placeholder="Animal"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Breed"
        />
        <button type="submit">Search</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default SearchForm;
