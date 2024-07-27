import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PetList.css';

const PetList = ({ pets }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {pets.map(pet => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={pet.id}>
            <Link to={`/pets/${pet.id}`} className="card pet-card h-100 text-decoration-none">
              <div className="card-body">
                <div className="pet-images mb-3">
                  {pet.images && pet.images.length > 0 ? (
                    pet.images.length > 1 ? (
                      <Slider {...sliderSettings}>
                        {pet.images.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              alt={`${pet.name} - ${pet.breed}`}
                              className="img-fluid pet-image"
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <img
                        src={pet.images[0]}
                        alt={`${pet.name} - ${pet.breed}`}
                        className="img-fluid pet-image"
                      />
                    )
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
                <h2 className="card-title h5">{pet.name}</h2>
                <p className="card-text">{pet.breed}</p>
                <p className="card-text">{pet.city}, {pet.state}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList;
