import axios from 'axios';

const API_BASE_URL = 'http://pets-v2.dev-apis.com';
// Fetch all pets
export const fetchPets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pets`);
    return response.data; // Return the data directly
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error; // Rethrow to handle it in the component
  }
};

// Fetch pet by ID
export const fetchPetById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pets`, {
      params: { id }
    });
    return response.data; // Return the data directly
  } catch (error) {
    console.error(`Error fetching pet with ID ${id}:`, error);
    throw error; // Rethrow to handle it in the component
  }
};

// Fetch breeds by animal type
export const fetchBreeds = async (animal) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/breeds`, {
      params: { animal }
    });
    return response.data; // Return the data directly
  } catch (error) {
    console.error(`Error fetching breeds for animal ${animal}:`, error);
    throw error; // Rethrow to handle it in the component
  }
};

// Search pets by animal type, location, and breed
export const searchPets = async (animal, location, breed) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pets`, {
      params: { animal, location, breed }
    });
    return response.data; // Return the data directly
  } catch (error) {
    console.error('Error searching pets:', error);
    throw error;
  }
};