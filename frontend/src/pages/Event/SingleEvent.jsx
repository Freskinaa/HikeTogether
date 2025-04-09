import React, { useEffect, useState } from "react";
import "./singleEvent.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEvents,
  joinEventAsync,
  leaveEventAsync,
  deleteEventAsync,
} from "../../store/eventSlice";
import { Button, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faMinus,
  faCrown,
  faLocationDot,
  faClock,
  faCalendar,
  faBullseye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const SingleEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (id && events) {
      const foundEvent = events.find((e) => e._id === id);
      setEvent(foundEvent);
    }
  }, [id, events]);

  const isJoined = event?.attendees?.some(
    (attendee) => attendee._id === user?._id
  );
  const isCreator = event?.creator?._id === user?._id;

  const handleJoin = () => {
    dispatch(joinEventAsync({ id: id, userId: user._id }))
      .unwrap()
      .then(() => {
        dispatch(getAllEvents());
        message.success("Joined successfully");
      })
      .catch(() => message.error("Something went wrong"));
  };

  const handleLeave = () => {
    dispatch(leaveEventAsync({ id: id, userId: user._id }))
      .then(() => {
        dispatch(getAllEvents());
        message.success("Left event successfully");
      })
      .catch(() => message.error("Something went wrong"));
  };

  const handleDelete = () => {
    dispatch(deleteEventAsync(id))
      .unwrap()
      .then(() => {
        message.success("Event deleted successfully");
        navigate("/events");
      })
      .catch(() => message.error("Something went wrong"));
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-event-container">
      <h1>{event.title}</h1>
      <p>{event.description}</p>

      <p>
        <FontAwesomeIcon icon={faCalendar} /> Date:{" "}
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p>
        <FontAwesomeIcon icon={faLocationDot} /> Location: {event.location}
      </p>
      <p>
        <FontAwesomeIcon icon={faClock} /> Duration: {event.duration} minutes
      </p>
      <p>
        <FontAwesomeIcon icon={faBullseye} /> Max Attendees:{" "}
        {event.maxAttendees}
      </p>
      <p>
        <FontAwesomeIcon icon={faUser} /> Current Attendees:{" "}
        {event.attendees.length}
      </p>

      <div className="event-creator">
        <FontAwesomeIcon
          icon={faCrown}
          style={{ color: "gold", marginRight: "5px" }}
        />
        <strong>Creator: </strong>
        {event?.creator?.firstName} {event?.creator?.lastName}
      </div>

      {isCreator ? (
        <Button
          type="primary"
          danger
          onClick={handleDelete}
          icon={<FontAwesomeIcon icon={faTrash} />}
        >
          Delete Event
        </Button>
      ) : isJoined ? (
        <Button
          type="primary"
          danger
          onClick={handleLeave}
          icon={<FontAwesomeIcon icon={faMinus} />}
        >
          Leave Event
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={handleJoin}
          icon={<FontAwesomeIcon icon={faPlus} />}
        >
          Join Event
        </Button>
      )}
    </div>
  );
};

export default SingleEvent;
