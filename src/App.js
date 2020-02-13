import React from 'react';
import './App.css';
import Chat from './component/Chat';
import ChatInfo from './component/ChatInfo';
import {BrowserRouter as Router, Route } from 'react-router-dom'
function App() {
  return (
    <div className="container"> 
    <Router>
      <Route exact path='/' component={ChatInfo} />
      <Route path='/chat' component={Chat} />
    </Router>
    </div>
  );
}

export default App;
