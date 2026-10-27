import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeQuery, setPlaceQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const runSearch = () => {
    window.dispatchEvent(new CustomEvent('olx-search', { detail: { query: searchQuery.trim(), place: placeQuery.trim() } }));
    history.push('/');
    setIsMenuOpen(false);
  };
  const searchOnEnter = e => { if (e.key === 'Enter') runSearch(); };
  return <header className="headerParentDiv"><div className="headerChildDiv">
    <div className="brandName" role="button" tabIndex="0" aria-label="OLX home" onClick={() => history.push('/')} onKeyDown={e => e.key === 'Enter' && history.push('/')}><OlxLogo /></div>
    <button className="menuToggle" aria-label="Toggle navigation" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}><span className="bar"/><span className="bar"/><span className="bar"/></button>
    <div className={`navItems ${isMenuOpen ? 'open' : ''}`}>
      <div className="placeSearch"><Search/><input aria-label="Search location" value={placeQuery} onChange={e => setPlaceQuery(e.target.value)} onKeyDown={searchOnEnter} placeholder="City or location"/><button className="iconSearch" aria-label="Search location" onClick={runSearch}><Arrow/></button></div>
      <div className="productSearch"><div className="input"><input aria-label="Search listings" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={searchOnEnter} placeholder="Find cars, phones, furniture and more"/></div><button className="searchAction" aria-label="Search listings" onClick={runSearch}><Search color="white"/></button></div>
      <div className="language"><span tabIndex="0">ENGLISH <Arrow/></span><div className="languageDropdown"><ul><li>English</li></ul></div></div>
      <div className="loginPage"><span onClick={() => { history.push(user ? '/' : '/login'); setIsMenuOpen(false); }}>{user ? `Hi, ${user.displayName || 'there'}` : 'Login'}</span></div>
      {user && <button className="logout" onClick={() => firebase.auth().signOut().then(() => history.push('/'))}>Log out</button>}
      <div className="sellMenu" role="button" tabIndex="0" onClick={() => history.push(user ? '/create' : '/login')} onKeyDown={e => e.key === 'Enter' && history.push(user ? '/create' : '/login')}><div className="sellMenuContent"><SellButtonPlus/><span className="sellText">SELL</span></div></div>
    </div>
  </div></header>;
}
export default Header;
