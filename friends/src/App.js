import React from 'react';
import {Route} from "react-router-dom";
import Login from "./Login/Login";
import FriendsList from "./FriendsList/FriendsList";
import Friend from "./FriendsList/Friend";
import {PrivateRoute} from "./PrivateRoute"
import './App.css';


function App() {
  return (
    <div>
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/friends" component={FriendsList} />
      <PrivateRoute path="/friends/:id" component={Friend} />
    </div>
  );
}

export default App;
