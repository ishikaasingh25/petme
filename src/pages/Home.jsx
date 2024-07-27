import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import PetList from '../components/PetList';
import { searchPets, fetchPets } from '../services/api';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllPets = async () => {
      try {
        const response = await fetchPets();
        if (response.pets && Array.isArray(response.pets)) {
          setPets(response.pets);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (err) {
        setError('Failed to fetch pets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getAllPets();
  }, []);

  const handleSearch = async ({ animal, location, breed }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchPets(animal, location, breed);
      if (response.pets && Array.isArray(response.pets)) {
        setPets(response.pets); // Update the state with search results
        if (response.pets.length === 0) {
         console.log("no pets")
        }
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (err) {
      console.error('Error searching pets:', err);
      setError('Failed to search pets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pet Listing</h1>
      <SearchForm onSearch={handleSearch} />
      <ErrorBoundary>
        <PetList pets={pets} loading={loading} error={error} />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
