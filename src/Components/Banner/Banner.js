import React, { useState } from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow';

function Banner() {
  const [showCategories, setShowCategories] = useState(false);

  const handleToggle = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div id='red' className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu" onClick={handleToggle}>
            <span>ALL CATEGORIES</span>
            <Arrow />
          </div>
          <div className={`otherQuickOptions ${showCategories ? 'show' : ''}`}>
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
