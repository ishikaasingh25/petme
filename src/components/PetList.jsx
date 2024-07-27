import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PetList.css'; // Import CSS file for additional styling

const PetList = ({ pets }) => {
  // Settings for the carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="pet-list">
      {pets.map(pet => (
        <Link to={`/pets/${pet.id}`} key={pet.id} className="pet-card">
          <div className="pet-info">
            <h2>{pet.name}</h2>
            <p>{pet.breed}</p>
            <p>{pet.city}, {pet.state}</p>
            
            <div className="pet-images">
              {pet.images && pet.images.length > 0 ? (
                pet.images.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {pet.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={`${pet.name} - ${pet.breed}`}
                          className="pet-image"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={pet.images[0]}
                    alt={`${pet.name} - ${pet.breed}`}
                    className="pet-image"
                  />
                )
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PetList;
