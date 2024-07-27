import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="pet-details-card">
      {pet ? (
        <>
          <h1 className="pet-details-title">{pet.name}</h1>
          <p className="pet-details-text"><strong>Breed:</strong> {pet.breed}</p>
          <p className="pet-details-text"><strong>Location:</strong> {pet.city}, {pet.state}</p>
          <div className="pet-details-images">
            {pet.images && pet.images.length > 0 ? (
              pet.images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {pet.images.map((image, index) => (
                    <div key={index} className="pet-details-image-container">
                      <img
                        src={image}
                        alt={`${pet.name} - ${pet.breed}`}
                        className="pet-details-image"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="pet-details-image-container">
                  <img
                    src={pet.images[0]}
                    alt={`${pet.name} - ${pet.breed}`}
                    className="pet-details-image"
                  />
                </div>
              )
            ) : (
              <p>No images available</p>
            )}
          </div>
          <p className="pet-details-text"><strong>Description:</strong> {pet.description}</p>
        </>
      ) : (
        <p>Pet details are not available.</p>
      )}
    </div>
  );
};

export default PetDetails;
