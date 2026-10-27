import React, { useContext, useState } from 'react';
import './Create.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, AuthContext } from '../../store/Context';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleImage = e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    if (file.size > 8 * 1024 * 1024) { setError('Please choose an image smaller than 8 MB.'); return; }
    setImage(file); setPreview(URL.createObjectURL(file)); setError('');
  };
  const handleSubmit = async e => {
    e.preventDefault(); setError('');
    if (!user) { history.push('/login'); return; }
    if (!name.trim() || !category.trim() || price === '' || Number(price) < 0 || !image) { setError('Please complete every field and select a product photo.'); return; }
    setBusy(true);
    try {
      const safeName = image.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const ref = firebase.storage().ref(`image/${user.uid}/${Date.now()}-${safeName}`);
      await ref.put(image);
      const url = await ref.getDownloadURL();
      await firebase.firestore().collection('products').add({ name: name.trim(), category: category.trim(), price: String(price), url, userId: user.uid, createdAt: new Date().toDateString() });
      history.push('/');
    } catch (err) { setError(err.message || 'Your listing could not be published. Please try again.'); }
    finally { setBusy(false); }
  };
  return <main className="centerDiv createForm"><span className="siteEyebrow">Share something good</span><h1 style={{fontFamily:'Manrope,sans-serif',fontSize:28,letterSpacing:'-1px',margin:'7px 0'}}>Create a listing</h1><p style={{color:'var(--muted)',fontSize:14,marginTop:0}}>Add a few details so the right buyer can find it.</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="listing-name">What are you selling?</label><input className="input" id="listing-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. iPhone 13, mountain bike" maxLength="100" required />
      <label htmlFor="listing-category">Category</label><select className="input" id="listing-category" value={category} onChange={e => setCategory(e.target.value)} required><option value="">Choose a category</option>{['Cars','Motorcycles','Mobile phones','Electronics','Furniture','Fashion','Property','Jobs','Other'].map(c => <option key={c}>{c}</option>)}</select>
      <label htmlFor="listing-price">Price (₹)</label><input className="input" id="listing-price" type="number" min="0" step="1" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter your price" required />
      <label htmlFor="listing-image">Product photo</label><input id="listing-image" type="file" accept="image/*" onChange={handleImage} required />
      {preview && <img src={preview} alt="Preview of your listing" width="220" height="180"/>}
      {error && <p className="authError" role="alert">{error}</p>}
      <button className="uploadBtn" type="submit" disabled={busy}>{busy ? 'Publishing listing…' : 'Publish listing'}</button>
    </form>
  </main>;
};
export default Create;
