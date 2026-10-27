import React, { useState, useEffect, useContext, useMemo } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [place, setPlace] = useState('');
  const [category, setCategory] = useState('');
  const [favorites, setFavorites] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    let active = true;
    setLoading(true);
    const unsubscribe = firebase.firestore().collection('products').onSnapshot(snapshot => {
      if (!active) return;
      setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => {
        const at = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
        const bt = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
        return bt - at;
      }));
      setLoading(false); setError('');
    }, err => { if (active) { setError(err.message || 'Could not load listings. Please try again later.'); setLoading(false); } });
    return () => { active = false; unsubscribe(); };
  }, [firebase]);

  useEffect(() => {
    const onSearch = e => { setQuery(e.detail.query || ''); setPlace(e.detail.place || ''); };
    const onCategory = e => setCategory(e.detail || '');
    window.addEventListener('olx-search', onSearch);
    window.addEventListener('olx-category', onCategory);
    return () => { window.removeEventListener('olx-search', onSearch); window.removeEventListener('olx-category', onCategory); };
  }, []);

  const visibleProducts = useMemo(() => products.filter(p => {
    const term = query.toLowerCase();
    const searchable = [p.name, p.category, p.description, p.location, p.city].filter(Boolean).join(' ').toLowerCase();
    const matchesQuery = !term || searchable.includes(term);
    const matchesPlace = !place || [p.location, p.city, p.name].filter(Boolean).join(' ').toLowerCase().includes(place.toLowerCase());
    const matchesCategory = !category || String(p.category || '').toLowerCase().includes(category.toLowerCase().replace(/s$/, '')) || String(p.category || '').toLowerCase() === category.toLowerCase();
    return matchesQuery && matchesPlace && matchesCategory;
  }), [products, query, place, category]);

  const openProduct = product => { setPostDetails(product); history.push('/view'); window.scrollTo(0, 0); };
  const toggleFavorite = (e, id) => { e.stopPropagation(); setFavorites(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]); };
  const filterCategories = ['All items', 'Cars', 'Motorcycles', 'Mobile phones', 'Electronics', 'Furniture', 'Fashion', 'Property'];
  const renderCard = product => <article className="card" key={product.id} role="button" tabIndex="0" onClick={() => openProduct(product)} onKeyDown={e => e.key === 'Enter' && openProduct(product)}>
    <button className={`favorite ${favorites.includes(product.id) ? 'isFavorite' : ''}`} aria-label={favorites.includes(product.id) ? 'Remove from favourites' : 'Add to favourites'} onClick={e => toggleFavorite(e, product.id)}><Heart/></button>
    <div className="image"><img src={product.url || `${process.env.PUBLIC_URL}/Images/R15V3.jpg`} alt={product.name || 'Marketplace listing'} loading="lazy" onError={e => { e.currentTarget.src = `${process.env.PUBLIC_URL}/Images/R15V3.jpg`; }}/></div>
    <div className="content"><p className="rate">₹ {product.price !== undefined && product.price !== '' ? Number(product.price).toLocaleString('en-IN') : 'Price on request'}</p><span className="kilometer">{product.category || 'For sale'}</span><p className="name">{product.name || 'Untitled listing'}</p></div>
    <div className="date"><span>{product.location || product.city || 'Location not specified'}</span><span>{product.createdAt && product.createdAt.toDate ? product.createdAt.toDate().toLocaleDateString() : product.createdAt || ''}</span></div>
  </article>;

  return <><section className="homeIntro"><span className="siteEyebrow">The local marketplace</span><h1>Good finds. Better prices.</h1><p>Discover something special from people in your community.</p></section>
    <main className="postParentDiv"><div className="filterBar" aria-label="Filter by category">{filterCategories.map(c => <button key={c} className={`filterChip ${(!category && c === 'All items') || category === c ? 'active' : ''}`} onClick={() => setCategory(c === 'All items' ? '' : c)}>{c}</button>)}</div>
      <section className="recommendations"><div className="heading"><span>{query || place || category ? 'Search results' : 'Fresh recommendations'}</span><span onClick={() => { setQuery(''); setPlace(''); setCategory(''); }}>Clear filters ↗</span></div>
      <p className="resultsMeta">{loading ? 'Finding listings…' : `${visibleProducts.length} ${visibleProducts.length === 1 ? 'listing' : 'listings'}${category ? ` in ${category}` : ''}`}</p>
      <div className="cards">{loading ? <div className="loadingState">Loading the latest listings…</div> : error ? <div className="emptyState"><h3>We couldn't load listings</h3><p>{error}</p><button className="filterChip" onClick={() => window.location.reload()}>Try again</button></div> : visibleProducts.length ? visibleProducts.map(renderCard) : <div className="emptyState"><h3>No listings found just yet</h3><p>Try another search or clear your filters to see all available items.</p><button className="filterChip active" onClick={() => { setQuery(''); setPlace(''); setCategory(''); }}>Show all listings</button></div>}</div>
      </section></main></>;
}
export default Posts;
