import React, { useState, useEffect } from "react";
import Button from "../../components/Shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faMagnifyingGlass,
  faSortUp,
  faSortDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/Shared/InputField/InputField";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAllTrails } from '../../store/trailSlice';
import './trails.scss'

const Trails = () => {
  const dispatch = useDispatch()
  const {trails} = useSelector(state => state.trail)
  const navigate = useNavigate();
  const [allTrails, setAllTrails] = useState([]);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc");
  const [displayedTrails, setDisplayedTrails] = useState(6);
  const [activeDifficulty, setActiveDifficulty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState();
  const [selectedElevationGain, setSelectedElevationGain] = useState();

  useEffect(() => {
    console.log(trails);
    if(trails) {
      setAllTrails(trails)
      setFilteredTrails(trails)
    }
    
  }, [trails])

  useEffect(() => {
    dispatch(getAllTrails())
  }, [dispatch])

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
      return `${remainingMinutes}min`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  };

  const handleSortOrder = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setFilteredTrails(filteredTrails.reverse());
  };

  const handleLoadMore = () => {
    setDisplayedTrails((prevCount) => prevCount + 3);
  };

  const handleFilterDifficulty = (difficulty, query = "") => {
      let filtered = allTrails;
      if (query.trim() !== "") {
        filtered = filtered.filter((trail) =>
          trail.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (difficulty) {
        filtered = filtered.filter(
          (trail) => trail.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
      }
      setFilteredTrails(filtered);
      setActiveDifficulty(difficulty);
  };
  

  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      if (activeDifficulty) {
        const filtered = allTrails.filter((trail) =>
          trail.difficulty.toLowerCase() === activeDifficulty.toLowerCase()
        );
        setFilteredTrails(filtered);
      } else {
        setFilteredTrails(allTrails);
      }
    } else {
      handleFilterDifficulty(activeDifficulty, query);
    }
  };  
  
  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    filterTrails(duration, selectedElevationGain);
  };

  const handleElevationGainChange = (elevationGain) => {
    setSelectedElevationGain(elevationGain);
    filterTrails(selectedDuration, elevationGain);
  };

  const filterTrails = (duration, elevationGain) => {
    let filtered = allTrails;

    if (duration) {
      filtered = filtered.filter((trail) => {
        if (duration === "short") {
          return trail.duration <= 100;
        } else if (duration === "medium") {
          return trail.duration >= 101 && trail.duration <= 300;
        } else if (duration === "long") {
          return trail.duration >= 301;
        }
        return true;
      });
    }

    if (elevationGain) {
      filtered = filtered.filter((trail) => {
        if (elevationGain === "low") {
          return trail.elevationGain < 300;
        } else if (elevationGain === "medium") {
          return trail.elevationGain >= 500 && trail.elevationGain <= 1050;
        } else if (elevationGain === "high") {
          return trail.elevationGain >= 1000;
        }
        return true;
      });
    }

    setFilteredTrails(filtered);
  };

  const handleTrailClick = (trailId) => {
    navigate(`/trails/${trailId}`)
  }

  return (
    <div className="all-trails">
      <div className="main-container">
        <div className="all-trails-content">
          <div className="all-trails-search">
            <InputField
              type="text"
              label="Search for trails"
              classname="text-input"
              value={searchQuery}
              onChange={handleSearchQuery}
            />
            <div className="search-icon">
              {searchQuery === "" && (
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              )}
            </div>
          </div>
          <div className="all-trails-container">
            <div className="trail-filters">
              <ul className="filter-lists">
                <li
                  className={`trail-category ${
                    activeDifficulty === null ? "active" : ""
                  }`}
                  onClick={() => handleFilterDifficulty()}
                >
                  All
                </li>
                <li
                  className={`trail-category ${
                    activeDifficulty === "easy" ? "active" : ""
                  }`}
                  onClick={() => handleFilterDifficulty("easy")}
                >
                  Easy
                </li>
                <li
                  className={`trail-category ${
                    activeDifficulty === "moderate" ? "active" : ""
                  }`}
                  onClick={() => handleFilterDifficulty("moderate")}
                >
                  Moderate
                </li>
                <li
                  className={`trail-category ${
                    activeDifficulty === "hard" ? "active" : ""
                  }`}
                  onClick={() => handleFilterDifficulty("hard")}
                >
                  Hard
                </li>
                <div className="trail-category order" onClick={handleSortOrder}>
                  {sortDirection === "asc" ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  )}
                </div>

               
              </ul>
              <div className="other-filters">
              <select
                  className="dropdown"
                  onChange={(e) => handleDurationChange(e.target.value)}
                  value={selectedDuration}
                >
                  <option value="">FILTER BY DURATION</option>
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
                <select
                  className="dropdown"
                  onChange={(e) => handleElevationGainChange(e.target.value)}
                  value={selectedElevationGain}
                >
                  <option value="">FILTER BY ELEVATION GAIN</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="filtered-trails">
              <div className="trails-container">
                {filteredTrails.slice(0, displayedTrails).map((trail) => (
                  <div className="single-trail-card" key={trail._id}>
                    <img
                      className="trail-image"
                      src={trail.photos[0]}
                      alt={trail.name}
                      onClick={() => handleTrailClick(trail._id)}
                    />

                    <div className="trail-duration">
                      <span>{formatDuration(trail.duration)}</span>
                    </div>
                    <div className="trail-details">
                      <div className="trail-detail">
                        <span className="detail-text">{trail.length}</span>
                        <span className="detail-name">Length</span>
                      </div>
                      <div className="trail-detail">
                        <span className="detail-text">
                          {trail.elevationGain}
                        </span>
                        <span className="detail-name">Elevation Gain</span>
                      </div>
                      <div className="trail-detail">
                        <span className="detail-text difficulty">
                          {trail.difficulty}
                        </span>
                        <span className="detail-name">Difficulty</span>
                      </div>
                    </div>
                    <div className="trail-description">
                      <h4 className="trail-title">{trail.name}</h4>
                      <p className="trail-desc">{trail.description}</p>
                      <div className="bottom-trail-details">
                        <div className="trail-location">
                          <FontAwesomeIcon
                            icon={faMapLocationDot}
                            className="location-icon"
                          />
                          <span className="trail-location-text">
                            {trail.location}
                          </span>
                        </div>
                        <div className="trail-favorite">
  
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredTrails.length > displayedTrails && (
                  <div className="load-more-btn-container">
                    <Button
                      type="button"
                      className="basic-btn"
                      onClick={handleLoadMore}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trails