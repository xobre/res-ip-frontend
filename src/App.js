import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import List from './List.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route exact path="/" component={Home} />          
          <Route exact path="/list" component={List} />
        </header>
      </div>
    </Router>
  );
}

export default App;
