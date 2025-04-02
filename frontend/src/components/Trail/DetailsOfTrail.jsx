import React from "react";
import "./detailsOfTrail.scss";

const DetailsOfTrail = ({ trail }) => {
  return (
    <div className="details-of-single-trail">
      <div className="photo-description">
        <div className="additional-info-of-trail">
          <div className="info-row">
            <div className="length-of-trails">
              <h1>LENGTH</h1>
              <p>{trail?.length}</p>
            </div>

            <div className="elavation-of-gain">
              <h1>ELAVATION GAIN</h1>
              <p>{trail?.elevationGain}</p>
            </div>

            <div className="trail-difficulty-type">
              <h1>DIFFICULTY</h1>
              <p>{trail?.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsOfTrail;
