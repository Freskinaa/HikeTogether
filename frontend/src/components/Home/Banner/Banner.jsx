import React, { useEffect, useState } from "react";
import "./banner.scss";
import banner1 from "../../../assets/images/banner1.jpeg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";
import banner4 from "../../../assets/images/banner4.jpg";
import SubTitle from "../../Shared/Subtitle/SubTitle";
import NumberIncrement from "./NumberIncrement";
import {useDispatch, useSelector} from 'react-redux'
import {getAllTrails} from '../../../store/trailSlice'
import {getAllEvents} from '../../../store/eventSlice'
import { getAllUsersAsync } from "../../../store/userSlice";

const Banner = () => {
  const [bannerImg, setBannerImg] = useState(banner1);
  const [activeBullet, setActiveBullet] = useState(0);
  const [trailsLength, setTrailsLength] = useState(0);
  const [usersLength, setUsersLength] = useState(0);
  const [eventsLength, setEventsLength] = useState(100);
  const [transition, setTransition] = useState(false)
  const dispatch = useDispatch()
  const {trails} = useSelector(state=> state.trail)
  const {events} = useSelector(state=> state.event)
  const {users} = useSelector(state=> state.user)

  useEffect(() => {
    if(trails) {
      setTrailsLength(trails.length)
    }
  }, [trails])

  useEffect(() => {
    if(events) {
      setEventsLength(events.length)
    }
  }, [events])

  useEffect(() => {
    if(users) {
      setUsersLength(users.length)
    }
  }, [users])

  useEffect(() => {
    dispatch(getAllTrails())
    dispatch(getAllEvents())
    dispatch(getAllUsersAsync())
  }, [dispatch])

  const sliderImages = [
    [banner1, banner2, banner3],
    [banner2, banner3, banner4],
    [banner3, banner4, banner1],
    [banner4, banner1, banner2],
  ];

  const handleBulletClick = (index) => {
    setTransition(true);
    setTimeout(() => {
      setActiveBullet(index);
      setTransition(false);
    }, 300);
  };

  return (
    <div className="banner" style={{ backgroundImage: `url(${bannerImg})` }}>
      <div className="main-container">
        <div className="banner-content">
          <div className="left-banner">
            <div className="top-lfbn-content">
              <h2 className="banner-title">Amazing mountains to explore</h2>
            </div>
            <div className="bottom-lfbn-content">
              <p className="banner-paragraph">
                Do not follow where the path may lead. Go instaed where there is
                no path and leave a trail.
              </p>
              <SubTitle text="RALPH EMERSON" afterLine={true} />
            </div>
          </div>
          <div className="right-banner">
            <div className="top-rgbn-content">
              <div className="banner-stats">
                <div className="banner-stat">
                  <h4 className="stat-name">Trails</h4>
                  <span className="stat-count">
                    <NumberIncrement number={trailsLength} />
                  </span>
                </div>
                <div className="banner-stat">
                  <h4 className="stat-name">Users</h4>
                  <span className="stat-count">
                    <NumberIncrement number={usersLength} />
                  </span>
                </div>
                <div className="banner-stat">
                  <h4 className="stat-name">Events</h4>
                  <span className="stat-count">
                    <NumberIncrement number={eventsLength} />
                  </span>
                </div>
              </div>
            </div>
            <div className="bottom-rgbn-content">
              <div
                className={`banner-slider ${
                  transition ? "slider-fade-out" : ""
                }`}
              >
                {sliderImages[activeBullet].map((image, index) => (
                  <div className="slider-image" key={index}>
                    <img
                      src={image}
                      alt={`banner ${index}`}
                      onClick={() => setBannerImg(image)}
                    />
                  </div>
                ))}
              </div>
              <div className="slider-controller">
                {sliderImages.map((_, index) => (
                  <div
                    className={`controll-bullet ${
                      index === activeBullet ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => handleBulletClick(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
