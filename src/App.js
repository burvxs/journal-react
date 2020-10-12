import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Tasker from './components/Tasker'
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <Tasker />
    </div>
  );
}

export default App;
