import React, { useState } from "react";
import "./profileCard.scss";
import Button from "../Shared/Button/Button";
import gravatar from "gravatar";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Shared/Modal/Modal";
import { Form } from "antd";
import InputField from "../Shared/InputField/InputField";
import SelectField from "../Shared/SelectField/SelectField";

const ProfileCard = ({ useri }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="profile-card">
      <div className="top-profile-content"></div>
      <div className="bottom-profile-content">
        <div className="profile-image">
            <img
              src={gravatar.url(user.email, { s: "200", d: "identicon" })}
              alt="profile image"
            />
        </div>
        <h4 className="profile-name">
          {useri?.firstName} {useri?.lastName}
        </h4>
        <div className="profile-stats">
          {useri?.eventsAttending?.length > 0 && (
            <div className="profile-stat">
              <span className="stat-count">
                {useri?.eventsAttending?.length}
              </span>
              <span className="stat-desc">Events</span>
            </div>
          )}
        </div>
        <Button
          className="basic-btn"
          type="button"
        >
          Edit profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
