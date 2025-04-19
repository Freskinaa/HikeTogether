import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import { useSelector, useDispatch } from "react-redux";
import NavProfile from "../../components/Profile/NavProfile";
import ProfileSection from "../../components/Profile/ProfileSection";
import ListComponent from "../../components/Profile/ListComponent";
import { useNavigate } from "react-router-dom";
import { getEventById } from "../../store/eventSlice";


const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeSection, setActiveSection] = useState("Profile");
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [fieldsToFill, setFieldsToFill] = useState([]);
  const dispatch = useDispatch();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    calculateProfileCompletion();
  }, [user]);

  useEffect(() => {
    if (user && user._id) {
      let joinedEvents = user?.eventsAttending;
      let fetchedEvents = [];

      const fetchEvents = async () => {
        for (let event of joinedEvents) {
          try {
            const eventData = await dispatch(getEventById(event._id)).unwrap();
            fetchedEvents.push(eventData);
          } catch (error) {
            console.error("Error fetching event by ID:", error);
          }
        }
        setJoinedEvents(fetchedEvents);
      };

      fetchEvents();
    }
  }, [user]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const calculateProfileCompletion = () => {
    const excludedFields = ["eventsAttending", "_id", "__v"];
    let totalFields = Object.keys(user).length - excludedFields.length;

    if (user.socialMedia) {
      totalFields += Object.keys(user.socialMedia).length;
    }
    let filledFields = 0;
    let fieldsToFill = [];

    Object.keys(user).forEach((key) => {
      if (
        user[key] &&
        user[key] !== "" &&
        !(Array.isArray(user[key]) && user[key].length === 0) &&
        !excludedFields.includes(key)
      ) {
        filledFields++;
      } else if (!excludedFields.includes(key)) {
        fieldsToFill.push(key);
      }
    });

    if (user.socialMedia) {
      Object.keys(user.socialMedia).forEach((key) => {
        if (user.socialMedia[key] && !excludedFields.includes(key)) {
          filledFields++;
        } else {
          fieldsToFill.push(`socialMedia.${key}`);
        }
      });
    }

    const completionPercentage = (filledFields / totalFields) * 100;
    setProfileCompletion(completionPercentage.toFixed());
    setFieldsToFill(fieldsToFill);
  };

  const renderSection = (section) => {
    switch (section) {
      case "Profile":
        return (
          <ProfileSection
            useri={user}
            completedPercentage={profileCompletion}
            fieldsToComplete={fieldsToFill}
          />
        );
      case "Joined Events":
        return (
          <ListComponent
            title={"Joined Events"}
            list={joinedEvents}
            link={`/events`}
            addItem={`events`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-content">
        <div className="left-up-content">
          <NavProfile section={handleSectionChange} />
        </div>
        <div className="right-up-content">{renderSection(activeSection)}</div>
      </div>
    </div>
  );
};

export default Profile;
