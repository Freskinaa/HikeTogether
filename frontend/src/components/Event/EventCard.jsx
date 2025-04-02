import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const EventCard = ({
  event,
}) => {
  const navigate = useNavigate();
  const parsedDate = moment(event?.date)?.format("h:mm A");
  const eventDate = moment(event?.date).format("DD/MM/YYYY");

  const handleTrailClick = () => {
    navigate(`/trails/${event.trail._id}`);
  };

  return (
    <div className="event-card" onClick={handleTrailClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#14394b",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.728)",
        }}
      >
        <h2 className="event-title-incoming-events">{event.title}</h2>
        <div className="card-of-date-and-time-events">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "space-between",
              paddingBottom: "10px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <p>{eventDate}</p>
            <FontAwesomeIcon icon={faCalendar} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "flex-end",
              paddingBottom: "10px",
              color: "white",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <p className="event-time-incoming">{parsedDate}</p>
            <FontAwesomeIcon icon={faClock} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "flex-end",
              fontSize: "15px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <p>{event.attendees.length}</p>
            <FontAwesomeIcon icon={faPerson} />
          </div>
        </div>
      </div>

      <div className="event-creator-incoming">
        <div className="organizer-icon-name-and-last-name">
          <div className="icon-of-organizer">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "30px" }} />
          </div>

          <div className="organizer-details">
            <h3 className="name-and-lastname">
              <p style={{ fontWeight: "lighter", fontSize: "12px" }}>
                ORGANIZER{" "}
              </p>
              {event.creator?.firstName} {event.creator?.lastName}
            </h3>
          </div>
        </div>

        <div className="lcoation-of-event">
          <div className="location-of-event-trail">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p style={{ marginLeft: "10px" }}> {event.trail.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(EventCard);
