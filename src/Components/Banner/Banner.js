import React, { useState } from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow';
const categories = ['All categories', 'Cars', 'Motorcycles', 'Mobile phones', 'Electronics', 'Furniture', 'Fashion', 'Property', 'Jobs'];
function Banner() {
  const [showCategories, setShowCategories] = useState(false);
  const choose = category => window.dispatchEvent(new CustomEvent('olx-category', { detail: category === 'All categories' ? '' : category }));
  return <section className="bannerParentDiv"><div className="bannerChildDiv"><div className="menuBar">
    <button className="categoryMenu" onClick={() => setShowCategories(!showCategories)} aria-expanded={showCategories}>BROWSE CATEGORIES <Arrow/></button>
    <div className={`otherQuickOptions ${showCategories ? 'show' : ''}`}>{categories.slice(1).map(c => <button key={c} onClick={() => choose(c)}>{c}</button>)}</div>
  </div><div className="banner"><img src={`${process.env.PUBLIC_URL}/Images/banner.jpg`} alt="Buy, sell and find just about anything"/></div></div></section>;
}
export default Banner;
