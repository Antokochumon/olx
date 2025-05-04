import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeQuery, setPlaceQuery] = useState('');
  const [language, setLanguage] = useState('ENGLISH');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    console.log(`Searching for ${searchQuery}`);
  };

  const handlePlaceSearch = () => {
    console.log(`Searching for place: ${placeQuery}`);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    console.log(`Language changed to: ${newLanguage}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>

        <div className="menuToggle" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        </div>

        <div className={`navItems ${isMenuOpen ? 'open' : ''}`}>
          <div className="placeSearch">
            <Search />
            <input
              type="text"
              value={placeQuery}
              onChange={(e) => setPlaceQuery(e.target.value)}
              placeholder="Search location"
            />
            <Arrow onClick={handlePlaceSearch} />
          </div>

          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find car, mobile phone and more..."
              />
            </div>
            <div className="searchAction" onClick={handleSearch}>
              <Search color="black" />
            </div>
          </div>

          <div className="language">
            <span onClick={() => setLanguage(language === 'ENGLISH' ? 'SPANISH' : 'ENGLISH')}>
              {language} <Arrow />
            </span>
            <div className="languageDropdown">
              <ul>
                <li onClick={() => handleLanguageChange('ENGLISH')}>English</li>
                <li onClick={() => handleLanguageChange('SPANISH')}>Spanish</li>
              </ul>
            </div>
          </div>

          <div className="loginPage">
            <span
              onClick={() => {
                history.push('/login');
              }}
            >
              {user ? `Welcome ${user.displayName}` : 'Login'}
            </span>
            <hr />
          </div>

          {user && (
            <span
              className="logout"
              onClick={() => {
                firebase.auth().signOut();
                history.push('/login');
              }}
            >
              Logout
            </span>
          )}

<div className="sellMenu" onClick={() => history.push('/create')}>
            <SellButton className="an" />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span className="sellText">SELL</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Header;
