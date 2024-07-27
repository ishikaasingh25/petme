import React, { useEffect, useState } from 'react';
import './PetDetails.css'; // Ensure the CSS file is imported

const PetDetails = ({ id }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
        const data = await response.json();

        if (data.pets && data.pets.length > 0) {
          setPet(data.pets[0]);
        } else {
          setError('Pet not found');
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
        setError('Failed to fetch pet details');
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pet-details-card">
      {pet ? (
        <>
          <h1 className="card-title">{pet.name}</h1>
          <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
          <p className="card-text"><strong>Location:</strong> {pet.city}, {pet.state}</p>
          <div className="pet-images">
            {pet.images && pet.images.length > 0 ? (
              pet.images.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={image}
                    alt={`${pet.name} - ${pet.breed}`}
                    className="pet-image"
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <p className="card-text"><strong>Description:</strong> {pet.description}</p>
        </>
      ) : (
        <p>Pet details are not available.</p>
      )}
    </div>
  );
};

export default PetDetails;
