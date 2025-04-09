import React, { useMemo } from "react";
import "./trailRoute.scss";
// The TrailRoute component is used to display an embedded Google Maps iframe 
// showing the trail's location based on the trail's name and location.
// It takes a `trail` prop, which contains the trail's details, and constructs

// a Google Maps URL using the trail's name and location. 




const TrailRoute = ({ trail }) => {
  const mapUrl = useMemo(() => {
    if (!trail) return null;
    return `https://www.google.com/maps?q=${encodeURIComponent(
      trail.name + ", " + trail.location
    )}&output=embed`;
  }, [trail]);

  return (
    <div className="trailspage-trail">
      {mapUrl && (
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="map"
        ></iframe>
      )}
    </div>
  );
};

export default TrailRoute;
