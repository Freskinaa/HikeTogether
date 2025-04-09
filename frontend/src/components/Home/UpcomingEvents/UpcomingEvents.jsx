import React, { useState, useEffect } from "react";
import SubTitle from "../../Shared/Subtitle/SubTitle";
import Button from "../../Shared/Button/Button";
import EventCard from "./EventCard";
import "./upcomingEvents.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../../store/eventSlice";
import { useNavigate } from 'react-router';

const TrailEvents = () => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (events.length > 0) {
      const activeEvents = events.filter((event) => event.status === "active");

      const sortedEvents = [...activeEvents].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const currentDate = new Date();

      const nearestEvents = sortedEvents
        .filter((event) => new Date(event.date) >= currentDate)
        .slice(0, 4);

      if (nearestEvents.length === 0 && sortedEvents.length > 0) {
        nearestEvents.push(sortedEvents[0]);
      }

      setUpcomingEvents(nearestEvents);
    }
  }, [events]);

  const handleBulletClick = (index) => {
    setTransition(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTransition(false);
    }, 300);
  };

  const formatDuration = (minutes) => {
    const hours = Math.round(minutes / 60);
    return `${hours}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleJoinUs = () => {
    navigate("/events");
};

  return (
    <div className="trail-event-container">
      <div className="main-container">
        <div className="trail-event-content">
          <div className="left-te-content">
            {upcomingEvents.length > 0 ? (
              <div
                className={`all-events ${transition ? "slider-fade-out" : ""}`}
              >
                {upcomingEvents
                  ?.slice(currentSlide, currentSlide + 2)
                  ?.map((event) => (
                    <EventCard
                      key={event._id}
                      id={event._id}
                      img={event.trail?.photos[0]}
                      duration={{
                        count: formatDuration(event.duration),
                        desc: "Hours",
                      }}
                      size={{
                        count: event.attendees.length,
                        desc: "Group Size",
                      }}
                      difficulty={{
                        count: event.trail?.difficulty,
                        desc: "Difficulty",
                      }}
                      details={{
                        name: event.title,
                        desc: event.description,
                        location: event.trail?.location,
                        date: formatDate(event.date),
                      }}
                    />
                  ))}
              </div>
            ) : (
              <div className="no-events">
                <h2>No upcoming active events</h2>
              </div>
            )}
          </div>
          <div className="right-te-content">
            <h2 className="events-title">Upcoming events</h2>
            <SubTitle text="Explore the unexplored world" afterLine={true} />
            <p className="events-desc">
              Join us for upcoming trail events to explore diverse landscapes,
              conquer challenging terrains, and create lasting memories in the
              heart of nature with like-minded adventurers.
            </p>
            <Button className="basic-btn green" type="button" onClick={handleJoinUs}>
              Join us now
            </Button>

            <div className="event-slider">
              {Array.from({ length: upcomingEvents.length }).map((_, index) => (
                <div
                  key={index}
                  className={`slider-bullet ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => handleBulletClick(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailEvents;
