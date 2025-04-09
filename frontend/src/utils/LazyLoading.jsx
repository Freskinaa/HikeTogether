/**
 * LazyLoading Component
 *
 * This functional React component renders a loading spinner
 * to indicate that content is being loaded. It uses a CSS
 * class for styling the loading animation.
 *
 * @component
 * @returns {JSX.Element} A div containing a loading spinner.
 */
import React from "react";
import "../styles/lazyLoading.scss";

const LazyLoading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spiral"></div>
    </div>
  );
};

export default LazyLoading;