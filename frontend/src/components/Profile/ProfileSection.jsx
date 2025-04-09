import React from "react";
import ProfileCard from "./ProfileCard";
import "./profileSection.scss";
import CompletedProfile from "./CompletedProfile";
import FieldsToComplete from "./FieldsToComplete";
import Button from "../Shared/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const ProfileSection = ({ useri, completedPercentage, fieldsToComplete }) => {
  const user = useSelector((state) => state.auth.user);
  const notCompleted = completedPercentage < 100;

  return (
    <div className="profile-section">
      <div className="top-profile-section">
        <div
          className={
            notCompleted
              ? "left-side-profile not-completed"
              : "left-side-profile"
          }
        >
          <div className="profile-card-content">
            <ProfileCard useri={useri} />
          </div>
        </div>
        {completedPercentage < 100 && (
          <div className="right-side-profile">
            <CompletedProfile percentage={completedPercentage} />
            <FieldsToComplete fields={fieldsToComplete} />
          </div>
        )}
      </div>
      <div className="bottom-profile-section">
          
          {((user?.description && user.description !== "") ||
            (user?.phoneNumber && user.phoneNumber !== "") ||
            (user?.location && user.location !== "") ||
            (user?.socialMedia?.facebook && user?.socialMedia.facebook !== "") ||
            (user?.socialMedia?.instagram &&
              user?.socialMedia.instagram !== "") ||
            (user?.socialMedia?.twitter &&
              user?.socialMedia.twitter !== "")) && (
            <div className="profile-otherDetails">
              <div className="all-other-details">
                {(user?.description) && (
                  <div className="user-detail">
                    <span className="detail-title">Bio</span>
                    {user?.description && (
                      <div className="user-detail__content">
                        <p className="detail__text-bio">{user.description}</p>
                      </div>
                    )}
                  </div>
                )}
                {(user?.phoneNumber ||
                  user?.location ||
                  user?.socialMedia?.facebook ||
                  user?.socialMedia?.instagram ||
                  user?.socialMedia?.twitter) && (
                  <div className="user-detail">
                    <span className="detail-title">Contact Info</span>
                    {user?.phoneNumber && (
                      <div className="user-detail__content">
                        <FontAwesomeIcon
                          className="detail__icon"
                          icon={faPhone}
                        />
                        <span className="detail__text">
                          <Link to={`tel:${user.phoneNumber}`}>
                            {user.phoneNumber}
                          </Link>
                        </span>
                      </div>
                    )}
                    {user?.location && (
                      <div className="user-detail__content">
                        <FontAwesomeIcon
                          className="detail__icon"
                          icon={faLocationDot}
                        />
                        <span className="detail__text">{user.location}</span>
                      </div>
                    )}
                    {user?.socialMedia && (
                      <div className="user-socialMedias">
                        {user?.socialMedia?.facebook && (
                          <div className="user-socialMedia">
                            <Link
                              to={`https://www.facebook.com/${user?.socialMedia?.facebook}`}
                              target="_blank"
                            >
                              <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                          </div>
                        )}
                        {user?.socialMedia?.instagram && (
                          <div className="user-socialMedia">
                            <Link
                              to={`https://www.instagram.com/${user?.socialMedia?.instagram}`}
                              target="_blank"
                            >
                              <FontAwesomeIcon icon={faInstagram} />
                            </Link>
                          </div>
                        )}
                        {user?.socialMedia?.twitter && (
                          <div className="user-socialMedia">
                            <Link
                              to={`https://www.twitter.com/${user?.socialMedia?.twitter}`}
                              target="_blank"
                            >
                              <FontAwesomeIcon icon={faTwitter} />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProfileSection;
