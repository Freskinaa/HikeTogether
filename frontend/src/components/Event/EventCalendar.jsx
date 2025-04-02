import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Calendar, Modal, Button, message } from "antd";
import "./eventCalendar.scss";
import InputField from "../../components/Shared/InputField/InputField";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { getAllEvents , createEventAsync, deleteEventAsync} from "../../store/eventSlice";

const EventCalendar = ({ trail }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [allEvents, setAllEvents] = useState({});
  const [modalTime, setModalTime] = useState(null);
  const [mode, setMode] = useState("month");
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const dispatch = useDispatch();

  const {events} = useSelector((state) => state.event);
  const userId = useSelector((state) => state.auth)?.user?._id;

  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch]);

  useEffect(() => {
    if(events)
    {
      setAllEvents(events)
    }
  }, [events])


  const createEvent = async () => {
    setTitleError(null);
    setDescriptionError(null);
    setTimeError(null);

    let hasError = false;
    if (!modalTitle.trim()) {
      setTitleError("Title is required");
      hasError = true;
    } else if (modalTitle.trim().length > 25) {
      setTitleError("Title cannot exceed 25 characters");
      hasError = true;
    }
    if (!modalDescription.trim()) {
      setDescriptionError("Description is required");
      hasError = true;
    } else if (modalDescription.trim().length > 50) {
      setDescriptionError("Description cannot exceed 50 characters");
      hasError = true;
    }
    if (!modalTime) {
      setTimeError("Time is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const times = modalTime.split(":");
      const hours = parseInt(times[0]);
      const minutes = parseInt(times[1]);
      const currentDate = new Date(selectedDate);

      currentDate.setHours(hours);
      currentDate.setMinutes(minutes);
      const formattedDate = currentDate.toISOString();

      const payload = {
        title: modalTitle,
        description: modalDescription,
        date: formattedDate,
        creator: userId,
        trail: trail._id
      };

      await dispatch(createEventAsync(payload))
      message.success("Event created successfully.");
    } catch (error) {
      console.error("Error creating event:", error);
      message.error("Failed to create event");
    } finally {
      setModalVisible(false);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      dispatch(deleteEventAsync(eventId))

      setSelectedDate(null);
      setModalVisible(false);

    } catch (error) {
      console.error("Error deleting event:", error);
      message.error("Failed to delete event");
    }
  };

  const onPanelChange = (value, mode) => {
    setMode(mode);
  };

  const handleDateClick = (value) => {
    const date = value.format("YYYY-MM-DD");
    setSelectedDate(date);
    const event = allEvents[date] || { title: "", description: "", time: null };
    setModalTitle(event.title);
    setModalDescription(event.description);
    setModalTime(event.time);
    setModalVisible(true);
  };

  const handleCancel = () => {
    if (allEvents[selectedDate]) {
      const eventId = allEvents[selectedDate]._id;
      if (!eventId) {
        console.error("Event ID not found.");
      }
      deleteEvent(eventId);
    } else {
      console.error("Event not found for the selected date.");
    }
    setSelectedDate(null);
    setModalVisible(false);
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <div>
      <Calendar
        fullscreen={false}
        mode={mode}
        onPanelChange={onPanelChange}
        onSelect={handleDateClick}
        disabledDate={disabledDate}
      />
      <Modal
        title="Event Details"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} style={{ color: "#000" }}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={createEvent}>
            {allEvents[selectedDate] ? "Update Event" : "Create Event"}
          </Button>
        ]}
      >
        <div className="info-of-creating-event">
          <div className="name-of-event-creating">
            <p>TITLE OF EVENT</p>
            <InputField
              value={modalTitle || ""}
              onChange={(e) => {
                setModalTitle(e.target.value);
                setTitleError(null);
              }}
            />
            {titleError && <span className="error">{titleError}</span>}{" "}
            <p>DESCRIPTION</p>
            <InputField
              value={modalDescription || ""}
              onChange={(e) => {
                setModalDescription(e.target.value);
                setDescriptionError(null);
              }}
            />
            {descriptionError && (
              <span className="error">{descriptionError}</span>
            )}{" "}
            <p>SET TIME</p>
            <InputField
              type="time"
              value={modalTime || ""}
              onChange={(e) => {
                setModalTime(e.target.value);
                setTimeError(null);
              }}
            />
            {timeError && <span className="error">{timeError}</span>}{" "}
          </div>
        </div>
      </Modal>
      {/* <IncomingEventsPage
        trail={trail}
        events={events}
        deleteEvent={deleteEvent}
      /> */}
    </div>
  );
};

export default EventCalendar;
