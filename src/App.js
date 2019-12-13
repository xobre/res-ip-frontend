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
           <Route exact path="/" component={List} />
          {/*<Route exact path="/recipes" component={} />
          <Route exact path="/list" component={} /> */}

        </header>
      </div>
    </Router>
  );
}

export default App;
