import React from 'react';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './eventCard.scss';

const EventCard = ({img, duration, size, difficulty, details}) => {
  return (
    <div className='single-event'>
        <img 
            className='event-img'
            src={img}
            alt="event" 
        />
        <div className='event-info-box'>
            <div className='event-info'>
                <span className='info-count'>{duration.count}</span>
                <span className='info-desc'>{duration?.desc}</span>
            </div>
            <div className='event-info'>
                <span className='info-count'>{size.count}</span>
                <span className='info-desc'>{size.desc}</span>
            </div>
            <div className='event-info'>
                <span className='info-count'>{difficulty.count}</span>
                <span className='info-desc'>{difficulty.desc}</span>
            </div>
        </div>
        <div className='event-details'>
            <h4 className='event--title'>
                {details?.name}
            </h4>
            <p className='event--desc'>
                {details?.desc}
            </p>
            <p className='event--date'>
                {details?.date}
            </p>
            <div className='event--location'>
                <FontAwesomeIcon icon={faMapLocationDot}/>
                <span className='event-location-name'>{details?.location}</span>
            </div>
        </div>
    </div>
  )
}

export default EventCard