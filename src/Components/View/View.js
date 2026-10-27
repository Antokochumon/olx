import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
function View() {
  const [userDetails, setUserDetails] = useState(null);
  const [loadingSeller, setLoadingSeller] = useState(false);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  useEffect(() => {
    let active = true;
    if (!postDetails || !postDetails.userId) return undefined;
    setLoadingSeller(true);
    firebase.firestore().collection('users').where('id', '==', postDetails.userId).limit(1).get().then(res => {
      if (active) setUserDetails(res.empty ? null : res.docs[0].data());
    }).catch(() => { if (active) setUserDetails(null); }).finally(() => { if (active) setLoadingSeller(false); });
    return () => { active = false; };
  }, [firebase, postDetails]);
  if (!postDetails) return <main className="emptyState" style={{maxWidth:700,margin:'50px auto'}}><h3>No listing selected</h3><p>Choose a listing from the home page to view its details.</p><button className="filterChip active" onClick={() => history.push('/')}>Back to listings</button></main>;
  return <main className="viewParentDiv"><div className="imageShowDiv"><img src={postDetails.url || `${process.env.PUBLIC_URL}/Images/R15V3.jpg`} alt={postDetails.name || 'Listing photo'} /></div><div className="rightSection"><section className="productDetails"><span className="siteEyebrow">{postDetails.category || 'Marketplace listing'}</span><p>₹ {postDetails.price !== '' && postDetails.price !== undefined ? Number(postDetails.price).toLocaleString('en-IN') : 'Price on request'}</p><span>{postDetails.name || 'Untitled listing'}</span><p>{postDetails.location || postDetails.city || 'Location not specified'}</p><p>Listed {postDetails.createdAt && postDetails.createdAt.toDate ? postDetails.createdAt.toDate().toLocaleDateString() : postDetails.createdAt || 'recently'}</p></section><section className="contactDetails"><p>Seller details</p>{loadingSeller ? <p>Loading seller information…</p> : userDetails ? <><p>{userDetails.username || 'Marketplace seller'}</p>{userDetails.phone ? <p>Phone: {userDetails.phone}</p> : <p>Contact details not provided</p>}</> : <p>Seller information is not available.</p>}<button className="uploadBtn" onClick={() => history.push('/')}>← Back to listings</button></section></div></main>;
}
export default View;
