import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, [firebase, setUser]);

  return <Post><Router basename="/olx"><Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/create" component={Create} />
    <Route exact path="/view" component={View} />
    <Route render={() => <Home />} />
  </Switch></Router></Post>;
}
export default App;
