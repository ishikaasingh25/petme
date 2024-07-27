import React, { useEffect, useState } from 'react';

const PetDetails = ({ id }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        // Replace with the actual URL
        const response = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
        const data = await response.json();

        console.log('Fetched pet details:', data); // Debugging line

        if (data.pets && data.pets.length > 0) {
          setPet(data.pets[0]); // Get the first pet from the array
        } else {
          setError('Pet not found');
        }
      } catch (error) {
        console.error('Error fetching pet details:', error); // Debugging line
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
    <div>
      {pet ? (
        <>
          <h1>{pet.name}</h1>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Location:</strong> {pet.city}, {pet.state}</p>
          <div className="pet-images">
            {pet.images && pet.images.length > 0 ? (
              pet.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${pet.name} - ${pet.breed}`}
                  className="pet-image"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <p><strong>Description:</strong> {pet.description}</p>
        </>
      ) : (
        <p>Pet details are not available.</p>
      )}
    </div>
  );
};

export default PetDetails;
