import React, { useMemo } from "react";
import "./trailRoute.scss";

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
