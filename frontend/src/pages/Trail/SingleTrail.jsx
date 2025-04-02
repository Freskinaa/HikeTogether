import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './singleTrail.scss'
import TrailDetails from '../../components/Trail/TrailDetails';
import DetailsOfTrail from '../../components/Trail/DetailsOfTrail';
import TrailRoute from '../../components/Trail/TrailRoute';
import TrailWeather from '../../components/Trail/TrailWeather';
import TrailEvents from '../../components/Trail/TrailEvents';
import { getAllTrails } from '../../store/trailSlice';

const SingleTrail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {trails} = useSelector(state => state.trail);
  const [trail, setTrail] = useState(null)

  useEffect(() => {
    dispatch(getAllTrails())
  }, [dispatch])

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
        {trail && <DetailsOfTrail trail={trail}/>}
        {trail && <TrailEvents trail={trail}/>}
        {trail && <TrailRoute trail={trail}/>}
        {trail && <TrailWeather trail={trail}/>}
      </div>
    </div>
  );
};

export default SingleTrail;
