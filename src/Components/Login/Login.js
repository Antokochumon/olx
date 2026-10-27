import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory, Link } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const { firebase } = useContext(FirebaseContext); const history = useHistory();
  const handleLogin = async e => { e.preventDefault(); setBusy(true); setError(''); try { await firebase.auth().signInWithEmailAndPassword(email, password); history.push('/'); } catch (err) { setError(err.message || 'Could not sign in. Please check your details.'); } finally { setBusy(false); } };
  return <main className="loginParentDiv"><img src={Logo} alt="OLX logo"/><span className="siteEyebrow" style={{display:'block',textAlign:'center'}}>Welcome back</span><h1 style={{fontFamily:'Manrope,sans-serif',textAlign:'center',fontSize:27,margin:'7px 0 22px'}}>Sign in to OLX</h1><form onSubmit={handleLogin}><label htmlFor="login-email">Email address</label><input className="input" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} id="login-email" placeholder="you@example.com" required/><label htmlFor="login-password">Password</label><input className="input" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} id="login-password" placeholder="Enter your password" required/>{error && <p className="authError" role="alert">{error}</p>}<button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button></form><p style={{textAlign:'center',color:'var(--muted)',fontSize:13}}>New to OLX? <Link to="/signup" style={{color:'var(--teal)',fontWeight:800}}>Create an account</Link></p><Link to="/" style={{display:'block',textAlign:'center',fontSize:13,color:'var(--muted)'}}>← Back to marketplace</Link></main>;
}
export default Login;
