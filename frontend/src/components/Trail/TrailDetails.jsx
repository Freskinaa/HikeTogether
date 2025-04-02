import React, { useState, useEffect } from "react";
import "./trailDetails.scss";

const TrailDetails = ({ trail }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const elementsToFade = document.querySelectorAll(
        ".title-of-trail, .text-of-subtitle, .trail-line-one, .trail-line-two"
      );

      const opacity = 1 - scrollPosition / 300;

      elementsToFade.forEach((element) => {
        element.style.opacity = opacity;
      });

      if (scrollPosition > 200) {
        setIsFading(true);
      } else {
        setIsFading(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`trailspage-main-image-single-trail ${
        isFading ? "fade-out" : ""
      }`}
    >
      <h1 className="title-of-trail">{trail?.name.toUpperCase()}</h1>

      <div className="title-section">
        <div className="trail-line-one"> </div>

        <h3 className="text-of-subtitle">GET LOST IN THE BEAUTY OF NATURE</h3>
        <div className="trail-line-two"> </div>
      </div>
    </div>
  );
};

export default TrailDetails;
