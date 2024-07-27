import React from 'react';
import { useParams } from 'react-router-dom';
import PetDetails from '../components/PetDetails';
import ErrorBoundary from '../components/ErrorBoundary';

const PetDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
     <h1 className="text-center my-4">Pet Details</h1>
      <ErrorBoundary>
        <PetDetails id={id} />
      </ErrorBoundary>
    </div>
  );
};

export default PetDetailsPage;
