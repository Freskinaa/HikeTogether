import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './singleTrail.scss'
import TrailDetails from '../../components/Trail/TrailDetails';

const SingleTrail = () => {
  const { id } = useParams();
  const {trails} = useSelector(state => state.trail);
  const [trail, setTrail] = useState(null)

  useEffect(() => {
    if(id && trails) {
        const trail = trails.find(t => t._id === id)
        setTrail(trail)
    }
  }, [id, trails, trail])

  return (
    <div className="trailspage-container-one">
      <div className="middle-box">
        {trail && <TrailDetails trail={trail}/>}
      </div>
    </div>
  );
};

export default SingleTrail;
