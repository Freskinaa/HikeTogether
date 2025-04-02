import React from 'react';
import { useParams } from 'react-router-dom';

const SingleTrail = () => {
  const { id } = useParams(); // Merr ID nga URL-ja

  return (
    <div>
      <h2>Trail ID: {id}</h2>
    </div>
  );
};

export default SingleTrail;
