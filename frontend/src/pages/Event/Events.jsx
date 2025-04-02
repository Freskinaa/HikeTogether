import React, { useState, useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Button, message } from "antd";
import "./event.scss";
import EventCard from "../../components/Event/EventCard";
import { getAllEvents } from '../../store/eventSlice';

const Events = () => {
  const dispatch = useDispatch()
  const {events} = useSelector((state) => state.event);
  const [allEvents, setAllEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(10);


  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch]);

  useEffect(() => {
    if(events) {
      setAllEvents(events)
    }
  }, [events])

  const loadMoreEvents = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 10);
  };

  const eventsToShow = allEvents.slice(0, visibleEvents);

  return (
    <div>
      <div className="event-card-container-one">
        {eventsToShow.map((event, index) => (
          <EventCard
            event={event}
            key={index}
          />
        ))}
      </div>
      {visibleEvents < allEvents.length && (
        <div className="load-more-events-button-container">
          <Button type="button" className="basic-btn" onClick={loadMoreEvents}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Events;
