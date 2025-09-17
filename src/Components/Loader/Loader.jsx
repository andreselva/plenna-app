import React from 'react';
import './Loader.css';

const Loader = ({ inline = false, size = 35 }) => {
  return (
    <div className={inline ? "loader-inline" : "loader-container"}>
      <div className="spinner" style={{ width: size, height: size }}></div>
    </div>
  );
};

export default Loader;
